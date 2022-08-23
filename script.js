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
//for enemies
function enemyDamageCalc(level){
    var minDamage = 5 + level*2, maxDamage = 5 + level*4
    var enemyDamage = Math.floor(Math.random() * (maxDamage - minDamage + 1) + minDamage)
    return enemyDamage
}
function enemyHealthCalc(level){
    var minHealth = 20 + level*5, maxHealth = 20 + level*10
    enemyHealth = Math.floor(Math.random() * (maxHealth - minHealth + 1) + minHealth)
    return enemyHealth
}
function enemySpeedCalc(level){
    var minSpeed = 10 + level*3, maxSpeed = 10 + level*5
    enemySpeed = Math.floor(Math.random() * (maxSpeed - minSpeed + 1) + minSpeed)
    return enemySpeed
}
//for weapons
function damageCalc(level){
    var damage = Math.floor(((5 + level*2) + (5 + level*4))/2)
    return damage
}
function healthCalc(level){
    var health = Math.floor(((20 + level*5) + (20 + level*10))/2)
    return health
}
function speedCalc(level){
    var speed = Math.floor(((10 + level*3) + (10 + level*5))/2)
    return speed
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function moveGenerator(){
    //get damage
    var enemyDamage = enemyDamageCalc(enemyLevel)
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
    var rnd = random(1000)
    var res = {grade:"FF",color:"#AFAFAF"}
    switch(true){
        case (rnd < 200):
            res= {grade:"F",color:"#838484"}
            break;
        case (rnd < 400):
            res= {grade:"D",color:"#405266"}  
            break; 
        case (rnd < 530):
            res= {grade:"C",color:"#226C71"}  
            break;
        case (rnd < 720):
            res= {grade:"B",color:"#23A388"}  
            break;
        case (rnd < 850):
            res= {grade:"A",color:"#85B728"}  
            break;
        case (rnd < 900):
            res= {grade:"S",color:"#C7A000"}  
            break;
        case (rnd < 940):
            res= {grade:"SS",color:"#C74000"}  
            break;
         case (rnd < 970):
            res= {grade:"???",color:"#841799"}  
            break;
        default:
            break;
    }
    return res
}
function gradeStatVal(grade){
    var res = 0
    switch(grade){
        case "FF":
            return res++
        case "F":
            return res+2
        case "D":
            return res+3
        case "C":
            return res+4
        case "B":
            return res+5
        case "A":
            return res+6
        case "S":
            return res+7
        case "SS":
            return res+8
        case "???":
            return res+10
        default:
            return "poopu bumsqueaks"
    }
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
function advancedRandomName(){
    var enemies = ["Paragon","Exuvia","Primordial King","Colossus","Cyclops","Dragon","Griffin","Loch Ness Monster","Spinosaurous"]
    var res = enemies[Math.floor(Math.random() * enemies.length)]
    return res
}
//go home
function home(){
    document.getElementById("dungeon-div").classList.add("hidden")
    document.getElementById("market").classList.add("hidden")
    document.getElementById("character").classList.add("hidden")
    clearInventory()
    document.getElementById("overlay").classList.add("hidden")

    document.getElementById("victory").classList.add("hidden")
    document.getElementById("drop-table-parent").classList.add("hidden")
    document.getElementById("death").classList.add("hidden") 
    document.getElementById("menu").classList.remove("hidden")
    //dungeon
    if(document.getElementById("character-moves").childElementCount > 1)
    for(var i = 0; i < moves.length; i++){
        document.getElementById("character-moves").removeChild(document.getElementById("character-moves").lastElementChild) 
    }
    drops=[]
    removeElementsByClass("tempData")
}


//DUNGEON!! 
//generate enemy and dungeon prerequisites
function generator(){
    setMenu()
    document.getElementById("menu").classList.add("hidden")
    document.getElementById("dungeon-div").classList.remove("hidden")

    //gen enemy
    enemyLevel = Math.floor((Math.random() * level) + 1)
    enemyHealth = enemyHealthCalc(enemyLevel)
    enemySpeed= enemySpeedCalc(enemyLevel)

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
    var grade = gradeCalc()
    var gradeVal = gradeStatVal(grade.grade)
    var name 

    var style = random(3)-1
    if(gradeVal > 5){
        var weaponStyles = [{name:"Sabre", damage:15, speed:5},{name:"Katana", damage:25, speed:0},{name:"Cutless", damage:5, speed:10}]
        var armourStyles = [{name:"Studded Leather", health:40, speed:5},{name:"Breastplate", health:65, speed:-5},{name:"Cloak", health:20, speed:10}]
        var ringStyles = [{name:"Atlas", health:10, damage:5, speed:4},{name:"Inscription", health:4, damage:2, speed:12},{name:"Grimoire", health:40, damage:-6, speed:-12}]

        name = advancedRandomName()
    }
    else{
        var weaponStyles = [{name:"Blade", damage:5, speed:0},{name:"Claymore", damage:10, speed:-5},{name:"Daggers", damage:0, speed:5}]
        var armourStyles = [{name:"Platemail", health:20, speed:0},{name:"Chainmail", health:40, speed:-10},{name:"Leather", health:10, speed:5}]
        var ringStyles = [{name:"Necklace", health:5, damage:2, speed:2},{name:"Ring", health:2, damage:1, speed:6},{name:"Gauntlets", health:20, damage:-3, speed:-6}]

        name = randomName()
    }

    var weaponStyle = weaponStyles[style]
    var armourStyle = armourStyles[style]
    var ringStyle = ringStyles[style]

    var num = random(3)
    
    var damage = Math.floor(damageCalc(enemyLevel)/2)
    var health = healthCalc(enemyLevel) 
    var speed = Math.floor(speedCalc(enemyLevel)/2)
    var bonus = gradeStatVal(grade.grade)
    
    damage = Math.floor(damage/2 + bonus/2)
    health = health + bonus
    speed = Math.floor(speed/2 + bonus/2)
    
    var res 
    switch(num){
        case 1:
            res = new Weapon(`${weaponStyle.name} of the ${name}`, damage+weaponStyle.damage, speed+weaponStyle.speed, grade, enemyLevel)
            break;
        case 2:
            res = new Armour(`${armourStyle.name} of the ${name}`, health+armourStyle.health, speed+armourStyle.speed, grade, enemyLevel)
            break;
        case 3:
            res = new Ring(`${ringStyle.name} of the ${name}`, health+ringStyle.health, damage+ringStyle.damage, speed+ringStyle.speed, grade, enemyLevel)
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
    console.log(drops)
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
function characterInfo(){
    document.getElementById("character").classList.remove("hidden")
    document.getElementById("menu").classList.add("hidden")
    addToInventory()
}

function addToInventory(){
    document.getElementById("inventory").classList.remove("hidden")
    for(var i = 0; i < storage.length; i++){
        let item = document.createElement("tr");
        let deleteItem = document.createElement("tr");
        item.classList.add("tempData")
        //name
        let dataNameParent = document.createElement("td");
        let dataName = document.createElement("input");
        dataName.type = "button"
        dataName.value = storage[i].name
        dataName.id = i
        dataName.classList.add("inventoryItemName")
        dataName.onclick = function openModal(){
            document.getElementById("item-view").classList.remove("hidden")
            document.getElementById("overlay").classList.remove("hidden")
            //SET 1
            var item = storage[dataName.id]
            var modalName = document.getElementById("item-modal-name")
            var modalRank = document.getElementById("item-modal-rank")
            var modalType = document.getElementById("item-modal-type")
            var modalLevel = document.getElementById("item-modal-level")
            modalName.innerHTML = item.name
            modalRank.innerHTML = item.grade.grade
            modalRank.style=`color: ${item.grade.color};`
            modalType.innerHTML = item.constructor.name
            modalLevel.innerHTML = item.level

            modalName.style="color: #5C6667; font-size: 38px;"
            modalType.style ="color: #5C6667; font-size: 38px;"
            modalLevel.style ="color: #5C6667; font-size: 38px;"

            //SET2
            var modalDamage = document.getElementById("item-modal-damage")
            var modalHealth = document.getElementById("item-modal-health")
            var modalSpeed = document.getElementById("item-modal-speed")
            if("damage" in item){
                modalDamage.innerHTML = item.damage 
                modalDamage.style=`font-size: ${50+item.damage/2}px`
                document.getElementById("damage-label").classList.remove("hidden")
            }
            if("health" in item){
                modalHealth.innerHTML = item.health
                modalHealth.style=`font-size: ${50+item.health/2}px`
                document.getElementById("health-label").classList.remove("hidden")
            }
            modalSpeed.innerHTML = item.speed
            modalSpeed.style=`font-size: ${50+item.speed/2}px`
            if(item.grade.grade==="???"){
                document.getElementById("itme-model").style="background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(132,23,153,1) 49%, rgba(0,212,255,1) 100%);"
            }
            else{
                document.getElementById("itme-model").style="background-color:background: aliceblue;"
            }
        }

        //grade
        if(storage[i].grade.grade === "???"){
            dataName.style=`color: ${storage[i].grade.color}`
        }
        let dataGrade = document.createElement("td");
        dataGrade.innerHTML = storage[i].grade.grade
        dataGrade.style = `color: ${storage[i].grade.color}`
        //delete button
        let dataDeleteParent = document.createElement("td");
        let dataDelete = document.createElement("input");
        dataDelete.type = "button"
        dataDelete.value = "X"

        dataDelete.id="deleteButton"

        dataDelete.onclick = function deleteRow() {
            var p=dataDelete.parentNode.parentNode;
            var d=dataGrade.parentNode;
            p.parentNode.removeChild(p);
            d.parentNode.removeChild(d);
            storage.splice(parseInt(dataName.id),1)
        }   
        //add them
        document.getElementById("inventory-table").appendChild(item);
        item.appendChild(dataNameParent)
        dataNameParent.appendChild(dataName)
        item.appendChild(dataGrade)
        document.getElementById("delete-button-table").appendChild(deleteItem);
        deleteItem.appendChild(dataDeleteParent)
        dataDeleteParent.appendChild(dataDelete)
    }
}
function clearInventory(){
    var table = document.getElementById("delete-button-table")
    while(table.childElementCount > 0){
        table.removeChild(table.lastElementChild)
    }
}

function closeModal(){

}






class Weapon{
    constructor(name, damage, speed, grade, level){
       this.damage = damage 
       this.speed = speed
       this.grade = grade
       this.name = name
       this.level = level
    }
}

class Armour{
    constructor(name, health, speed, grade, level){
       this.health = health
       this.speed = speed
       this.grade = grade
       this.name = name
       this.level = level
    }
}

class Ring{
    constructor(name, health, speed, damage, grade,level){
       this.health = health
       this.speed = speed
       this.damage = damage
       this.grade = grade
       this.name = name
       this.level = level
    }
}

