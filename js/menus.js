let newgamebutton = document.getElementById('newgamebutton');
let newgamebackbutton = document.getElementById('newgamebackbutton');
let customgamebackbutton = document.getElementById('customgamebackbutton');
let customgamereadybutton = document.getElementById('customgamereadybutton');
// console.log(gamestarters)

newgamebutton.addEventListener('pointerdown', (e)=>{
    if(!gamestate.gameon){
    document.getElementById('newgamemenu').classList.toggle('hidden');
    }
    else{console.log('toggle stopped due to game in progress')}
});

newgamebackbutton.addEventListener('pointerdown', (e)=>{
    document.getElementById('newgamemenu').classList.toggle('hidden');
});

customgamebackbutton.addEventListener('pointerdown', (e)=>{
    document.getElementById('rulesedit').classList.toggle('hidden');
    document.getElementById('newgamemenu').classList.toggle('hidden');
});

customgamereadybutton.addEventListener('pointerdown', (e)=>{
    document.getElementById('rulesedit').classList.toggle('hidden');
    // document.getElementById('container').classList.toggle('hidden');
    console.log(gamestate.rules);
    // localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('custom', JSON.stringify(gamestate.rules));
    // localStorage.setItem('custom', gamestate.rules);

    startGame(gamestate);

});