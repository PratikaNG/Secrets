
//The password is SomeSecrets
import express from "express"
import bodyParser from "body-parser"
import {dirname} from "path"
import { fileURLToPath } from "url"
const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const port = 3000
var userAuthorised = false
app.use(bodyParser.urlencoded({extended:true}))
function checkPassword(req,res,next){
    const password = req.body["password"]
    if (password === "SomeSecrets"){
        userAuthorised = true
    }
    
    next()
}
app.use(checkPassword)
app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/public/index.html")
    
})
app.post("/check",(req,res)=>{
    console.log(req.body)
    if (userAuthorised){
        res.sendFile(__dirname + "/public/secret.html")
    }else{
        res.send("<h1>Sorry we cant share you the secrets!!! You are not authorised.</h1>")
    }
})
app.listen(port,()=>{
    console.log(`Server is listening to port: ${port}`)
})
