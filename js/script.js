var username = sessionStorage.getItem("username")

var level = 1
var exp = 1

var health = 102
var maxHealth = 100
var damage = 10
var speed = 10 
var gold = 0

var enemyLevel
var enemyHealth
var enemyMaxHealth
var enemySpeed
var enemyGrade

var drops = []
var moves = [{name: "Slam", damage: 5}]

var storage = []
var equipped = new Map()

var weapon = "weapon"
var armour = "armour"
var ring = "ring"

equipped.set(weapon,{name: "Dull Blade", damage: 1, speed: 1, grade: {grade:"FF", color:"#AFAFAF"},level:1}) 
equipped.set(armour,{name: "Worn Plate", health: 1, speed: 1, grade: {grade:"FF", color:"#AFAFAF"},level: 1}) 
equipped.set(ring,{name: "Rusted Ring", damage: 1, health: 1, speed: 1, grade: {grade:"FF", color:"#AFAFAF"},level: 1})

//css
var b = document.querySelector('body');


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
        case (rnd < 870):
            res= {grade:"A",color:"#85B728"}  
            break;
        case (rnd < 940):
            res= {grade:"S",color:"#C7A000"}  
            break;
        case (rnd < 970):
            res= {grade:"SS",color:"#C74000"}  
            break;
        case (rnd < 990):
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
    var enemies = ["Holder of ???","Man with a Sock","Soggy Juicer" ,"Werewolf","Goblin","Hobgoblin","Mole King","Molanoid","E.T.","Son of Yazanahar","Grotesque Guardian","Techno-tron","Silicon Baby","Red Champion"]
    var res = enemies[Math.floor(Math.random() * enemies.length)]
    return res
}
function advancedRandomName(){
    var enemies = ["Paragon","Exuvia","Primordial King","Colossus","Cyclops","Dragon","Griffin","Loch Ness Monster","Spinosaurous"]
    var res = enemies[Math.floor(Math.random() * enemies.length)]
    return res
}
//go home
function home(fromDungeon){
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
    if(fromDungeon === 1){
        damage = damage - equipped.get(weapon).damage - equipped.get(ring).damage
        maxHealth = maxHealth - equipped.get(armour).health - equipped.get(ring).health
        speed = speed - equipped.get(ring).speed - equipped.get(armour).speed - equipped.get(weapon).speed
    }
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
    enemyMaxHealth = enemyHealth
    enemySpeed= enemySpeedCalc(enemyLevel)

    //possible names
    var enemyName = randomName()

    //set enemy content
    document.getElementById("enemy-stats").textContent = `Health: ${enemyHealth} Speed: ${enemySpeed} Level: ${enemyLevel}`
    document.getElementById("enemy-name").textContent = enemyName

    //set player content
    damage = damage + equipped.get(weapon).damage + equipped.get(ring).damage
    maxHealth = maxHealth + equipped.get(armour).health + equipped.get(ring).health
    speed = speed + equipped.get(ring).speed + equipped.get(armour).speed + equipped.get(weapon).speed
    document.getElementById("character-name").textContent = username
    document.getElementById("character-stats").textContent = `Health: ${health}/${maxHealth} Speed: ${speed} Level: ${level}`
    
    loadDungeon()
}

