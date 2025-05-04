
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { isPremium } = require('../../utils/premium.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('personnalise')
    .setDescription('Créer un embed personnalisé [PREMIUM]')
    .addStringOption(option =>
      option.setName('titre')
        .setDescription('Titre de l\'embed')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('description')
        .setDescription('Description de l\'embed')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('couleur')
        .setDescription('Couleur de l\'embed (hex)')
        .setRequired(false)),

  async execute(interaction) {
    if (!isPremium(interaction.user.id)) {
      return interaction.reply('Cette commande est réservée aux utilisateurs premium !');
    }

    const title = interaction.options.getString('titre');
    const description = interaction.options.getString('description');
    const color = interaction.options.getString('couleur') || '#FF0000';

    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setColor(color)
      .setFooter(interaction.client.embedFooter);

    await interaction.reply({ embeds: [embed] });
  },
};
