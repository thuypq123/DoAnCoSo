   // const cookies = socket.request.headers.cookie;
   // var token = cookies.split(" ");
   // token = token[0].split("token=")[1].slice(0,-1);

   //================================================================
   // get conversation
   /*
   const id = socket.request.headers.cookie.split(" ")[1].split("id=")[1];
   const getconversationUser = await conversationUser.find({user_id:id});
   const getConversation = await Promise.all( getconversationUser.map(async item=>{
      return await conversationUser.findOne({conversation_id:item.conversation_id, user_id:{"$ne":id}});
      // conversationList.push(itemConversation);
      // return itemConversation;
   }))
   console.log(getConversation);
   */