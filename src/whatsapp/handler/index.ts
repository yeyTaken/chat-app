import fs from 'fs';
import path from 'path';
import { client } from '../client';

// Caminho para os arquivos de comandos
const commandsPath = path.join(__dirname, '..', 'app', 'commands');

// Armazenamento dos comandos
const commands: Map<string, any> = new Map();

const registerCommands = () => {
  // Lê todos os arquivos do diretório de comandos
  fs.readdirSync(commandsPath).forEach((file) => {
    if (file.endsWith('.ts')) {
      // Carrega o comando dinamicamente
      import(path.join(commandsPath, file)).then((commandModule) => {
        const command = commandModule.default;

        if (command && command.name && command.prefix && command.run) {
          // Armazena o comando no mapa 'commands' com o nome do comando como chave
          commands.set(command.name, command);
        }
      });
    }
  });
};

// Chama a função para registrar os comandos
registerCommands();

// Exporta os comandos para uso em outros arquivos
export { commands };

// event handler registration:
const eventsPath = path.join(__dirname, '..', 'app', 'events');

fs.readdirSync(eventsPath).forEach((file) => {
  if (file.endsWith('.ts')) {
    // Dynamically import event handlers
    import(path.join(eventsPath, file)).then((eventModule) => {
      const event = eventModule.default;
      
      if (event && event.type && event.run) {
        // Register the event handler dynamically
        client.on(event.type, (args: any) => {
          event.run(args);
        });
      }
    });
  }
});
