import express from "express";
import cors from "cors"
import connectDB from "./db/index.js";
import { Board } from "./models/board.models.js";
import http from 'http';
const app = express();
const server = http.createServer(app);

import { Server } from "socket.io";

const io = new Server(server,{
    cors: {
        origin: '*',
    }
})




app.use(cors({
    origin : "*",
}));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${5000}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

io.on('connection', (socket) => {
    console.log('connect',socket.id);
    socket.on('draw-line',(elements)=>{
        //console.log(elements);
        console.log('connectionnn',socket.id);
        socket.broadcast.emit('draw-line',elements);
    })
})


app.post("/getItem",async (req,res)=>{
    const {name} = req.body;
    const data = await Board.findOne({name: name});
    if(!data) res.json({data: []});
    else res.json({data: data.elements});
})

app.post("/setItem",async (req,res)=>{
    
    const {name,newEle} = req.body;

    if(!name || !newEle) res.json({message: "error"});
    else{
        const data = await Board.findOne({name: name});
        if(!data){
            await Board.create({
                name: name,
                elements: newEle,
            });
        }
        else{
            await Board.findOneAndUpdate(
                {name: name},
                {elements: newEle}
            ); 
        }
        res.json({
            name,
            newEle,
            message: "worked",
        })
    }
})

server.listen(5000,()=>{
    console.log("server is running");
})