const express = require('express');
const server= express()
require('dotenv').config();
const mongoose = require('mongoose');
const LoginSignup = require('./Routes/LoginSignup')
const admin= require('./Routes/admin')
const authMiddleware = require('./Middleware/auth');
const path = require('path')
server.use(express.json());
const cors = require('cors');
async function main() {
    try {
      await mongoose.connect(process.env.DB_URL);
      console.log('Database Connected');
    } catch (error) {
      console.error('Database connection failed:', error);
    }
  }

  main();
  server.use(cors({ origin: '*' }));
  server.use(express.static(path.resolve(__dirname,process.env.PUBLIC_DIR))); 

  //! this is also api after login we call agter login successfully 
  server.get('/api/dashboard', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Welcome to the Admin panel' });
  });   //? it will running when user login  sucess fully then we store  jwt token in cookies or use where we want to redirect user if token is matched then it shuld be redirect other wise doesnot able to redirect 
// Routes Calling

server.use('/api',LoginSignup);
server.use('/api',admin);


server.get('*',(req,res)=>{ 
  res.sendFile(path.resolve(__dirname,'build','index.html'));  
});

server.listen(process.env.PORT_NUMBER,()=>{
    console.log('Server Started');  
})
