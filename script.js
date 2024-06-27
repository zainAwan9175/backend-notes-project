const express=require('express')
const fs=require('fs')
const path=require('path')
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine", "ejs");

app.get('/',(req,res)=>{
    fs.readdir("./files",(err,files)=>{
        res.render("index",{files:files});


    })
})

app.get('/files/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,'utf-8',(err,filedata)=>{
      
        res.render("show",{filename:req.params.filename,data:filedata});

    })
})

app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join(' ')}.txt`,req.body.dic,(err)=>{
        res.redirect('/')
    })
})

 app.listen(3000)
