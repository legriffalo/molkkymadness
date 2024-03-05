let splash = document.getElementById('splash');
let rules = document.getElementById('rulesbutton');
let reset = document.getElementById('resetbutton');
let rulebookbutton = document.getElementById('hiderulebookbutton');

//Add a listener to splash screen for game start
splash.addEventListener('pointerdown', (e)=>{
    splash.classList.add('hidden')
})
//Make rules togglable
rules.addEventListener('pointerdown', (e)=>{
    document.getElementById('rulebook').classList.toggle('hidden');
})
//Make rules closeable
rulebookbutton.addEventListener('pointerdown', (e)=>{
    document.getElementById('rulebook').classList.toggle('hidden');
})
//reset button
reset.addEventListener('pointerdown', (e)=>{
    location.reload();
})


