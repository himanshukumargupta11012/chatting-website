
const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';
express=require('express')
const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

  const { Server } = require('ws');

  const webServer = new Server({ server });

// const webSocketSv = require("ws")

// const webServer = new webSocketSv.Server({
//     port: 3000
// })

webServer.on('listening', () => {
    console.log("server started")
})

// const clients=new Map();
const client2 = [];

webServer.on("connection", (self) => {
    console.log("connected")


    self.send("hello  server")

    function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }


    self.on('message', (messag) => {
        console.log(messag.toString())
        if (isJson(messag.toString())) {
            let object=JSON.parse(messag.toString())
            sender = JSON.parse(messag.toString()).name
            if (object.name != null) {
                client2.push({
                    name: object.name,
                    id: self
                })
                
                all_names={names:[]}
                client2.forEach((client)=>{
                    all_names.names.push(client.name)
                })
                client2.forEach((client)=>{
                if(client.name!=null)client.id.send(JSON.stringify(all_names))
                })
            }
            else if (object.receiver != null){
                let object = JSON.parse(messag.toString())
                console.log(object)
                client2.forEach((client) => {
                    if(client.id==self)
                     sender=client.name
                })
                client2.forEach((client) => {
                    
                    if (client.name ==object.receiver){
                        client.id.send(sender+ ' : '+object.message)
                    }
                    else if('all'===object.receiver&&client.id!=self){
                        client.id.send(sender+ ' : '+object.message)
                    }
                })
                self.send('you : '+object.message)
            }
        }

        // else {
        //     client2.forEach((client) => {
        //         if (client.name == "aman")
        //             client.id.send('\n', object.name, ':', messag.toString());
        //         console.log(messag.toString())
        //     })
        // }

        // webServer.clients.forEach((client)=>{
        //     if(self==client && client.readyState === webSocketSv.OPEN)
        //     client.send(messag.toString());
        //     console.log(client)

        // webServer.clients.forEach((client)=>{
        //     if(self!=client && client.readyState === webSocketSv.OPEN)
        //     client.send(messag.toString());
        //     console.log(client)

        //  });
    })

    self.on("close", () => {
        console.log("connection closed")
    })
})

