const discord = require("discord.js");
const randomColor = require('randomcolor');
const randomanime = require("random-anime");
const fs = require("fs").promises;

const bot = new discord.Client();

const prefix = "]"
var count;

bot.on('ready', () =>{
    console.log('Loaded Amista')
    let guildsize = bot.guilds.cache.size;
    console.log("Current Guild Amount: "+guildsize)
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: `anime | .help | [${guildsize}]`,
            type: 'WATCHING',
            url: 'https://twitch.tv/1iq_'
        }
    }).then(
        console.log("Set Presence")
    );
    count = 0;
});

bot.on('message', message => {
    if (!message.content.startsWith(prefix)){
        if(message.author.bot) return;
        if(message.channel.type == "dm"){
            console.log(`${message.author.tag}: ${message}`)
        }
        if (message.content.includes("prefix")){
            message.reply(`The current prefix is legit anything your heart desires at this point. I have no control over this prefix anymore`);
        }
        if(message.content.includes("love me") || message.content.includes("lub me") || message.content.includes("luv me")){
            const emoji = bot.emojis.cache.get("796178211364667444");
            message.channel.send(`${emoji}`)
        }
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if(command == "slowmode"){
        var embed = new discord.MessageEmbed();
        var color = randomColor();
        embed.setFooter("Hope you enjoy :3")
        embed.setTimestamp();
        embed.setColor(color);
        embed.setTitle(`Slowmode for ${message.channel.name}`);
        if(!message.member.hasPermission("MANAGE_CHANNELS")){
            return;
        }
        if(!args.length){
            embed.setDescription("Slowmode Time: `5 Seconds`")
            message.channel.setRateLimitPerUser(5, "Default Slowmode")
            message.channel.send(embed)
            return;
        }
        if(args[0] == "off"){
            embed.setDescription("**SLOWMODE DISABLED FOR THIS CHANNEL**")
            message.channel.setRateLimitPerUser(0, "Slowmode")
            message.channel.send(embed)
            return
        }
        if(args[0] == "0") {
            embed.setDescription("Must be over 0");
            message.channel.send(embed)
            return;
        }
        embed.setDescription("Slowmode Time: `"+args[0]+" Seconds`")
        message.channel.setRateLimitPerUser(args[0], "Slowmode")
        message.channel.send(embed)

        
    }

    if (message.content.startsWith("-!eval")) {
        if(!message.author.id === "353884565674393602") return;
        var result = message.content.split(" ").slice(1).join(" ")
        let evaled = eval(result);
        message.channel.send(evaled)
        message.channel.send("Code: "+result)
    }
    if(command == "gn" || command == "goodnight" || command == "night"){
        var color = randomColor();
        let gnemb = new discord.MessageEmbed();

        gnemb.setDescription("🥱 Good Night!");
        gnemb.setColor(color);
        message.channel.send(gnemb);
    }
    if(command == "anime"){
        count++;
        var color = randomColor();
        const anime = randomanime.anime();
        let animemb = new discord.MessageEmbed();
        animemb.setImage(anime);
        animemb.setColor(color);
        animemb.setFooter(`Powered by weeb.sh • .anime has been used ${count} times since last restart.`);
        message.channel.send(animemb);
        if(message.channel.type == "dm"){
            console.log(`${anime}`)
        } else {
            console.log(`${message.author.tag} sent .anime and recieved URL:`)
            console.log(`${anime}`)
            console.log(`ID: ${message.channel.id}`)
        }
        
    }
    if(command == "ha"){
        if(!message.author.id === "353884565674393602") return;
        message.delete();
        message.channel.startTyping();
        setTimeout(() =>{
            message.channel.stopTyping();
            message.channel.send("ha");
        }, 15000);
    }
    if(command == "hahaha"){
        if(!message.author.id === "353884565674393602") return;
        message.delete();
        message.channel.startTyping();
        setTimeout(() =>{
            message.channel.stopTyping();
            message.channel.send("ha");
        }, 3000000);
    }
    if(command == "help"){
        var color = randomColor();
        const emoji = bot.emojis.cache.get("795409756138242098");
        let avatar = bot.user.displayAvatarURL({size: 1024});

        message.react(emoji);

        const embhelp = new discord.MessageEmbed();

        embhelp.setAuthor("Help");
        embhelp.addField("Commands", "help\nslowmode\ngn, goodnight, night\nanime", true);
        embhelp.addField("Moderation", "kick\nban", true)
        embhelp.addField("Extra Help?", "DM <@353884565674393602> for more info!")
        embhelp.setColor(color);
        embhelp.setFooter("Hope you enjoy :3");
        embhelp.setThumbnail(avatar);
        embhelp.setTimestamp();
        message.author.send(embhelp);
    }
    if(command === "avatar"){
        let member = message.mentions.users.first() || message.author;
        var color = randomColor();
        let avatar = member.displayAvatarURL({size: 1024});

        const embed = new discord.MessageEmbed()
        embed.setAuthor("Avatar of "+member.username);
        embed.setColor(color);
        embed.setFooter("Hope you enjoy :3");
        embed.setTimestamp();
        embed.setImage(avatar);
        message.channel.send(embed);

    }
    if(command === "kick"){
        if(message.channel.type == "dm") return;
        const taggedUser = message.mentions.users.first();
        var kickuser;
        var color = randomColor();

        if(!message.member.hasPermission("KICK_MEMBERS") || !message.member.hasPermission("MANAGE_MESSAGES")){
            message.channel.send(`Helo you do not has permission, big sad. ${bot.emojis.cache.get('795499065017892874')}`);
            return;
        }

        if (!message.mentions.users.size) {
            return message.reply('you need to tag a user in order to kick them!');
        }


        kickuser = message.guild.member(taggedUser)

        const embed = new discord.MessageEmbed()
        embed.setDescription("rip <@"+kickuser.id+">, he got kicked :(");
        embed.setColor(color);
        embed.setFooter("Hope you enjoy :3");
        embed.setTimestamp();
        if(!kickuser.kickable){
            message.channel.send(`Helo you do not has permission, big sad. ${bot.emojis.cache.get('795499065017892874')}`);
            return;
        } else {
            kickuser.kick("Boo")
        }
        message.channel.send(embed);
        
    }
    if(command === "ban"){
        if(message.channel.type == "dm") return;
        let member = message.guild.member(message.mentions.users.first());
        var color = randomColor();
        if(!message.member.hasPermission("BAN_MEMBERS")) {
            message.channel.send("no.")
            return;
        }
        if(member){
            const embed = new discord.MessageEmbed()
            embed.setDescription("rip <@"+member.id+">, he got banend :(");
            embed.setColor(color);
            embed.setFooter("Hope you enjoy :3");
            embed.setTimestamp();
            member.ban({reason: "Banned"});
            message.channel.send(embed);
        } else {
            message.channel.send(`how do i ban soemone who is non-existant? ${bot.emojis.cache.get('795499065017892874')}`);
        }
        
    }
    if(command === "status"){
        var color = randomColor();
        if(message.author.id != "353884565674393602"){
            message.channel.send("no");
            return;
        }
        var search = args.slice(0).join(" ");
        let guildsize = bot.guilds.cache.size;
        bot.user.setPresence({
        status: 'online',
        activity: {
            name: `${search} | [${guildsize}]`,
            type: 'WATCHING',
            url: 'https://twitch.tv/1iq_'
        }
        

    });
            const embed = new discord.MessageEmbed()
            embed.setAuthor("Changed Status", message.author.avatarURL)
            embed.setDescription("Changed to: "+search);
            embed.setColor(color);
            embed.setFooter("Hope you enjoy :3");
            embed.setTimestamp();
            message.channel.send(embed);

    }
    if(command === "sendtoall"){
            if (message.author.id === "353884565674393602") {
              try {
                let toSay = "Hey everyone. I added a patch to the ban issue. I'm working on some new things right now. If you have any ideas, DM me @ <@353884565674393602> (Sorry for any repeats or spam. is activated so I can't really do anything.)"
                bot.guilds.map((guild) => {
                  let found = 0
                  guild.channels.map((c) => {
                    if (found === 0) {
                      if (c.type === "text") {
                        if (c.permissionsFor(this.client.user).has("VIEW_CHANNEL") === true) {
                          if (c.permissionsFor(this.client.user).has("SEND_MESSAGES") === true) {
                            c.send(toSay);
                            found = 1;
                          }
                        }
                      }
                    }
                  });
                });
              }
              catch (err) {
                console.log("Could not send message to a (few) guild(s)!");
                console.log(err);
              }
            } else {
              message.reply("You cant do that!")
          }
    }

    if(command === "testjoin"){
        var member = message.author;
        var color = randomColor();
        var embed = new discord.MessageEmbed()
        .setTimestamp()
        .setAuthor("Welcome", message.channel.guild)
        .setDescription(`Welcome to ${member.guild.name}!`)
        .addField(`Amista Help`, `Run the .help command to get more help!`, true)
        .addField(`Server Help`, `If you need any help, please message the moderators or admins of the specific server.`, true)
        .setColor(color)
        .setFooter("Hope you enjoy :3");
        if(!member.id === "353884565674393602"){
            message.reply("no.")
            return;
        }
        member.send(embed);
        
    }
    if(command === "dmsomeone"){
        var member;
        bot.users.fetch('')
        var search;
        if(!args.length){
           return; 
        } else if (message.author.id == ""){
            member = bot.users.fetch(args[0])
            search = args.slice(1).join(" ");
            member.send(search)
            message.author.send("Sent stuff to ppl lol")
        }
    }
    if(command === "ping"){
        var color = randomColor();
        let avatar = bot.user.displayAvatarURL({size: 1024});
        

        const embping = new discord.MessageEmbed();

        embping.setAuthor(`Ping for ${bot.user.username}`);
        embping.addField("Bot API", `${Date.now() - message.createdTimestamp}ms`, true);
        embping.addField("Discord API", `${Math.round(bot.ws.ping)}ms`, true);
        embping.setColor(color);
        embping.setFooter("Hope you enjoy :3");
        embping.setThumbnail(avatar);
        embping.setTimestamp();
        message.author.send(embping);
    }
  });

bot.on("guildCreate", guild => {
    let guildsize = bot.guilds.cache.size;
    console.log("Current Guild Amount: "+guildsize)
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: `anime | .help | [${guildsize}]`,
            type: 'WATCHING',
            url: 'https://twitch.tv/1iq_'
        }
    }).then(
        console.log("Joined discord " + guild.name + " | Invite: " + guild.fetchInvites.toString)
    );
});

bot.on('guildMemberAdd', member => {
    var color = randomColor();
    var embed = new discord.MessageEmbed()
    .setTimestamp()
    .setAuthor("Welcome", member.guild.iconURL)
    .setDescription(`Welcome to ${member.guild.name}!`)
    .addField(`Amista Help`, `Run the .help command to get more help!`, true)
    .addField(`Server Help`, `If you need any help, please message the moderators or admins of the specific server.`, true)
    .setColor(color)
    .setFooter("Hope you enjoy :3");
    member.send(embed);
    
});



bot.login("NDE4NTM2NzM3OTQ2NDY4MzYz.Wpcutg.vWwnky3StSaoZyPfPcLJ8h_E5Q0") // I reset the token so ha