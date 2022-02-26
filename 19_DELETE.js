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
    //   console.log(id);
    // now we need to retrive the document with this ID from the database
    Blog.findById(id)
        .then((result) => {
            // we want to render the ditails page 
            // we want to pass through the data that we get back so the blog is what we call it but we can call the property anything we want 
            // and that is going to ba equal to the result because this result will be the single blog based on this ID
            res.render('details', { blog: result, title: 'Blog Details' })
        })
        .catch((err) => {
            console.log(err);
        })

});


// Click on delete button sends a delete request to the server,
// then we go out to the database from the server and delete the blog with that ID
// we`re going to do that in vanilla JS on the front-end, so important to notice that
// this is not gonna be JS that is running on the server.
// this is going to be running in the browser and when we click on this.
// because in our view, if we add a script tag at the bottom, any script inside the script tag is going
// to run in the browser, not on the server!!

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    // now we can use Blog models 
    Blog.findByIdAndDelete(id)
        // this goes out to the database, it finds a document by the ID and deletes it from the database
        .then((result) => {
            // we going to send back some JSON to the browser.
            // why are we not redirecting here? 
            // when we send ajax request (which what this is because we`re doing it from JS) in node we cannot
            // use a redirect as a response. We have to send maybe JSON or text data back to the browser.
            // so what we`re gonna do is actually send some JSON data back to the browser and that JSON data 
            // is gonna have a redirect property.
            // when we receive that data back over here we`re gonna look at the redirect property that gonna be a URL to where we
            // want to redirect to and that`s going to be from the browser because this is an ajax request

            // this is a typical response we`d use for API where we can reach out with JS to get data or delete data.
            res.json({ redirect: '/blogs' })
        })
        .catch((err) => {
            console.log(err);
        })

});

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});


