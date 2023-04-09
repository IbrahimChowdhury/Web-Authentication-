let app= require("./app")
require("dotenv").config()
let port=process.env.port || 5000
require("./connectDB")


app.listen(port,()=>{
    console.log(`your server is running at http://localhost:${port}`)
})
