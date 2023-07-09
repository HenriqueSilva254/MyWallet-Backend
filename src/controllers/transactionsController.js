import { ObjectId } from 'mongodb';
import { db } from '../database/db.js';
import dayjs from "dayjs"

export async function newTransaction(req, res) {
    const { value, description } = req.body
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ", "")
    const params = req.params

    try {
        const session = await db.collection('session').findOne({token})
        if (params.tipo === 'entrada') {
            await db.collection('entrance').insertOne({ id: session.userId, name: session.name, info: "entrance",value, description, time: dayjs().format('DD/MM') })
        } else {
            await db.collection('outflow').insertOne({ id: session.userId, name: session.name, info: "outflow",value, description, time: dayjs().format('DD/MM')  })
        }
        res.sendStatus(201)
    } catch (err) {
        return res.status(422).send(err.message);
    }

}
// time: dayjs().format('HH:mm:ss')


export async function getTransactions(req, res) {
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ", "")
    try {
        const session = await db.collection('session').findOne({token})
      
            const entrance = await db.collection('entrance').find({ id: session.userId}).toArray()
            const outflow = await db.collection('outflow').find({ id: session.userId}).toArray()
            const transactions = []
            entrance.forEach(e => transactions.push(e))
            outflow.forEach(o => transactions.push(o))
            res.status(201).send(transactions)
       
    } catch (err) {
        return res.status(422).send(err.message);
    }

}

export async function deleteTransaction(req, res) {
    const { id_transaction } = req.headers

    try {
        const entrance = await db.collection('entrance').deleteOne({ _id: new ObjectId(id_transaction) }) 
        const outflow = await db.collection('outflow').deleteOne({ _id: new ObjectId(id_transaction)}) 
        res.status(201).send('deleted')
    }

    catch (err) {
        return res.status(422).send(err.message);
    }

}
