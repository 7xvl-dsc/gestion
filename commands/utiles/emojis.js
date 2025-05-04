
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('emojis')
    .setDescription('Affiche la liste des emojis du serveur'),

  async execute(interaction) {
    const emojis = interaction.guild.emojis.cache;
    const embed = new EmbedBuilder()
      .setTitle(`😀 Emojis de ${interaction.guild.name}`)
      .setDescription(
        emojis.size > 0
          ? emojis.map(emoji => `${emoji} \`:${emoji.name}:\``).join('\n')
          : 'Aucun emoji personnalisé sur ce serveur'
      )
      .addFields(
        { name: 'Nombre total', value: `${emojis.size}`, inline: true },
        { name: 'Emojis animés', value: `${emojis.filter(emoji => emoji.animated).size}`, inline: true },
        { name: 'Emojis statiques', value: `${emojis.filter(emoji => !emoji.animated).size}`, inline: true }
      )
      .setColor('#3498db')
      .setFooter(interaction.client.embedFooter);

    await interaction.reply({ embeds: [embed] });
  },
};
