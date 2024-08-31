import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let posts = [];


app.get("/", (req, res) => {
    res.render('index', { posts });
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });