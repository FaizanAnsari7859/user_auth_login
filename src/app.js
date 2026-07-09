const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const bcrypt = require("bcryptjs");

require("./db/conn");
const Register = require("./models/registers");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(express.static(static_path))
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index");
 });

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/register", async (req, res) => {
   
   try {
      const password =req.body.password;
      const Cpassword = req.body.confirmpassword;

   if (password === Cpassword) {
    const registerEmployee = new Register({
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      email:req.body.email,
      gender:req.body.gender,
      phone:req.body.phone,
      age:req.body.age,
      password:password,
      confirmpassword:Cpassword
   })

   

   console.log("the success part" + registerEmployee);

   const token = await registerEmployee.generateAuthToken();
   console.log("the token part" + token);

   const registered = await registerEmployee.save();
   console.log("the page part" + registered);
   
   console.log("ERROR");
   res.status(201).render("index");

  } else {
   res.send("password are not matching");
 }

    } catch (error) {
    console.log(error);
    res.status(400).send(error.message);

    }
});


app.post("/login", async(req, res) =>{
   try {
      const email = req.body.email;
      const password = req.body.password;
 
      const useremail = await Register.findOne({email:email});

      const isMatch = await bcrypt.compare(password, useremail.password);

      if (isMatch){
         res.status(201).render("index");
      }else{
         res.send("password are not matching");
   }

   } catch (error) {
      res.status(400).send("invalid email");
   }
});

app.listen(port, ()=> {
    console.log(`server is running at port no ${port}`);
});