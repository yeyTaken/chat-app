import { Message } from "whatsapp-web.js";

export interface ICommand {
  name: string;
  description: string;
  prefix?: string; // Prefixo customizável
  execute: (message: Message) => void;
}

export function Command(options: ICommand): ICommand {
  return {
    prefix: options.prefix || "!", // Se não definido, utiliza "!" como padrão
    ...options,
  };
}
