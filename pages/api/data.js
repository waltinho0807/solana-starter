import ticket from "../../Model/Ticket";
import connectDB from "../lib/connectDB"

export default async function handler(req, res) {
    await connectDB()
    
    const {inputDataOne, inputDataTwo } = req.body;

    const inputOne = Number(inputDataOne)
    const inputTwo = Number(inputDataTwo)

    const myTicket = new ticket({
        timeOne: inputOne,
        timeTwo: inputTwo
    })
    await myTicket.save()
    console.log("inside api",typeof(inputOne), inputTwo)
    res.status(200).json({ done: true })
  }