// Variable set when userinput is required, 
// stops second half of game loop happening until score is input
let userInput = 1
// Run functions for pre scoring
function gameLoop1(gamestate) {
    console.log('cycle is starting...')
    console.log(gamestate)
    if(gamestate.gameon){
        let players = gamestate.players;
        let player = gamestate.currentPlayer? gamestate.currentPlayer : players[0];
        console.log(player, 'is starting their turn');
        preTurn(gamestate, player);
        checkTwoStrikes(gamestate, player)
        allPlayerStatuses(gamestate)

    }
    else{
        console.log('GAME OVER')   
     }


}
//run functions post score input
function gameLoop2(gamestate){
    if(gamestate.gameon){
    let players = gamestate.players;
    let player = gamestate.currentPlayer? gamestate.currentPlayer : players[0];
    console.log('player should still be ...',player )
    scoreUpdate(gamestate,player)
    applyScoring(gamestate,player)
    checkFinish(gamestate,player)
    checkElimination(gamestate,player)
    allPlayerStatuses(gamestate)
    checkGameOver(gamestate)
    nextPlayer(gamestate,players,player)

    console.log('loop completed')
    gameLoop1(gamestate)
    }
    else{
        console.log('gameover confirmed')
    }
}