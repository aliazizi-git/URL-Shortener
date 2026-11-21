import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { catchError } from 'vanta-api'

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())


app.get('/',(req,res,next)=>{
    return res.status(200).json({
        success:true,
        message: "URL Shortener is running..."
    })
})
app.use((req,res,next)=>{
    return res.status(404).json({
        success:false,
        message:"route not found"
    })
})
app.use(catchError)
export default app