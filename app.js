monitorDOM = document.getElementById('monitor')
monitorRed = document.getElementById('monitor-red')
monitorGrey = document.getElementById('monitor-grey')

//Change this array
//to keys you want to test
comboKeys = ['W','A','S','D', 'Up', 'Down', 'Left', 'Right']

nextCombo = ['A','E','F','SPACE'];
loggedCombo = [];
comboPos = 0;
setMonitorText('');

//iterate combo
window.addEventListener("keydown", event  => {

    let newText = event.which != 32 ? `${getMonitorText()} ${event.key.toUpperCase()}` : `${getMonitorText()} SPACE`
    newText = newText.replace(/ARROW/gi,'' );

    if(nextCombo[comboPos].length > 1){
        if(event.code.toString().toUpperCase()
            .includes(nextCombo[comboPos].toUpperCase())){
            runIfComboGood(event, newText)
        }  else {
            endComboFailure();
        }

    } else {
        if(event.key.toUpperCase() == nextCombo[comboPos].toUpperCase()){
            runIfComboGood(event, newText)
        } else {
            endComboFailure()
        }
    }

    if(comboPos >= nextCombo.length)
        endComboSuccess()

})


function runIfComboGood(event, newText){
    comboPos++
    loggedCombo.push(event.key)
    setMonitorText(newText)
    if(loggedCombo.length === nextCombo.length)
        endComboSuccess();
}

function setMonitorText(txt, red=false){
    let redText = txt;
    let slicePoint = loggedCombo.length ? loggedCombo.length : 0;
    let greyText = nextCombo.slice(slicePoint).toString().replace(/,/g,' ').toUpperCase();
    console.log(slicePoint, loggedCombo)
    monitorRed.innerText = redText;
    monitorGrey.innerText = greyText;
    monitorDOM.style.classList = "";
}

function getMonitorText(){
    return monitorRed.innerText;
}


function endCombo(){
    nextCombo = generateNewCombo();
    console.log(nextCombo)
    comboPos = 0;
    loggedCombo = [];
    setMonitorText("")
}

function endComboSuccess(){
    endCombo()
}

function endComboFailure(){
    endCombo()
}

function generateNewCombo(){
    let combos = []
    let newLength = Math.floor(Math.random() * 4) + 1;
    for(let i = 0; i < newLength; i++)
        combos[i] = comboKeys[Math.floor(Math.random() * comboKeys.length)]

    return combos
}
