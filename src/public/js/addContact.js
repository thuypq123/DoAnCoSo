const button = document.querySelector(".button_add_contact");
const inputAddMail = document.querySelector("#add_email");
const listContacts = document.querySelector(".list");


const renderList = (user) =>{
    // <li class="contact_search"><img class="img_search" src="https://www.w3schools.com/howto/img_avatar.png">lmthuy@gmail.com <button class = "button_add_contact">add</button></li>
    const li = document.createElement("li");
    const img = document.createElement("img");
    const span = document.createElement("span");
    const button = document.createElement("button");
    img.classList.add("img_search");
    span.classList.add("span_search");
    button.classList.add("button_add_contact");
    button.innerHTML = "add";
    img.src = "https://www.w3schools.com/howto/img_avatar.png";
    span.innerHTML = user.fullname;
    li.classList.add("contact_search");
    li.appendChild(img);
    li.appendChild(span);
    li.appendChild(button);
    listContacts.appendChild(li);
}
const postContact = async () =>{
    const res = await axios({
        method:"POST",
        url:"http://localhost:3000/handleContact",
        data:{
            email:"thuy",
            fullname:"thuy",
        }
    })
    console.log(res.data)
}
const searchName = async () => {
    const value = inputAddMail.value;
    const res = await axios({
        method:"POST",
        url:"http://localhost:3000/handleContact",
        data:{
            fullname:value
        }
    })
    listContacts.innerHTML = "";
    res.data.map(item =>{
        renderList(item);
    })
}
inputAddMail.addEventListener("keyup",searchName);