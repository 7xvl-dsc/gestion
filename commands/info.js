
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Affiche les informations du serveur'),

  async execute(interaction) {
    const guild = interaction.guild;
    const embed = new EmbedBuilder()
      .setTitle(`Information sur ${guild.name}`)
      .setThumbnail(guild.iconURL())
      .addFields(
        { name: 'Propriétaire', value: `<@${guild.ownerId}>`, inline: true },
        { name: 'Membres', value: `${guild.memberCount}`, inline: true },
        { name: 'Création', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
        { name: 'Salons', value: `${guild.channels.cache.size}`, inline: true }
      )
      .setColor('#0099ff')
      .setFooter(interaction.client.embedFooter);

    await interaction.reply({ embeds: [embed] });
  },
};
