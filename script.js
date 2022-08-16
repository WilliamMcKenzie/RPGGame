var username = sessionStorage.getItem("username")

var health = 100
var attack = 10
var defense = 0
var speed = 40


function getName(){
    var nameVar = document.getElementById("name")
    var i = 0
    if(nameVar.value === ""){
        nameVar.placeholder = "This field is required";
        return
    }
    else if(nameVar.value.trim().length === 0){
        window.alert(username)
        return
    }
    username = document.getElementById("name").value;
    sessionStorage.setItem("username", username)
    window.location.href="home.html"
}

function alertName(){
    window.alert(username)
}