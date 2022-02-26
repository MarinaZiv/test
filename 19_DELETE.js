const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
app.set('view engine', 'ejs');

// middleware & static files
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


// CONNECT to MongoDB
const dbURI = 'mongodb+srv://chico:3Dnv8Rr8xG6Zw@nodetuts.vfko2.mongodb.net/note-tuts?retryWrites=true&w=majority';

mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.error("Could not connect to MongoDB...", err));


// routs
app.get('/', (req, res) => {
    res.redirect('./blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routs
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err);
        })

});



app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});


// Creating a POST handler:
app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.error(err);
        });
});


app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {        
            res.render('details', { blog: result, title: 'Blog Details' })
        })
        .catch((err) => {
            console.log(err);
        })

});




app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    // now we can use Blog models 
    Blog.findByIdAndDelete(id)
        // this goes out to the database, it finds a document by the ID and deletes it from the database
        .then((result) => {
            res.json({ redirect: '/blogs' })
        })
        .catch((err) => {
            console.log(err);
        })

});

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});


