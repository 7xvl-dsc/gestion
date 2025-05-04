
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serveur')
    .setDescription('Affiche les statistiques détaillées du serveur'),

  async execute(interaction) {
    const guild = interaction.guild;
    const embed = new EmbedBuilder()
      .setTitle(`📊 Statistiques de ${guild.name}`)
      .setThumbnail(guild.iconURL())
      .addFields(
        { name: '👑 Propriétaire', value: `<@${guild.ownerId}>`, inline: true },
        { name: '👥 Membres', value: `${guild.memberCount}`, inline: true },
        { name: '🎭 Rôles', value: `${guild.roles.cache.size}`, inline: true },
        { name: '💬 Salons', value: `${guild.channels.cache.size}`, inline: true },
        { name: '🔒 Niveau de vérification', value: guild.verificationLevel, inline: true },
        { name: '📅 Créé le', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true }
      )
      .setColor('#2ecc71')
      .setFooter(interaction.client.embedFooter);

    await interaction.reply({ embeds: [embed] });
  },
};
