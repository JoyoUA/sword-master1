

export default function onConnection(io: any, socket: any) {
    // console.log(socket, io)
    console.log(socket.id)
    // console.log(socket.handshake.query)
    // извлекаем идентификатор комнаты и имя пользователя
    const { roomId, userName } = socket.handshake.query
  
    // записываем их в объект сокета
    socket.roomId = roomId
    socket.userName = userName
  
    // присоединяемся к комнате
    socket.join(roomId)
  
    // console.log(roomId);
    // console.log(userName);
    
    // регистрируем обработчики для пользователей
    // userHandlers(io, socket)
  
    // // регистрируем обработчики для сообщений
    // messageHandlers(io, socket)
  }