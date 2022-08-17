var username = sessionStorage.getItem("username")

var level = 5
var exp = 1

var health = 100
var damage = 10
var defense = 0
var speed = 40

var moves = [{name: "Slam", damage: 12}]

var storage = []
var equipped = {}

window.onbeforeunload = function() { return "Your work will be lost."; };



//DUNGEON!! 
//generate enemy and player stats
function generator(){

    document.getElementById("menu").classList.add("hidden")
    document.getElementById("dungeon-div").classList.remove("hidden")

    //gen enemy
    var enemyLevel = Math.floor((Math.random() * level) + 1)
    var minHealth = 20 + enemyLevel*5, maxHealth = 20 + enemyLevel*10
    var minSpeed = 10 + enemyLevel*3, maxSpeed = 10 + enemyLevel*5
    //var minDamage = 5 + enemyLevel*2, maxDamage = 5 + enemyLevel*4

    var enemyHealth = 0 
    //var enemyDamage = 0
    enemySpeed = Math.floor(Math.random() * (maxSpeed - minSpeed + 1) + minSpeed)
    enemyHealth = Math.floor(Math.random() * (maxHealth - minHealth + 1) + minHealth)
    //enemyDamage = Math.floor(Math.random() * (maxDamage - minDamage + 1) + minDamage)

    var enemies = ["Werewolf","Goblin","Hobgoblin","Mole King","Molanoid","E.T","Samantha","Grotesque Guardian","Kirklander","Silicon Baby","Wet Blanket"]
    var enemyName = enemies[Math.floor(Math.random() * enemies.length)]

    document.getElementById("enemy-stats").textContent = `Health: ${enemyHealth} Level: ${enemyLevel} Speed: ${enemySpeed}`
    document.getElementById("enemy-name").textContent = enemyName

    //gen player
    document.getElementById("character-name").textContent = username
    document.getElementById("character-stats").textContent = `Health: ${health} Level: ${level}`

    speed > enemySpeed ? playerTurn() : enemyTurn
}
//if turn = 1
function playerTurn(){
    document.getElementById("character-moves").classList.remove("hidden")
    for(var i = 0; i < moves.length; i++){
        let btn = document.createElement("button");
        btn.innerHTML = moves[i].name;
        btn.classList.add("move")
        document.getElementById("character-moves").appendChild(btn);
    }
}
//enemy uses random attack
function enemyTurn(){
    
}
//call on enemy turn
function moveGenerator(){
    var moves = ["Megamind","Laxative Beam","Small Forward","Megabalista","Devastation Lazer","Ravana","Burial","Sacrilige","Stompinater"]
    var moveName = moves[Math.floor(Math.random() * moves.length)]
    var enemyMoveEle = document.getElementById("enemy-move").innerHTML
    document.getElementById("enemystats").textContent = `Health: ${health} Damage: ${damage}`
}

function retreat(){
    document.getElementById("menu").classList.remove("hidden")
    document.getElementById("dungeon-div").classList.add("hidden")
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

