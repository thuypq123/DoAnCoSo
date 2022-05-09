const express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const jwt = require('jsonwebtoken');

const env = require('dotenv').config();
app.use(express.static(__dirname + '/public'));

const homeRouter = require('./router/homeRouter');
const createUserRouter = require('./router/singupRouter');
const chatRouter = require('./router/chatRouter');
const db = require('./database/db');
const socket = require('./module/socketIOModule');
const conversationUser = require('./model/conversationUser');
const conversation = require('./model/conversation');
const user = require('./model/user');
const newMessage = require('./model/message');
const getCookies = require('./library/getCookies');
const console = require('console');
const handleContactRouter = require('./router/handleContactRouter');


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());

app.use('/',homeRouter);
app.use('/singup',createUserRouter);
app.use('/chat',chatRouter);
app.use('/handleContact',handleContactRouter);



io.on('connection', async (socket)=>{
   const cookies = socket.handshake.headers.cookie;
   const getToken = getCookies(cookies,"token");
   const id = jwt.verify(getToken,env.parsed.SECRET_KEY).id;
   const getconversationUser = await conversationUser.find({user_id:id});
   const getConversation = await Promise.all( getconversationUser.map(async item=>{
      return await conversationUser.findOne({conversation_id:item.conversation_id, user_id:{"$ne":id}});
   }))
   const getUser = await Promise.all(getConversation.map(async item=>{
      const tempUser =  await user.findOne({_id:item.user_id});
      return {user_id:tempUser._id,
         fullname:tempUser.fullname,
         email:tempUser.email,
         conversation:item.conversation_id,}
   }))
   socket.emit("getConversation",getUser);
   socket.on("sendmessage", async (data) =>{
      const cookies = data.cookie;
      const message = data.message;
      const token = getCookie(cookies,"token");
      const conversation = getCookie(cookies,"conversation");
      const id = jwt.verify(token,process.env.SECRET_KEY).id;
      const sendMessage = await newMessage.create({
         user_id:id,
         conversation_id:conversation,
         text:message,
         created_at:new Date(),
      });
      const newText = await sendMessage.save();
      io.emit("replies",newText);
   })
   socket.on("chooseConversation",async ({conversation,user_id}) =>{
      const gettAllMessages = await newMessage.find({conversation_id:conversation});
      const getConversation = await conversationUser.findOne({conversation_id:conversation, user_id:{"$ne":user_id}});
      const getUser = await user.findOne({_id:getConversation.user_id});
      const userInfo = {
         fullname:getUser.fullname,
      }
      socket.emit("chooseConversation",{allMessages:gettAllMessages,user:userInfo});
   })
});

server.listen(3000, () => {
   db.connect();
});