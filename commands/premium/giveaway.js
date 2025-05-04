
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { isPremium } = require('../../utils/premium.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('giveaway')
    .setDescription('Créer un giveaway [PREMIUM]')
    .addStringOption(option =>
      option.setName('prix')
        .setDescription('Le prix du giveaway')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('gagnants')
        .setDescription('Nombre de gagnants')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('duree')
        .setDescription('Durée en minutes')
        .setRequired(true)),

  async execute(interaction) {
    if (!isPremium(interaction.user.id)) {
      return interaction.reply('Cette commande est réservée aux utilisateurs premium !');
    }

    const prize = interaction.options.getString('prix');
    const winners = interaction.options.getInteger('gagnants');
    const duration = interaction.options.getInteger('duree');

    const embed = new EmbedBuilder()
      .setTitle('🎉 Giveaway')
      .setDescription(`Prix: ${prize}\nGagnants: ${winners}\nSe termine dans: ${duration} minutes`)
      .setColor('#FFD700')
      .setFooter(interaction.client.embedFooter);

    await interaction.reply({ embeds: [embed] });
  },
};
