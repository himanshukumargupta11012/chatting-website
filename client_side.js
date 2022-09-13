
    user_name=document.getElementById("name");
// user_name.addEventListener("keypress",nameVerify);
// var ws=0

// function nameVerify(event){
//     user_name=document.getElementById("name");
    // if(user_name!=null&&event.key=="Enter")
    ws=new WebSocket("ws://localhost:300")
    // ws.onopen=()=>{
    //     ws.send(user_name.value)}
// }

    
ws.send


ws.onmessage=(data)=>{
    const msg=data.data
    document.getElementById("other_msg").value=msg
}

ws.onerror=(erro)=>{
    document.write(erro)
}

ws.onclose=()=>{
    console.log("connection closed")
}

    messag=document.getElementById("self_msg")
    messag.addEventListener("keypress", sendMessage);

function sendMessage(event){
    messag=document.getElementById("self_msg")
    if(event.key=="Enter"){
        event.preventDefault();
        ws.send(messag.value)
        
    }
}