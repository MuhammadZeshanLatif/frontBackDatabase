const express = require("express")
const cors = require('cors')
//install bodyparser taky body me deta jo aia usy prh sken
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/demo');
    console.log("detaBase connected...")
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
//Schema
const userSchema = new mongoose.Schema({
    userName: String,
    password: String
});
//Model
const User = mongoose.model('User', userSchema);
const server = express()
server.use(bodyParser.json())
server.use(cors())
//CRUD 
//Creat
server.post('/demo', async (req, res) => {
    const user = new User();
    user.userName = req.body.userName;
    user.password = req.body.password;
    const doc = await user.save();
    console.log(doc);
    res.send(doc);
})
//Read
server.get('/demo',async (req, res)  => {
        const doc =await User.find({})
        res.json(doc)
})
server.listen(3000, () => {
    console.log('Server is lisening..')
})