
const User = require("../models/userModel");
const router = require('express').Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleWare = require("../middleware/authMiddleWare")

router.post("/register", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if (user){
          return res.send({
                success:false,
                message: "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        const newUser = new User(req.body);
      await newUser.save()
        // await newUser.save();
        res.send({
            message: "User created successfully",
            success: true,
        })
    }
    catch (error){
        res.send({
            message: "let's see here",
            success: false,
        });
    }
})

router.post("/login", async (req, res) => {

        const user = await User.findOne({
            email:req.body.email
        })
        if(!user){
            return res.send({
                success:false,
                message:"User does not exist"
            });
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(validPassword) {
           return res.send(
                {
                    success: false,
                    message: "Invalid Password",
                }
            )
        }
        const token = jwt.sign({userId: user._id}, `${process.env.JWT_SECRET}`, {expiresIn: "1d"});
       return res.send({
            success: true,
            message: "User Logged In Successfully",
            data:token,
        })

});

router.get("/getCurrentUser", authMiddleWare, async(req, res) =>{
    try {
        const user = await User.findOne({_id: req.body.userId });
        res.send({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    } catch (error) {
        res.send({
            message: error.message,
            success: false,
        });
    }
});

router.get("/get-all-users", authMiddleWare, async (req, res) =>{
   try{
       const allUsers = await User.find({_id: { $ne: req.body.userId}});
       res.send({
           success:true,
           message: "Users fetched successfully",
           data:allUsers
       })
   }
   catch (error){
        res.send({
            message: error.message,
            success:false
        })
   }
})
module.exports = router;