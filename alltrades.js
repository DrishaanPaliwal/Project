function loadAllTrades(){
    let alltrades = gameStats.Trades;
    let table = document.createElement("table");
    document.body.appendChild(table);

    let headerRow = document.createElement("tr");
    let headerIsEmpty = true;
    table.appendChild(headerRow);
    let thName = document.createElement("th");
    thName.innerHTML = "Name";
    headerRow.appendChild(thName);

    console.log(alltrades);

    for (const tradeName in alltrades) {
        const trade = alltrades[tradeName];
        let tradeRow = document.createElement("tr");
        let tdTradeName = document.createElement("td");
        tdTradeName.innerText = tradeName;
        tradeRow.appendChild(tdTradeName);
        for (const key in trade) {
            const value = trade[key];
            if(headerIsEmpty) {
                let th = document.createElement("th");
                th.innerText = key;
                headerRow.appendChild(th);
            }
            let td = document.createElement("td");
            td.innerHTML = value;
            tradeRow.appendChild(td);
        }
        headerIsEmpty = false;
        table.appendChild(tradeRow);
    }
}
