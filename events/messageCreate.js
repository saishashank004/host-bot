const config = require("../config.json")
const wait = require('node:timers/promises').setTimeout;
module.exports = async (client, message) => {
    if(config.settings.commandChannelOnly){
        if(message.author?.bot) return
        //if(message.channel.type == "DM") return client.channels.cache.get(config.logs.dms).send(`${message.author.tag} (${message.author.id}): ${message.content}`)
        if(!message.channel.id === config.channelID.botCommands) {
            message.reply(error + ` Bot Commands can only be used in the commands channel.`)
            return;
        }
        if(message.author.id === '517107022399799331' && message.content.toLowerCase().startsWith('eval')) return client.commands.get('eval').run(client, message, message.content.split(/ +/))
        
        if(message.channel.id === config.channelID.suggestions && !message.content.startsWith('>')){
            message.react('👍')
            await wait(500)
            message.react('👎')
            return 
        }
        
        // suggested by astrexx
        if(message.mentions.members.size > 4) 
        {
            message.delete();
            message.guild.members.kick(message.author.id);
            message.channel.send(`${message.author.tag} has been kicked for spamming mentions.`);
        }
        
        if(config.settings.maintenance === true && !message.member.roles.cache.has(config.roleID.administrator)) return
        if(!message.content.toLowerCase().startsWith(config.bot.prefix) || message.author.bot) return;
        if(message.content.length <= config.bot.prefix.length) return 
        
        const args = message.content.slice(config.bot.prefix.length).split(/ +/);
        const cmd = args.shift().toLowerCase();
        const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
        try{
            if(cmd === 'user'){
                try{
                    if(!args[0]) return require('../commands/user/help.js')(client, message, args)
                    await console.log(`[#${message.channel.name}]  ${message.author.tag} (${message.author.id}): ${message?.content}`)
                    require(`../commands/user/${args[0]}.js`)(client, message, args)
                }catch(err){console.log(err).toString()}
                return
            }else if(cmd === 'server'){
                try{
                    if(!args[0]) return require('../commands/server/help.js')(client, message, args)
                    await console.log(`[#${message.channel.name}]  ${message.author.tag} (${message.author.id}): ${message?.content}`)
                    require(`../commands/server/${args[0]}.js`)(client, message, args)
                }catch(err){console.log(err).toString()}
                return
            }else if(cmd === 'staff'){
                if(!message.member.roles.cache.has(config.roleID.support)) return
                try{
                    if(!args[0]) return require('../commands/staff/help.js')(client, message, args)
                    await console.log(`[#${message.channel.name}]  ${message.author.tag} (${message.author.id}): ${message?.content}`)
                    require(`../commands/staff/${args[0]}.js`)(client, message, args)
                }catch(err){console.log(err).toString()}
                return
            }else if(cmd === 'music'){
                try{
                    if(!args[0]) return require('../commands/music/help.js')(client, message, args)
                    await console.log(`[#${message.channel.name}]  ${message.author.tag} (${message.author.id}): ${message?.content}`)
                    require(`../commands/music/${args[0]}.js`)(client, message, args)
                }catch(err){console.log(err).toString()}
                return
            }
            
            
            if(!command) return
            await console.log(`[#${message.channel.name}]  ${message.author.tag} (${message.author.id}): ${message?.content}`)
            command.run(client, message, args)
            if(config.settings.messageLog){
                const embed = new Discord.MessageEmbed()
                embed.setTitle('🤖 Used Command')
                embed.setColor(`BLUE`)
                embed.addField(`Command Channel:`, `<#${message.channel.name}>`)
                embed.addField(`Command User:`, `${message.author.tag} (${message.author.id})`)
                embed.addField(`Command Used:`, `${message?.content}`)
            };
        }catch(err){}
        } else {
            if(message.author?.bot) return
            //if(message.channel.type == "DM") return client.channels.cache.get(config.logs.dms).send(`${message.author.tag} (${message.author.id}): ${message.content}`)
            
            if(message.author.id === '517107022399799331' && message.content.toLowerCase().startsWith('eval')) return client.commands.get('eval').run(client, message, message.content.split(/ +/))
            
    if(message.channel.id === config.channelID.suggestions && !message.content.startsWith('>')){
        message.react('👍')
        await wait(500)
        message.react('👎')
        return 
    }

    // suggested by astrexx
    if(message.mentions.members.size > 4) 
    {
        message.delete();
        message.guild.members.kick(message.author.id);
        message.channel.send(`${message.author.tag} has been kicked for spamming mentions.`);
    }

    if(config.settings.maintenance === true && !message.member.roles.cache.has(config.roleID.administrator)) return
    if(!message.content.toLowerCase().startsWith(config.bot.prefix) || message.author.bot) return;
    if(message.content.length <= config.bot.prefix.length) return 

    const args = message.content.slice(config.bot.prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
    try{
        if(cmd === 'user'){
            try{
                if(!args[0]) return require('../commands/user/help.js')(client, message, args)
                await console.log(`[#${message.channel.name}]  ${message.author.tag} (${message.author.id}): ${message?.content}`)
                require(`../commands/user/${args[0]}.js`)(client, message, args)
            }catch(err){console.log(err).toString()}
            return
        }else if(cmd === 'server'){
            try{
                if(!args[0]) return require('../commands/server/help.js')(client, message, args)
                await console.log(`[#${message.channel.name}]  ${message.author.tag} (${message.author.id}): ${message?.content}`)
                require(`../commands/server/${args[0]}.js`)(client, message, args)
            }catch(err){console.log(err).toString()}
            return
        }else if(cmd === 'staff'){
            if(!message.member.roles.cache.has(config.roleID.support)) return
            try{
                if(!args[0]) return require('../commands/staff/help.js')(client, message, args)
                await console.log(`[#${message.channel.name}]  ${message.author.tag} (${message.author.id}): ${message?.content}`)
                require(`../commands/staff/${args[0]}.js`)(client, message, args)
            }catch(err){console.log(err).toString()}
            return
        }else if(cmd === 'music'){
            try{
                if(!args[0]) return require('../commands/music/help.js')(client, message, args)
                await console.log(`[#${message.channel.name}]  ${message.author.tag} (${message.author.id}): ${message?.content}`)
                require(`../commands/music/${args[0]}.js`)(client, message, args)
            }catch(err){console.log(err).toString()}
            return
        }


        if(!command) return
        await console.log(`[#${message.channel.name}]  ${message.author.tag} (${message.author.id}): ${message?.content}`)
        command.run(client, message, args)
        if(config.settings.messageLog){
            const embed = new Discord.MessageEmbed()
            embed.setTitle('🤖 Used Command')
            embed.setColor(`BLUE`)
            embed.addField(`Command Channel:`, `<#${message.channel.name}>`)
            embed.addField(`Command User:`, `${message.author.tag} (${message.author.id})`)
            embed.addField(`Command Used:`, `${message?.content}`)
        };
    }catch(err){}
    }
}
