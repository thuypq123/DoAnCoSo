var socket = io();
const token = document.cookie.split('token=')[1];
const id = document.cookie.split('id=')[1];
// $(".messages").animate({ scrollTop: $(document).height() }, "fast");

$("#profile-img").click(function() {
	$("#status-options").toggleClass("active");
});

$(".expand-button").click(function() {
  $("#profile").toggleClass("expanded");
	$("#contacts").toggleClass("expanded");
});

$("#status-options ul li").click(function() {
	$("#profile-img").removeClass();
	$("#status-online").removeClass("active");
	$("#status-away").removeClass("active");
	$("#status-busy").removeClass("active");
	$("#status-offline").removeClass("active");
	$(this).addClass("active");
	
	if($("#status-online").hasClass("active")) {
		$("#profile-img").addClass("online");
	} else if ($("#status-away").hasClass("active")) {
		$("#profile-img").addClass("away");
	} else if ($("#status-busy").hasClass("active")) {
		$("#profile-img").addClass("busy");
	} else if ($("#status-offline").hasClass("active")) {
		$("#profile-img").addClass("offline");
	} else {
		$("#profile-img").removeClass();
	};
	
	$("#status-options").removeClass("active");
});

function newMessage() {
	message = $(".message-input input").val();
	if($.trim(message) == '') {
		return false;
	}
	// $('<li class="sent"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
	$('.message-input input').val(null);
	// $('.contact.active .preview').html('<span>You: </span>' + message);
	$(".messages").animate({ scrollTop: $(document).height()*2000 }, "fast");
	socket.emit('sendmessage', {message: message, cookie:document.cookie});
};

$('.submit').click(function() {
  newMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    newMessage();
    return false;
  }
});

//=============Function=============
const renderUser = (user) =>{
	var img = document.querySelector(".img-contact-profile");
	img.src = user.avatar!==undefined ? './images/'+user.avatar : "http://cdn.onlinewebfonts.com/svg/img_569204.png";
	const userName = document.querySelector(".contact-profile-name");
	userName.innerHTML = "";
	const textname = document.createTextNode(user.fullname);
	userName.appendChild(textname);
}
function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}
activeContact = () =>{
	var listContact = document.querySelector(".listContacts");
	var liContact = document.querySelectorAll(".contact");
	for(var i = 0; i < liContact.length; i++){
		if(liContact[i].id == getCookie("conversation")){
			liContact[i].classList.add("active");
		}
		else{
			liContact[i].classList.remove("active");
		}
	}
	const conversation = getCookie("conversation");
}

initConversation = async () =>{
	const conversation = getCookie("conversation");
	const user_id = getCookie("user_id");
	socket.emit("chooseConversation", (conversation));
	document.querySelector("#loadding").style.display = "none";
}
initConversation();
const chosseConversation =(e) =>{
	if(e.target.id.length > 0){
		document.cookie = "conversation="+e.target.id;
		const conversation = getCookie("conversation");
		const user_id = getCookie("id");
		const value = {
			conversation:conversation,
			user_id:user_id
		}
		socket.emit("chooseConversation", value);
	}
}
const renderConversationUser = (data) =>{
	console.log(data);
	var listContact = document.querySelector(".listContacts");
	var liContact = document.createElement("li");
	liContact.className = "contact ";
	liContact.setAttribute("id", data.conversation);
	liContact.setAttribute("onclick", "click(event)");
	listContact.appendChild(liContact);
	var wrap = document.createElement("div");
	wrap.className = "wrap";
	liContact.appendChild(wrap);
	var span = document.createElement("span");
	span.className = "contact-status online";
	wrap.appendChild(span);
	var img = document.createElement("img");
	img.src = data.avatar!==undefined?`images/${data.avatar}`:"http://cdn.onlinewebfonts.com/svg/img_569204.png";
	img.alt = "";
	img.style.width = "50px";
	img.style.height = "50px";
	wrap.appendChild(img);
	var meta = document.createElement("div");
	meta.className = "meta";
	wrap.appendChild(meta);
	var pName = document.createElement("p");
	pName.className = "name";
	pName.innerHTML = data.fullname;
	meta.appendChild(pName);
	var pPreview = document.createElement("p");
	pPreview.className = "preview";
	meta.appendChild(pPreview);
	var text = document.createTextNode(data.email);
	pPreview.appendChild(text);
	liContact.addEventListener("click", chosseConversation);
}
renderMessages = (data) =>{
	var li = document.createElement("li");
	li.className = data.user_id===getCookie("id")?"sent":"replies";
	// var img = document.createElement("img");
	// img.src = "http://emilcarlsson.se/assets/mikeross.png";
	// li.appendChild(img);
	var p = document.createElement("p");
	p.innerHTML = data.text;
	li.appendChild(p);
	return li;
}
//==========WorkWithServer==========
socket.on('replies', (data) => {
	console.log(data);
	document.getElementById(data.conversation_id).style.backgroundColor = data.user_id!=getCookie("id")?"cadetblue":"";
	if(data.conversation_id === getCookie("conversation"))
	if(data.user_id == getCookie("id")){
		$('<li class="sent"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + data.text + '</p></li>').appendTo($('.messages ul'));
	}
	else{
		$('<li class="replies"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + data.text + '</p></li>').appendTo($('.messages ul'));
	}
	$(".messages").animate({ scrollTop: $(document).height()*2000 }, "fast");
})


socket.on("getConversation", (data) => {
	data.map((item) => {
		renderConversationUser(item);
	})
	// activeContact();
})

socket.on("chooseConversation", ({allMessages,user}) => {
	console.log(user)
	renderUser(user);
	var listText = document.querySelector(".listText");
	listText.innerHTML = "";
	allMessages.map((item) => {
		renderMessages(item);
		listText.appendChild(renderMessages(item));
	})
	activeContact();
	$(".messages").animate({ scrollTop: $(document).height()*2000 }, "fast");
})
socket.on('redirect', function(destination) {
    window.location.href = destination;
});
socket.on('renderMainUser', (data) => {
	if(data.avatar){
		document.querySelector(".img_avatar").src ='./images/'+ data.avatar;
	}else{
		document.querySelector(".img_avatar").src ='http://cdn.onlinewebfonts.com/svg/img_569204.png';
	}
	document.querySelector(".name").innerHTML = data.fullname;
})
