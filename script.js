var username = sessionStorage.getItem("username")

var level = 5
var exp = 1

var health = 100
var damage = 10
var speed = 40

var enemyLevel
var enemyHealth
var enemySpeed
var enemyGrade

var drops = []
var moves = [{name: "Slam", damage: 12},{name: "Slice", damage: 50},{name: "Heal", damage: -50}]

var storage = []
var equipped = {}

window.onbeforeunload = function() { return "Your progress will be lost."; };
function enemyDamageCalc(){
    var minDamage = 5 + enemyLevel*2, maxDamage = 5 + enemyLevel*4
    var enemyDamage = Math.floor(Math.random() * (maxDamage - minDamage + 1) + minDamage)
    return enemyDamage
}
function enemyHealthCalc(){
    var minHealth = 20 + enemyLevel*5, maxHealth = 20 + enemyLevel*10
    enemyHealth = Math.floor(Math.random() * (maxHealth - minHealth + 1) + minHealth)
    return enemyHealth
}
function enemySpeedCalc(){
    var minSpeed = 10 + enemyLevel*3, maxSpeed = 10 + enemyLevel*5
    enemySpeed = Math.floor(Math.random() * (maxSpeed - minSpeed + 1) + minSpeed)
    return enemySpeed
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function moveGenerator(){
    //get damage
    var enemyDamage = enemyDamageCalc()
    //get name
    var moves = ["Juicers Demise","Megamind","Laxative Beam","Small Forward","Megabalista","Devastation Lazer","Ravana","Burial","Sacrilige","Stompinater"]
    var moveName = moves[Math.floor(Math.random() * moves.length)]
    return {name : moveName, damage : enemyDamage}
}//randomizer
function random(num){
    var res = 1 + Math.floor(Math.random()*num)
    return res
}
//thanks stackoverflow
function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}
function gradeCalc(){
    var rnd = random(75)
    var res = {grade:"FF",color:"#AFAFAF"}
    switch(true){
        case (rnd < 30):
            res= {grade:"F",color:"#838484"}
            break;
        case (rnd < 40):
            res= {grade:"D",color:"#405266"}  
            break; 
        case (rnd < 50):
            res= {grade:"C",color:"#226C71"}  
            break;
        case (rnd < 60):
            res= {grade:"B",color:"#23A388"}  
            break;
        case (rnd < 65):
            res= {grade:"A",color:"#85B728"}  
            break;
        case (rnd < 70):
            res= {grade:"S",color:"#C7A000"}  
            break;
        case (rnd < 72):
            res= {grade:"SS",color:"#C74000"}  
            break;
         case (rnd < 73):
            res= {grade:"???",color:"#841799"}  
            break;
        default:
            break;
    }
    return res
}
function setMenu(){
    var ui = document.getElementById("ui").style
    if(moves.length > 1){
        ui.paddingBottom="75px";
    }
    else{
        ui.paddingBottom="50px"
    }
}
function randomName(){
    var enemies = ["Man with a Sock","Soggy Juicer" ,"Werewolf","Goblin","Hobgoblin","Mole King","Molanoid","E.T.","Son of Yazanahar","Grotesque Guardian","Techno-tron","Silicon Baby","Red Champion"]
    var res = enemies[Math.floor(Math.random() * enemies.length)]
    return res
}
//go home
function home(){
    document.getElementById("dungeon-div").classList.add("hidden")
    document.getElementById("market").classList.add("hidden")
    document.getElementById("character").classList.add("hidden")
    document.getElementById("overlay").classList.add("hidden")

    //dungeon 
    document.getElementById("victory").classList.add("hidden")
    document.getElementById("drop-table-parent").classList.add("hidden")
    document.getElementById("death").classList.add("hidden")
    for(var i = 0; i < moves.length; i++){
        document.getElementById("character-moves").removeChild(document.getElementById("character-moves").lastElementChild)
    }
    drops=[]
    removeElementsByClass("tempData")
    document.getElementById("menu").classList.remove("hidden")
}


//DUNGEON!! 
//generate enemy and dungeon prerequisites
function generator(){
    setMenu()
    document.getElementById("menu").classList.add("hidden")
    document.getElementById("dungeon-div").classList.remove("hidden")

    //gen enemy
    enemyLevel = Math.floor((Math.random() * level) + 1)
    enemyHealth = enemyHealthCalc()
    enemySpeed= enemySpeedCalc()

    //possible names
    var enemyName = randomName()

    //set enemy content
    document.getElementById("enemy-stats").textContent = `Health: ${enemyHealth} Speed: ${enemySpeed} Level: ${enemyLevel}`
    document.getElementById("enemy-name").textContent = enemyName

    //set player content
    document.getElementById("character-name").textContent = username
    document.getElementById("character-stats").textContent = `Health: ${health} Speed: ${speed} Level: ${level}`

    loadDungeon()
}

