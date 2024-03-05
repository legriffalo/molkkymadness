//Update player statuses at the start/end of each turn using gamestate
function allPlayerStatuses(gamestate){
    //Load all variables could be simplified significantly
    let scoreboard = document.getElementById('allscores');
    let totals = gamestate.totals 
    let finished = document.getElementById('finished');
    let eliminatedList = document.getElementById('eliminatedlist');
    let podiumList = document.getElementById('podium');
    let winners = gamestate.winners;
    let finishers = gamestate.finished;
    let eliminatedPlayers = gamestate.eliminated;
    let keys = Object.keys(totals);
    let vals = Object.values(totals);
    
    // clear divs before update
    finished.innerHTML = '';
    eliminatedList.innerHTML = '';
    podium.innerHTML = '';

    // console.log('all eliminated players', eliminatedPlayers)
    // console.log('all players who finished', finishers)
    // update the game over screen
    winners.forEach((el)=>{
        podium.innerHTML += `<p> ${el}</p>`;});

    // console.log(finishers)
    // console.log(winners)

    finishers.forEach((el)=>{
        console.log(winners.indexOf(el))
        if(winners.indexOf(el)<0){ 
            finished.innerHTML += `<p> ${el}</p>`;
        }
    });
    
    eliminatedPlayers.forEach((el)=>{
        eliminatedList.innerHTML += `<p> ${el}</p>`;})

    scoreboard.innerHTML ='';
    // console.log(vals)
    for(let i = 0; i<keys.length;i++){
        let val = vals.length>0? vals[i]:0;
        // console.log(val)
        scoreboard.innerHTML+=`<p>${keys[i]} ${val}</p>`
    }
}
// check two strikes for player turn
function checkTwoStrikes(gamestate, player){
    try{
    let scores = gamestate.scores[player].slice(-2);
    // console.log(player, 'has the scores')
    // console.log(scores)
        if((','+ scores.toString()).includes('0,0')){
            console.log('OH NO 2 strikes');
            document.getElementById('twostrike').classList.toggle('hidden')
        }
    }
    catch{
        console.log('gameover or no scores')
    }
}
//Check if player shoudl be eliminated and update gamestate if needed
function checkElimination(gamestate, player){
    try{
        let scores = gamestate.scores[player].slice(-3);
        let players = gamestate.players;
        let index = players.indexOf(player);
        let eliminated = gamestate.eliminated;
        let totals = gamestate.totals

        // console.log(player, 'has the scores')
        // console.log(scores)
        if((','+ scores.toString()).includes('0,0,0')){
            console.log('OH NO elimation for:', player);
            document.getElementById('eliminated').classList.toggle('hidden')
            //new line
            // delete totals[player];
            totals[player] = '&#128128';
            players.splice(index,1);
            gamestate.players = players;
            gamestate.eliminated = [...eliminated,player];
            // console.log('players remaining',gamestate.players);
            // console.log('players eliminated',gamestate.eliminated)
        }
    }
    catch{console.log('either:under 3 turns no eliminations possible, or all eliminated')}

}
//Check if a player has reached 50
function checkFinish(gamestate,player){
    let players = gamestate.players;
    // let finished = document.getElementById('finished')
    let index = players.indexOf(player);
    let totals = gamestate.totals
    // console.log(totals)
    let total = totals[player];
    if(total== 50){
        // console.log('player reached 50')
        // delete totals[player]
        players.splice(index,1);
        gamestate.finished = [...gamestate.finished, player ]
        // console.log(gamestate);
        checkWinner(player);
    }
}
//Check if a player should be added to the winners list
function checkWinner(player){
    
    let winners = gamestate.winners;
    if(winners.length == 0 ){
        gamestate.winners = [...winners, player]
        // console.log('list of winners updated')
        // console.log(winners)
        

    // console.log(gamestate)
    }
    else if(gamestate.scores[winners[0]].length == gamestate.scores[player].length){
        gamestate.winners = [...winners, player]
        // console.log('tied another player')
    }
    else{
        // console.log('strong finish but no podium')
    }
}
