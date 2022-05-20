const express = require('express');//imports express library

const app = express()//exports express
//this app variable represents all the express components from the library
//-- The app variable can also be used to apply middle-wares -- telling your api to start -- creating routs, etc
const mongoose = require('mongoose')

const UserModel = require('./models/Users.js')//Need in order to test data from our schemas

const cors = require('cors')//import from cors library --- allows us to connect api to our react-app


app.use(express.json());
app.use(cors());


// var bodyParser = require('body-parser')
// app.use(bodyParser.json())

//Our MongoDB string from our Atlis Cluster
mongoose.connect("mongodb+srv://Norbert305:eastbond305@cluster305.tuq7u.mongodb.net/MERN-tutorial?retryWrites=true&w=majority")




//api request will exist in this file aka http:// request
//routs not used in this tutorial :(
app.get("/getUsers", (req, res)=>{
//will request data from our dataBase
UserModel.find({}, (err, result)=>{
        if (err) {
        res.json(err)
        }
        else {
            res.json(result)
        }
});

});
app.post("/createUsers", async  (req, res)=>{

    const user = req.body
    const newUser = new UserModel(user); 
    await newUser.save();

    res.json(user)
});

app.put("/updateAge", async (req, res)=>{

    const newAge = req.body.newAge;
    const id = req.body.id;
    console.log(newAge, id);
    try {
        await UserModel.findById(id, (err, ageToUpdate)=>{
            ageToUpdate.age = Number(newAge)
            ageToUpdate.save()
        })
    } catch(err) {
        console.log(err)
    }
        res.send("updated")
})

app.delete("/deleteUser/:id", async (req, res)=>{
    const id = req.params.id
    await UserModel.findByIdAndDelete(id).exec();
    res.send("item_Deleted");
})

// app.patch('/:createUsersId', async (req,res)=>{
//     try {
//         const updateUser = await UserModel.updateOne({_id : req.params.createUsersId}, {$set : {name : req.body.name}});
//         res.status(200).json(updateUser);
//     }
//     catch (err) {
//         res.status(404).json({message : err})
//     }
// })

// app.delete('/:createUsersId', async (req,res)=>{
//     try {
//        if (await UserModel.remove({_id : req.params.createUsersId}));
//         res.status(200).json({message : err});
//     }
//     catch (err) {
//         res.status(404).json({message : err});
//     }
// })


app.listen(3001, ()=> {
    //This is our port listener to run our server. 
    //The port is 3001 because it has to be different from our react-app port 3000
    console.log("server is running perfectly fine!!!!!")

});
