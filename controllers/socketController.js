// controllers/socketController.js

const { Server } = require('socket.io');



function initializeSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: '*', // Allow all origins; restrict in production
        },
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('message', (data) => {
            console.log('Message received:', data);
            io.emit('message', data); // Broadcast the message
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

    return io;
}

module.exports = { initializeSocket };
