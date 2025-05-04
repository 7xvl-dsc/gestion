
module.exports = {
  token: process.env.TOKEN || require('./token.json').token,
  embedFooter: {
    text: "7x Gestion",
    iconURL: "https://cdn.discordapp.com/attachments/1298760976501571655/1368308805213093919/7xvl.png?ex=68186921&is=681717a1&hm=003919e0165ef31e623c22796fdc46dee2165969953e85ebd1da2adf1f647ad6&"
  },
  intents: ['Guilds', 'GuildMembers', 'GuildVoiceStates'],
  commandsDir: './commands',
  eventsDir: './events',
  music: {
    maxQueueSize: 100,
    defaultVolume: 50,
    timeout: 60000,
    quality: 'high',
    filters: {
      bassboost: true,
      nightcore: true,
      vaporwave: true
    },
    searchEngine: 'youtube',
    platforms: ['youtube', 'spotify', 'soundcloud'],
    liveSupport: true,
    lavalink: {
      nodes: [
        {
          host: "lava.link",
          port: 80,
          password: "youshallnotpass",
          secure: false,
          retryAmount: 5,
          retryDelay: 3000
        }
      ]
    }
  }
};
