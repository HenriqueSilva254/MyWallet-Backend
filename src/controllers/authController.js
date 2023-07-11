
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import {db} from '../database/db.js';
 

export async function signUp(req, res){
    // name, email, password, repeat_password
    const { name, email, password } = req.body;

    const passwordHash = bcrypt.hashSync(password, 10);

    try{
        const promisse = await db.collection('users').findOne({ email })
        if(promisse) return res.sendStatus(409)
        const insertUser = await db.collection('users').insertOne({ name, email, password: passwordHash }) 
        res.sendStatus(201);
    }catch (err){
        return res.status(422).send(err.message);
    }
    
    
}

export async function signIn(req, res){
  const {email, password} = req.body

  try {
      const user = await db.collection('users').findOne({email})
      if(!user) return res.status(404).send("usuario nao existe")
      if(user && bcrypt.compareSync(password, user.password)){
          const token = uuid()
          await db.collection('session').insertOne({token, name: user.name, userId:user._id})
          const session = await db.collection('session').findOne({token})
          res.status(200).send({token: session.token, name: session.name})
      }
  } catch (err) {
      return res.status(404).send(err.message);
  }

}
/* 
export async function getUser(req, res){
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ", "")
    
    if (!token) return res.sendStatus(401)

    try {
        const session = await db.collection('session').findOne({token})
        if(!session) return res.sendStatus(401)
        const user = await db.collection('users').findOne({_id: session.userId})
        res.send(user.name)
    } catch (err) {
        return res.status(404).send(err.message);
    }
  
  } */