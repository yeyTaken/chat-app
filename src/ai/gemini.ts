import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const creatorPatterns = [
    /\bquem (te|lhe) criou\b/,
    /\bquem é (seu|sua) criador(a)?\b/,
    /\bquem fez você\b/,
    /\bquem desenvolveu você\b/,
    /\bquem programou você\b/,
];

// Função auxiliar para verificar se a pergunta corresponde a um dos padrões definidos
function matchesPattern(input: string, patterns: RegExp[]): boolean {
    return patterns.some((pattern) => pattern.test(input));
}

export async function askGemini(prompt: string): Promise<string> {
    try {
        const lowerPrompt = prompt.toLowerCase().trim();

        // Resposta padrão via API Gemini
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        let result = await model.generateContent(prompt);
        let response = result.response.text();
        
        
                // Respostas personalizadas
                if (matchesPattern(lowerPrompt, creatorPatterns)) {
                    const newPrompt = `
                    deve responder que foi criada por Israel Rabbi.
                    - meu nome: Israel Rabbi Jatobá Da Silva Rocha
                    - minha profissão: Programador e Estudante
                    - meu github: https://github.com/yeyTaken
                    - você foi feito usando: TypeScript.

                    para que essas infosmações? para responder a pergunta feito pelo usúario;
                    
                    "${lowerPrompt}"

                    deve responder de acordo com a linguagem perguntada pelo prompt acima do usuario e agora que tem minhas infomações fica mais facil responde-lo.
                    `;

                    result = await model.generateContent(newPrompt);
                    response = result.response.text();
                    return response;
                }

        return response || "Não consegui entender. Tente reformular sua pergunta.";
    } catch (error) {
        console.error("Erro na IA:", error);
        return "Houve um erro ao processar sua solicitação.";
    }
}
