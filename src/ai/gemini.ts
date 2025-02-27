import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function askGemini(prompt: string): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        const response = result.response.text();
        return response || "Não consegui entender. Tente reformular sua pergunta.";
    } catch (error) {
        console.error("Erro na IA:", error);
        return "Houve um erro ao processar sua solicitação.";
    }
}
