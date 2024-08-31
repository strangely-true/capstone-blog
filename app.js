import express from "express";

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
    res.render('post', { post: null, title: 'Create New Post' });
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

// Route to render the form for editing a post
app.get("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = posts.find(p => p.id === postId);
    if (post) {
        res.render('post', { post, title: 'Edit Post' });
    } else {
        res.status(404).send('Post not found');
    }
});

// Route to handle form submission for editing a post
app.post("/posts/:id/edit", (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.title = req.body.title;
        post.content = req.body.content;
        res.redirect('/');
    } else {
        res.status(404).send('Post not found');
    }
});

// Route to handle post deletion
app.post("/posts/:id/delete", (req, res) => {
    const postId = parseInt(req.params.id, 10);
    posts = posts.filter(p => p.id !== postId);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
