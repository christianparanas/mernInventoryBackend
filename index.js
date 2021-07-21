
const express = require('express')
const db = require('./config/db.js')
const cors = require('cors')
const dotenv = require('dotenv')


const port = 3001;

// init
const app = express()
dotenv.config()

app.listen(process.env.PORT || port, () => { console.log(`Running on port: ${port}`) })

// needed to fix some errors
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routers
const authRouter = require('./routes/Auth')
const adminProductsRouter = require('./routes/AdminProducts')
const adminCustomersRouter = require('./routes/AdminCustomers')
const adminOrdersRouter = require('./routes/AdminOrders')

const clientSideRouter = require('./routes/Client')
const userCartRouter = require('./routes/Cart')
const userRouter = require('./routes/User')

app.use("/", clientSideRouter)
app.use("/auth", authRouter)
app.use("/user", userCartRouter)
app.use("/user", userRouter)
app.use("/admin", adminProductsRouter)
app.use("/admin", adminCustomersRouter)
app.use("/admin", adminOrdersRouter)
