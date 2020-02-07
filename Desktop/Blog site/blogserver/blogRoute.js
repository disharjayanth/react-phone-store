var express = require('express')
var app = express()
const PORT = 5000
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


mongoose.connect('mongodb://localhost/Blog',{ useNewUrlParser: true, useCreateIndex: true ,useUnifiedTopology: true })
    .then((db) => console.log('Connected to Database'))
    .catch((err) => console.log('Unable to connect database',err));

    const Schema = mongoose.Schema

    const blogSchema = new Schema({
        author: {type: Schema.Types.ObjectId, ref: 'User' },
        title: String,
        type: String,
        info: String,
        img: String},{
            timestamps: true
    })

    const userSchema = new Schema({
        _id: Schema.Types.ObjectId,
        name: {type: String, unique: true, required: true},
        email: { type: String, required: true, unique: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
        password: { type: String, required: true },
        userBlogs: [{ type: Schema.Types.ObjectId, ref: 'blogs' }]
    })

    const blogs = mongoose.model('blogs',blogSchema)

    const User = mongoose.model('User',userSchema)

    module.exports = User

    app.post('/signup', require('./login-signup'))

    app.post('/signin', require('./login-signup'))


    app.get('/api/blogs',async(req,res) => {
        let getBlogs = await blogs.find().sort({ createdAt: -1 })
        return res.status(200).send(getBlogs)
    })

    app.get('/api/blogs/myblogs',async(req,res) => {
        // console.log("myblogs")
        // console.log(req.query)
        let blogs = await User.findOne({ email:req.query.email}).populate('userBlogs').select('-_id author title type info img createdAt updatedAt')
        // console.log(blogs)
        return res.status(200).send({
            error:false,
            blogs
        })
    })

    app.get('/api/blogs/:id',async(req,res) =>{ 
        let getBlogDetail = await blogs.findById(req.params.id)
        return res.status(200).send(getBlogDetail)
    })
    
    app.post('/api/blogs',async(req,res) => {

        console.log(req.body)

        let authorexp = await User.findOne({email: req.body.blog.userEmail})

        const blogPost = new blogs({
            author: authorexp._id,
            title: req.body.blog.title,
            type: req.body.blog.type,
            info: req.body.blog.info,
            img: req.body.blog.img
        })

        let blog = await blogPost.save()

        authorexp.userBlogs.push(blog._id)
        authorexp.save()

        return res.status(201).send({
            error: false,
            blog
        })
    })

    app.put('/api/blogs/:id',async(req,res) =>{
        console.log("EDITEDDDDDDDDDDDDD!!!!!!!!!!")
        const {id} = req.params
        console.log(id);
        console.log(req.body.blog);

        let blog = await blogs.findByIdAndUpdate(id,req.body.blog,{new :true})

        return res.status(202).send({
            error: false,
            blog
        })
    })

    app.delete('/api/blogs/:id',async(req,res) =>{
        const {id} = req.params
        let blog = await blogs.findByIdAndDelete(id)
        
        return res.status(202).send({
            error: false,
            blog
        })
    })

    app.listen(PORT,() =>{
        console.log(`App is listening in port number${PORT}`);    
    })
