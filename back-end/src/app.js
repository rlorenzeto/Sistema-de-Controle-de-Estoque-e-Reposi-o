import cors from 'cors'
import express from 'express'
import AuthRoutes from './routes/AuthRoutes.js'
import DashboardRoutes from './routes/DashboardRoutes.js'
// import StockRoutes from './routes/StockRoutes.js'
// import SaleRoutes from './routes/SaleRoutes.js'

const app = express();

app.use(cors())
app.use(express.json());

app.use('/api/auth', AuthRoutes)
app.use('/api/dashboard', DashboardRoutes)
// app.use('/api/stock', StockRoutes)
// app.use('/api/sales', SaleRoutes)

const PORT = 3001;

app.listen(PORT, ()=>{
    console.log(`Servidor rodando com sucesso ${PORT}`)
})