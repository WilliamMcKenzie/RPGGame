var username = sessionStorage.getItem("username")

var level = 0
var exp = 0

var health = 100
var damage = 10
var defense = 0
var speed = 40

var storage = []
var equipped = {}

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

function enemyGenerator(){
    var enemyLevel = Math.floor(Math.random() * level + 1)
    var minHealth = 20 + enemyLevel*5, maxHealth = 20 + enemeyLevel*10
    var minDamage = 5 + enemyLevel*2, maxDamage = 5 + enemyLevel*4

    var health 
    var damage
    health = Math.floor(Math.random() * (maxHealth - minHealth + 1) + minHealth)
    damage = Math.floor(Math.random() * (maxDamage - minDamage + 1) + minDamage)

    var enemies = ["Werewolf","Goblin","Hobgoblin","Mole King","Molanoid","E.T","Samantha","Grotesque Guardian","Kirklander","Silicon Baby","Wet Blanket"]
    var enemyName = enemies[Math.floor(Math.random() * enemies.length)]

    var enemyNameEle = document.getElementById("enemy-name").innerHTML
    var enemyStatsEle = document.getElementById("enemy-stats").innerHTML

    enemyNameEle = enemyName
    enemyStatsEle = `Health: ${health} Level: ${enemyLevel}`
}

function moveGenerator(){
    var moves = ["Megamind","Laxative Beam","Small Forward","Megabalista","Devastation Lazer","Ravana","Burial","Sacrilige","Stompinater"]
    var moveName = moves[Math.floor(Math.random() * moves.length)]
    var enemyMoveEle = document.getElementById("enemy-move").innerHTML
    enemyMoveEle = moveName
}








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

