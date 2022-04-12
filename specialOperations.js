function specialOperation(selection, change){

    //New Recruitment handling
    if(
        /gameStats\.Nations\..+\.Levies/.test(selection) ||
        /gameStats\.Nations\..+\.LightInfantry/.test(selection) ||
        /gameStats\.Nations\..+\.HeavyInfantry/.test(selection) ||
        /gameStats\.Nations\..+\.Archers/.test(selection) ||
        /gameStats\.Nations\..+\.Crossbowmen/.test(selection) ||
        /gameStats\.Nations\..+\.LightCavalry/.test(selection) ||
        /gameStats\.Nations\..+\.HeavyCavalry/.test(selection) ||
        /gameStats\.Nations\..+\.EliteInfantry/.test(selection) ||
        /gameStats\.Nations\..+\.EliteCavalry/.test(selection) ||
        /gameStats\.Nations\..+\.HandCannon/.test(selection) ||
        /gameStats\.Nations\..+\.Musketeers/.test(selection) ||
        /gameStats\.Nations\..+\.Militia/.test(selection) ||
        /gameStats\.Nations\..+\.SiegeEquipment/.test(selection) ||
        /gameStats\.Nations\..+\.LargeSiegeEquipment/.test(selection) ||
        /gameStats\.Nations\..+\.Cannons/.test(selection) ||
        /gameStats\.Nations\..+\.LightShips/.test(selection) ||
        /gameStats\.Nations\..+\.MediumShips/.test(selection) ||
        /gameStats\.Nations\..+\.HeavyShips/.test(selection)
    ){
        //only record positive changes
        if(change <= 0) return;
        let newTroopSelection = selection.split(".").pop().push("New_" + selection[selection.split(".").length - 1].join("."));
        (new Function(`${newTroopSelection} += ${change}`))();
    }
    //Clearing War Penalty Stats If War Stat is false 
    else if(/gameStats\.Nations\..+\.AtWar/.test(selection)){
        if(change.toLowerCase() == 'offensive' || change.toLowerCase() == 'defensive') return;
        let warStatsToReset = []
        warStatsToReset.push(selection.split(".").pop().push("Casualities").join("."));
        warStatsToReset.push(selection.split(".").pop().push("Pillaging").join("."));
        warStatsToReset.push(selection.split(".").pop().push("Occupation").join("."));
        warStatsToReset.push(selection.split(".").pop().push("MinorBattles").join("."));
        warStatsToReset.push(selection.split(".").pop().push("MajorBattles").join("."));
        
        for (let i = 0; i < warStatsToReset.length; i++) {
            const warStatToReset = warStatsToReset[i];
            (new Function(`${warStatToReset} += 0`))();
        }
    }   
}