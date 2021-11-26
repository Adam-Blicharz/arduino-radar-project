const express = require('express'),
      app = express(),
      server = require('http').createServer(app),
      io = require("socket.io")(server, {
      cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"]
      }
      }),
      bodyParser = require('body-parser'),
      helmet = require('helmet'),
      cors = require('cors'),
      dotEnv = require('dotenv');

dotEnv.config();
app.set("view engine", "ejs");

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(helmet({contentSecurityPolicy: false}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM6', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));// Read the port data

port.on("open", () => {
    console.log('serial port open');
});

parser.on('data', data =>{
    const obj = JSON.parse(String(data));
    io.emit('radar', obj);
})

io.on('connection', async client => {
  console.log('connected with IO');
});

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});