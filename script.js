var name

var health = 100
var attack = 10
var defense = 0
var speed = 40

function getName(){
    name = document.getElementById("name").innerText
    document.getElementById("getName").style.display="none"
    document.getElementById("menu").classList.remove("hidden")
    document.getElementById("submit").style.display="none"
}