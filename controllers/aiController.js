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
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

        // The system prompt that grounds the AI's identity
        const SYSTEM_PROMPT = `You are a helpful, expert virtual veterinary assistant for a Pet Care App limit your response within 5 to 6 lines max. 
Provide professional, friendly advice regarding dog and cat health, nutrition, and training.
IMPORTANT RULES: 
1. Always state clearly that you are an AI assistant and NOT a licensed veterinarian.
2. If the user describes a clear emergency (trauma, breathing issues, severe bleeding, seizures, etc.), you MUST tell them to immediately go to an emergency vet clinic.
3. Keep your answers concise, practical, and easy to read.`;

        // Format the conversation history for Gemini
        const formattedHistory = history ? history.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        })) : [];

        // Initialize the chat session
        const chat = model.startChat({
            history: [
                { role: 'user', parts: [{ text: "System Instructions: " + SYSTEM_PROMPT }] },
                { role: 'model', parts: [{ text: "Understood. I am ready to act as the virtual veterinary assistant." }] },
                ...formattedHistory
            ],
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
