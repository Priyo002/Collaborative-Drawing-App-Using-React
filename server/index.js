import express from "express";
import cors from "cors"
import connectDB from "./db/index.js";
import { Board } from "./models/board.models.js";

const app = express();


app.use(cors({
    origin : "*",
}));

app.use(express.json({limit: "16kb"}))

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${5000}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

app.get("/",(req,res)=>{
    res.status(200).send("Works");
})

app.get("/getItem",async (req,res)=>{

    const data = await Board.create({
        elements: "hel",
    });
    if(!data){
        res.json({message: "Error"});
    }
    res.json({
        data,
        message: "success",
    })
})

app.post("/setItem",async (req,res)=>{
    
    const {name,newEle} = req.body;

    //console.log(newEle);

    

    // await Board.findOneAndUpdate("ele",{...newEle});

    const data = await Board.findOne({name});

    if(!data){
        await Board.create({
            name,
            elements: newEle,
        })
    }
    else{
        res.json({data,message: "Worked 2"})
    }

    res.json({
        data,
        newEle,
        message: "worked",
    })
})

app.listen(5000,()=>{
    console.log("server is running");
})