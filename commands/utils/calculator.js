
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('calculator')
    .setDescription('Effectue un calcul')
    .addStringOption(option =>
      option.setName('expression')
        .setDescription('L\'expression à calculer')
        .setRequired(true)),

  async execute(interaction) {
    const expr = interaction.options.getString('expression');
    try {
      const result = eval(expr.replace(/[^0-9+\-*/().]/g, ''));
      await interaction.reply(`Résultat: ${result}`);
    } catch (error) {
      await interaction.reply('Expression invalide');
    }
  }
};
