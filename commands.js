function syncNation(nationName) {

    /* #region  copy dailies */
    for (const propertyName in gameStats.Nations[nationName]) {
        const property = gameStats.Nations[nationName][propertyName];
        let regex = new RegExp(`Future.+`)
        if (regex.test(propertyName)) {
            gameStats.Nations[nationName][propertyName.replace("Future", "")] = property;
        }
    }
    /* #endregion */

    /* #region  deal with automatic debt taking */

    //If budget is negative
    if (gameStats.Nations[nationName].Budget < 0) {
        //take -budget in debt, but no more than possible public debt
        let newDebt = min(gameStats.Nations[nationName].PossiblePublicDebt, -gameStats.Nations[nationName].Budget);
        //add it to effective debt
        gameStats.Nations[nationName].PublicDebtTaken += newDebt;
        //the debt taken added into budget
        gameStats.Nations[nationName].Budget += newDebt;
    }
    /* #endregion */
}

function syncNations() {
    for (const nationName in gameStats.Nations) {
        clearNewTroops(nationName);
        syncNation(nationName);
    }
}


function normalCommand(selection) {
    
    let value = commandParameters.Value.trim();
    let change;
    
    //implement check for stat that are objects, and disallow their change

    let selectionValue = (new Function(`return gameStats${selection}`))();

    if(typeof selectionValue == 'object'){
        let allProperties = "";

        for (const propertyName in selectionValue) {
            allProperties += `${propertyName}\n`
            
        }
        
        alert(
`Line: ${changeCommandIndex}: The currently selected thing, ${selection}, is an object not a value, and cannot be set
Did you mean to select any of the following within this?:

${allProperties}`)


    } 

    //implement check for stats that are forumulas, and disallow their change
    //
    //
    //


    //If value at all is a number, make sure the program understands this
    if(/^(\*?\d*\.?\d+%?)|(\*)$/.test(value)){
        let useDefault = false;
        if(/^\*/.test(value)){
            useDefault = true;
            value = value.replaceAll("*", "");
        }
        //If number to change by is written in percent. Divide that number by 100 
        if(/%/.test(value)){
            value = value.replace("%", "") / 100;
        }else{
            value = value.toString().length != 0 ? +value : 1;
        }

        if(useDefault){
            let found = false;
            
            for (const StatName in defaultStatValues) {
                if(!selection.includes(StatName)) continue;
                value *= defaultStatValues[StatName];
                found = true;
            }
            if(!found) alert(`a default value was not found for ${selection}`);
        }
    }

    //add
    if (commandParameters.Operand == '+' || commandParameters.Operand == 'add') {
        change = value;
        (new Function(`gameStats${selection} = parseFloat(gameStats${selection}) + ${value}`))();
    }
    //subtract
    else if (commandParameters.Operand == '-' || commandParameters.Operand == 'sub') {
        change = -value;
        (new Function(`gameStats${selection} = parseFloat(gameStats${selection}) - ${value}`))();
    }
    //set
    else if (commandParameters.Operand == '=' || commandParameters.Operand == 'set') {
        const previous = (new Function(`\
            if(typeof gameStats${selection} === 'undefined') return 'undefined';\
            return JSON.parse(JSON.stringify(\
                gameStats${selection}\
            ));`
        ))();
        change = isNaN(previous) ? true : value - previous;

        (new Function(`gameStats${selection} = isNaN('${value}') ? '${value}' : parseFloat('${value}')`))();

    } else {
        alert("At line " + (changeCommandIndex + 1) + "\r\n\r\nOperand wasn't understood: " + commandParameters.Operand + ".\r\n Aborting.");
        return;
    }
    specialOperation(selection, change);
}


