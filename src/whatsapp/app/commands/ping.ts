import { Command } from '../../client/commands';

export default Command({
  name: 'ping',
  description: 'Responde com "pong"',
  // prefix: '$',
  run: async ({ message, client }) => {
    await client.sendMessage(message.from, 'pong!');
  }
});
