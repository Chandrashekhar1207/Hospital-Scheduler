import express from 'express';
import cors from 'cors';
import connectDB from './connection/connection.js';
import userRoutes from './Routes/UserRoutes.js';
import bodyParser from 'body-parser';
import Doctoroutes from './Routes/DoctorRoutes.js';
const app = express();


app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/' , (req,res)=> {
    res.send('Hello World');
})
app.use("/api/user", userRoutes);
app.use("/api/doctor", Doctoroutes)

connectDB();
app.listen(3000 , () => {
    console.log(`Server is running on port 3000`);
})
