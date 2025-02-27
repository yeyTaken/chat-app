interface CommandOptions {
  name: string;
  description: string;
  prefix?: string;  // Opcional
  run: ({ message, client }: { message: any, client: any }) => Promise<void>;
}

const PREFIX = process.env.PREFIX;

export const Command = ({ name, description, prefix = PREFIX, run }: CommandOptions) => {
  return { name, description, prefix, run };
};
