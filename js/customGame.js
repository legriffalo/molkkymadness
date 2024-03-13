let addbutton = document.getElementById('addrule');

//activates button to add rules
addbutton.addEventListener('pointerdown', (e)=>{
    let newrule = document.getElementById('playerrule').value
    let rules = gamestate.rules;
    let keyno = Object.keys(rules).length +1;
    console.log(keyno)
    // console.log(newrule)
    rules[keyno] = newrule;
    gamestate.rules = rules;
    console.log(gamestate)
    showRuleUpdates(gamestate)

})

//draws the rules that player has added
function showRuleUpdates(gamestate){
    let rules = Object.values(gamestate.rules);
    // console.log(Object.keys(gamestate.rules).map((item)=>parseInt(item)));

    let keys = Object.keys(gamestate.rules);
    let rulesShow = document.getElementById('ruleshow');

    rulesShow.innerHTML='';

    // console.log(gamestate)
    for(i=0;i < rules.length;i++){
        rulesShow.innerHTML+= `<p><button data-key = ${keys[i]} class = 'setup3'>remove</button> <span class = "ruletext"> rule ${keys[i]}: ${rules[i]}</span></p>`
    }
    //arm remove buttons
    let removebuttons = document.getElementById('ruleshow').getElementsByTagName('button');

    for(let i = 0; i < removebuttons.length ;i++){
        let removebutton = removebuttons[i];
        // add listener for delete
        removebutton.addEventListener('pointerdown', (e)=>{
            let parent = e.currentTarget.parentNode
            let keyNo = e.currentTarget.getAttribute("data-key")
            delete gamestate.rules[keyNo]
            parent.remove();
            let rulekeys = Object.keys(gamestate.rules)
            let rules = Object.values(gamestate.rules)
            rulekeys = [...Array(rulekeys.length).keys()].map(x => x+1);

            let obj = {}
            rulekeys.forEach((element, index) => {
                obj[element] = rules[index];
              });
            console.log(obj)
            console.log(gamestate)
            gamestate.rules = obj;
            showRuleUpdates(gamestate)
        })   
    }
    // moved as not approriate to add eventlistener each call!

    // let addbutton = document.getElementById('addrule')
    // addbutton.addEventListener('pointerdown', (e)=>{
    //     let newrule = document.getElementById('playerrule').value
    //     let rules = gamestate.rules;
    //     let keyno = Object.keys(rules).length +1;
    //     console.log(keyno)
    //     // console.log(newrule)
    //     rules[keyno] = newrule;
    //     gamestate.rules = rules;
    //     console.log(gamestate)
    //     showRuleUpdates(gamestate)

    // })

}

// add remove and manage custom ruleset
function customGame(gamestate){
    gamestate.rules = JSON.parse(localStorage.getItem('custom'))? JSON.parse(localStorage.getItem('custom')) : rulesets.custom;

    console.log('this one')
    console.log(gamestate.rules)
    //open  the custom rules section
    let edit = document.getElementById('rulesedit');
    edit.classList.toggle('hidden');
    showRuleUpdates(gamestate)

}