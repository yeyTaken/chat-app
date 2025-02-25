import { Client, LocalAuth } from "whatsapp-web.js";
import qrcodeTerminal from "qrcode-terminal";
// import QRCode from "qrcode";

import { registerCommands, loadCommands } from "@/handler/commands.handler";

export async function initializeClient(): Promise<void> {
  const client = new Client({
    authStrategy: new LocalAuth(),
  });

  client.on("qr", async (qr) => {
    console.log("QR Code recebido, escaneie com o WhatsApp:");
    qrcodeTerminal.generate(qr, { small: true });
/*
    try {
      await QRCode.toFile("qrcode.png", qr);
      console.log("QR Code salvo como 'qrcode.png'. Abra para escanear!");
    } catch (error) {
      console.error("Erro ao gerar a imagem do QR Code:", error);
    }
*/
  });

  client.on("ready", async () => {
    console.log("Cliente pronto!");
    try {
      const commands = await loadCommands();
      registerCommands(client, commands);
      console.log(`Registrados ${commands.length} comando(s).`);
    } catch (error) {
      console.error("Erro ao carregar os comandos:", error);
    }
  });

  client.initialize();
}
