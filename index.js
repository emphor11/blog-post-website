import e from "express"
import bodyParser from "body-parser"
import fs from "fs"

const port = 3000
const app = e()

app.listen(3000)
app.use(e.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",(req,res) => {
    res.redirect("/post")
})



app.get("/post",(req,res) => {
    const blogParse = []
    const blogs = fs.readFileSync('./blog.txt', 'utf8').toString().trim().split('\n')
    blogs.forEach(el=>{
        blogParse.push(JSON.parse(el))
    })
    console.log(blogParse)
    res.render("index.ejs",{
        blogs: blogParse
    })
})

app.get("/createPost",(req,res)=>{
    res.render("post.ejs")
})

app.post("/submit",(req,res) =>{
    console.log(req.body)
    const blog = {
        heading: req.body.heading,
        body: req.body.body,
        password: req.body.password
    }
    fs.appendFileSync("./blog.txt",JSON.stringify(blog)+'\n', (err) =>{
        if(err){
            console.log(err)
        }
    })
    res.redirect("/")
})