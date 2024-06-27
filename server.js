require("dotenv").config();
const express = require("express");
const connectDB = require("./db/db");
const app = express();
const port = process.env.port;
const Data = require("./db/schema");

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.status(201).render("index");
})

app.get("/", (req, res) => {
    res.status(201).render("index");
})

app.get("/register", (req, res) => {
    res.status(201).render("register");
})

app.post("/register",async(req, res) => {
    try {
        // user already exist in db
        const email = req.body.email;
        const userExist = await Data.findOne({email:email});
        if(!userExist){
            const password = req.body.password;
        const cpassword = req.body.cpassword;
        // console.log(password, " or ",cpassword);
        if(password === cpassword){
            const userinfo = new Data({
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                cpassword:req.body.cpassword
            })
            // console.log(userinfo);
            const response = await userinfo.save();
            console.log(response);
            res.redirect("/");
        }else{
            res.json({msg:"Invalid Details"});
        }
        }else{
            res.json({msg:"User already Exist."});
        }
        
    } catch (error) {
        console.log(error);        
    }
})

app.get("/login", (req, res) => {
    res.status(201).render("login");
})

app.post("/login",async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        // console.log(email);
        // console.log(password);
        const userfind = await Data.findOne({email:email});
        
        if(password === userfind.password){
            res.status(201).redirect("/");
        }
        else{
            res.json({msg:"Invalid Details"});
        }
    } catch (error) {
        console.log(error);        
    }
})

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`http://localhost:${port}`);
    })
})
