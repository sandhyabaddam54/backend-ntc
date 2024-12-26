import express from 'express'
import cors from 'cors'

import {MongoClient, ObjectId} from "mongodb"
const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri);
const db = client.db("ecomm1")
const app = express();       // express is used to create server and api
 app.use(express.json());
app.use(cors());

app.get("/", async(req, res) => {
    const items = await db.collection("products").find().toArray();
    res.status(200).json(items);
});

app.post("/", async (req, res) => {
    const { name, price } = req.body;
    const data = {
        name: name,
        price: price
    };
    const newProduct = await db.collection("products").insertOne(data);
    res.status(200).json(newProduct);
});

app.post("/users", async (req, res) => {
    const { name, email, pass } = req.body;
    const data = {
        name: name,
        email: email,
        pass: pass
    };
    const newUser = await db.collection("login_users").insertOne(data);
    res.status(200).json(newUser);
});

app.post("/find", async (req, res) => {
      const{email, pass} = req.body
      console.log(email, pass)
      const user = await db.collection("login_users").findOne({email: email, pass: pass});
    //   res.status(200).json("user not found")
    let flag = false;
    if(user ){
        flag = true;
        // res.status(200).json({message: "user found", flag});
        res.status(200).json({message: flag});

    }else{
        flag= false
        // res.status(400).json({message:"user not found", flag});
        res.json({message:flag});
    }
      console.log(user);
})

app.listen(8080, () => {
    console.log("server is running on port 8080")
})

app.get("/home", (req, res) => {
     res.send("helloooo.....")
})

app.get("/:name", (req, res) => {
    console.log(req.params)
    res.send("helloooo hiiii...")
})