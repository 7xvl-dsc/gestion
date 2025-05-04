
const { Client, GatewayIntentBits, Collection, REST, Routes } = require('discord.js');
const fs = require('fs');
const config = require('./config');

const client = new Client({
  intents: config.intents.map(intent => GatewayIntentBits[intent])
});

// Configuration globale des embeds
client.embedFooter = config.embedFooter;
client.embedFooter.iconURL = client.user?.avatarURL() || null;

client.commands = new Collection();
const commands = [];
const loadCommands = (dir) => {
  const commands = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = `${dir}/${file}`;
    if (fs.statSync(filePath).isDirectory()) {
      commands.push(...loadCommands(filePath));
    } else if (file.endsWith('.js')) {
      commands.push(require(filePath));
    }
  }
  return commands;
};

const commandFiles = loadCommands(config.commandsDir);

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(config.token);

const eventsPath = config.eventsDir;
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const event = require(`${eventsPath}/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.once('ready', async () => {
  try {
    console.log('Actualisation des commandes slash...');
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands },
    );
    console.log('Commandes slash actualisées !');
  } catch (error) {
    console.error(error);
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ 
      content: 'Une erreur s\'est produite lors de l\'exécution de la commande.', 
      ephemeral: true 
    });
  }
});

// Support du token via variable d'environnement pour Pterodactyl
const TOKEN = process.env.TOKEN || config.token;
client.login(TOKEN);