function itemGenerator(){
    var grade = gradeCalc()
    var gradeVal = gradeStatVal(grade.grade)
    var name 

    var style = random(3)-1
    if(gradeVal > 5){
        var weaponStyles = [{name:"Saber", damage:15, speed:5, img: "sprites/weapon-saber.png"},{name:"Katana", damage:25, speed:0, img: "sprites/weapon-katana.png"},{name:"Cutless", damage:5, speed:10, img: "sprites/weapon-cutless.png"}]
        var armourStyles = [{name:"Studded Leather", health:40, speed:5, img: "sprites/armour-studded_leather.png"},{name:"Breastplate", health:65, speed:-5, img: "sprites/armour-breastplate.png"},{name:"Cloak", health:20, speed:10, img: "sprites/armour-cloak.png"}]
        var ringStyles = [{name:"Atlas", health:10, damage:5, speed:4, img: "sprites/ring-atlas.png"},{name:"Inscription", health:4, damage:2, speed:12, img: "sprites/ring-inscription.png"},{name:"Grimoire", health:40, damage:-6, speed:-12, img: "sprites/ring-grimoire.png"}]

        name = advancedRandomName()
    }
    else{
        var weaponStyles = [{name:"Blade", damage:5, speed:0, img: "sprites/weapon-blade.png"},{name:"Claymore", damage:10, speed:-5, img: "sprites/weapon-claymore.png"},{name:"Daggers", damage:0, speed:5, img: "sprites/weapon-daggers.png"}]
        var armourStyles = [{name:"Chainmail", health:20, speed:0, img: "sprites/armour-chainmail.png"},{name:"Platemail", health:40, speed:-10, img: "sprites/armour-platemail.png"},{name:"Leather", health:10, speed:5, img: "sprites/armour-leather.png"}]
        var ringStyles = [{name:"Necklace", health:5, damage:2, speed:2, img: "sprites/ring-necklace.png"},{name:"Ring", health:2, damage:1, speed:6, img: "sprites/ring-ring.png"},{name:"Gauntlet", health:20, damage:-3, speed:-6, img: "sprites/ring-gauntlet.png"}]

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
            res = new Weapon(`${weaponStyle.name} of the ${name}`, damage+weaponStyle.damage, speed+weaponStyle.speed, grade, enemyLevel, weaponStyle.img)
            break;
        case 2:
            res = new Armour(`${armourStyle.name} of the ${name}`, health+armourStyle.health, speed+armourStyle.speed, grade, enemyLevel, armourStyle.img)
            break;
        case 3:
            res = new Ring(`${ringStyle.name} of the ${name}`, health+ringStyle.health, damage+ringStyle.damage, speed+ringStyle.speed, grade, enemyLevel, ringStyle.img)
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
            var total = (x + damage)+Math.floor(Math.random() * speed/10)
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
    document.getElementById("character-stats").textContent = `Health: ${health}/${maxHealth} Speed: ${speed} Level: ${level}`
    if (health < 1) death()
    setMenu()
    document.getElementById("ui-text").classList.add("hidden")
    var d = document.getElementById("character-moves")
    d.classList.remove("hidden")
}
async function enemyTurn(){
    document.getElementById("enemy-stats").textContent = `Health: ${enemyHealth}/${enemyMaxHealth} Speed: ${enemySpeed} Level: ${enemyLevel}`
    if (enemyHealth < 1) victory()
    else{
        var enemyInfo = moveGenerator()
        document.getElementById("ui-text").textContent = (`${document.getElementById("enemy-name").textContent} uses ${enemyInfo.name}, dealing ${enemyInfo.damage}!`)
        health -= enemyInfo.damage
        await sleep(2000)
        playerTurn()
    }
}

//possible exit functions
async function victory(){
    document.getElementById("overlay").classList.remove("hidden")
    document.getElementById("victory").classList.remove("hidden")
    gold += Math.floor(enemyLevel*(Math.random()*10))
    document.getElementById("gold-count").innerHTML = gold
}
function death(){

}
function retreat(){
    damage = damage - equipped.get(weapon).damage - equipped.get(ring).damage
    maxHealth = maxHealth - equipped.get(armour).health - equipped.get(ring).health
    speed = speed - equipped.get(ring).speed - equipped.get(armour).speed - equipped.get(weapon).speed

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
        let itemData = document.createElement("td")
        let dataName = document.createElement("div");
        let dataImg = document.createElement("img");
        dataName.innerHTML = drops[i].name
        //icon
        dataImg.src = drops[i].img
        dataImg.style="display: inline-block; vertical-align: top;max-width:95px;max-height:95px;width: auto;height: auto; margin-bottom: 3%;"
        let dataGrade = document.createElement("td");
        dataGrade.innerHTML = drops[i].grade.grade
        dataGrade.style = `color: ${drops[i].grade.color}`
        document.getElementById("drop-table").appendChild(item);
        item.appendChild(itemData)
        itemData.appendChild(dataImg)
        itemData.appendChild(dataName)
        item.appendChild(dataGrade)
    }
}


//MARKET!!
function market(){
    document.getElementById("market").classList.remove("hidden")
    document.body.style.backgroundImage = "url(https://wallpaperaccess.com/full/255090.jpg) "
    var menu = document.getElementById("menu")
    menu.classList.add("hidden")

    
}


