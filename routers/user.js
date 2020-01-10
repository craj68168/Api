const express = require('express');
const User = require('../models/user')
const LoadData = require('../models/loaddata')
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require("path");
const router = new express.Router()
const bcrypt = require('bcryptjs');



const storage = multer.diskStorage({
     destination: "./public/uploads",
     filename: (req, file, callback) => {
         let ext = path.extname(file.originalname);
         callback(null,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      `${file.fieldname}-${Date.now()}${ext}`);
     }
 });
 
 const imageFileFilter = (req, file, cb) => {
     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
         return cb(new Error("You can upload only image files!"), false);
     }
     cb(null, true);
 };
 
 const upload = multer({
     storage: storage,
     fileFilter: imageFileFilter
 })
 


 router.post("/registeruser", (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    var myData = new User(req.body);
    myData.save().then(function(){
         res.json('added successfully');
    }).catch(function(e){
    
    if (e.name === 'ValidationError'){
         return res.status(500).json({ message: 'Email is already taken' })

    }else{
         res.send(e)
    }
    });
});



router.post("/imageinsert",upload.single('profileimage'), (req, res) => {
    res.json(req.file);
 
});


 router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user == null) {
                let err = new Error('Email not found!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 400;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                        res.json({ status: 'Login success!', token: token });
                    }).catch(next);
            }
        }).catch(next);
})





router.get('/users', auth.verifyUser, (req, res, next) => {
    res.json({ _id: req.user._id, firstname: req.user.firstname, lastname: req.user.lastname, email: req.user.email, profileimage: req.user.profileimage,gender: req.user.gender,date: req.user.date });
});



router.get('/loadall',auth.verifyUser,(req,res)=>{
    LoadData.find().then(function(loadimage){
         res.json(loadimage);
    }).catch(function(e){
     
            res.send(e)
       
    });
    });



router.post("/registerdummy", upload.single('loadimage'),(req, res) => {
    req.body.loadimage= req.file.filename;
    req.body.loadimageuser=req.file.filename;
    var myData = new LoadData(req.body);
    myData.save().then(function(){
    res.send('inserted successfully');
    }).catch(function(e){
    res.send(e)
    });
});




module.exports=router;