function createStat(currentSelection, arg){
    let objectClass = "Object";
    if (/^\.Nations$/.test(currentSelection)) objectClass = "Nation";
    if (/^\.(Cultures|Religions)$/.test(currentSelection)) objectClass = "SocialBehaviour";
    if (/^\.Nations\..+\.(Culture|Religion)Groups$/.test(currentSelection)) objectClass = "SocialBehaviourGroup";
    if (/^\.Nations\..+\.Climates$/.test(currentSelection)) objectClass = "Climate";
    if (/^\.(Cultures|Religions)\..+\.Opinions$/.test(currentSelection)) objectClass = "Opinion";
    if (/^\.Trades$/.test(currentSelection)) objectClass = "Trade";
    if (arg.includes('=')) {
        let newName = arg.slice(0, arg.indexOf('=')).trim();
        let oldName = arg.slice(arg.indexOf('=') + 1).trim();
        evaluateNation(oldName);
        (new Function(`\
        gameStats${currentSelection}.${newName} = new ${objectClass}("${newName}");\
        /* Copy all property values from old to new */\
        for (const propertyName in gameStats${currentSelection}.${oldName}) {\
            if(propertyName == "GovernmentName") continue;\
            const propertyToCopy = gameStats${currentSelection}.${oldName}[propertyName];\
            gameStats${currentSelection}.${newName}[propertyName] = JSON.parse(JSON.stringify(propertyToCopy));\
        }`))();
    } else {
        (new Function(`gameStats${currentSelection}.${arg} = new ${objectClass}("${arg}");`))();

        if(objectClass == "Nation") evaluateNation(arg);
    }
}

function deleteStat(currentSelection, arg){
    let dottedStatName = arg;
    if(!/\.|\[/gm.test(dottedStatName[0])) dottedStatName = "." + dottedStatName;
    (new Function(`delete gameStats${currentSelection}${dottedStatName}`))();
}

let Shorthands = {}

Shorthands.Trade = function(parameters){
    parameters = parameters.split(/,|>/gm);
    let tradename = parameters[0].trim();
    let giver = parameters[1].trim();
    let receiver = parameters[2].trim();
    let stake = parameters[3].trim().split(/(?<![a-zA-Z])(?=[a-zA-Z])/gm);
    let amount = stake[0].trim();
    let resourceType = stake[1].trim();

    giver = correctAndSynonymCheck(`.Nations.${giver}`).split(".").pop();
    receiver = correctAndSynonymCheck(`.Nations.${receiver}`).split(".").pop();
    resourceType = correctAndSynonymCheck(`.Nations.${giver}.${resourceType}`).split(".").pop();


    if (typeof gameStats.Trades[tradename] !== 'undefined') {
        alert(`The name ${tradename} is already used in Trades.`);
        return;
    }

    gameStats.Trades[tradename] = new Trade();
    gameStats.Trades[tradename].giver = giver;
    gameStats.Trades[tradename].receiver = receiver;
    gameStats.Trades[tradename].resource = resourceType;
    gameStats.Trades[tradename].amount = amount;
}

Shorthands.PayDebt = function(parameter){
    if (isNaN(parameter)) {
        alert("The debt paid wasn't a number. Operation Aborted.");
        return;
    }

    let splitSelections = correctAndSynonymCheck(currentSelection).split(/\./gi);
    let correctedSelection = "." + splitSelections.join(".");

    if (splitSelections[splitSelections.length - 2] !== 'Nations') {
        alert("The current selection is not a nation. Cannot sync single nation.");
        return;
    }

    let natName = splitSelections[splitSelections.length - 1];

    (new Function(`evaluateNation("${natName}")`))();


    //EffectiveDebt formula isolated for Public Debt Taken 
    //EffectiveDebt = PublicDebtTaken * (1 + InterestRate);
    //EffectiveDebt / (1 + InterestRate)= PublicDebtTaken * (1 + InterestRate) / (1 + InterestRate);
    //PublicDebtTaken = EffectiveDebt / (1 + InterestRate);
    let interestRate = (new Function(`return gameStats${correctedSelection}.InterestRate`))();

    (new Function(`gameStats${correctedSelection}.PublicDebtTaken -= ${parameter} / (1 + ${interestRate})`))();
    (new Function(`gameStats${correctedSelection}.Budget -= ${parameter}`))();

    //excess paid back
    let publicDebtTakenValue = new Function(`return gameStats${correctedSelection}.PublicDebtTaken`);
    if (publicDebtTakenValue < 0) {
        //reset public debt taken to 0
        (new Function(`gameStats${correctedSelection}.PublicDebtTaken -= 0`))();
        //give back to budget
        (new Function(`gameStats${correctedSelection}.Budget += ${-publicDebtTakenValue})`))();
    }
}

Shorthands.Move = function(parameter){
    //to be implemented
}