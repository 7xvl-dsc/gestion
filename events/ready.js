
const { ActivityType } = require('discord.js');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`Connecté en tant que ${client.user.tag}!`);
    
    client.user.setPresence({
      activities: [{
        name: 'protéger le serveur',
        type: ActivityType.Watching
      }],
      status: 'online'
    });
  },
};
