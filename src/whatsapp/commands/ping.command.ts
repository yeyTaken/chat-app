import { Command } from "@client";

export const pingCommand = Command({
  name: "ping",
  description: "Responde com pong.",
  // prefix: "$", // Descomente para usar um prefixo customizado
  execute: (message) => {
    message.reply("pong");
  },
});
