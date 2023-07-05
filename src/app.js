import express, { json } from 'express'
import cors from 'cors'
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import joi from "joi"
import bcrypt from 'bcrypt';

// config Server  
const app = express()
app.use(cors())
app.use(json())
dotenv.config();

// config Mongo 
const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

mongoClient.connect()
    .then(() => db = mongoClient.db())
    .catch((err) => console.log(err.message));


// Cadastro
app.post("/sign-up", async (req, res) => {
    // name, email, password
    const { name, email, password, repeat_password} = req.body;

    const userSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(3).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        repeat_password: joi.ref('password')
      });

    const validation = userSchema.validate(req.body)
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
      }

    const passwordHash = bcrypt.hashSync(password, 10);

    try{
        const promisse = await db.collection('users').findOne({ email })
        if(promisse) return res.sendStatus(409)
        const insertUser = await db.collection('users').insertOne({ name, email, password: passwordHash }) 
        res.sendStatus(201);
    }catch (err){
        return res.status(500).send(err.message);
    }
    
    
});

// Run Server
const PORT = 5000
app.listen(PORT, () => console.log('Server Run'))

