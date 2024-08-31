import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

let posts = [];

// Route to render the home page with all posts
app.get("/", (req, res) => {
    res.render('index', { posts });
});

// Route to render the form for creating a new post
app.get("/post", (req, res) => {
    res.render('post');
});

// Route to handle form submission for a new post
app.post("/new-post", (req, res) => {
    const newPost = {
        id: posts.length + 1, // Simple ID generation
        title: req.body.title,
        content: req.body.content,
    };
    posts.push(newPost);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
