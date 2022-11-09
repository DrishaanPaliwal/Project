const TopStats = [
    {name: "AdministrativeEfficiency", displayName: "AdmEfficiency"},
    {name: "DailyBudget"},
    {name: "Stability"},
    {name: "Population", displayName: "PopulationSize"},
    {name: "Size", displayName: "Area", map: true},
    {name: "OverallNumbers", displayName: "ArmySize"},
    {name: "OverallShipCount", displayName: "NavySize"},
    {name: "ArmyQuality"},
    {name: "NavyQuality"},
    {name: "Literacy", displayName: "LiteracyPercent"},
    {name: "TradePower"},
    {name: "TradeProtection"},
    {name: "OverallIncome"},
    {name: "Production"},
    {name: "ResearchPointGain"},
];

document.querySelector("body").addEventListener("game load done", populateTopStatTable);

function populateTopStatTable(){
    
    let nationNames = Object.keys(gameStats.Nations);

    let topStatTitle = document.createElement("h1");
    let topStatTable = document.createElement("table");

    let body = document.querySelector("body");

    body.appendChild(topStatTitle);
    body.appendChild(topStatTable);

    topStatTitle.innerHTML = "Top Stats:";
    topStatTitle.style.marginTop = ".5em";
    topStatTitle.style.marginBottom = ".5em";

    topStatTable.style.borderCollapse = "collapse";
    
    let rows = [];

    //initialise rows
    for(let i = 0; i < nationNames.length + 1; i++){
        rows.push(document.createElement("tr"));
        topStatTable.appendChild(rows[i]);
    }

    //populate header row
    for (let c = 0; c < TopStats.length; c++) {
        const TopStat = TopStats[c];
        const TopStatTitle = document.createElement("th");
        
        TopStatTitle.innerText = TopStat.displayName != null ? TopStat.displayName : TopStat.name;
        TopStatTitle.colSpan = TopStat.map ? 4 : 3;
        TopStatTitle.style.backgroundColor = primaryColor;
        
        TopStatTitle.style.borderBottom = "5px black solid";
        TopStatTitle.style.borderTop = "5px black solid";
        if (c != 0) TopStatTitle.style.borderLeft = "5px black solid";
        rows[0].appendChild(TopStatTitle);
    }


    for(let c = 0; c < TopStats.length; c++){
        const TopStat = TopStats[c];
        //sort for this stat

        //populate column
        for (let r = 1; r < nationNames.length + 1; r++) {
            const NationName = nationNames[r - 1];
            const flagElement = document.createElement("td");
            const nameElement = document.createElement("td");
            const valueElement = document.createElement("td");
            
            
            const flag = document.createElement("img");
            flag.style.width = "30px";
            flag.src = gameStats.Nations[NationName].Flag;
            
            flagElement.appendChild(flag);
            
            nameElement.innerText = NationName;

            let statNam = TopStat.displayName;
            let statval = gameStats.Nations[NationName][statNam];
            if(statval != null){
                statval = ValueTypeFix(statNam, statval).value;
            }else{
                statNam = TopStat.name;
                statval = gameStats.Nations[NationName][statNam];
                if(statval != null){
                    statval = ValueTypeFix(statNam, statval).value;
                }else{
                    statval = "unknown";
                }
            }

            valueElement.innerText = statval;

            flagElement.style.backgroundColor = secondaryColor;
            nameElement.style.backgroundColor = secondaryColor;
            valueElement.style.backgroundColor = secondaryColor;
            
            flagElement.style.border = "1px black solid";
            nameElement.style.border = "1px black solid";
            valueElement.style.border = "1px black solid";
            
            if (c != 0) flagElement.style.borderLeft = "5px solid black";

            valueElement.style.whiteSpace = "noWrap";

            rows[r].appendChild(flagElement);
            rows[r].appendChild(nameElement);
            rows[r].appendChild(valueElement);
            if(TopStat.map != null){
                let imgButton = document.createElement("a");

                imgButton.href = `./nation?col=${gameStats.Nations[NationName].Color}`
                imgButton.target = "_blank";
                let img = document.createElement("img");
                img.src = "docs/assets/images/world/small_blank.png";
                img.title = `see ${NationName} specific area`;
                
                let imgcell = document.createElement("td");
                imgcell.style.backgroundColor = secondaryColor;
                imgcell.style.border = "1px black solid";
                
                imgButton.appendChild(img);
                imgcell.appendChild(imgButton);
                rows[r].appendChild(imgcell);
            }
        }
    }
}
