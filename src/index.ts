import { Message } from "whatsapp-web.js";

import { client } from "./whatsapp/client";

// IA's
import { askGemini } from "./ai/gemini";

client.on("message_create", async (message: Message) => {
  //if (!message.fromMe) { // evita que a IA responda as proprias mensagens.
    const response = await askGemini(message.body);
    client.sendMessage(message.from, response);
  //}

  if (message.body === "!ping") {
    // send back "pong" to the chat the message was sent in
    client.sendMessage(message.from, "pong");
  }
});

client.initialize();
