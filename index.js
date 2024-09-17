// Import stuff
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { Formidable } from "formidable";

// Further setup stuff from udemy vids
const app = express();
const port = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create a place to store the posts
const posts = [];

// more set up stuff
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Serve the home page
app.get("/", (req, res) => {
    res.render('index', { posts });
});

// Logic for making a blog post
app.post("/create-post", (req, res) => {
    const form = new Formidable();
    form.parse(req, (err, fields) => {
        const newPost = {
            name: fields.name,
            title: fields.title,
            content: fields.content,
            category: fields.category,
            creationTime: new Date()
        };
        posts.push(newPost);
        res.json(newPost);
    });
});


// Logic for serving the edit page
app.get("/edit-post/:index", (req, res) => {
    const index = parseInt(req.params.index, 10);
    const post = posts[index];
    if (post) {
        res.render('edit', { post, index });
    }
});


// Logic for editing a blog post
app.post("/edit-post/:index", (req, res) => {
    const index = parseInt(req.params.index, 10);
    const form = new Formidable();
    form.parse(req, (err, fields) => {
        posts[index] = {
            name: fields.name,
            title: fields.title,
            content: fields.content,
            category: fields.category,
            creationTime: new Date()
        };
        res.redirect('/');
    });
});

// Start the server (I forced it to use port 3000 previously)
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
