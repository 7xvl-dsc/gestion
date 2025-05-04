
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('role')
    .setDescription('Ajouter ou retirer un rôle')
    .addUserOption(option =>
      option.setName('utilisateur')
        .setDescription('L\'utilisateur à modifier')
        .setRequired(true))
    .addRoleOption(option =>
      option.setName('role')
        .setDescription('Le rôle à ajouter/retirer')
        .setRequired(true))
    .addBooleanOption(option =>
      option.setName('ajouter')
        .setDescription('true pour ajouter, false pour retirer')
        .setRequired(true)),

  async execute(interaction) {
    if (!interaction.member.permissions.has('MANAGE_ROLES')) {
      return interaction.reply('Vous n\'avez pas la permission d\'utiliser cette commande.');
    }

    const member = interaction.options.getMember('utilisateur');
    const role = interaction.options.getRole('role');
    const add = interaction.options.getBoolean('ajouter');
    
    try {
      if (add) {
        await member.roles.add(role);
        await interaction.reply(`Le rôle ${role.name} a été ajouté à ${member.user.tag}`);
      } else {
        await member.roles.remove(role);
        await interaction.reply(`Le rôle ${role.name} a été retiré de ${member.user.tag}`);
      }
    } catch (error) {
      await interaction.reply('Impossible de modifier les rôles de ce membre.');
    }
  },
};
