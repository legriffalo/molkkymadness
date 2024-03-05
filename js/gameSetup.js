// Gamestate testing, make sure to clear for deployment!!!

let gamestate = {'gameon':false,
                'players':['geoff','barry','crazy jim'], 
                'rules':null, 
                'currentPlayer':null, 
                'scores':{}, 
                'totals':{}, 
                'finished':[], 
                'eliminated':[],
                'winners':[]
            };

let players = gamestate.players
// let name = document.getElementById('playername').value;
let added = document.getElementById('addedplayers');

added.innerHTML ='';
for(let i=0; i < players.length;i++){
    added.innerHTML += `<p class = 'player'>${players[i]}<button class = 'setup2'>remove</button></p>`
    }

    let buttons = document.getElementById('addedplayers').getElementsByTagName('button');
    // window.alert(buttons.length)
    for(let i = 0; i < buttons.length ;i++){
        let button = buttons[i];
        
        button.addEventListener('pointerdown', (e)=>{
            let parent = e.currentTarget.parentNode
            console.log(parent)
            let player = parent.textContent.replace('remove','');
            
            players.splice(players.indexOf(player),1);
            console.log(players);
            parent.remove();
        })
        
    }

//Activate buttons for gameSetup
let newplayer = document.getElementById('addplayer');
let gamestarters = document.getElementsByClassName('gamestarters');
let turnchange = document.getElementById('turnend');
let warnings = document.getElementsByClassName('warning');
let restartsamebutton = document.getElementById('restartsamebutton');
let resetgameendbutton = document.getElementById('resetgameendbutton');

// use to enforce inputs of scores
function checkValid(target){
    return document.getElementById(target).value ? 1 : 0;
}
//adding new players to the game + previewing on screen
newplayer.addEventListener('pointerdown', ()=>{
    let players = gamestate.players
    let name = document.getElementById('playername').value;
    let added = document.getElementById('addedplayers');


    //window.alert(name);
    if(!name){
        window.alert('input a name!')
        }
    else if(players.indexOf(name)!=-1){
        window.alert(players.indexOf(name))
        window.alert('name already taken!')
        }
    else{
        document.getElementById('playername').value = '';
        //update game state
        players.push(name);
        added.innerHTML ='';
        
        for(let i=0; i < players.length;i++){
            added.innerHTML += `<p class = 'player'>${players[i]}<button class = 'setup2'>remove</button></p>`
        }
    //arm remove buttons
    let buttons = document.getElementById('addedplayers').getElementsByTagName('button');
    // window.alert(buttons.length)
    for(let i = 0; i < buttons.length ;i++){
        let button = buttons[i];
        
        button.addEventListener('pointerdown', (e)=>{
            let parent = e.currentTarget.parentNode
            console.log(parent)
            let player = parent.textContent.replace('remove','');
            
            players.splice(players.indexOf(player),1);
            console.log(players);
            parent.remove();
        })
        
    }
}
});
// add listeners to the start game buttons
for(let i = 0;i<gamestarters.length;i++){
    let starter = gamestarters[i];
    starter.addEventListener('pointerdown',(e)=>{
        let selected = e.currentTarget.getAttribute("data-rule-set")
        gamestate.rules = selected;
        // Pass on settings to initialise function
        initialiseGame(gamestate)
    })
}
//Activate listeners for input button
turnchange.addEventListener('pointerdown', (e)=>{
    if(checkValid('turninput')){
    userInput = 1;
    gameLoop2(gamestate)
     }
    else{
        window.alert('you must input a score!')
    }
})
//Add the listeners to warning divs to allow for touch to hide
for(let i = 0;i<warnings.length;i++){
    warnings[i].addEventListener('pointerdown',(e)=>{
        e.currentTarget.classList.add('hidden');
})}


// restart with same players
restartsamebutton.addEventListener('pointerdown',(e)=>{
    //reset gamestate to have players in winner -> loser order
    let completed = [...gamestate.winners]
    gamestate.finished.forEach((el)=>gamestate.winners.indexOf(el)<0? completed = [...completed, el]:null)
    // console.log(completed)
    gamestate.players = [...completed,...gamestate.eliminated]

    console.log(gamestate)
    //reset the rest of the gamestate and initialise game
    gamestate.rules = null; 
    gamestate.currentPlayer = null;
    gamestate.scores = {} 
    gamestate.totals = {} 
    gamestate.finished = [] 
    gamestate.eliminated =[];
    gamestate.winners = [];
    console.log(gamestate)

    let players = gamestate.players
// let name = document.getElementById('playername').value;
    let added = document.getElementById('addedplayers');

    added.innerHTML ='';
    for(let i=0; i < players.length;i++){
        added.innerHTML += `<p class = 'player'>${players[i]}<button class = 'setup2'>remove</button></p>`
    }

    let buttons = document.getElementById('addedplayers').getElementsByTagName('button');
    // window.alert(buttons.length)
    for(let i = 0; i < buttons.length ;i++){
        let button = buttons[i];
        
        button.addEventListener('pointerdown', (e)=>{
            let parent = e.currentTarget.parentNode
            console.log(parent)
            let player = parent.textContent.replace('remove','');
            
            players.splice(players.indexOf(player),1);
            console.log(players);
            parent.remove();
        })
        
    }

    let gameover = document.getElementById('gameover')
    gameover.classList.toggle('hidden');
    document.getElementById('newgamemenu').classList.toggle('hidden');
    document.getElementById('container').classList.toggle('hidden');
    document.getElementById('buttons').classList.toggle('minimised')

})