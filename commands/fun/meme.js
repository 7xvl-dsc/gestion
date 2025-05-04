
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('Génère un meme aléatoire'),

  async execute(interaction) {
    // Simulation d'une API de memes
    const memes = [
      {title: 'Meme 1', url: 'https://example.com/meme1.jpg'},
      {title: 'Meme 2', url: 'https://example.com/meme2.jpg'}
    ];
    
    const meme = memes[Math.floor(Math.random() * memes.length)];
    
    const embed = new EmbedBuilder()
      .setTitle(meme.title)
      .setImage(meme.url)
      .setColor('#FF5733')
      .setFooter(interaction.client.embedFooter);

    await interaction.reply({ embeds: [embed] });
  }
};
