const Discord = require("discord.js");
const Register = require('../../models/Register.js');

exports.run = async (client, message, args) => {

  
  if (!message.member.hasPermission("ADMINISTRATOR") && !global.Perm.Register.Auth_Roles.some(e => message.member.roles.cache.has(e))) return;


  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  
  let registerData = await Register.findOne({ guildId: message.guild.id, userId: user.id });
  let embed = new Discord.MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }));

  if(!registerData) {
    let newRegisterData = new Register({
      guildId: message.guild.id,
      userId: user.id,
      totalRegister: 0,
      womanRegister: 0,
      manRegister: 0,
      userNames: []
    }).save().then(x => {
      return message.channel.send(embed.setDescription(`${user} Adlı üyenin ${x.userNames.length} isim kayıtı bulundu. \n\n${x.userNames.map(x => `\`• ${x.nick}\` (${x.type.replace(`Erkek`, `${settins.erkekRolleri[0]}`).replace(`Kız`, `${settins.kızRolleri[0]}`)})`)}`))
    });
  } else {
    message.channel.send(embed.setDescription(`${user} Adlı üyenin ${registerData.userNames.length} isim kayıtı bulundu. \n\n${registerData.userNames.map(x => `\`• ${x.nick}\` (${x.type.replace(`Erkek`, `<@&${global.Perm.Register.Man[0]}>`).replace(`Kız`, `<@&${global.Perm.Register.Woman[0]}>`)})`).join("\n ")}`))
  }
  
};

  exports.conf = {
  commands: ["names", "nicks","isimler"],
  enabled: true,
  usage: "isimler <@etiket/ID/İsteğeBağlı>"
};