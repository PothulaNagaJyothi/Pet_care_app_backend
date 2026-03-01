import { GoogleGenerativeAI } from "@google/generative-ai";

// simple in-memory cache to reduce repeated API calls
const aiResponseCache = new Map(); // key: prompt, value: {response, expires}

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
        // use a model name exactly as reported by ListModels
        // latest available flash model from your account:
        const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

        // The system prompt that grounds the AI's identity
        const SYSTEM_PROMPT = `You are a helpful, expert virtual veterinary assistant for a Pet Care App. Limit your response to 5 to 6 lines max. 
Provide professional, friendly advice regarding dog and cat health, nutrition, and training.
IMPORTANT RULES: 
1. Always state clearly that you are an AI assistant and NOT a licensed veterinarian.
2. If the user describes a clear emergency, you MUST tell them to immediately go to an emergency vet clinic.
3. Keep your answers concise, practical, and easy to read.`;

        // Manually concatenate history to bypass startChat schema bugs
        let fullPrompt = `System Instructions: ${SYSTEM_PROMPT}\n\n`;

        if (history && Array.isArray(history)) {
            // Skip the first default greeting message
            const userHistory = history.filter(msg => msg.role !== 'model' || !msg.content.includes("virtual Veterinary Assistant"));

            userHistory.forEach(msg => {
                const prefix = msg.role === 'user' ? 'User:' : 'Assistant:';
                fullPrompt += `${prefix} ${msg.content}\n`;
            });
        }

        fullPrompt += `\nUser: ${message}\nAssistant:`;

        // check cache first
        const cacheKey = fullPrompt;
        const now = Date.now();
        if (aiResponseCache.has(cacheKey)) {
            const entry = aiResponseCache.get(cacheKey);
            if (entry.expires > now) {
                return res.status(200).json({
                    success: true,
                    message: entry.response,
                    cached: true
                });
            } else {
                aiResponseCache.delete(cacheKey);
            }
        }

        const result = await model.generateContent(fullPrompt);
        const aiResponse = result.response.text();

        // store in cache for 5 minutes
        aiResponseCache.set(cacheKey, {
            response: aiResponse,
            expires: now + 5 * 60 * 1000
        });

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
