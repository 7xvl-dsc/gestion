
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Affiche la latence du bot'),

  async execute(interaction) {
    const sent = await interaction.reply({ content: 'Calcul en cours...', fetchReply: true });
    const latence = sent.createdTimestamp - interaction.createdTimestamp;
    
    await interaction.editReply(`Latence: ${latence}ms\nLatence API: ${interaction.client.ws.ping}ms`);
  },
};
