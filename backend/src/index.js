import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cookieParser from "cookie-parser"
import prisma  from "./db/prisma.js"
import routes from "./routes/route.js"

const app = express()
const PORT =  process.env.PORT || 9000

app.use(express.json({limit: "16kb"}))
app.use(cookieParser())
app.use(express.urlencoded({extended: true, limit: "16kb"}))


app.get("/", (req,res)=>{
    res.send("This is test api")
})
app.use("/", routes)

app.listen(PORT,()=>{
    console.log(`The server is running in port ${PORT}`)
})