//CHARACTER SCREEN!!
function characterInfo(){
    document.getElementById("character").classList.remove("hidden")
    document.getElementById("menu").classList.add("hidden")
    addToInventory()
}
//inventory
function addToInventory(){
    document.getElementById("inventory").classList.remove("hidden")
    for(var i = 0; i < storage.length; i++){
        let item = document.createElement("tr");
        let deleteItem = document.createElement("tr");
        item.classList.add("tempData")
        //name
        let dataNameParent = document.createElement("td");
        let dataName = document.createElement("input");
        let dataImg = document.createElement("img");
        dataName.type = "button"
        dataName.value = storage[i].name
        dataName.id = i
        dataName.classList.add("inventoryItemName")
        dataImg.src = storage[i].img
        dataImg.style="display: inline-block; vertical-align: top;max-width:95px;max-height:95px;width: auto;height: auto; margin-right: 10px;"
        dataName.onclick = function openModal(){
            document.getElementById("item-view").classList.remove("hidden")
            document.getElementById("overlay").classList.remove("hidden")
            //SET 1
            var item = storage[dataName.id]
            //set css grade color
            b.style.setProperty('--gradecolor', `${item.grade.color}`);

            document.getElementById("item-modal").name=dataName.id
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
                if(modalDamage.style.fontSize < 80){
                    modalDamage.style=`font-size: ${50+item.damage/2}px`
                }
                document.getElementById("damage-label").classList.remove("hidden")
            }
            else{
                document.getElementById("damage-label").classList.add("hidden")
                modalDamage.style="display: none;"
            }
            if("health" in item){
                modalHealth.innerHTML = item.health
                if(modalHealth.style.fontSize < 80){
                    modalHealth.style=`font-size: ${50+item.health/2}px`
                }
                document.getElementById("health-label").classList.remove("hidden")
            }
            else{
                document.getElementById("health-label").classList.add("hidden")
                modalHealth.style="display: none"
            }
            modalSpeed.innerHTML = item.speed
            if(modalSpeed.style.fontSize < 80){
                modalSpeed.style=`font-size: ${50+item.speed/2}px`
            }
            //upgrade button
            var itemCost = (item.level*5)*gradeStatVal(item.grade.grade)
            document.getElementById("upgrade").innerHTML = `Upgrade: ${itemCost} gold`
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
        dataNameParent.appendChild(dataImg)
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
    document.getElementById("item-view").classList.add("hidden")
    document.getElementById("overlay").classList.add("hidden")
    docucument
}

function upgradeItem(){
    var item = storage[document.getElementById("item-modal").name]
    var itemCost = (item.level*5)*gradeStatVal(item.grade.grade)
    var nextItemCost = ((item.level+1)*5)*gradeStatVal(item.grade.grade)

    if(gold>=itemCost){
        var damage = Math.floor(damageCalc(item.level)/2)
        var health = healthCalc(item.level) 
        var speed = Math.floor(speedCalc(item.level)/2)
        const bonus = gradeStatVal(item.grade.grade)

        damage = Math.floor(damage/2 + bonus/2)
        health = health + bonus
        speed = Math.floor(speed/2 + bonus/2)


        //new stats
        gold-=itemCost
        document.getElementById("gold-count").textContent = gold
        item.level+=1
        if("damage" in item){
            item.damage = item.damage - damage
        }
        if("health" in item){
            item.health = item.health - health
        }
        item.speed = item.speed - speed
        document.getElementById("item-modal-level").innerHTML = item.level

        //set stats 
        var modalDamage = document.getElementById("item-modal-damage")
        var modalHealth = document.getElementById("item-modal-health")
        var modalSpeed = document.getElementById("item-modal-speed")

        var newDamage = Math.floor(damageCalc(item.level)/2)
        var newHealth = healthCalc(item.level) 
        var newSpeed = Math.floor(speedCalc(item.level)/2)

        newDamage = Math.floor(newDamage/2 + bonus/2)
        newHealth = newHealth + bonus
        newSpeed = Math.floor(newSpeed/2 + bonus/2)
    
        if("damage" in item){
            item.damage += newDamage
            modalDamage.innerHTML = item.damage
            if(modalDamage.style.fontSize < 80){
                modalDamage.style=`font-size: ${50+item.damage/2}px`
            }
            document.getElementById("damage-label").classList.remove("hidden")
        }
        if("health" in item){
            item.health += newHealth
            modalHealth.innerHTML = item.health
            if(modalHealth.style.fontSize < 80){
                modalHealth.style=`font-size: ${50+item.health/2}px`
            }
            document.getElementById("health-label").classList.remove("hidden")
        }

        item.speed += newSpeed
        modalSpeed.innerHTML = item.speed
        if(modalSpeed.style.fontSize < 80){
            modalSpeed.style=`font-size: ${50+item.speed/2}px`
        }
        document.getElementById("upgrade").innerHTML = `Upgrade: ${nextItemCost} gold`
    }
}

function equipItem(){
    var item = storage[document.getElementById("item-modal").name]
    var type = item.constructor.name.toLowerCase()
    
    equipped.set(type, item)
}





class Weapon{
    constructor(name, damage, speed, grade, level, img){
       this.damage = damage 
       this.speed = speed
       this.grade = grade
       this.name = name
       this.level = level
       this.img = img
    }
}

class Armour{
    constructor(name, health, speed, grade, level, img){
       this.health = health
       this.speed = speed
       this.grade = grade
       this.name = name
       this.level = level
       this.img = img
    }
}

class Ring{
    constructor(name, health, speed, damage, grade,level, img){
       this.health = health
       this.speed = speed
       this.damage = damage
       this.grade = grade
       this.name = name
       this.level = level
       this.img = img
    }
}

