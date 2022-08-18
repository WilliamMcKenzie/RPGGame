var username = sessionStorage.getItem("username")

var level = 5
var exp = 1

var health = 100
var damage = 10
var defense = 0
var speed = 40

var enemyLevel
var enemyHealth
var enemyDamage
var enemySpeed

var moves = [{name: "Slam", damage: 12}]

var storage = []
var equipped = {}

window.onbeforeunload = function() { return "Your work will be lost."; };

function moveGenerator(){
    //get damage
    var minDamage = 5 + enemyLevel*2, maxDamage = 5 + enemyLevel*4
    var enemyDamage = 0
    enemyDamage = Math.floor(Math.random() * (maxDamage - minDamage + 1) + minDamage)
    //get name
    var moves = ["Megamind","Laxative Beam","Small Forward","Megabalista","Devastation Lazer","Ravana","Burial","Sacrilige","Stompinater"]
    var moveName = moves[Math.floor(Math.random() * moves.length)]
    return {name : moveName, damage : enemyDamage}
}

//DUNGEON!! 
//generate enemy and dungeon prerequisites
function generator(){

    document.getElementById("menu").classList.add("hidden")
    document.getElementById("dungeon-div").classList.remove("hidden")

    //gen enemy
    enemyLevel = Math.floor((Math.random() * level) + 1)
    var minHealth = 20 + enemyLevel*5, maxHealth = 20 + enemyLevel*10
    var minSpeed = 10 + enemyLevel*3, maxSpeed = 10 + enemyLevel*5

    enemySpeed = Math.floor(Math.random() * (maxSpeed - minSpeed + 1) + minSpeed)
    enemyHealth = Math.floor(Math.random() * (maxHealth - minHealth + 1) + minHealth)

    //possible names
    var enemies = ["Werewolf","Goblin","Hobgoblin","Mole King","Molanoid","E.T","Samantha","Grotesque Guardian","Kirklander","Silicon Baby","Wet Blanket"]
    var enemyName = enemies[Math.floor(Math.random() * enemies.length)]

    //set enemy content
    document.getElementById("enemy-stats").textContent = `Health: ${enemyHealth} Speed: ${enemySpeed} Level: ${enemyLevel}`
    document.getElementById("enemy-name").textContent = enemyName

    //set player content
    document.getElementById("character-name").textContent = username
    document.getElementById("character-stats").textContent = `Health: ${health} Speed: ${speed} Level: ${level}`

    loadDungeon()
}
//create moves
function loadDungeon(){
    var enemyEleName = document.getElementById("enemy-name").textContent
    for(var i = 0; i < moves.length; i++){
        let x = moves[i].damage
        let y = moves[i].name
        let button = document.createElement("button");
        button.innerHTML = y
        button.classList.add("move")
        button.onclick = function playerAttack(){
            var total = (x + damage)+Math.floor(Math.random() * speed/20)
            window.alert(`You use ${y} on ${enemyEleName} for ${total} damage!`)
            enemyHealth -= total
            enemyTurn()
        }
        document.getElementById("character-moves").appendChild(button);
    }
    speed > enemySpeed ? playerTurn() : enemyTurn()
}
function playerTurn(){
    document.getElementById("character-stats").textContent = `Health: ${health} Speed: ${speed} Level: ${level}`
    if (health < 0) death()
    var d = document.getElementById("character-moves")
    d.classList.remove("hidden")
}
function enemyTurn(){
    document.getElementById("enemy-stats").textContent = `Health: ${enemyHealth} Speed: ${enemySpeed} Level: ${enemyLevel}`
    if (enemyHealth < 0) victory()
    var enemyInfo = moveGenerator()
    window.alert(`${document.getElementById("enemy-name").textContent} uses ${enemyInfo.name}, dealing ${enemyInfo.damage}!`)
    health -= enemyInfo.damage
    playerTurn()
}

//possible exit functions
function victory(){
    
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


//MARKET!!



//CHARACTER SCREEN!!







class sword{
    constructor(damage, speed){
       this.damage = damage 
       this.speed = speed
    }
    get damage(){
        return damage
    }
    get speed(){
        return speed
    }
    get health(){
        return 0
    }
    get defense(){
        return 0
    }
    get grade(){
        return this.calcGrade();
    }

    calcGrade(){
        var stat = speed + damage
        if(stat > 180){
            return "SS"
        }
        else if(stat > 150){
            return "S"
        }
        else if(stat > 120){
            return "A"
        }
        else if(stat > 90){
            return "B"
        }
        else if(stat > 60){
            return "C"
        }
        else if(stat > 30){
            return "D"
        }
        else if(stat > 0){
            return "F"
        }
    }
}

class armour{
    constructor(defense, health, speed){
       this.defense = defense
       this.health = health
       this.speed = speed
    }
    get defense(){
        return defense
    }
    get health(){
        return health
    }
    get speed(){
        return speed
    }
    get grade(){
        return this.calcGrade();
    }

    calcGrade(){
        var stat = health + defense
        if(stat > 180){
            return "SS"
        }
        else if(stat > 150){
            return "S"
        }
        else if(stat > 120){
            return "A"
        }
        else if(stat > 90){
            return "B"
        }
        else if(stat > 60){
            return "C"
        }
        else if(stat > 30){
            return "D"
        }
        else if(stat > 0){
            return "F"
        }
    }
}

class ring{
    constructor(defense, health, speed, damage){
       this.defense = defense
       this.health = health
       this.speed = speed
       this.damage = damage
    }
    get defense(){
        return defense
    }
    get health(){
        return health
    }
    get speed(){
        return speed
    }
    get damage(){
        return damage
    }
    get grade(){
        return this.calcGrade();
    }

    calcGrade(){
        var stat = health + defense + speed + damage
        if(stat > 180){
            return "SS"
        }
        else if(stat > 150){
            return "S"
        }
        else if(stat > 120){
            return "A"
        }
        else if(stat > 90){
            return "B"
        }
        else if(stat > 60){
            return "C"
        }
        else if(stat > 30){
            return "D"
        }
        else if(stat > 0){
            return "F"
        }
    }
}

