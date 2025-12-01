import { Client, GatewayIntentBits } from 'discord.js';
import { joinVoiceChannel, createAudioPlayer, createAudioResource } from '@discordjs/voice';
import 'dotenv/config';

const TOKEN = process.env.TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.once("ready", () => {
  console.log(`Bot aktif: ${client.user.tag}`);
  connectToVoice();
});

function connectToVoice() {
  const connection = joinVoiceChannel({
    channelId: CHANNEL_ID,
    guildId: GUILD_ID,
    adapterCreator: client.guilds.cache.get(GUILD_ID).voiceAdapterCreator
  });

  // Sessiz ses çalmak için
  const player = createAudioPlayer();
  const resource = createAudioResource("silence.mp3");
  player.play(resource);
  connection.subscribe(player);

  console.log("AFK olarak ses kanalına bağlandı.");
}

client.login(TOKEN);
