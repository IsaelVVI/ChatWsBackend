import Ws from "App/Services/Ws"
Ws.boot()

console.log('Ligando Websocket');

/**
 * Listen for incoming socket connections
 */

interface Messages {
  id: string,
  message: string
}

Ws.io.on('connection', (socket) => {
  socket.emit('chat', { chat: 'Conectado ao Chat' })
  
  socket.on('sendMessages', (data: Messages) => {
    if (data.message) {
      console.log(data.message);
      socket.emit('getMessages', data)      
    }
  })
  
  socket.on('getMessages', (data: Messages) => {
    console.log('nova mensagem: ', {
      User: data.id,
      Message: data.message
    });    
  })

  socket.on('my other event', (data) => {
    console.log(data.id)
  })
})