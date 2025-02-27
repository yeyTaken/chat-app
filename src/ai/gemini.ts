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
                    Por favor, responda à pergunta do usuário abaixo, utilizando o idioma utilizado:
                    
                    "${lowerPrompt}"
                    
                    Lembre-se de incluir as seguintes informações no início da sua resposta:
                    
                    - Nome do criador: Israel Rabbi Jatobá Da Silva Rocha
                    - Abreviação de nome: Israel R J S Rocha
                    - Apelido: Rabi
                    - Profissão: Programador e Estudante
                    - GitHub: https://github.com/yeyTaken
                    - Desenvolvido com: TypeScript
                    
                    Sua resposta será enviada diretamente ao usuário final.
                    `;

                    // console.log(newPrompt);

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
