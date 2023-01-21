const WIDTH = 8192;
const HEIGHT = 3365;

document.querySelector("body").addEventListener("game load done", scanMaps);

const progressText = document.createElement("h4");
progressText.innerText = "Loading...";
//nation climates
const canvas = document.createElement("canvas");
const resourceCanvasContainer = document.createElement("div");
const PromptMissingInfoContainer = document.createElement("div");
const PromptedMissingInfoCanvas = document.createElement("canvas");

canvas.width = WIDTH;
canvas.height = HEIGHT;

PromptedMissingInfoCanvas.width = WIDTH;
PromptedMissingInfoCanvas.height = HEIGHT;

canvas.style.width = "10vw"
PromptedMissingInfoCanvas.style.width = "60vw"


const PromptLabel = document.createElement("label");
PromptLabel.style.fontWeight = "Bold";

const PromptField = document.createElement("input");
PromptField.type = "text";

const submitButton = document.createElement("input");
submitButton.type = "button";
submitButton.value = "Submit name";

PromptMissingInfoContainer.appendChild(PromptLabel);
PromptMissingInfoContainer.appendChild(document.createElement("br"));
PromptMissingInfoContainer.appendChild(PromptField);
PromptMissingInfoContainer.appendChild(submitButton);
PromptMissingInfoContainer.appendChild(document.createElement("br"));
PromptMissingInfoContainer.appendChild(PromptedMissingInfoCanvas);

PromptMissingInfoContainer.hidden = true;

document.body.appendChild(progressText);
document.body.appendChild(document.createElement("br"));
document.body.appendChild(canvas);
document.body.appendChild(document.createElement("br"));
document.body.appendChild(PromptMissingInfoContainer);

let autoGeneratedCffTextFieldLabel = document.createElement("Label");
autoGeneratedCffTextFieldLabel.textContent = "Auto Generated cff comes here:";
autoGeneratedCffTextFieldLabel.style.fontWeight = "Bold";
let autoGeneratedCffTextField = document.createElement("textarea");

autoGeneratedCffTextField.style.fontFamily = 'Consolas, Courier New, Courier, monospace';
autoGeneratedCffTextField.rows = 5;
autoGeneratedCffTextField.cols = 50;

document.body.appendChild(document.createElement("br"));
document.body.appendChild(autoGeneratedCffTextFieldLabel);
document.body.appendChild(document.createElement("br"));
document.body.appendChild(autoGeneratedCffTextField);


async function prepareData(path){
    let Img = new Image(WIDTH, HEIGHT);
    Img.src = path;
    let done = false;
    Img.onload = function () {
        canvas.getContext("2d").clearRect(0, 0, WIDTH, HEIGHT);
        canvas.getContext("2d").drawImage(Img, 0, 0, WIDTH, HEIGHT);
        done = true;
    }

    while(!done){
        await new Promise(resolve => setTimeout(resolve));
    }

    return canvas.getContext("2d").getImageData(0, 0, WIDTH, HEIGHT).data;
}


