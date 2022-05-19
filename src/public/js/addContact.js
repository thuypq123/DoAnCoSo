const button = document.querySelector(".button_add_contact");
const inputAddMail = document.querySelector("#add_email");
const listContacts = document.querySelector(".list");

function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

const renderList = (user) =>{
    // <li class="contact_search"><img class="img_search" src="https://www.w3schools.com/howto/img_avatar.png">lmthuy@gmail.com <button class = "button_add_contact">add</button></li>
    const li = document.createElement("li");
    const img = document.createElement("img");
    const span = document.createElement("span");
    const button = document.createElement("button");
    img.classList.add("img_search");
    span.classList.add("span_search");
    const i = document.createElement("i");
    if(user.added){
        i.classList.add("fa-solid","fa-user-xmark");
        button.classList.add("button_delete_contact");
    }
    else{
        i.classList.add("fa-solid","fa-user-plus");
        button.classList.add("button_add_contact");
    }
    button.addEventListener("click",postContacts);
    button.appendChild(i);
    button.setAttribute("data-id",user._id);
    i.setAttribute("data-id",user._id);
    if(user.avatar){
        img.src = '/images/'+user.avatar;
    }else{
        img.src = "https://www.w3schools.com/howto/img_avatar.png";
    }
    span.innerHTML = user.fullname;
    li.classList.add("contact_search");
    li.appendChild(img);
    li.appendChild(span);
    li.appendChild(button);
    listContacts.appendChild(li);
}

const searchName = async () => {
    const value = inputAddMail.value;
    const res = await axios({
        method:"POST",
        url:"http://localhost:3000/handleContact",
        data:{
            fullname:value,
            id: getCookie("id")
        }
    })
    listContacts.innerHTML = "";
    res.data.map(item =>{
        renderList(item);
    })
}
inputAddMail.addEventListener("keyup",searchName);

const postContacts = async (event) => {
    const idSearch = event.target.getAttribute("data-id");
    const res = await axios({
        method:"POST",
        url:"http://localhost:3000/addContact",
        data:{
            token: getCookie("token"),
            idSearch: idSearch,
        }
    })
    if(res.data.delete){
        console.log("xoa ban thanh cong")
        location.reload();
    }else{
        console.log("ket ban thanh cong")
        const newUser = res.data._doc;
        // renderConversationUser(res.data.user);
        location.reload();
    }
};