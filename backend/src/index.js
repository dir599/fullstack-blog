import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cookieParser from "cookie-parser"

const app = express()
const PORT =  process.env.PORT || 9000

app.use(express.json())
app.use(cookieParser())

app.get("/", (req,res)=>{
    res.send("This is test api")
})

app.listen(PORT,()=>{
    console.log(`The server is running in port ${PORT}`)
})
