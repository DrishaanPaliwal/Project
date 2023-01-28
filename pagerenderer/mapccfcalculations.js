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

let PromptFieldReturnedText = "";
const submitButton = document.createElement("input");
submitButton.type = "button";
submitButton.value = "Submit name";
submitButton.addEventListener("click", function () {
    PromptFieldReturnedText = PromptField.value;
    PromptMissingInfoContainer.hidden = true;
});

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
    developmentData = await prepareData("./docs/assets/images/world/Development.png")
    cultureData = await prepareData("./docs/assets/images/world/Cultures.png")
    religionData = await prepareData("./docs/assets/images/world/Religions.png")


    //wait until image datas are loaded
    while(nationData == null || 
        climateData == null || 
        cultureData == null || 
        religionData == null){
        await new Promise(resolve => setTimeout(resolve));
    }

    const colorToCoastMap = [
        { color: "Col00ffff", name: "coast"}
    ];

    let nationColorProperties = fillInColorProperties(gameStats.Nations);
    let climateColorProperties = fillInColorProperties(gameStats.Climates);
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


    let climateDistribution = await findDistribution(
        nationData, climateData, "nation", "climate", 
        climateColorProperties, 
        "Moderate"
    );

    let coastPixelCount = await findDistribution(
        nationData, coastData, "nation", "coast", 
        colorToCoastMap, 
        "Noncoast", 
        {canIgnoreTransparentInner: true}
    );
    
    let developmentScore = await findDistribution(
        nationData, developmentData, "nation", "development",
        (e) => { return e },
        0, 
        {
            canIgnoreTransparentInner: true,
            greyScale: true 
        }
    );
    
    let cultureDistribution = await findDistribution(
        nationData, cultureData, "nation", "culture", 
        cultureColorProperties, 
        "Foreign");

    let religionDistribution = await findDistribution(
        nationData, religionData, "nation", "religion", 
        religionColorProperties, 
        "Pagan"
    );

    
    //divide to make all constituencies make up 100(%). 
    
    Object.keys(cultureDistribution).forEach(nationKey => {
        autoGeneratedCffTextField.value += `> ${nationKey}\n`
        
        let total = 0.0;

        //finding the total of all culturekey values in this nation, so we got something to divide by to find the constituencies' ratios
        Object.keys(cultureDistribution[nationKey]).forEach(CultureKey => {
            total += cultureDistribution[nationKey][CultureKey];
        });

        //replace CultureGroups by empty, before re-initialising every culture in it from scratch
        autoGeneratedCffTextField.value += `+> CultureGroups\n`
        autoGeneratedCffTextField.value += `> CultureGroups\n`

        //dividing and adding to autoGeneratedCffTextField
        Object.keys(cultureDistribution[nationKey]).forEach(CultureKey => {

            autoGeneratedCffTextField.value += `+> ${CultureKey}\n`
            autoGeneratedCffTextField.value += `= ${cultureDistribution[nationKey][CultureKey] * 100 / total} ${CultureKey}.Points\n`
        });
        autoGeneratedCffTextField.value += `< <\n`
    });

    //divide to make all constituencies make up 100(%). 
    
    Object.keys(religionDistribution).forEach(nationKey => {
        autoGeneratedCffTextField.value += `> ${nationKey}\n`
        
        let total = 0.0;

        //finding the total of all religionkey values in this nation, so we got something to divide by to find the constituencies' ratios
        Object.keys(religionDistribution[nationKey]).forEach(ReligionKey => {
            total += religionDistribution[nationKey][ReligionKey];
        });

        //replace ReligionGroups by empty, before re-initialising every religion in it from scratch
        autoGeneratedCffTextField.value += `+> ReligionGroups\n`
        autoGeneratedCffTextField.value += `> ReligionGroups\n`

        //dividing and adding to autoGeneratedCffTextField
        Object.keys(religionDistribution[nationKey]).forEach(ReligionKey => {

            autoGeneratedCffTextField.value += `+> ${ReligionKey}\n`
            autoGeneratedCffTextField.value += `= ${religionDistribution[nationKey][ReligionKey] * 100 / total} ${ReligionKey}.Points\n`
        });
        autoGeneratedCffTextField.value += `< <\n`
    });

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

    //add development distributions to autogeneratedccf
    
    autoGeneratedCffTextField.value += "<...\n\n"
    
    insideNation = false;
    
    Object.keys(developmentScore).forEach(nationKey => {
        
        autoGeneratedCffTextField.value += (insideNation ? '< ' :'') + `> ${nationKey}\n`;
        insideNation = true;

        let developmentSum = 0;
        Object.keys(developmentScore[nationKey]).forEach(dKey => {
            developmentSum += developmentScore[nationKey][dKey] * +dKey.replace(/[a-z]/gi, '');
        });
        
        autoGeneratedCffTextField.value += `= ${developmentSum} DevelopementPixelCount\n`;
        
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

async function findDistribution(outerDataset, innerDataset, outerName, innerName, colorToInnerNameMapping, unassignedPixelAssumption, options) {
    let ret = {};
    let then = Date.now();
    for (let i = 0; i < outerDataset.length / 4; i++) {
        
        let x = i % WIDTH;
        let y = Math.floor(i / WIDTH);

        //let the site know you're still alive
        let now = Date.now();
        if (now - then > 500) {
            progressText.innerText = `counting ${innerName}s in ${outerName}s:\n\n${i} out of ${outerDataset.length / 4} pixels read.\nThat's row ${Math.floor(i / WIDTH)} out of ${HEIGHT}`
            await new Promise(resolve => setTimeout(resolve));
            then = now;
        }
        
        let outerCol;
        let innerCol;

        let isOuterDataEmpty = outerDataset[i*4+3] == 0;
        let isInnerDataEmpty = innerDataset[i*4+3] == 0;

        //if the pixel in nationData is transparent, skip
        if(isOuterDataEmpty) continue;
        //if the pixel in climateData is transparent, warn
        else if(isInnerDataEmpty && !options.canIgnoreTransparentInner) {
            console.warn(`The pixel (${x}, ${y}) is transparent in the ${innerName} image, but not the ${outerName} image. It is (${outerDataset[i*4]}, ${outerDataset[i*4+1]}, ${outerDataset[i*4+2]}, ${outerDataset[i*4+3]}) in the ${outerName} image. Investigate this. For now ${unassignedPixelAssumption} is assumed`);   
        }

        outerCol = "Col" + rgbToHex([outerDataset[i*4], outerDataset[i*4+1], outerDataset[i*4+2]]);
        innerCol = "Col" + rgbToHex([innerDataset[i*4], innerDataset[i*4+1], innerDataset[i*4+2]]);

        const OuterNameOfPixel = colorToNationMap[outerCol];
        if(!options.greyScale){
            const foundInnerObject = isInnerDataEmpty ? unassignedPixelAssumption : colorToInnerNameMapping.find(element => element.color == innerCol);
            
            if(typeof foundInnerObject === 'undefined'){
                foundInnerObject = await PromptInnerName(innerCol.replace('Col', ''), innerDataset, innerName);
            }
            
            const InnerNameOfPixel = foundInnerObject.name;

            if(typeof ret[OuterNameOfPixel] === 'undefined') ret[OuterNameOfPixel] = {};
            if(typeof ret[OuterNameOfPixel][InnerNameOfPixel] === 'undefined') ret[OuterNameOfPixel][InnerNameOfPixel] = 0;
            
            ret[OuterNameOfPixel][InnerNameOfPixel]++;
        }else{
            const innerGreyScale = innerDataset[i*4];
            const InnerPixelValue = isInnerDataEmpty ? unassignedPixelAssumption : colorToInnerNameMapping(innerGreyScale);

            if(typeof ret[OuterNameOfPixel] === 'undefined') ret[OuterNameOfPixel] = {};
            
            ret[OuterNameOfPixel] += InnerPixelValue;
        }
    }

    return ret;
}

async function PromptInnerName(innerCol, innerDataset, innerName){
    PromptFieldReturnedText = "";
    
    PromptMissingInfoContainer.hidden = false;
    PromptLabel.innerText = `The color #${innerCol} did not have a matching ${innerName}. Which ${innerName} is it?\n(Give the name it has in stats)`;

    let dat = new Uint8ClampedArray(innerDataset.length);
    for (let j = 0; j < innerDataset.length; j++) {
        dat[j] = innerDataset[j];
        
    }
    for(let j = 0; j < dat.length / 4; j++){
        if(innerDataset[j*4+3] == 0){
            dat[j*4] = 128;
            dat[j*4+1] = 128;
            dat[j*4+2] = 255;
            dat[j*4+3] = 255;
        }
        else if(rgbToHex([innerDataset[j*4], innerDataset[j*4+1], innerDataset[j*4+2]]) != innerCol){
            dat[j*4] = 0;
            dat[j*4+1] = 0;
            dat[j*4+2] = 0;
            dat[j*4+3] = 0;
        }
        
    }
    dat = new ImageData(dat, WIDTH);

    PromptedMissingInfoCanvas.getContext("2d").putImageData(dat, 0, 0);

    console.log("ok, just waiting now :)");

    //idle until cultureNamePrompt answered;
    let then = Date.now();
    while(PromptFieldReturnedText == ""){
        let now = Date.now();
        if (now - then > 17) {
            await new Promise(resolve => setTimeout(resolve));
            then = now;
        }
    }

    let ret = {
        color: innerCol, 
        name: PromptFieldReturnedText
    };
    
    colorToInnerNameMapping.push(ret);

    autoGeneratedCffTextField.value += `= "${innerCol}" ${innerName}s.${PromptFieldReturnedText}.Color\n`

    return ret;
}