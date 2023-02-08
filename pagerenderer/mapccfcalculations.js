const WIDTH = 8192;
const HEIGHT = 3365;

document.querySelector("body").addEventListener("game load done", scanMaps);

const progressText = document.querySelector(".progressText");
progressText.innerText = "Loading...";

const PromptMissingInfoContainer = document.querySelector(".promptMissingInfoContainer");
const PromptedMissingInfoCanvas = document.querySelector(".promptMissingInfoContainer canvas");

PromptedMissingInfoCanvas.width = WIDTH;
PromptedMissingInfoCanvas.height = HEIGHT;

const PromptLabel = document.querySelector(".promptMissingInfoContainer label");
const PromptField = document.querySelector(".promptMissingInfoContainer .promptField");
let PromptFieldReturnedText = "";
const submitButton = document.querySelector(".promptMissingInfoContainer .promptButton");
submitButton.addEventListener("click", function () {
    PromptFieldReturnedText = PromptField.value;
    PromptMissingInfoContainer.hidden = true;
});

const autoGeneratedCffTextField = document.querySelector(".autoGeneratedCffTextField");

async function scanMaps() {

    let nationColorProperties = fillInColorProperties(gameStats.Nations);
    let climateColorProperties = fillInColorProperties(gameStats.Climates);
    let cultureColorProperties = fillInColorProperties(gameStats.Cultures);
    let religionColorProperties = fillInColorProperties(gameStats.Religions);
    let tradeZoneColorProperties = fillInColorProperties(gameStats.TradeZones);

    let nationData, climateData, coastData, developmentData, cultureData, religionData, tradeZoneData = null;

    baseData = await prepareData("Blank.png", progressText)
    nationData = await prepareData("Nations.png", progressText)
    climateData = await prepareData("Climates.png", progressText)
    coastData = await prepareData("CoastalLand.png", progressText)
    developmentData = await prepareData("Development.png", progressText)
    cultureData = await prepareData("Cultures.png", progressText)
    religionData = await prepareData("Religions.png", progressText)
    tradeZoneData = await prepareData("TradeZones.png", progressText)

    //wait until image datas are loaded
    while(nationData == null || 
        climateData == null || 
        coastData == null || 
        developmentData == null || 
        cultureData == null || 
        religionData == null || 
        tradeZoneData == null){
        await new Promise(resolve => setTimeout(resolve));
    }

    progressText.innerText = "loading population X development";
    await new Promise(resolve => setTimeout(resolve));

    let populationXDevelopmentData = function () {

        let ret = new Uint8ClampedArray(WIDTH * HEIGHT * 4);

        for(let i = 0; i < ret.length / 4; i++) {
            let foundZoneColor = rgbToHex([nationData[i*4], nationData[i*4+1], nationData[i*4+2]]);
            let climateObject = climateColorProperties.find(element => element.color == foundZoneColor);
            let climateScore = climateObject ? gameStats.Climates[climateObject.name].ClimateScore : 0;
            ret[i] = climateScore * developmentData[i];
        }

        return ret;

    }();

    const colorToCoastMap = [
        { color: "00ffff", name: "coast"}
    ];

    let climateDistribution = await findDistribution(
        nationData, climateData, "nation", "climate",
        nationColorProperties,
        climateColorProperties, 
        {
            unassignedPixelAssumption: "Moderate"
        }
    );

    let coastPixelCount = await findDistribution(
        nationData, coastData, "nation", "coast", 
        nationColorProperties,
        colorToCoastMap, 
        {
            unassignedPixelAssumption: "Noncoast",
            canIgnoreTransparentInner: true
        }
    );
    
    let developmentScore = await findDistribution(
        nationData, developmentData, "nation", "development",
        nationColorProperties,
        0,
        {
            canIgnoreTransparentInner: true,
            greyScale: true 
        }
    );
 
    let cultureDistribution = await findDistribution(
        nationData, cultureData, "nation", "culture", 
        nationColorProperties,
        cultureColorProperties,
        {
            unassignedPixelAssumption: "Foreign"
        } 
    );

    let religionDistribution = await findDistribution(
        nationData, religionData, "nation", "religion", 
        nationColorProperties,
        religionColorProperties, 
        {
            unassignedPixelAssumption: "Pagan"
        }
    );


    let tradeZoneScore = await findDistribution(
        tradeZoneData, populationXDevelopmentData, "trade zone", "wealth",
        tradeZoneColorProperties,
        0,
        {
            canIgnoreTransparentInner: true,
            greyScale: true,
            unassignedPixelAssumption: 0
        }
    );

    autoGeneratedCffTextField.value += "<... > Nations\n\n";

    //divide to make all constituencies make up 100(%). 
    
    Object.keys(cultureDistribution).forEach(nationKey => {
        
        let total = 0.0;

        //finding the total of all culturekey values in this nation, so we got something to divide by to find the constituencies' ratios
        Object.keys(cultureDistribution[nationKey]).forEach(CultureKey => {
            total += cultureDistribution[nationKey][CultureKey];
        });

        //replace CultureGroups by empty, before re-initialising every culture in it from scratch
        
        autoGeneratedCffTextField.value += 
            `> ${nationKey}
            +> CultureGroups
            > CultureGroups
            `.trimIndents();
        //dividing and adding to autoGeneratedCffTextField
        Object.keys(cultureDistribution[nationKey]).forEach(CultureKey => {

            autoGeneratedCffTextField.value += `+> ${CultureKey}\n`
            autoGeneratedCffTextField.value += `= ${cultureDistribution[nationKey][CultureKey] * 100 / total} ${CultureKey}.Points\n`
        });
        
        autoGeneratedCffTextField.value += 
            `< <
            `.trimIndents();
    });

    //divide to make all constituencies make up 100(%). 
    
    Object.keys(religionDistribution).forEach(nationKey => {
        
        let total = 0.0;

        //finding the total of all religionkey values in this nation, so we got something to divide by to find the constituencies' ratios
        Object.keys(religionDistribution[nationKey]).forEach(ReligionKey => {
            total += religionDistribution[nationKey][ReligionKey];
        });

        //replace ReligionGroups by empty, before re-initialising every religion in it from scratch
        autoGeneratedCffTextField.value += 
            `> ${nationKey}
            +> ReligionGroups
            > ReligionGroups
            `.trimIndents();
        //dividing and adding to autoGeneratedCffTextField
        Object.keys(religionDistribution[nationKey]).forEach(ReligionKey => {

            autoGeneratedCffTextField.value += `+> ${ReligionKey}\n`
            autoGeneratedCffTextField.value += `= ${religionDistribution[nationKey][ReligionKey] * 100 / total} ${ReligionKey}.Points\n`
        });
        
        autoGeneratedCffTextField.value += 
            `< <
            `.trimIndents();
    });

    //add climate distributions to autogeneratedccf
    
    autoGeneratedCffTextField.value += 
    `
    <... > Nations
    `.trimIndents();
    
    Object.keys(climateDistribution).forEach(nationKey => {
        
        
        Object.keys(climateDistribution[nationKey]).forEach(climateKey => {
            autoGeneratedCffTextField.value += `= ${climateDistribution[nationKey][climateKey]} ${nationKey}.${climateKey}\n`;
        });
        
    });

    //add development distributions to autogeneratedccf
    
    autoGeneratedCffTextField.value += 
    `
    <... > Nations
    `.trimIndents();
    
    Object.keys(developmentScore).forEach(nationKey => {
        autoGeneratedCffTextField.value += `= ${developmentScore[nationKey]} ${nationKey}.DevelopmentPixelCount\n`;
    });
    
    autoGeneratedCffTextField.value += 
    `
    <... > Nations
    `.trimIndents();

    //add coast distributions to autogeneratedccf
    
    Object.keys(coastPixelCount).forEach(nationKey => {
        
        autoGeneratedCffTextField.value += `= ${coastPixelCount[nationKey].coast} ${nationKey}.CoastalPixels\n`;
    });

    autoGeneratedCffTextField.value += 
    `
    <... > Nations
    `.trimIndents();
    
    /* #region  Everthing resources */

    for (let r = 0; r < mappedResources.length; r++) {
        let resourceName = mappedResources[r];
        
        let resourceData = null;
        
        resourceData = await prepareData(`ResourcesForCode/${resourceName}.png`);
        
        progressText.innerText = "";

        let resourceBlobSizes = (await findDistribution(
            () => {return 255}, resourceData, "world", resourceName,
            [{ color: "ffffff", name: "world"}],
            (e) => { return {color: e, name: "Col" + e}},
            {
                skipsTransparentInner: true,
                unnamedGroup: true
            }
        ))["world"];

        //find nations' max resources

        let resourceOverlap = await findDistribution(
            nationData, resourceData, "nation", resourceName,
            nationColorProperties,
            (e) => { return {color: e, name: "Col" + e}},
            {
                skipsTransparentInner: true,
                unnamedGroup: true
            }
        );
        
        //use resourceBlobSizes to divide all. 
        
        Object.keys(resourceOverlap).forEach(nationKey => {
            let count = 0.0;

            //counting up all pixels overlapping per blob, divided by the blob's size
            Object.keys(resourceOverlap[nationKey]).forEach(ColorKey => {
                count += resourceOverlap[nationKey][ColorKey] / resourceBlobSizes[ColorKey];
            });

            //resource blob number multiplication
            count *= mappedResourcesMultipliers[r];

            autoGeneratedCffTextField.value += 
                `!suppress
                = ${(Math.round((count*20)) / 20).toFixed(2)} ${nationKey}.Max${resourceName}
                `.trimIndents();
        });

    }
    
    /* #endregion */

    //add trade zone wealths to autogeneratedccf

    autoGeneratedCffTextField.value += 
    `
    <... > TradeZones
    `.trimIndents();


    //climate * totaldevscore (255 per pixel)
    Object.keys(tradeZoneScore).forEach(zoneKey => {
        let rawTradeZoneScore = tradeZoneScore[zoneKey];
        let idealTradeZoneScore = rawTradeZoneScore / 10000;
        autoGeneratedCffTextField.value += `= ${(Math.round((idealTradeZoneScore*20)) / 20).toFixed(2)} ${zoneKey}.Score\n`;
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

async function findDistribution(outerDataset, innerDataset, outerName, innerName, colorToOuterNameMapping, colorToInnerNameMapping, options) {
    let ret = {};
    
    if(!options.pixelCount){
        pixelCount = WIDTH * HEIGHT;
    }

    let getOuterDataPoint;
    let getInnerDataPoint;

    if(typeof outerDataset != 'function')
        getOuterDataPoint = (i) => outerDataset[i];
    else
        getOuterDataPoint = (i) => outerDataset(i);

    if(typeof innerDataset != 'function')
        getInnerDataPoint = (i) => innerDataset[i];
    else
        getInnerDataPoint = (i) => innerDataset(i);

    let then = Date.now();
    for (let i = 0; i < pixelCount; i++) {
        
        let x = i % WIDTH;
        let y = Math.floor(i / WIDTH);

        //let the site know you're still alive
        let now = Date.now();
        if (now - then > 500) {
            progressText.innerText = `counting ${innerName}s in ${outerName}s:\n\n${i} out of ${pixelCount} pixels read.\nThat's row ${Math.floor(i / WIDTH)} out of ${HEIGHT}`
            await new Promise(resolve => setTimeout(resolve));
            then = now;
        }
        
        let outerCol;
        let innerCol;

        let isOuterDataEmpty = getOuterDataPoint(i*4+3) == 0;
        let isInnerDataEmpty = getInnerDataPoint(i*4+3) == 0;

        //if the pixel in outerDataset is transparent, skip
        if(isOuterDataEmpty) continue;
        //if the pixel in innerDataset is transparent, warn
        else if(isInnerDataEmpty) {
            if (options.skipsTransparentInner)
                continue;
            else if(!options.canIgnoreTransparentInner)
                console.warn(`The pixel (${x}, ${y}) is transparent in the ${innerName} image, but not the ${outerName} image. It is (${getOuterDataPoint(i*4)}, ${getOuterDataPoint(i*4+1)}, ${getOuterDataPoint(i*4+2)}, ${getOuterDataPoint(i*4+3)}) in the ${outerName} image. Investigate this. For now ${options.unassignedPixelAssumption} is assumed`);
        }

        outerCol = rgbToHex([getOuterDataPoint(i*4), getOuterDataPoint(i*4+1), getOuterDataPoint(i*4+2)]);
        innerCol = rgbToHex([getInnerDataPoint(i*4), getInnerDataPoint(i*4+1), getInnerDataPoint(i*4+2)]);

        let foundOuterObject = colorToOuterNameMapping.find(element => element.color == outerCol);

        if(typeof foundOuterObject === 'undefined') {
            foundOuterObject = await PromptName(outerCol, getOuterDataPoint, outerName);
            colorToOuterNameMapping.push(foundOuterObject);
        }

        OuterNameOfPixel = foundOuterObject.name;

        if(!options.greyScale){
            let foundInnerObject = 
                isInnerDataEmpty ? 
                    options.unassignedPixelAssumption : 
                    !options.unnamedGroup ? 
                        colorToInnerNameMapping.find(element => element.color == innerCol):
                        {color: innerCol, name: "Col" + innerCol};
            if(typeof foundInnerObject === 'undefined'){
                foundInnerObject = await PromptName(innerCol, getInnerDataPoint, innerName);
                if (!options.unnamedGroup) colorToInnerNameMapping.push(foundInnerObject);
            }
            
            const InnerNameOfPixel = foundInnerObject.name;

            if(typeof ret[OuterNameOfPixel] === 'undefined') ret[OuterNameOfPixel] = {};
            if(typeof ret[OuterNameOfPixel][InnerNameOfPixel] === 'undefined') ret[OuterNameOfPixel][InnerNameOfPixel] = 0;
            
            ret[OuterNameOfPixel][InnerNameOfPixel]++;
        }else{
            const innerGreyScale = getInnerDataPoint(i*4);
            const InnerPixelValue = isInnerDataEmpty ? options.unassignedPixelAssumption : 255 - innerGreyScale;
            
            if(typeof ret[OuterNameOfPixel] === 'undefined') ret[OuterNameOfPixel] = 0;
            
            ret[OuterNameOfPixel] += InnerPixelValue;
        }
    }

    return ret;
}

async function PromptName(color, getDatasetPointFunction, name){
    PromptFieldReturnedText = "";
    
    let DatasetLength = WIDTH * HEIGHT * 4;

    PromptMissingInfoContainer.hidden = false;
    PromptLabel.innerText = `The color #${color} did not have a matching ${name}. Which ${name} is it?\n(Give the name it has in stats)`;
    let dat = new Uint8ClampedArray(DatasetLength);
    for (let j = 0; j < DatasetLength; j++) {
        dat[j] = getDatasetPointFunction(j);
        
    }
    for(let j = 0; j < dat.length / 4; j++){
        if(rgbToHex([getDatasetPointFunction(j*4), getDatasetPointFunction(j*4+1), getDatasetPointFunction(j*4+2)]) == color){
            dat[j*4] = getDatasetPointFunction(j*4);
            dat[j*4+1] = getDatasetPointFunction(j*4+1);
            dat[j*4+2] = getDatasetPointFunction(j*4+2);
            dat[j*4+3] = getDatasetPointFunction(j*4+3);
        }
        else {
            dat[j*4] = baseData[j*4];
            dat[j*4+1] = baseData[j*4+1];
            dat[j*4+2] = baseData[j*4+2];
            dat[j*4+3] = baseData[j*4+3];
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
        color: color, 
        name: PromptFieldReturnedText
    };

    autoGeneratedCffTextField.value += `= "${color}" ${name}s.${PromptFieldReturnedText}.Color\n`

    return ret;
}