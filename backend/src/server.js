const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./router');
const app = express();
const server = require('http').Server(app);
const io = require('socket-io')(server);

io.on('connection', socket => {
    console.log('Nova conexão', socket.id); 
});

mongoose.connect('mongodb+srv://guilherme:82826603@cluster01-camc4.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

app.use(cors());
app.use(express.json());
app.use(routes);

httpServer.listen(3333);