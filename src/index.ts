import { Message } from "whatsapp-web.js";
import { client } from "./whatsapp/client";

client.on('message_create', message => {
	if (message.body === '!ping') {
		// send back "pong" to the chat the message was sent in
		client.sendMessage(message.from, 'pong');
	}
});


client.initialize();