function itemGenerator(){
    
    var style = random(4)-1
    var swordStyles = [{name:"Shank", damage:10, speed:5},{name:"Blade", damage:5, speed:0},{name:"Claymore", damage:10, speed:-5},{name:"Daggers", damage:0, speed:5}]
    var armourStyles = [{name:"Cardboard Box", health:15, speed:-6},{name:"Platemail", health:10, speed:0},{name:"Chainmail", health:20, speed:-5},{name:"Leather", health:0, speed:5}]
    var ringStyles = [{name:"Shaman Mask", health:5, damage:2, speed:2},{name:"Necklace", health:5, damage:2, speed:2},{name:"Ring", health:2, damage:1, speed:6},{name:"Gauntlets", health:20, damage:-3, speed:-6}]

    var swordStyle = swordStyles[style]
    var armourStyle = armourStyles[style]
    var ringStyle = ringStyles[style]

    var name = randomName()

    var grade = gradeCalc()
    var num = random(3)
    
    var damage = enemyDamageCalc()
    var health = enemyHealthCalc()
    var speed = enemySpeedCalc()
    
    damage = damage/2
    health = health/2
    speed = speed/2

    var res 
    switch(num){
        case 1:
            res = new sword(`${swordStyle.name} of the ${name}`, damage+swordStyle.damage, speed+swordStyle.speed, grade)
            break;
        case 2:
            res = new armour(`${armourStyle.name} of the ${name}`, health+armourStyle.health, speed+armourStyle.speed, grade)
            break;
        case 3:
            res = new ring(`${ringStyle.name} of the ${name}`, health+ringStyle.health, damage+ringStyle.damage, speed+ringStyle.speed, grade)
            break;
        default:
            window.alert("dis shit broke")
    }
    return res
}
//create moves
function loadDungeon(){
    var uiText = document.getElementById("ui-text")
    var ui = document.getElementById("ui").style
    var charMovesEle = document.getElementById("character-moves")
    for(var i = 0; i < moves.length; i++){
        let x = moves[i].damage
        let y = moves[i].name
        let button = document.createElement("button");
        button.innerHTML = y
        button.classList.add("move")
        button.onclick = async function playerAttack(){
            ui.paddingBottom="50px"
            var total = (x + damage)+Math.floor(Math.random() * speed/20)
            charMovesEle.classList.add("hidden")
            uiText.classList.remove("hidden")
            uiText.textContent = `You used ${y}, dealing ${total} damage!`
            enemyHealth -= total
            await sleep(2000)
            enemyTurn()
        }
        document.getElementById("character-moves").appendChild(button);
    }
    speed > enemySpeed ? playerTurn() : enemyTurn()
}
function playerTurn(){
    document.getElementById("character-stats").textContent = `Health: ${health} Speed: ${speed} Level: ${level}`
    if (health < 1) death()
    setMenu()
    document.getElementById("ui-text").classList.add("hidden")
    var d = document.getElementById("character-moves")
    d.classList.remove("hidden")
}
async function enemyTurn(){
    document.getElementById("enemy-stats").textContent = `Health: ${enemyHealth} Speed: ${enemySpeed} Level: ${enemyLevel}`
    if (enemyHealth < 1) victory()
    var enemyInfo = moveGenerator()
    document.getElementById("ui-text").textContent = (`${document.getElementById("enemy-name").textContent} uses ${enemyInfo.name}, dealing ${enemyInfo.damage}!`)
    health -= enemyInfo.damage
    await sleep(2000)
    playerTurn()
}

//possible exit functions
async function victory(){
    document.getElementById("overlay").classList.remove("hidden")
    document.getElementById("victory").classList.remove("hidden")
}
function death(){

}
function retreat(){
    document.getElementById("menu").classList.remove("hidden")
    document.getElementById("dungeon-div").classList.add("hidden")
    for(var i = 0; i < moves.length; i++){
        document.getElementById("character-moves").removeChild(document.getElementById("character-moves").lastElementChild)
    }
}

//drop system
function dropTable(){
    document.getElementById("drop-table-parent").classList.remove("hidden")
    document.getElementById("victory").classList.add("hidden")
    count = random(3)
    for(var i = 0; i < count; i++){
        drops.push(itemGenerator())
    }
    for(var i = 0; i < count; i++){
        storage.push(drops[i])
        let item = document.createElement("tr");
        item.classList.add("tempData")
        let dataName = document.createElement("td");
        dataName.innerHTML = drops[i].name
        let dataGrade = document.createElement("td");
        dataGrade.innerHTML = drops[i].grade.grade
        dataGrade.style = `color: ${drops[i].grade.color}`
        document.getElementById("drop-table").appendChild(item);
        item.appendChild(dataName)
        item.appendChild(dataGrade)
    }
}


//MARKET!!



//CHARACTER SCREEN!!

function addToInventory(){
    for(var i = storage.length-1; i > 0; i--){
        let item = document.createElement("tr");
        item.classList.add("tempData")
        let dataName = document.createElement("td");
        dataName.innerHTML = drops[i].name
        let dataGrade = document.createElement("td");
        dataGrade.innerHTML = storage[i].grade.grade
        dataGrade.style = `color: ${storage[i].grade.color}`
        document.getElementById("inventory-table").appendChild(item);
        item.appendChild(dataName)
        item.appendChild(dataGrade)
    }
}





class sword{
    constructor(name, damage, speed, grade){
       this.damage = damage 
       this.speed = speed
       this.grade = grade
       this.name = name
    }
}

class armour{
    constructor(name, health, speed, grade){
       this.health = health
       this.speed = speed
       this.grade = grade
       this.name = name
    }
}

class ring{
    constructor(name, health, speed, damage, grade){
       this.health = health
       this.speed = speed
       this.damage = damage
       this.grade = grade
       this.name = name
    }
}

