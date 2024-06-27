// Intial set up 
function initialiseGame(gamestate){
//function to initialise game set visual properties etc
document.getElementById('newgamemenu').classList.toggle('hidden');
// set up scores object in gamestate
gamestate.scores = arrayToObj(gamestate.players,filler = []);
gamestate.totals = arrayToObj(gamestate.players,filler = 0);

// console.log(gamestate)
if(gamestate.rules == "custom"){
    document.getElementById('task').classList.remove('hidden');

    customGame(gamestate)
}
else if(gamestate.rules == "standard"){
    document.getElementById('task').classList.remove('hidden');

    let choice = String(gamestate.rules);
    gamestate.rules = rulesets[choice]
    // console.log(choice)
    startGame(gamestate);

}
else{ 
    document.getElementById('task').classList.add('hidden');
    startGame(gamestate);
}
}
// Start the game loop
function startGame(gamestate){
    gamestate.gameon = true;
    document.getElementById('newgamebutton').classList.add('hidden')
    document.getElementById('container').classList.toggle('hidden');
    document.getElementById('buttons').classList.toggle('minimised');
    // preTurn(gamestate)
    // showScores(gamestate)
    gameLoop1(gamestate);
}
// For custom and Mlkky madness selects rule to apply each turn
function ruleSelect(gamestate){
    // add call to dice roller function?
    let rules = gamestate.rules;
    let rand = Math.floor(Math.random()*Object.keys(rules).length)+1;
    // console.log(rand)
    // console.log(rules[rand])
    return [rand, rules[rand]];

}
// checks for *num* pattern and random generates it
function insertRand(rule){
    let splitUp = String(rule).split('*');
    console.log('LLOOOOOOKKKKKK')
    console.log(splitUp);
    if(splitUp.length>1){
        console.log(splitUp.length)
        console.log('rule has rands', splitUp)
        splitUp.forEach((el,i)=>{
            i%2!=0? splitUp[i] = Math.floor(Math.random()*parseInt(splitUp[i]))+1: splitUp[i];
        })

        rule = splitUp.join(' ')
        
    }
    else{
        console.log('no rands')
    }
    return String(rule)
}

// Function to manage updates to gamestate before each turn
function preTurn(gamestate, player){
    document.getElementById('player').innerHTML = player;
    //get rule
    let rule = ruleSelect(gamestate);
    rule[1] = insertRand(rule[1]);
    console.log('rule', rule)
    // set next player 
    let players = gamestate.players;
    let index = players.indexOf(player);
    let indexNext = (index+1)%players.length
    let nextPlayer = players[indexNext];
    
    document.getElementById('nextplayer').innerHTML = nextPlayer;
    document.getElementById('roll').innerHTML =rule[0];
    console.log('rule is showing as ', rule[1])
    document.getElementById('turntask').innerHTML = rule[1];    
    // recently added 25/06/24
    
    document.getElementById('turninput').value='';

    }
// Cycles through players
function scoreUpdate(gamestate,player){
    let scores = gamestate.scores;
    let players = gamestate.players;
    // let player = gamestate.currentPlayer? gamestate.currentPlayer : players[0];
    let score = document.getElementById('turninput').value;
    gamestate.scores[player] = [...gamestate.scores[player],parseInt(score)];
    console.log(scores);
    
    //calls to check the scoring etc

}
// Move gamestate to next player
function nextPlayer(gamestate,players,player){
    // applyScoring(gamnestate)
    let index = players.indexOf(player);
    let indexNext = (index+1)%players.length
    let nextPlayer = players[indexNext];
    document.getElementById('nextplayer').innerHTML = nextPlayer;
    gamestate.currentPlayer = nextPlayer;
    // console.log(nextPlayer)
}
// Converts arrays to objects in gamestate initialisation
function arrayToObj(array, filler){
    const obj = {};
    for(const x of array){ obj[String(x)] = filler};
    return obj
}
// Calculates scores for each player at their turn end and updates scores
// Calls the scoreboard update to add scores to GUI
function applyScoring(gamestate, player){
    let scores = gamestate.scores[player];
    let total = gamestate.totals[player];
    let totals = gamestate.totals
    // console.log(player)

    // console.log(scores)
    
    total = scores.length>0? scores.reduce( (accumulator, currentValue) => 
    {return accumulator + currentValue >50? 25: accumulator + currentValue;}):0;

    // console.log(total)
    totals[player] = total;
    
}
//check for gameover and updat gamestate accordingly
function checkGameOver(gamestate){
    let players = gamestate.players;
    // console.log(players.length>0);
    let gameover = document.getElementById('gameover')
    
    if(players.length == 0){
        gamestate.gameon = false;
        gameover.classList.toggle('hidden');
    }
}