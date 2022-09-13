const webSocketSv=require("ws")

const webServer=new webSocketSv.Server({
    port:300
})

webServer.on('listening',()=>{
    console.log("server started")
})

// const clients=new Map();
const clients=[];

webServer.on("connection",(self)=>{
    console.log("connected")
    

    self.send("hello  server")

    self.on('message',(messag)=>{
        clients.push({name:messag.toString(),
            id:self
        })
        console.log(clients)
        console.log(messag.toString())
        // for
        // webServer.clients.forEach((client)=>{
        //     if(self==client && client.readyState === webSocketSv.OPEN)
        //     client.send(messag.toString());
        //     console.log(client)

        webServer.clients.forEach((client)=>{
            if(self!=client && client.readyState === webSocketSv.OPEN)
            client.send(messag.toString());
            console.log(client)

         });
    })

    self.on("close",()=>{
        console.log("connection closed")
    })
})

