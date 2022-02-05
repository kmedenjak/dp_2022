const express = require('express')
const chat = express()
const http = require('http')
const port = process.env.PORT || 8080;
const fs = require('fs')
const putanja = require('path')

const server = http.createServer({
    /*key: fs.readFileSync(putanja.join(__dirname, 'certifikat', 'kljuc.pem')),
    cert: fs.readFileSync(putanja.join(__dirname, 'certifikat', 'Certifikat.pem'))*/
},chat)


const { Server } = require("socket.io");
const ioSocket = new Server(server);

chat.get('/', (zahtjev, odgovorServer) => {  
    fs.readFile('index.html', function(greska, data){
        if(greska){
            odgovorServer.write('Greška: Datoteka nije pronađena!')
        }
        else{
            odgovorServer.write(data)
        }
        odgovorServer.end()
    })
})

chat.get('/obrasci/', (zahtjev, odgovorServer) => {  
    fs.readFile(putanja.join(__dirname, 'obrasci', 'obrazac.html'), function(greska, data){
        if(greska){
            odgovorServer.write('Greška: Datoteka nije pronađena!')
        }
        else{
            odgovorServer.write(data)
        }
        odgovorServer.end()
    })
})

ioSocket.on('connection', (socket) => 
{  
    socket.on('chat message', (poruka, korisnik) => 
    {    
        ioSocket.emit('chat message', poruka, korisnik);  
    });
})
server.listen(port, function(greska)
{
    if(greska)
    {
        console.log('nije oke', greska)
    }
    else
    {
        console.log('ok je ' + port)
    }
})

