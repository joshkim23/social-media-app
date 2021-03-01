import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import usersRoutes from './routes/users.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const app = express();
const PORT = 9000;

app.use(bodyParser.json());
app.use(cors());

app.use('/users', usersRoutes);
app.get('/', (req, res) => res.send('Welcome to the server home page'));

app.listen(PORT, () => console.log(`Server running on port: http://localhost${PORT}`));

//uri format: const uri = "mongodb+srv://<username>:<password>@time-tracker-app-cluste.ig4sy.mongodb.net/<dbname>?retryWrites=true&w=majority";
dotenv.config();
const uri = process.env.ATLAS_URI;
const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(uri,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch(err => {
        console.error(`Error connecting to the database. \n${err.message}`);
    })
