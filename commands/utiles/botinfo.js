
const { SlashCommandBuilder, EmbedBuilder, version } = require('discord.js');
const os = require('os');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Affiche les informations techniques du bot'),

  async execute(interaction) {
    const client = interaction.client;
    const embed = new EmbedBuilder()
      .setTitle(`ℹ️ Informations sur ${client.user.username}`)
      .setThumbnail(client.user.displayAvatarURL())
      .addFields(
        { name: '🤖 Bot', value: `\`${client.user.tag}\``, inline: true },
        { name: '⚡ Uptime', value: `<t:${Math.floor((Date.now() - client.uptime) / 1000)}:R>`, inline: true },
        { name: '📡 Latence', value: `${client.ws.ping}ms`, inline: true },
        { name: '🔧 Version Discord.js', value: `v${version}`, inline: true },
        { name: '💻 Version Node.js', value: `${process.version}`, inline: true },
        { name: '🏢 Serveurs', value: `${client.guilds.cache.size}`, inline: true }
      )
      .setColor('#9b59b6')
      .setFooter(interaction.client.embedFooter);

    await interaction.reply({ embeds: [embed] });
  },
};
