// src/index.ts
import { Message } from "whatsapp-web.js";
import "./whatsapp/handler";
import { client } from "./whatsapp/client";
import { commands } from "./whatsapp/handler"; // Supondo que você tenha um Map ou objeto de comandos

// IA's
import { askGemini } from "./ai/gemini";

// Evento de mensagem
client.on("message_create", async (message: Message) => {
  // Se a mensagem for do próprio bot, ignora
  if (message.fromMe) return;

  // Verifica se a mensagem começa com o prefixo de algum comando
  for (const [commandName, command] of commands) {
    if (message.body.startsWith(`${command.prefix}${commandName}`)) {
      try {
        // Executa o comando
        await command.run({ message, client });
      } catch (err) {
        console.error(`Erro ao executar comando ${commandName}:`, err);
      }
      return; // Se encontrou um comando, sai da função
    }
  }

  // Se não for um comando, responde com a IA
  const response = await askGemini(message.body);
  client.sendMessage(message.from, response);
});

client.initialize();
