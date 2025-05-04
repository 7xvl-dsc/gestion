
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Supprimer des messages')
    .addIntegerOption(option =>
      option.setName('nombre')
        .setDescription('Nombre de messages à supprimer')
        .setRequired(true)),

  async execute(interaction) {
    if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
      return interaction.reply('Vous n\'avez pas la permission d\'utiliser cette commande.');
    }

    const amount = interaction.options.getInteger('nombre');
    
    try {
      await interaction.channel.bulkDelete(amount);
      await interaction.reply({ content: `${amount} messages ont été supprimés.`, ephemeral: true });
    } catch (error) {
      await interaction.reply('Impossible de supprimer les messages.');
    }
  },
};
