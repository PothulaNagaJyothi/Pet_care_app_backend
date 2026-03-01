import { GoogleGenerativeAI } from "@google/generative-ai";

export const handleAiChat = async (req, res) => {
    try {
        const { message, history } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({
                success: false,
                message: "Gemini API Key is missing from the backend .env file"
            });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Using gemini-1.0-pro which is globally available in all regions and accounts
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

        // The system prompt that grounds the AI's identity
        const SYSTEM_PROMPT = `You are a helpful, expert virtual veterinary assistant for a Pet Care App. Limit your response to 5 to 6 lines max. 
Provide professional, friendly advice regarding dog and cat health, nutrition, and training.
IMPORTANT RULES: 
1. Always state clearly that you are an AI assistant and NOT a licensed veterinarian.
2. If the user describes a clear emergency, you MUST tell them to immediately go to an emergency vet clinic.
3. Keep your answers concise, practical, and easy to read.`;

        // Format the raw conversation history securely for Gemini
        const formattedHistory = [
            { role: 'user', parts: [{ text: "System Instructions: " + SYSTEM_PROMPT }] },
            { role: 'model', parts: [{ text: "Understood. I am ready to act as the virtual veterinary assistant." }] }
        ];

        if (history && Array.isArray(history)) {
            // Skip the first default greeting message which might confuse the history parser
            const userHistory = history.filter(msg => msg.role !== 'model' || !msg.content.includes("virtual Veterinary Assistant"));

            userHistory.forEach(msg => {
                formattedHistory.push({
                    role: msg.role === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.content }]
                });
            });
        }

        // Initialize the chat session with clean history
        const chat = model.startChat({
            history: formattedHistory,
            generationConfig: {
                maxOutputTokens: 500,
                temperature: 0.5,
            },
        });

        const result = await chat.sendMessage(message);
        const aiResponse = result.response.text();

        res.status(200).json({
            success: true,
            message: aiResponse
        });

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while communicating with the AI. Please try again."
        });
    }
};
