const express=require('express')
const { default: mongoose, Model, Schema } = require('mongoose')
const app=express()
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
app.set('view engine','ejs')
const cors = require("cors");
const util = require('util');
const jwtSecret="MyNameIsEnduvasiSrihariDinesh!@#"
const jwt=require('jsonwebtoken')
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  }));
mongoose.connect('mongodb+srv://dineshstdy1:Asdfg123@cluster0.czxlchd.mongodb.net/Todo?retryWrites=true&w=majority').then(
    console.log('connected')
)
const hema=new Schema(
    {
        title:String,
        description:String,
        duedate:Date
    }
)
const TodoModel=mongoose.model('todos',hema)
const lgn=new Schema(
    {
        email:String,
        password:String
    }
)
const user=mongoose.model('users',lgn)
app.post('/s',async(req,res)=>{
    try {
        console.log(req.body.email)
        const newUser = new user({
            email: req.body.email,
          password: req.body.password,
          
        });
    
        newUser.save();
        console.log(newUser)
        res.status(201).json({success: true, message: 'User created successfully', user: newUser });
      } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
})
//login
app.post("/l", async (req, res) => {
    console.log("xx")
    try {
      const userRecord = await user.findOne({ email: req.body.email });
  
      if (!userRecord) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Email Address' }] });
      }
      if (req.body.password!==userRecord.password) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Password' }] });
      }
        const data={
          user:{
            id:userRecord.id
        }
        }
        const authtoken=jwt.sign(data,jwtSecret)
        res.json({ success: true, authtoken:authtoken });
        console.log(authtoken)
        console.log("User LoggedIn");
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// app.post('/addtask',async(req,res)=>{
//     let data=req.body.order_data
//     let emid=await Orders.findOne({'email':req.body.email})
//     if(emid===null){
//       try {
//         await Orders.create({
//           email:req.body.email,
//           status:false,
//           orderdata:[data]
//         })
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     else{
//       try {
//         console.log("it is old")
//         await Orders.findOneAndUpdate({email:req.body.email},
//           {
//             $push:{orderdata:data}}).then(()=>{
//               res.json({success:true})
//             })
//       } catch (error) {
//         console.log(error)
//       }
//     }
// })





app.get('/',async(req,res)=>{
    let data=await TodoModel.find();
    res.render('home',{all:data})
})
app.get('/add',(req,res)=>{
    res.render('add')
})
app.get('/edit',async(req,res)=>{
    let data=await TodoModel.find();
    res.render('edit',{all:data})
})
app.post('/deleteOne',async(req,res)=>{
    let data=await TodoModel.deleteOne({title:req.body.mail});
    res.redirect('/')
})
app.post('/addtask',(req,res)=>{
    let task=new TodoModel({
        title:req.body.title,
        description:req.body.desc,
        duedate:req.body.type
    })
    task.save();
    res.redirect('/');
})
app.post('/e',async(req,res)=>{
    let task=await TodoModel.findOne({title:req.body.name})
    res.render('update',{all:task})
})
app.post('/update',async(req,res)=>{
    let data=await TodoModel.updateOne(
        {title:req.body.prev},
        {
            $set:{
                title:req.body.title,
                description:req.body.desc,
                duedate:req.body.type
            }
        }
    )
    res.redirect('/edit')
})
app.post('/deleteall',async(req,res)=>{
    let data=await TodoModel.deleteMany({ })
    res.redirect('add')
})












app.listen(5000,()=>{
    console.log('hello')
})