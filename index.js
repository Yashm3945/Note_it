const express=require('express');
const app=express();
const port=8080;
const path=require('path');
const { v4: uuidv4 } = require('uuid');



app.use(express.urlencoded({extended:true}));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'public')));
let post=[
    {id:uuidv4(), title:'First Post', content:'This is the content of the first post.'},
    {id:uuidv4(), title:'Second Post', content:'This is the content of the second post.'},
    {id:uuidv4(), title:'Third Post', content:'This is the content of the third post.'}
]
//get request to get data for all posts
app.get('/post',(req,res)=>{
    res.render('index.ejs',{post:post});
});
//to add a new post.
//process->created new route /post/new for form and post it to /post by using redirect
app.get('/post/new',(req,res)=>{
    res.render('new.ejs');
});
app.post('/post',(req,res)=>{
    let id=uuidv4();
    let{title, content} = req.body;
    post.push({id, title, content});
    res.redirect('/post');
});
//to show a indivisual post
app.get('/post/:id',(req,res)=>{
    let{id}=req.params;
  let foundpst=post.find((p)=>p.id===id);
    res.render('show.ejs',{foundpst})
});
//to delete a post
app.post('/post/:id/delete', (req, res) => {
   
    let { id } = req.params;
    let foundpst = post.find((p) => p.id == id);   // non strict
    if (!foundpst) {
        return res.send("Post not found");
    }
    post = post.filter(p => p.id != id);
    res.redirect('/post');
});

//started server
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}/post`);
});