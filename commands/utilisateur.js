
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('utilisateur')
    .setDescription('Affiche les informations d\'un utilisateur')
    .addUserOption(option =>
      option.setName('membre')
        .setDescription('Le membre dont vous voulez voir les informations')
        .setRequired(true)),

  async execute(interaction) {
    const member = interaction.options.getMember('membre');
    const embed = new EmbedBuilder()
      .setTitle(`Information sur ${member.user.tag}`)
      .setThumbnail(member.user.displayAvatarURL())
      .addFields(
        { name: 'A rejoint le', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true },
        { name: 'Compte créé le', value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`, inline: true },
        { name: 'Rôles', value: member.roles.cache.map(r => r.toString()).join(', ') }
      )
      .setColor(member.displayHexColor)
      .setFooter(interaction.client.embedFooter);

    await interaction.reply({ embeds: [embed] });
  },
};
