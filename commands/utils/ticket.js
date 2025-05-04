
const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Créer un panneau de tickets')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('🎫 Système de Tickets')
      .setDescription('Sélectionnez une catégorie pour ouvrir un ticket')
      .setColor('#0099ff')
      .setFooter(interaction.client.embedFooter);

    const menu = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('ticket_menu')
          .setPlaceholder('Sélectionnez une catégorie')
          .addOptions([
            {
              label: 'Support Général',
              description: 'Obtenir de l\'aide générale',
              value: 'general',
              emoji: '❓'
            },
            {
              label: 'Report Bug',
              description: 'Signaler un bug',
              value: 'bug',
              emoji: '🐛'
            },
            {
              label: 'Partenariat',
              description: 'Proposer un partenariat',
              value: 'partner',
              emoji: '🤝'
            }
          ])
      );

    await interaction.reply({ embeds: [embed], components: [menu] });
  }
};
