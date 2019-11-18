const Discord = require("discord.js");
const  client = new Discord.Client();
const config = require("./config.json");
const ytdl = require('ytdl-core');
const streamOptions = { seek : 0, volume : 1}
const queue = new Map();
client.on("ready", () => {
    console.log("Estoy listo!");
    
    client.user.setPresence( {
        status: "online",
        game: {
            name: "MeoOow!!",
            url: "https://www.twitch.tv/sr_gato_mctaco",
            type: "STREAMING"
        }
    } );
 
 });




var prefix = config.prefix;
var hora = Date();

client.on("message", (message) => {


if (message.author.bot) return;
//MENSAJE HOLA BOT RESPONDE
if (message.content.startsWith("hola")) {

    const rando_pala=[
        'Hola Como estas',
        'Wenas Criaturitas del Señoh',
        'Como Andas prro',
        'Good Day m8',
        'Wen aas',
        'Hi There :AYAYA:',
        
    ]
    message.channel.send(`${message.author} ` + rando_pala[Math.floor(Math.random() * rando_pala.length)]
    )
    

    message.channel.send();
  }





//EVITAR CONFLICTOS CON OTROS BOTS
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot) return;



//MENSAJE DE CREADOR
    if(message.content.startsWith(prefix + "creador")){
        message.channel.send({embed: {
            color: 322462,
            description: "Creado por : **@-Sr.Gato_McTaco-#0293**",
            timestamp: new Date(),
            
            footer: {
                icon_url: client.user.avatarURL,
                text: "KuroNeko Programado en .js"
                
              }
          }});
     
    } else


    //BOT DICE LA HORA "USANDO UN EMBED"
    if(message.content.startsWith(prefix + "hoy")){
        message.channel.send({embed: {
            color: 322462,
            description: hora,
            timestamp: new Date(),
            footer: {
                icon_url: client.user.avatarURL,
                text: "KuroNeko"
              }
          }});
    }
    //CODIGO PARA HACER UN SIMPLE EMBED 
    /*
    if (message.content.startsWith(prefix +"embed")){
        message.channel.send({embed: {
          color: 3447003,
          description: "Esto es un simple mensaje embed."
        }});
    }
    */



    //Usando el metodo RichEmbed
   if (message.content.startsWith(prefix +"richembed" )){
    const embed = new Discord.RichEmbed() 
    .setTitle("Este es su título, puede contener 256 caracteres")
    .setAuthor(message.author.username, message.author.avatarURL)
    .setColor(0x00AE86)
    .setDescription("Este es el cuerpo principal del texto, puede contener 2048 caracteres.")
    .setFooter("Pie de página, puede contener 2048 caracteres", client.user.avatarURL)
    .setImage(message.author.avatarURL)
    .setThumbnail(message.author.avatarURL)
    .setTimestamp()
    .setURL("https://github.com/CraterMaik")
    .addField("Este es un título de campo, puede contener 256 caracteres",
      "Este es un valor de campo, puede contener 2048 caracteres.")
    .addField("Campo en línea", "Debajo del campo en línea", true)
    .addBlankField(true)
    .addField("Campo en línea 3", "Puede tener un máximo de 25 campos.", true);
    
    message.channel.send({embed});
}

//ATAJOS PARA HACER MAS SIMPLE EL CODIGO DE LOS COMANDOS PREFIX
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();


//HACER QUE REPITA LO QUE DIGO
 let texto = args.join(" ");
if(command === 'decir'){

  
   
    if(!texto) return message.channel.send(`Escriba un contenido pára decir.`);

    message.channel.send(texto);
}



//EL GATO DE LA SUERTE
    if(command === 'gato'){
        var rpts = ["Sí", "No", "¿Por qué?", "Por favor", "Tal vez", "No sé", "Definitivamente?", " ¡Claro! "," Sí "," No "," Por supuesto! "," Por supuesto que no "];
        if (!texto)
         return message.reply   (`Hasme una pregunta prro >:c .`);
        message.channel.send('**'+message.author.username+' Mi respuesta : **'+rpts[Math.floor(Math.random() * rpts.length)]+'.');
    
    }


    //MUESTRA EL AVATAR DE TU PERFIL
    if(command === 'avatar'){
        let img = message.mentions.users.first()
        if (!img) { 
            const embed = new Discord.RichEmbed()
            .setImage(`${message.author.avatarURL}`)
            .setColor(0x66b3ff)
            .setFooter(`Avatar de ${message.author.username}#${message.author.discriminator}`);
            message.channel.send({ embed }); 
        } else if (img.avatarURL === null) {
            message.channel.sendMessage("El usuario ("+ img.username +") no tiene avatar!");
        } else {
            const embed = new Discord.RichEmbed()
            .setImage(`${img.avatarURL}`)
            .setColor(0x66b3ff)
            .setFooter(`Avatar de ${img.username}#${img.discriminator}`);
            message.channel.send({ embed }); 
        }; 
    }

//MUESTRA DATOS DEL USUARIO MENSIONADO O DE SI MISMO
if(command === 'user'){
    let userm = message.mentions.users.first()
    if(!userm){
      var user = message.author;
      
        const embed = new Discord.RichEmbed()
        .setThumbnail(user.avatarURL)
        .setAuthor(user.username+'#'+user.discriminator, user.avatarURL)
        .addField('Jugando a', user.presence.game != null ? user.presence.game.name : "Nada", true)
        .addField('ID', user.id, true)
        .addField('Estado', user.presence.status, true)
        .addField('Apodo', message.member.nickname, true)
        .addField('Cuenta Creada', user.createdAt.toDateString(), true)
        .addField('Fecha de Ingreso', message.member.joinedAt.toDateString())
        .addField('Roles', message.member.roles.map(roles => `\`${roles.name}\``).join(', '))
        .setColor(0x66b3ff)
        
       message.channel.send({ embed });
    }else{
      const embed = new Discord.RichEmbed()
      .setThumbnail(userm.avatarURL)
      .setAuthor(userm.username+'#'+userm.discriminator, userm.avatarURL)
      .addField('Jugando a', userm.presence.game != null ? userm.presence.game.name : "Nada", true)
      .addField('ID', userm.id, true)
      .addField('Estado', userm.presence.status, true)
      .addField('Cuenta Creada', userm.createdAt.toDateString(), true)
      .setColor(0x66b3ff)
      
     message.channel.send({ embed });
    }
    
  }



    //COMANDO QUE MUESTRA TODA LA IMFORMACION DEL SERVIDOR
    if(command === 'server'){

        var server = message.guild;
      
        const embed = new Discord.RichEmbed()
        .setThumbnail(server.iconURL)
        .setAuthor(server.name, server.iconURL)
        .addField('ID', server.id, true)
        .addField('Region', server.region, true)
        .addField('Bot Join in', server.joinedAt.toDateString(), true)
        .addField('Dueño del Servidor', server.owner.user.username+'#'+server.owner.user.discriminator+' ('+server.owner.user.id +')', true)
        .addField('Miembros', server.memberCount, true)
        .addField('Roles', server.roles.size, true)
        .setColor(0xFF9900)
        
       message.channel.send({ embed });
    
      }



      //LATENCIA DEL SERVIOR
      if (command === 'ping') {

        let ping = Math.floor(message.client.ping);
        
        message.channel.send(":ping_pong: Pong!")
          .then(m => {
    
              m.edit(`:incoming_envelope: Ping Mensajes: \`${Math.floor(m.createdTimestamp - Date.now())} ms\`\n:satellite_orbital: Ping DiscordAPI: \`${ping} ms\``);
          
          });
        
      }


//BOT MUSICAL CODE



//EVENTO DE INGRESO AL CHAT DE VOZ JOIN
if (command === 'join') { 
    let Canalvoz = message.member.voiceChannel;
    if (!Canalvoz || Canalvoz.type !== 'voice') {
    message.channel.send('¡Necesitas unirte a un canal de voz primero!.').catch(error => message.channel.send(error));
    } else if (message.guild.voiceConnection) {
    message.channel.send('Ya estoy conectado en un canal de voz.');
    } else {
     message.channel.send('Conectando...').then(m => {
          Canalvoz.join().then(() => {
               m.edit(':white_check_mark: | Conectado exitosamente.').catch(error => message.channel.send(error));
         }).catch(error => message.channel.send(error));
     }).catch(error => message.channel.send(error));
    }
}

//SIGUE QUE EL BOT SE RETIRE DEL CHAT DE VOZ EVENTO DE SALIDA DEL BOT

if (command === 'leave') { 
    let Canalvoz = message.member.voiceChannel;
    if (!Canalvoz) {
        message.channel.send('No estoy en un canal de voz.');
    } else {
        message.channel.send('Dejando el canal de voz.').then(() => {
        Canalvoz.leave();
        }).catch(error => message.channel.send(error));
    }   
}






//SIGUIENTE REPRODUCIR MUSICA EN EL BOT CON LINKS DE YT 


 /*if (command === 'play') {
   
    
    
    let voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
    if(!args) return message.channel.send('Ingrese un enlace de youtube para poder reproducirlo.');
    voiceChannel.join()
      .then(connection => {

        const stream = ytdl(args.join(), {filter : 'audioonly'});
        const dispatcher = connection.playStream(stream, streamOptions);
    
     
        const song = ytdl.getInfo(stream);
        const embed = new Discord.RichEmbed()     
        .setTitle('Reproduciendo Ahora :musical_note:')
            .setDescription(song)
            .setThumbnail(song)
        .setColor(0x00AE86)        
        message.channel.send({embed});   
        
      message.channel.send({embed:{
            color: 4664000,
           
           description: (`:musical_note: Playing Now: ` + args)
        }
        }) 
     message.delete();     
      })
      .catch(console.error);
  } */

  
  //PRUEBA 2
  


 /* if (command === 'radio') {
    let voiceChannel = message.member.voiceChannel;
    if(!voiceChannel) return message.channel.send();
        voiceChannel.join().then(conexion =>{
        conexion.playStream('');
        message.channel.send('Radio electro activado.')
        return;
      })
      .catch(console.error);
  }
*/

//COMANDO SIMPLE ABRASOS $HUG LO MISMO CON CUALQUIER OTRO COMANDO DE INTERACCION 

if(command === 'hug') {
    
    const rando_imgs = [
        'https://66.media.tumblr.com/5541ac10ee55974f882d9d437a3cc2d1/tumblr_nz0jt3jM421sbzv20o1_500.gif',

        'https://i.giphy.com/CZpro4AZHs436.gif',

        'https://media.giphy.com/media/3og0ILx8f9adnoQRos/giphy.gif',

        'https://media0.giphy.com/media/C4gbG94zAjyYE/giphy.gif?cid=790b7611bf85360219c208c23106393977d8a85de2c87b08&rid=giphy.gif',

        'https://media.giphy.com/media/wSY4wcrHnB0CA/giphy.gif',

        'https://media.giphy.com/media/PS14vDjffoOI0/giphy.gif',

        'http://giphygifs.s3.amazonaws.com/media/3bqtLDeiDtwhq/giphy.gif',
        
        'https://media.giphy.com/media/u9BxQbM5bxvwY/giphy.gif',
        
        ]
    
        let member = message.mentions.members.first()
   /* let miembro = message.text;
        if (!miembro)
         return message.reply(`mensiona a alguien`); */

        const embed = new Discord.RichEmbed() 
        .setDescription(`**${message.author.username}** le ha dado un abrazo a ${member} ;3!`)
      
        .setColor(0x4EE70B)
        
        .setImage(rando_imgs[Math.floor(Math.random() * rando_imgs.length)])
         
        message.channel.send({embed});
    

/*        message.channel.send(`${message.author} le ha dado un abrazo a ${member} ;3!`, {
            file: rando_imgs[Math.floor(Math.random() * rando_imgs.length)]

           
        });*/
   
        

}



//PRUEBA DE RICHEMBEM
 /* if(command === 'teste'){ 
    
    
    const embed = new Discord.RichEmbed() 
    .setTitle(`${message.author} le ha dado un abrazo a ${member} ;3!`)
  
    .setColor(0x00AE86)
    
    .setImage(rando_imgs[Math.floor(Math.random() * rando_imgs.length)])
     
    message.channel.send({embed});

}
*/       


if(command === 'slap'){
    const rando_imgs=[
        'https://media.giphy.com/media/Zau0yrl17uzdK/giphy.gif',
        'http://giphygifs.s3.amazonaws.com/media/dpbgZPcUL05Hi/giphy.gif',
        'http://giphygifs.s3.amazonaws.com/media/QNSdi565f9JWU/giphy.gif',
        'http://giphygifs.s3.amazonaws.com/media/dpbgZPcUL05Hi/giphy.gif',
        'https://media.giphy.com/media/gSIz6gGLhguOY/giphy.gif',
        'https://media.giphy.com/media/ryxGBGURsirNC/giphy.gif',
        'https://media.giphy.com/media/hpzxqgsLMWGRO/giphy.gif',

    ]
    let member = message.mentions.members.first()
   
        const embed = new Discord.RichEmbed() 
        .setDescription(`**${message.author.username}** acaba de pichulear a ${member}`)
      
        .setColor(0xCC0000)
        
        .setImage(rando_imgs[Math.floor(Math.random() * rando_imgs.length)])
         
        message.channel.send({embed});


}
   

//TODOS LOS COMANDOS DE MI BOT 
    if(message.content.startsWith(prefix + 'help')){

        message.channel.send('**'+message.member.user+'** Revisa tus mensajes privados.');
        message.author.send('**COMANDOS DE KURONEKO-BOT**\n```\n'+
                            '-> '+prefix+'ping           :: Comprueba la latencia del bot y de tus mensajes.\n'+
                            '-> '+prefix+'avatar <@user> :: Muestra el avatar de un usuario.\n'+
                            '-> '+prefix+'decir          :: Hace que el bot repita tu mensaje anteriormente mencionado.\n'+
                            '-> '+prefix+'user <@user>   :: Muestra información sobre un usuario mencioando.\n'+
                            '-> '+prefix+'server         :: Muestra información de un servidor determinado.\n'+
                            '-> '+prefix+'gato           :: El gatobot respondera a tus preguntas.\n'+
                            '-> '+prefix+'creador        :: Muestra al desarrollador de **KuroNeko-Bot**.\n'+
                            '-> '+prefix+'hola           :: Retorna un saludo como mensaje.\n```\n\n'+
                           

                            '**Y Eso es Todo de mi Bot Hasta Ahora.  **');
        
      }


  });


  client.once('ready', () => {
	console.log('Cliente de Musica Ready!');
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	const serverQueue = queue.get(message.guild.id);

	if (message.content.startsWith(`${prefix}play`)) {
		execute(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${prefix}skip`)) {
        skip(message, serverQueue);
        message.channel.send(':track_next: Siguiente Musica...');
		return;
	} else if (message.content.startsWith(`${prefix}stop`)) {
        stop(message, serverQueue);
        message.channel.send(':no_entry: Retiradaaa')
		return;
    }else if (message.content.startsWith(`${prefix}pause`)){
        pause(message,serverQueue);
        message.channel.send(':pause_button: Musica en Pausa ');
        return;
    }else if(message.content.startsWith(`${prefix}resume`)){
        resume(message,serverQueue);
        message.channel.send(':play_pause: Continuando la reproduccion');
        return;
    }
    
    /*else {
		message.channel.send('You need to enter a valid command!')
	}*/
});

async function execute(message, serverQueue) {
	const args = message.content.split(' ');

	const voiceChannel = message.member.voiceChannel;
	if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
		return message.channel.send('I need the permissions to join and speak in your voice channel!');
	}

 const songInfo = await ytdl.getInfo(args[1]);
	const song = {
		title: songInfo.title,
		url: songInfo.video_url,
	};

	if (!serverQueue) {
		const queueContruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
		};

		queue.set(message.guild.id, queueContruct);

		queueContruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			play(message.guild, queueContruct.songs[0]);
		} catch (err) {
			console.log(err);
			queue.delete(message.guild.id);
			return message.channel.send(err);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		return message.channel.send(`${song.title}`);
	}

}



function resume(message, serverQueue){
    if(!message.member.voiceChannel) return message.channel.send('nesesita estar en una sala de voz')
    serverQueue.connection.dispatcher.resume();
}

function pause(message, serverQueue){
    if(!message.member.voiceChannel) return message.channel.send('nesesitas estar en una sala de voz');
    serverQueue.connection.dispatcher.pause();
}

function skip(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	if (!serverQueue) return message.channel.send('There is no song that I could skip!');
	serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', () => {
			console.log('Music ended!');
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => {
			console.error(error);
		});
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}



/*  '-> '+prefix+'ban <@user>    :: Banear a un usuario del servidor incluye razon.\n'+
  '-> '+prefix+'kick <@user>   :: Patear a un usuario del servidor incluye razon.\n'+
*/

client.login(config.token);       