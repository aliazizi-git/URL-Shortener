import dotenv from 'dotenv'
import dbConnection from './Config/dbConnection.js'
import app from './app.js'
dotenv.config()
const port = process.env.PORT || 5000
const serverConnection= async()=>{
    await dbConnection()
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`)
    })
}
serverConnection()