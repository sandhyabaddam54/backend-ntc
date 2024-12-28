import express from 'express';
import cors from 'cors';


const app = express();

app.listen(8080);
app.get("/", (req, res) => {
    res.send("Hello world..")
});