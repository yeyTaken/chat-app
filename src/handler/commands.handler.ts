import { Client, Message } from "whatsapp-web.js";
import fs from "fs";
import path from "path";

import { ICommand } from "@client";

// Função para listar arquivos de forma recursiva
async function getCommandFiles(dir: string): Promise<string[]> {
  let files: string[] = [];
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(await getCommandFiles(fullPath));
    } else if (entry.isFile() && fullPath.endsWith(".ts")) {
      files.push(fullPath);
    }
  }

  return files;
}

// Função para carregar os comandos
export async function loadCommands(): Promise<ICommand[]> {
  try {
    const commandFiles = await getCommandFiles("src/whatsapp/commands");
    const commands: ICommand[] = [];

    for (const file of commandFiles) {
      const modulePath = path.resolve(file);
      const commandModule = await import(modulePath);

      Object.values(commandModule).forEach((cmd: any) => {
        if (cmd && cmd.name && typeof cmd.execute === "function") {
          commands.push(cmd);
        }
      });
    }

    return commands;
  } catch (error) {
    console.error("Erro ao carregar comandos:", error);
    return [];
  }
}

// Registra os comandos para que, ao receber uma mensagem, seja verificado o prefixo e nome
export function registerCommands(client: Client, commands: ICommand[]): void {
  client.on("message", (message: Message) => {
    commands.forEach(command => {
      const prefix = command.prefix;
      if (message.body.trim().startsWith(prefix + command.name)) {
        command.execute(message);
      }
    });
  });
}
