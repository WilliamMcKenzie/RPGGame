
function getName(){
    var nameVar = document.getElementById("name")
    if(nameVar.value === ""){
        nameVar.placeholder = "You need a name";
        return
    }
    else if(nameVar.value.trim().length === 0){
        document.getElementById("nameLabel").textContent = "Invalid name"
        return
    }
    username = document.getElementById("name").value;
    sessionStorage.setItem("username", username)
    window.location.href="home.html"
}