async function scanMaps() {
    
    let nationData, climateData, cultureData, religionData = null;

    nationData = await prepareData("./docs/assets/images/world/Nations.png")
    climateData = await prepareData("./docs/assets/images/world/Climates.png")
    coastData = await prepareData("./docs/assets/images/world/CoastalLand.png")
    cultureData = await prepareData("./docs/assets/images/cultures.png")
    religionData = await prepareData("./docs/assets/images/religions.png")

    //wait until image datas are loaded
    while(nationData == null || 
        climateData == null || 
        cultureData == null || 
        religionData == null){
        await new Promise(resolve => setTimeout(resolve));
    }

    const colorToClimateMap = {
        "Col103c6d": "Ocean",
        "Col808080": "PolarDesert",
        "Col004a7f": "TaigaAndTundra",
        "Colffac7f": "MontaneForest",
        "Colff6a00": "Medditereanian",
        "Col7f3300": "Arid",
        "Colc8ff7c": "Steppe",
        "Col4cff00": "Moderate",
        "Col5b7f00": "SubTropical",
        "Col008010": "Tropical",
        "Colc1bd3e": "Savanna",
        "Colff0000": "Mountainous",
        "Colfffb99": "Desert",
        "Colffd802": "CoastalDesert"
    }

    let unassignedClimatePixelAssumption = "Moderate";
    let unassignedCulturePixelAssumption = "Foreign";
    let unassignedReligionPixelAssumption = "Pagan";

    let nationColorProperties = fillInColorProperties(gameStats.Nations);
    let cultureColorProperties = fillInColorProperties(gameStats.Cultures);
    let religionColorProperties = fillInColorProperties(gameStats.Religions);
    let colorToNationMap = {};

    autoGeneratedCffTextField.value += "<... > Nations\n\n";

    //double checking that all nations have a defined colour

    let then = Date.now();
    for(let i = 0; i < nationData.length / 4; i++){
        //let the site know you're still alive
        let now = Date.now();
        if (now - then > 500) {
            progressText.innerText = `Double checking colours of nations:\n\n${i} out of ${nationData.length / 4} pixels read.\nThat's row ${Math.floor(i / WIDTH)} out of ${HEIGHT}`
            await new Promise(resolve => setTimeout(resolve));
            then = now;
        }

        //if the nationData pixel is transparent, skip
        if(nationData[i*4+3] == 0) continue;
        
        let foundNationColor = rgbToHex([nationData[i*4], nationData[i*4+1], nationData[i*4+2]]);

        //skip if not a new color
        if("Col" + foundNationColor in colorToNationMap) continue;

        let foundNation = nationColorProperties.find(element => element.color == foundNationColor);
        if(typeof foundNation === 'undefined') {

            let nationNamePrompt = "";
            
            PromptMissingInfoContainer.hidden = false;
            PromptLabel.innerText = `The color #${foundNationColor} did not have a matching nation. Which nation is it?\n(Give the name it has in stats)`;

            let dat = new Uint8ClampedArray(nationData.length);
            for (let j = 0; j < nationData.length; j++) {
                dat[j] = nationData[j];
                
            }
            for(let j = 0; j < dat.length / 4; j++){
                if(rgbToHex([climateData[j*4], climateData[j*4+1], climateData[j*4+2]]) == '000000'){
                    dat[j*4] = 128;
                    dat[j*4+1] = 128;
                    dat[j*4+2] = 255;
                    dat[j*4+3] = 255;
                }
                else if(rgbToHex([nationData[j*4], nationData[j*4+1], nationData[j*4+2]]) != foundNationColor){
                    dat[j*4] = 0;
                    dat[j*4+1] = 0;
                    dat[j*4+2] = 0;
                    dat[j*4+3] = 0;
                }
                
            }
            dat = new ImageData(dat, WIDTH);
        
            PromptedMissingInfoCanvas.getContext("2d").putImageData(dat, 0, 0);

            submitButton.addEventListener("click", function () {
                nationNamePrompt = PromptField.value;
                PromptMissingInfoContainer.hidden = true;
            });

            console.log("ok, just waiting now :)");

            //idle until nationNamePrompt answered;
            let then = Date.now();
            while(nationNamePrompt == ""){
                let now = Date.now();
                if (now - then > 17) {
                    await new Promise(resolve => setTimeout(resolve));
                    then = now;
                }
            }

            foundNation = {
                color: foundNationColor, 
                name: nationNamePrompt
            };

            autoGeneratedCffTextField.value += `= "${foundNationColor}" ${foundNation.name}.Color\n`
        }

        colorToNationMap["Col" + foundNation.color] = foundNation.name;

    }


    //find nations' climates
    let climateDistribution = {};
    

    then = Date.now();
    for (let i = 0; i < nationData.length / 4; i++) {
        
        let x = i % WIDTH;
        let y = Math.floor(i / WIDTH);

        //let the site know you're still alive
        let now = Date.now();
        if (now - then > 500) {
            progressText.innerText = `Assigning every nation' climate sizes:\n\n${i} out of ${nationData.length / 4} pixels read.\nThat's row ${Math.floor(i / WIDTH)} out of ${HEIGHT}`
            await new Promise(resolve => setTimeout(resolve));
            then = now;
        }
        
        let nationCol;
        let climateCol;

        let nationDataEmpty = nationData[i*4+3] == 0;
        let climateDataEmpty = climateData[i*4+3] == 0;

        //if the pixel in nationData is transparent, skip
        if(nationDataEmpty) continue;
        //if the pixel in climateData is transparent, warn
        else if(climateDataEmpty) {
            console.warn(`The pixel (${x}, ${y}) is transparent in the climate image, but not the nation image. It is (${nationData[i*4]}, ${nationData[i*4+1]}, ${nationData[i*4+2]}, ${nationData[i*4+3]}) in the nation image. Investigate this. For now ${unassignedClimatePixelAssumption} is assumed`);   
        }

        nationCol = "Col" + rgbToHex([nationData[i*4], nationData[i*4+1], nationData[i*4+2]]);
        climateCol = "Col" + rgbToHex([climateData[i*4], climateData[i*4+1], climateData[i*4+2]]);
        
        if(typeof colorToClimateMap[climateCol] === 'undefined'){
            console.warn(`The pixel (${x}, ${y}) is of a colour not found on the colorToClimateMap. Investigate this. For now undefined${climateCol} is assigned`);
        }

        const NationOfPixel = colorToNationMap[nationCol];
        const ClimateOfPixel = climateDataEmpty ? unassignedClimatePixelAssumption : (typeof colorToClimateMap[climateCol] !== 'undefined' ? colorToClimateMap[climateCol] : `undefined${climateCol}`);

        if(typeof climateDistribution[NationOfPixel] === 'undefined') climateDistribution[NationOfPixel] = {};
        if(typeof climateDistribution[NationOfPixel][ClimateOfPixel] === 'undefined') climateDistribution[NationOfPixel][ClimateOfPixel] = 0;

        climateDistribution[NationOfPixel][ClimateOfPixel]++;
    }

    let coastPixelCount = {};

    then = Date.now();
    for (let i = 0; i < nationData.length / 4; i++) {
        
        let x = i % WIDTH;
        let y = Math.floor(i / WIDTH);

        //let the site know you're still alive
        let now = Date.now();
        if (now - then > 500) {
            progressText.innerText = `Assigning every nation' coastal pixels:\n\n${i} out of ${nationData.length / 4} pixels read.\nThat's row ${Math.floor(i / WIDTH)} out of ${HEIGHT}`
            await new Promise(resolve => setTimeout(resolve));
            then = now;
        }
        
        let nationCol;
        let coastCol;

        let nationDataEmpty = nationData[i*4+3] == 0;

        //if the pixel in nationData is transparent, skip
        if(nationDataEmpty) continue;

        nationCol = "Col" + rgbToHex([nationData[i*4], nationData[i*4+1], nationData[i*4+2]]);
        coastCol = "Col" + rgbToHex([coastData[i*4], coastData[i*4+1], coastData[i*4+2]]);

        const NationOfPixel = colorToNationMap[nationCol];
        const IsCoastalPixel = coastCol == "Col00ffff";

        if(typeof coastPixelCount[NationOfPixel] === 'undefined') coastPixelCount[NationOfPixel] = 0;
        if (IsCoastalPixel) coastPixelCount[NationOfPixel]++;
    }

    //find nations' cultures
    let cultureDistribution = {};
    
    autoGeneratedCffTextField.value += "<... > Cultures\n\n";

    then = Date.now();
    for (let i = 0; i < nationData.length / 4; i++) {
        
        let x = i % WIDTH;
        let y = Math.floor(i / WIDTH);

        //let the site know you're still alive
        let now = Date.now();
        if (now - then > 500) {
            progressText.innerText = `Assigning every nation' culture groups:\n\n${i} out of ${nationData.length / 4} pixels read.\nThat's row ${Math.floor(i / WIDTH)} out of ${HEIGHT}`
            await new Promise(resolve => setTimeout(resolve));
            then = now;
        }
        
        let nationCol;
        let cultureCol;

        let nationDataEmpty = nationData[i*4+3] == 0;
        let cultureDataEmpty = climateData[i*4+3] == 0;

        //if the pixel in nationData is transparent, skip
        if(nationDataEmpty) continue;
        //if the pixel in cultureData is transparent, warn
        else if(cultureDataEmpty) {
            console.warn(`The pixel (${x}, ${y}) is transparent in the culture image, but not the nation image. It is (${nationData[i*4]}, ${nationData[i*4+1]}, ${nationData[i*4+2]}, ${nationData[i*4+3]}) in the nation image. Investigate this. For now ${unassignedCulturePixelAssumption} is assumed`);   
        }

        nationCol = "Col" + rgbToHex([nationData[i*4], nationData[i*4+1], nationData[i*4+2]]);
        cultureCol = rgbToHex([cultureData[i*4], cultureData[i*4+1], cultureData[i*4+2]]);
        
        let foundCulture = cultureColorProperties.find(element => element.color == cultureCol);

        if(typeof foundCulture === 'undefined'){
            
            let cultureNamePrompt = "";
            
            PromptMissingInfoContainer.hidden = false;
            PromptLabel.innerText = `The color #${cultureCol} did not have a matching culture. Which culture is it?\n(Give the name it has in stats)`;

            let dat = new Uint8ClampedArray(cultureData.length);
            for (let j = 0; j < cultureData.length; j++) {
                dat[j] = cultureData[j];
                
            }
            for(let j = 0; j < dat.length / 4; j++){
                if(rgbToHex([cultureData[j*4], cultureData[j*4+1], cultureData[j*4+2]]) == '000000'){
                    dat[j*4] = 128;
                    dat[j*4+1] = 128;
                    dat[j*4+2] = 255;
                    dat[j*4+3] = 255;
                }
                else if(rgbToHex([cultureData[j*4], cultureData[j*4+1], cultureData[j*4+2]]) != cultureCol){
                    dat[j*4] = 0;
                    dat[j*4+1] = 0;
                    dat[j*4+2] = 0;
                    dat[j*4+3] = 0;
                }
                
            }
            dat = new ImageData(dat, WIDTH);
        
            PromptedMissingInfoCanvas.getContext("2d").putImageData(dat, 0, 0);

            submitButton.addEventListener("click", function () {
                cultureNamePrompt = PromptField.value;
                PromptMissingInfoContainer.hidden = true;
            });

            console.log("ok, just waiting now :)");

            //idle until cultureNamePrompt answered;
            let then = Date.now();
            while(cultureNamePrompt == ""){
                let now = Date.now();
                if (now - then > 17) {
                    await new Promise(resolve => setTimeout(resolve));
                    then = now;
                }
            }

            foundCulture = {
                color: cultureCol, 
                name: cultureNamePrompt
            };
            
            cultureColorProperties.push({color: cultureCol, name: cultureNamePrompt});

            autoGeneratedCffTextField.value += `= "${cultureCol}" ${cultureNamePrompt}.Color\n`
        }

        const NationOfPixel = colorToNationMap[nationCol];

        if(typeof cultureDistribution[NationOfPixel] === 'undefined') cultureDistribution[NationOfPixel] = {};
        if(typeof cultureDistribution[NationOfPixel][foundCulture.name] === 'undefined') cultureDistribution[NationOfPixel][foundCulture.name] = 0;

        cultureDistribution[NationOfPixel][foundCulture.name]++;
    }

    //find nations' religions
    let religionDistribution = {};

    
    autoGeneratedCffTextField.value += "<... > Religions\n\n";
    

    then = Date.now();
    for (let i = 0; i < nationData.length / 4; i++) {
        
        let x = i % WIDTH;
        let y = Math.floor(i / WIDTH);

        //let the site know you're still alive
        let now = Date.now();
        if (now - then > 500) {
            progressText.innerText = `Assigning every nation' religion groups:\n\n${i} out of ${nationData.length / 4} pixels read.\nThat's row ${Math.floor(i / WIDTH)} out of ${HEIGHT}`
            await new Promise(resolve => setTimeout(resolve));
            then = now;
        }
        
        let nationCol;
        let religionCol;

        let nationDataEmpty = nationData[i*4+3] == 0;
        let religionDataEmpty = climateData[i*4+3] == 0;

        //if the pixel in nationData is transparent, skip
        if(nationDataEmpty) continue;
        //if the pixel in religionData is transparent, warn
        else if(religionDataEmpty) {
            console.warn(`The pixel (${x}, ${y}) is transparent in the religion image, but not the nation image. It is (${nationData[i*4]}, ${nationData[i*4+1]}, ${nationData[i*4+2]}, ${nationData[i*4+3]}) in the nation image. Investigate this. For now ${unassignedReligionPixelAssumption} is assumed`);   
        }

        nationCol = "Col" + rgbToHex([nationData[i*4], nationData[i*4+1], nationData[i*4+2]]);
        religionCol = rgbToHex([religionData[i*4], religionData[i*4+1], religionData[i*4+2]]);
        

        
        let foundReligion = religionColorProperties.find(element => element.color == religionCol);

        if(typeof foundReligion === 'undefined'){
                
            let religionNamePrompt = "";
            
            PromptMissingInfoContainer.hidden = false;
            PromptLabel.innerText = `The color #${religionCol} did not have a matching religion. Which religion is it?\n(Give the name it has in stats)`;
            
            let dat = new Uint8ClampedArray(religionData.length);
            for (let j = 0; j < religionData.length; j++) {
                dat[j] = religionData[j];
                
            }
            for(let j = 0; j < dat.length / 4; j++){
                if(rgbToHex([religionData[j*4], religionData[j*4+1], religionData[j*4+2]]) == '000000'){
                    dat[j*4] = 128;
                    dat[j*4+1] = 128;
                    dat[j*4+2] = 255;
                    dat[j*4+3] = 255;
                }
                else if(rgbToHex([religionData[j*4], religionData[j*4+1], religionData[j*4+2]]) != religionCol){
                    dat[j*4] = 0;
                    dat[j*4+1] = 0;
                    dat[j*4+2] = 0;
                    dat[j*4+3] = 0;
                }
                
            }
            dat = new ImageData(dat, WIDTH);
        
            PromptedMissingInfoCanvas.getContext("2d").putImageData(dat, 0, 0);

            submitButton.addEventListener("click", function () {
                religionNamePrompt = PromptField.value;
                PromptMissingInfoContainer.hidden = true;
            });

            console.log("ok, just waiting now :)");

            //idle until religionNamePrompt answered;
            let then = Date.now();
            while(religionNamePrompt == ""){
                let now = Date.now();
                if (now - then > 17) {
                    await new Promise(resolve => setTimeout(resolve));
                    then = now;
                }
            }

            foundReligion = {
                color: religionCol, 
                name: religionNamePrompt
            };

            religionColorProperties.push({color: religionCol, name: religionNamePrompt});

            autoGeneratedCffTextField.value += `= "${religionCol}" ${religionNamePrompt}.Color\n`
        }

        const NationOfPixel = colorToNationMap[nationCol];

        if(typeof religionDistribution[NationOfPixel] === 'undefined') religionDistribution[NationOfPixel] = {};
        if(typeof religionDistribution[NationOfPixel][foundReligion.name] === 'undefined') religionDistribution[NationOfPixel][foundReligion.name] = 0;

        religionDistribution[NationOfPixel][foundReligion.name]++;
    }

    
    
    //add climate distributions to autogeneratedccf
    
    autoGeneratedCffTextField.value += "<...\n\n"
    
    let insideNation = false;
    
    Object.keys(climateDistribution).forEach(nationKey => {
        
        autoGeneratedCffTextField.value += (insideNation ? '< ' :'') + `> ${nationKey}\n`;
        insideNation = true;
        
        Object.keys(climateDistribution[nationKey]).forEach(climateKey => {
            autoGeneratedCffTextField.value += `= ${climateDistribution[nationKey][climateKey]} ${climateKey}\n`;
        });
        
        autoGeneratedCffTextField.value += `\n\n`;
    });
    
    autoGeneratedCffTextField.value += "<...\n\n"

    //add coast distributions to autogeneratedccf

    insideNation = false;
    
    Object.keys(coastPixelCount).forEach(nationKey => {
        
        autoGeneratedCffTextField.value += (insideNation ? '< ' :'') + `> ${nationKey}\n`;
        insideNation = true;
        
        autoGeneratedCffTextField.value += `= ${coastPixelCount[nationKey]} CoastalPixels\n`;
        
        
        autoGeneratedCffTextField.value += `\n\n`;
    });

    autoGeneratedCffTextField.value += "<...\n\n"
    
    /* #region  Everthing resources */

    autoGeneratedCffTextField.value += `<... > Nations\n`;

    for (let r = 0; r < mappedResources.length; r++) {
        let resourceName = mappedResources[r];
        
        let resourceBlobSizes = {}; 
        
        
        let resourceData = null;
        
        then = Date.now();

        while(!resourceData == null){
            let now = Date.now();
            if (now - then > 17) {
                progressText.innerText = `Waiting for ${resourceName} image to be done loading...`
                await new Promise(resolve => setTimeout(resolve));
                then = now;
            }
        }
        
        resourceData = await prepareData(`./docs/assets/images/world/ResourcesForCode/${resourceName}.png`);
        
        progressText.innerText = "";

        then = Date.now();
        for (let i = 0; i < nationData.length / 4; i++) {
            
            //let the site know you're still alive
            let now = Date.now();
            if (now - then > 500) {
                progressText.innerText = `Counting size of all ${resourceName} blobs:\n\n${i} out of ${nationData.length / 4} pixels read.\nThat's row ${Math.floor(i / WIDTH)} out of ${HEIGHT}`
                await new Promise(resolve => setTimeout(resolve));
                then = now;
            }       

            if(resourceData[i*4+3] == 0) continue;
            
            resourceCol = "Col" + rgbToHex([resourceData[i*4], resourceData[i*4+1], resourceData[i*4+2]]);
        
            if(typeof resourceBlobSizes[resourceCol] === 'undefined') resourceBlobSizes[resourceCol] = 0;
            resourceBlobSizes[resourceCol]++;
        }

        //find nations' max resources

        let resourceOverlap = {};

        //instantiate all nations in resourceOverlap
        Object.keys(gameStats.Nations).forEach(key => {
            resourceOverlap[key] = {};
        });
    
        then = Date.now();
        for (let i = 0; i < nationData.length / 4; i++) {
            
            //let the site know you're still alive
            let now = Date.now();
            if (now - then > 500) {
                progressText.innerText = `Assigning every nation' max ${resourceName}:\n\n${i} out of ${nationData.length / 4} pixels read.\nThat's row ${Math.floor(i / WIDTH)} out of ${HEIGHT}`
                await new Promise(resolve => setTimeout(resolve));
                then = now;
            }       

            //populate each nation in resourceOverlap with Col<hex> properties with values of how many pixels it overlaps that blob
            

            //if the pixel is either empty on the resource image or nation image, skip
            if(nationData[i*4+3] == 0 || resourceData[i*4+3] == 0) continue;

            nationCol = "Col" + rgbToHex([nationData[i*4], nationData[i*4+1], nationData[i*4+2]]);        
            resourceBlobCol = "Col" + rgbToHex([resourceData[i*4], resourceData[i*4+1], resourceData[i*4+2]]);
            const NationOfPixel = colorToNationMap[nationCol];

            if(typeof resourceOverlap[NationOfPixel] === 'undefined') {            
                console.log(`resourceOverlap[NationOfPixel] was ${resourceOverlap[NationOfPixel]}. NationOfPixel was ${NationOfPixel} and nationCol ${nationCol}`)
            }

            if(typeof resourceOverlap[NationOfPixel][resourceBlobCol] === 'undefined') resourceOverlap[NationOfPixel][resourceBlobCol] = 0;
            resourceOverlap[NationOfPixel][resourceBlobCol]++;
            
        }

        //use resourceBlobSizes to divide all. 
        
        Object.keys(resourceOverlap).forEach(nationKey => {
            let count = 0.0;

            //counting up all pixels overlapping per blob, divided by the blob's size
            Object.keys(resourceOverlap[nationKey]).forEach(ColorKey => {
                count += resourceOverlap[nationKey][ColorKey] / resourceBlobSizes[ColorKey];
            });

            //resource blob number multiplication
            count *= mappedResourcesMultipliers[r];

            autoGeneratedCffTextField.value += `= ${(Math.round((count*20)) / 20).toFixed(2)} ${nationKey}.Max${resourceName}\n`
        });

    }
    


    /* #endregion */
    

    let cultureOverlap = {};

    //instantiate all nations in cultureOverlap
    Object.keys(gameStats.Nations).forEach(key => {
        cultureOverlap[key] = {};
    });

    then = Date.now();
    for (let i = 0; i < nationData.length / 4; i++) {
        
        //let the site know you're still alive
        let now = Date.now();
        if (now - then > 500) {
            progressText.innerText = `Assigning every nation' culture based on culture map:\n\n${i} out of ${nationData.length / 4} pixels read.\nThat's row ${Math.floor(i / WIDTH)} out of ${HEIGHT}`
            await new Promise(resolve => setTimeout(resolve));
            then = now;
        }       

        //populate each nation in cultureOverlap with culturename properties with values of how many pixels it overlaps that blob multiplied by that pixel's climate's Climatescore
        

        //if the pixel is empty on the nation image, skip
        if(nationData[i*4+3] == 0) continue;
        //if the pixel is empty on the culture image, but wasn't on nation image, throw warning and assume default 
        else if(cultureData[i*4+3] == 0) {
            console.warn(`The pixel (${i % WIDTH}, ${Math.floor(i / WIDTH)}) is transparent in the culture image, but not the nation image. It is (${cultureData[i*4]}, ${cultureData[i*4+1]}, ${cultureData[i*4+2]}, ${cultureData[i*4+3]}) in the culture image. Investigate this. For now ${unassignedCulturePixelAssumption} is assumed`)
            //actually assume something
        }
        //if the pixel is empty on the climate image, but wasn't on nation image, nor culture image, throw warning and assume default 
        else if(cultureData[i*4+3] == 0) {
            console.warn(`The pixel (${i % WIDTH}, ${Math.floor(i / WIDTH)}) is transparent in the culture image, but not the nation image. It is (${climateData[i*4]}, ${climateData[i*4+1]}, ${climateData[i*4+2]}, ${climateData[i*4+3]}) in the climate image. Investigate this. For now ${unassignedClimatePixelAssumption} is assumed`)
            //actually assume something 
        }

        nationCol = "Col" + rgbToHex([nationData[i*4], nationData[i*4+1], nationData[i*4+2]]);        
        climateCol = "Col" + rgbToHex([climateData[i*4], climateData[i*4+1], climateData[i*4+2]]);

        cultureCol = rgbToHex([cultureData[i*4], cultureData[i*4+1], cultureData[i*4+2]]);

        const NationOfPixel = colorToNationMap[nationCol];
        const cultureOfPixel = cultureColorProperties.find(element => element.color == cultureCol).name;
        
        if(typeof gameStats.Climates[colorToClimateMap[climateCol]] === 'undefined') {            
            console.log(`gameStats.Climates[colorToClimateMap[climateCol]] was ${gameStats.Climates[colorToClimateMap[climateCol]]}. climateCol was ${climateCol} and colorToClimateMap[climateCol] ${colorToClimateMap[climateCol]}`)
        }
        
        const climateScoreOfCulture = gameStats.Climates[colorToClimateMap[climateCol]].ClimateScore;

        if(typeof cultureOverlap[NationOfPixel] === 'undefined') {            
            console.log(`cultureOverlap[NationOfPixel] was ${cultureOverlap[NationOfPixel]}. NationOfPixel was ${NationOfPixel} and nationCol ${nationCol}`)
        }

        if(typeof cultureOverlap[NationOfPixel][cultureOfPixel] === 'undefined') cultureOverlap[NationOfPixel][cultureOfPixel] = 0;
        cultureOverlap[NationOfPixel][cultureOfPixel] += climateScoreOfCulture;
        
    }

    //divide to make all constituencies make up 100(%). 
    
    Object.keys(cultureOverlap).forEach(nationKey => {
        autoGeneratedCffTextField.value += `> ${nationKey}\n`
        
        let total = 0.0;

        //finding the total of all culturekey values in this nation, so we got something to divide by to find the constituencies' ratios
        Object.keys(cultureOverlap[nationKey]).forEach(CultureKey => {
            total += cultureOverlap[nationKey][CultureKey];
        });

        //replace CultureGroups by empty, before re-initialising every culture in it from scratch
        autoGeneratedCffTextField.value += `+> CultureGroups\n`
        autoGeneratedCffTextField.value += `> CultureGroups\n`

        //dividing and adding to autoGeneratedCffTextField
        Object.keys(cultureOverlap[nationKey]).forEach(CultureKey => {

            autoGeneratedCffTextField.value += `+> ${CultureKey}\n`
            autoGeneratedCffTextField.value += `= ${cultureOverlap[nationKey][CultureKey] * 100 / total} ${CultureKey}.Points\n`
        });
        autoGeneratedCffTextField.value += `< <\n`
    });

    let religionOverlap = {};

    //instantiate all nations in religionOverlap
    Object.keys(gameStats.Nations).forEach(key => {
        religionOverlap[key] = {};
    });

    then = Date.now();
    for (let i = 0; i < nationData.length / 4; i++) {
        
        //let the site know you're still alive
        let now = Date.now();
        if (now - then > 500) {
            progressText.innerText = `Assigning every nation' religion based on religion map:\n\n${i} out of ${nationData.length / 4} pixels read.\nThat's row ${Math.floor(i / WIDTH)} out of ${HEIGHT}`
            await new Promise(resolve => setTimeout(resolve));
            then = now;
        }       

        //populate each nation in religionOverlap with religionname properties with values of how many pixels it overlaps that blob multiplied by that pixel's climate's Climatescore
        

        //if the pixel is empty on the nation image, skip
        if(nationData[i*4+3] == 0) continue;
        //if the pixel is empty on the religion image, but wasn't on nation image, throw warning and assume default 
        else if(religionData[i*4+3] == 0) {
            console.warn(`The pixel (${i % WIDTH}, ${Math.floor(i / WIDTH)}) is transparent in the religion image, but not the nation image. It is (${religionData[i*4]}, ${religionData[i*4+1]}, ${religionData[i*4+2]}, ${religionData[i*4+3]}) in the religion image. Investigate this. For now ${unassignedReligionPixelAssumption} is assumed`)
            //actually assume something
        }
        //if the pixel is empty on the climate image, but wasn't on nation image, nor religion image, throw warning and assume default 
        else if(religionData[i*4+3] == 0) {
            console.warn(`The pixel (${i % WIDTH}, ${Math.floor(i / WIDTH)}) is transparent in the religion image, but not the nation image. It is (${climateData[i*4]}, ${climateData[i*4+1]}, ${climateData[i*4+2]}, ${climateData[i*4+3]}) in the climate image. Investigate this. For now ${unassignedClimatePixelAssumption} is assumed`)
            //actually assume something 
        }

        nationCol = "Col" + rgbToHex([nationData[i*4], nationData[i*4+1], nationData[i*4+2]]);        
        climateCol = "Col" + rgbToHex([climateData[i*4], climateData[i*4+1], climateData[i*4+2]]);

        religionCol = rgbToHex([religionData[i*4], religionData[i*4+1], religionData[i*4+2]]);

        const NationOfPixel = colorToNationMap[nationCol];
        const religionOfPixel = religionColorProperties.find(element => element.color == religionCol).name;
        
        if(typeof gameStats.Climates[colorToClimateMap[climateCol]] === 'undefined') {            
            console.log(`gameStats.Climates[colorToClimateMap[climateCol]] was ${gameStats.Climates[colorToClimateMap[climateCol]]}. climateCol was ${climateCol} and colorToClimateMap[climateCol] ${colorToClimateMap[climateCol]}`)
        }
        
        const climateScoreOfReligion = gameStats.Climates[colorToClimateMap[climateCol]].ClimateScore;

        if(typeof religionOverlap[NationOfPixel] === 'undefined') {            
            console.log(`religionOverlap[NationOfPixel] was ${religionOverlap[NationOfPixel]}. NationOfPixel was ${NationOfPixel} and nationCol ${nationCol}`)
        }

        if(typeof religionOverlap[NationOfPixel][religionOfPixel] === 'undefined') religionOverlap[NationOfPixel][religionOfPixel] = 0;
        religionOverlap[NationOfPixel][religionOfPixel] += climateScoreOfReligion;
        
    }

    //divide to make all constituencies make up 100(%). 
    
    Object.keys(religionOverlap).forEach(nationKey => {
        autoGeneratedCffTextField.value += `> ${nationKey}\n`
        
        let total = 0.0;

        //finding the total of all religionkey values in this nation, so we got something to divide by to find the constituencies' ratios
        Object.keys(religionOverlap[nationKey]).forEach(ReligionKey => {
            total += religionOverlap[nationKey][ReligionKey];
        });

        //replace ReligionGroups by empty, before re-initialising every religion in it from scratch
        autoGeneratedCffTextField.value += `+> ReligionGroups\n`
        autoGeneratedCffTextField.value += `> ReligionGroups\n`

        //dividing and adding to autoGeneratedCffTextField
        Object.keys(religionOverlap[nationKey]).forEach(ReligionKey => {

            autoGeneratedCffTextField.value += `+> ${ReligionKey}\n`
            autoGeneratedCffTextField.value += `= ${religionOverlap[nationKey][ReligionKey] * 100 / total} ${ReligionKey}.Points\n`
        });
        autoGeneratedCffTextField.value += `< <\n`
    });
    
    progressText.innerText = `Done`

    //add to autogeneratedccf

    autoGeneratedCffTextField.value += '<...'
}

function fillInColorProperties(searchObj){
    ret = [];

    Object.keys(searchObj).forEach(key => {
        ret.push({color: searchObj[key].Color, name: key});
    });

    return ret;

}