let Nations = [];

class NationSheet{
  //Daily
  FuturePopulation;
  FutureLiteracyPercent;
  FutureHigherEducation;
  FutureBudget;
  FutureFood;
  FutureResearchPoints;
  FuturePublicLength;
  FutureCulturalpower;
  FutureDateInThisNation;


  //All Stats
  NationName;
  Religion;
  CulturalDisunity;
  ReligiousDisunity;
  Population;
  PopulationGrowth;
  PopulationGrowthModifier;
  Health;
  LiteracyPercent;
  HigherEducation;
  EducaitonEfficiency;
  EducaitonCostModifier;
  AdministrativeEfficiency;
  Corruption;
  Overextension;
  Propaganda;
  SocialSpending;
  Prosperity; //Quality of Life
  PopulationHappiness;
  Stability;
  AtOffensiveWar;
  AtDefensiveWar;
  WarSupport;
  WarStabilityMod;
  Absolutism;
  PopulationControl;
  BirthControl;
  ConscriptionPercent;
  Production;
  ProductionEfficiency;
  TradeEfficiency;
  LocalTrade;
  TradePower;
  Mercantilism;
  PossiblePublicDebt;
  PublicDebt;
  DailyBudget;
  Budget;
  Inflation;
  Spies;
  SpyQuality;
  NobleInfluence;
  NobleLoyalty;
  ClergyInfluence;
  ClergyLoyalty;
  BurghersInfluence;
  BurghersLoyalty;
  ArmyUpkeep;
  SpyUpkeep;
  SocialSpendingUpkeep;
  HygieneUpkeep;
  EduationUpkeep;
  AgricultureSpending;
  PropagandaUpkeep;
  PopulationControlUpkeep;
  TradeRevenue;
  ADMUpkeep;
  ProductionRevenue;
  ResearchUpkeep;
  OverallIncome;

  TimeSpeed;
  TimeDivide;

  
  //Armies
  Levies;
  LightInfantry;
  HeavyInfantry;
  Archers;
  Crossbowmen;
  LightCavalry;
  HeavyCavalry;
  EliteInfantry;
  EliteCavalry;
  HandCannon;
  Musketeers;
  Militia;
  SiegeEquipment;
  LargeSiegeEquipment;
  Cannons;
  freeEliteUnitsCap;
  UnitUpkeep;
  OverallNumbers;
  SmallForts;
  MediumForts;
  BigForts;
  HugeForts;
  ExtraCityFortifications;
  FortUpkeep;
  IronShortage;
  SulphurShortage;
  CommanderFreedom;
  ArmyWages;
  TrainingQuality;
  ArmyTech;
  MilitaryTactics;
  ArmyQuality;
  MilitaryLoyalty;
  MilitaryMorale;
  MililtaryDiscipline;


  //Navy
  NavyImprovements;
  NavyTech;
  NavyQuality;
  LightShips;
  UpkeepForOneLightShips;
  MediumShips;
  UpkeepForOneMediumShip;
  HeavyShips;
  UpkeepForOneHeavyShip;
  PrideOfTheNavy;
  OverallShipCount;
  TradeProtection;
  NavalPower;
  NavyUpkeep;


  //Recruitment / NewTroops
  New_Levies;
  New_LightInfantry;
  New_HeavyInfantry;
  New_Archers;
  New_Crossbowmen;
  New_LightCavalry;
  New_HeavyCavalry;
  New_EliteInfantry;
  New_EliteCavalry;
  New_HandCannon;
  New_Musketeers;
  New_Militia;
  New_SiegeEquipment;
  New_LargeSiegeEquipment;
  New_Cannons;

  New_LightShips;
  New_MediumShips;
  New_HeavyShips;


  //Population
  PopulationInAgriculture;
  PopulationInResourceHarvest;
  PopulaitonInMilitary;
  Artisans;
  Clergy;
  Nobility;
  Burghers;
  HighClass;
  MediumClass;
  LowerClass;
  PrimaryCulture;
  CultureGroup;
  AcceptedCulture;
  UndesiredCulture;
  PrimaryCulturePercent;
  CultureGroupPercent;
  AcceptedCulturePercent;
  UndesiredCulturePercent;
  CulturalDisunity;
  PopulationStabilityImpact;
  PopulationTechImpact;

  
  //Resources
  MiningEfficiency;
  FarmingEfficiency;

  Coal;
  EffectiveCoal;
  
  Sulphur;
  EffectiveSulphur;

  Cotton;
  EffectiveCotton;
  CottonInflation;

  Gold;
  EffectiveGold;
  GoldInflation;
  
  Iron;
  EffectiveIron;

  Tea;
  EffectiveTea;
  TeaInflation;

  Silk;
  EffectiveSilk;
  SilkInflation;

  Spices;
  EffectiveSpice;
  SpiceInflation;

  Wool;
  EffectiveWool;
  WoolInflaiton;

  Coffee;
  EffectiveCoffee;
  CoffeeInflation;

  Fur;
  EffectiveFur;
  FurInflation;

  Diamonds;
  EffectiveDiamonds;
  DiamondInflation;

  Silver;
  EffectiveSilver;
  SilverInflation;

  Copper;
  EffectiveCopper;

  Ivory;
  EffectiveIvory;
  IvoryInflation;

  Cocoa;
  EffectiveCocoa;
  CocoaInflation;

  Tobaco;
  EffectiveTobaco;
  TobaccoInflation;

  Sugar;
  EffectiveSugar;
  SugarInflation;

  ExoticFruit;
  EffectiveExoticFruit;
  ExoticFruitInflation;

  ResourcePopulationGrowthBoost;
  ResourceHappinessBoost;
  ResourceBudgetBoost;
  

    //Resource Prices
  CoalSupply;
  CoalDemand;
  CoalValue;

  GoldSupply;
  GoldDemand;
  GoldValue;

  IronSupply;
  IronDemand;
  IronValue;

  SulphurSupply;
  SulphurDemand;
  SulphurValue;

  CottonSupply;
  CottonDemand;
  CottonValue;

  TeaSupply;
  TeaDemand;
  TeaValue;

  SpiceSupply;
  SpiceDemand;
  SpiceValue;

  CopperSupply;
  CopperDemand;
  CopperValue;

  SilkSupply;
  SilkDemand;
  SilkValue;

  WoolSupply;
  WoolDemand;
  WoolValue;

  CoffeeSupply;
  CoffeeDemand;
  CoffeeValue;

  SilverSupply;
  SilverDemand;
  SilverValue;

  DiamondSupply;
  DiamondDemand;
  DiamondValue;

  FurSupply;
  FurDemand;
  FurValue;

  IvorySupply;
  IvoryDemand;
  IvoryValue;

  CocoaSupply;
  CocoaDemand;
  CocoaValue;

  TobacoSupply;
  TobacoDemand;
  TobacoValue;

  SugarSupply;
  SugarDemand;
  SugarValue;

  ExoticFruitSupply;
  ExoticFruitDemand;
  ExocticFruitValue;


  //Technology
  Isolation;
  ResearchSpending;
  ResearchEffectiveness;
  ResearchBoostFromTech;
  ResearchPointGain;
  ResearchPoints;
  FutureResearchPoints;
  //start of techs
  Gunpowder;
  VerticalLoom;
  SaddleAndStirrup;
  HorseCollar;
  Explosives;
  Firelance;
  Cranes;
  PromissoryNotes;
  Bombards;
  HandCannons;
  PlateArmour;
  SappersAndEngineers;
  Workshops;
  StandardizedPikes;
  Galleons;
  PrintingPress;
  Muskets;
  Limber;
  Docks;
  Gunports;
  Matchlock;
  StarForts;
  TextileManfucatories;
  Reiters;
  MiningCarts;
  HumanAnatomy;
  Mortars;
  Metallurgy;
  Experimentation;
  Bayonet;
  SocketBayonet;
  Flintlock;
  //end
  ArmyTechBoost


  //Economy
  HighClassTax;
  MediumClassTax;
  LowerClassTax;
  EffectiveTax;
  PossiblePublicDebt;
  PublicDebtTaken;
  EffectiveDebt;
  PublicDebtLength;
  FutureDebtLength;
  InterestRate;
  DebtHappinessEffect;

  BudgetIncoming;
  BudgetOutgoing;
  Balance;


  //Cultural Advancements
  CulturalAdvance;
  CulturalProsperity;
  CulturalPowerGain;
  CulturalPower;
  FutureCulturalPower;
  //start of cultural advances
  DivineRightToRule;
  Serfdom;
  Feudalism;
  Universities;
  NobleDuty;
  Courthouses;
  RenaissanceThought;
  EarlyModernAdministration;
  NationalSovereignity;
  Newspapers
  //end


  //Trade
  FoodIncoming;
  FoodOutgoing;

  CoalIncoming;
  CoalOutgoing;

  SulphurIncoming;
  SulphurOutgoing;

  Cottonincoming;
  CottonOutgoing;

  GoldIncoming;
  GoldOutgoing;

  Ironincoming;
  IronOutgoing;

  TeaIncoming;
  TeaOutgoing;

  SilkIncoming;
  SilkOutgoing;

  SpiceIncoming;
  SpiceOutgoing;

  Woolincoming;
  WoolOutgoing;

  Coffeeincoming;
  CoffeeOutgoing;

  FurIncoming;
  FurOutgoing;

  Diamondsincoming;
  DiamondsOutgoing;

  SilverIncoming;
  SilverOutgoing;

  CopperIncoming;
  CopperOutgoing;

  IvoryIncoming;
  IvoryOutgoing;

  CocoaIncoming;
  CocoaOutgoing;

  TobacoIncoming;
  TobacoOutgoing;

  SugarIncoming;
  SugarOutgoing;

  ExoticFruitIncoming;
  ExoticFruitOutgoing;

  TradePowerResourceTrade;


  //Agriculture
  AgricultureSubsidies;
  Fertility;
  AgricultureInfrastructure;
  StockingCapabilities;
  AgricultureAdvancements;
  AgricultureTechnology;
  PopulationInAgriculture;
  FarmingEfficiency;
  AgricultureSpending;
  DailyFood;
  FoodConsumption;
  FoodGain;
  MaxStock;
  Stock;
  FutureFood;
  FoodPopulationBoost;
  SurplusFood;
  SellingCapability;
  FoodSold;
  Foodlost;
  Tradeprofit;


  //War
  Casualties;
  Pillaging;
  Occupation;
  WarExhaustion;
  MinorBattles;
  MajorBattles;
  Fervor;


//Trade Influence
Alaska;
  Cascadia;
  WestCoast;
  HudsonBay;
  GreatLakes;
  Mississipi;
  GulfOfMexico;
  LawrenceGulf;
  EastCoast;
  Carribean;
  CentralAmerica;
  
  GuyanaAndSuriname;
  Amazon;
  Peru;
  RioGrande;
  LaPlata;
  Chile;
  Patagonia;
  



  NorthAnatolia;
  NorthSea;
  BritishIsles;
  EnglishChannel;
  France;
  BayOfBiscay;
  WestIberia;
  Gibraltar;
  WestMediterreanian;
  Rhine;
  CentralMed;
  Adriatic;
  Germany;
  SouthGermany;
  Denmark;
  Baltic;
  NorthNordics;
  BarentsSea;
  Novgorod;
  Poland;
  Dniepr;
  Crimea;
  Balkans;
  Greece;
  EastMed;
  Egypt;
  RedSea;
  WestAfrica;
  CoteDIvoire;
  Nigeria;
  SouthNile;
  Somalia;
  Kongo;
  EastAfrica;
  Mozambique;
  SouthAfrica;

  Mesopotamia;
  PersianGulf;
  Caucasus;
  DonRiver;
  Volga;
  CentralAsia;
  WestSiberia;
  EastSiberia;
  Iran;
  Pakistan;
  Tibet;
  Mongolia;
  Manchuria;
  SeaOfJapan;
  NorthChina;
  YangtzeeRiver;
  SouthChina;
  NorthIndia;
  WestIndia;
  EastIndia;
  Burma;
  SouthEastAsia;
  NorthAustralia;
  SouthAustralia;


  //Land
  Size;
  KmSquared;
  PopDensityPerKmSquared;
  Disease;
  MaxPopulation;
  UnderPopulation;
  DetachedLand;
  LandAdministration ;
  Overextension;

  PolarDesert;

  TaigaAndTundra;

  MontaneForest;

  Medditereanian;

  Arid;

  Steppe;

  Moderate;

  SubTropical;

  Tropical;

  Savanna;

  Mountainous;

  Desert;

  CoastalDesert;

  HabitableLand;

  constructor(nationToCopy){
    nationName.NationName = "Nation name";
    //all the other stats to set immedietly...
  }

  evaluateNation(){
  
    /*Agriculture Subsidies = 0.05;
    Fertility = 0.50;
    Agriculture Infrastructure = 1.10;
    Stocking Capabilities = 1.00;
    Agriculture Advancements = 1.30;
    Agriculture Technology = 0+Horse Collar/2;
    Pop. in Agriculture = Pop. In Agriculture;
    Farming Efficiency = 1+Agriculture Subsidies/5+Fertility-0.5+(Agriculture Infrastructure-1)/10+(Agriculture Advancements-1)/10+Agriculture Technology/10;
    Agriculture Spending = (Pop. in Agriculture*Population/1000*Agriculture Infrastructure/100*(1+Agriculture Subsidies/10)*Stocking Capabilities)/2;
    Daily Food = Pop. in Agriculture*Population/1000*Farming Efficiency*(1-Pillaging)+Food Incoming-Food Outgoing;
    Food Consumption = Population/1000;
    Food Gain = Daily Food-Food Consumption;
    Max Stock = MAX(100,1000*Population/10000000)*Stocking Capabilities;
    Stock = Food;
    Future Food = MIN(Max Stock,Stock+Food Gain);
    Food Pop. Boost = IF(Stock>500,Stock/50000,0);
    Surplus Food = IF(Food Gain+Stock>Max Stock,Food Gain+Stock-Max Stock,0);
    Selling Capability = (Local Trade/2+(Trade Power Americas + Africa+Trade Power Europe+Trade Power Asia)/5)*Mercantilism*200;
    Food Sold = MIN(Selling Capability,Surplus Food);
    Food lost = Surplus Food-Food Sold;
    Trade profit = Food Sold/50;
  
  
    Religion = ;
    Cultural Disunity = Cultural Disunity;
    Religious Disunity = 0.00;
    Population = Population;
    Future Pop. = Population+IF(Future Food<0,Future Food*1000,Population*Pop. Growth/Time Divide);
    Pop. Growth = MAX(-0.3, (0.1+Pop. Growth mod.+Resource Pop. Growth Boost)*(1-Disease)-Birth Control/20);
    Pop. Growth mod. = IF(Fertility>0.5,(Fertility-0.5)/10)+Food Pop. Boost+(Prosperity (QL)-1)/10+IF(Population>2000000,-0.01)+IF(Population>5000000,-0.01)+IF(Population>10000000,-0.02)+IF(Population>15000000,-0.01)+IF(Population<250000,+0.01)+IF(Population<500000,+0.01)+IF(Population>20000000,-0.01)+IF(Population>25000000,-0.01)+IF(Population>40000000,-0.01)+IF(Population>50000000,-0.01)+Under Population;
    Health = 2.00;
    Literacy (%) = Literacy (%);
    Future Literacy = IF(Literacy (%)>Edu. Efficiency*3,Edu. Efficiency*3,Literacy (%)+Edu. Efficiency/10/Time Divide);
    Higher Education = Higher Education;
    Future Higher Education = Higher Education+IF(OR(Edu. Efficiency3,Edu. Efficiency>3),Edu. Efficiency/30)+IF(Higher Education>Edu. Efficiency/3,-0.25);
    Edu. Efficiency = 3;
    Edu. cost mod = 6;
    Adm. Efficiency = 30.00;
    Corruption = MAX(0,Social Spending-Adm. Efficiency/20)+IF(Stability<1, 0.5)+IF(Stability<-1, 0.5)+MAX(0, ((High Class Tax+Medium Class Tax+Lower Class Tax)/3*100)-Adm. Efficiency/2)/10;
    Overextension = Overextension;
    Propaganda = 0;
    Social Spending = 0;
    Prosperity (QL) = 1+Social Spending/2.5+IF(AND(Stock0, Future Food<0),Future Food/2000)+IF(Budget<0.00001,Budget/100)*(1-Pillaging);
    Pop. Happiness = (50+Resource happiness boost)*Prosperity (QL)/10-(Lower Class Tax*Lower Class+Medium Class Tax*Medium Class+High Class*High Class Tax)*100/4-Absolutism/2-Population Control+IF(Mercantilism>1,(-Mercantilism+1)*2.5)+IF(AND(Public Debt>0,Budget<0),-(Public Debt/Possible Public Debt)*10)-War Exhaustion/2-Debt Happiness Effect+IF(Land!E83>10%,-Land!E83/4);
    Stability = Pop. Happiness+Adm. Efficiency/10-Overextension-Cultural Disunity-Religious Disunity+(Propaganda/1.75*(1+Newspapers/2))+Population Control+(Noble Loyalty-0.5)*10+(Clergy Loyalty-0.5)*7.5+(Burghers Loyalty-0.5)*7.5+Population Stability Impact+War Stability Mod*100+(Military Loyalty-1)*7.5;
    At Offensive War = 0;
    At Defensive War = 0;
    War Support = MIN(1, MAX(0,Pop. Happiness/10*2.5+Propaganda/10+Fervor));
    War Stability Mod = IF(AND(At Offensive War1,War Support<75%),(War Support-0.75)/10,0)+MAX(-0.075, IF(AND(At Defensive War1,War Support<40%,Fervor<0),(Fervor)/10,0));
    Absolutism = 0;
    Population Control = 0;
    Birth Control = 0;
    Conscription (%) = Overall Numbers/Population;
    Production = (Local Trade+Trade power)*Artisans*Production Efficiency*10;
    Production Efficiency = Mercantilism+Vertical Loom/5+Workshops+Cranes/5+Textile Manfucatories/2;
    Trade Efficiency = 1*Mercantilism+Cranes/10+Promissory Notes/20+Trade Protection/200;
    Local Trade = 5.00;
    Trade power = Trade Power Resource Trade+Local Trade/2+(Trade Power Americas + Africa+Trade Power Europe+Trade Power Asia);
    Mercantilism = 1;
    Possible Public Debt = MAX(0, Population/10000*(1-(High Class Tax+Medium Class Tax+Lower Class Tax)/3)-Public Debt);
    Public Debt = Effective Debt;
    Daily Budget = (Budget/(10-Adm. Efficiency/10+1)/Time Divide)/(1+Inflation)+Resource Budget Boost-Army Upkeep+Trade Revenue+Effective Tax-Eduation Upkeep-Hygiene Upkeep-Navy Upkeep-Agriculture Spending-Social Spending Upkeep-Spy Upkeep-Pop. Control Upkeep-Propaganda Upkeep+Production Revenue-Fort Upkeep-ADM Upkeep-Research Upkeep+Balance-Recruitment!Propaganda-Recruitment!War Stability Mod;
    Budget = Budget;
    Future Budget = Budget+Daily Budget;
    Inflation = MAX(0, (Budget/1000)/(Adm. Efficiency/10));
    Spies = 0;
    Spy Quality = 1.2;
    Noble Influence = 55.00%;
    Noble Loyalty = 55.00%;
    Clergy Influence = 25.00%;
    Clergy Loyalty = 50.00%;
    Burghers Influence = 10.00%;
    Burghers Loyalty = 50.00%;
    Army Upkeep = Unit Upkeep*((Army Quality+Corruption/5)+Army Wages-1)/Time Divide;
    Spy Upkeep = Spies/200*Spy Quality/Time Divide;
    Social Spending Upkeep = Social Spending*Population/1000000/Time Divide*3;
    Hygiene Upkeep = Health*Population/2000000/Time Divide;
    Eduation Upkeep = Edu. Efficiency*Population/500000*(1.1-Adm. Efficiency/100)*Edu. cost mod/Time Divide;
    Agriculture Spending = Agriculture Spending;
    Propaganda Upkeep = Propaganda*(100-Adm. Efficiency)/100*Population/1000000/Time Divide;
    Pop. Control Upkeep = Population Control*Population/800000/Time Divide;
    Trade Revenue = ((Local Trade+Trade power)*(1-Burghers Influence))/Time Divide*Trade Efficiency+Trade profit;
    ADM Upkeep = Land Administration /Time Divide*2;
    Production Revenue = Production/Time Divide;
    Research Upkeep = Research Spending*Population/500000/Time Divide*Literacy (%)/10;
    Overall Income = (Budget/(10-Adm. Efficiency/10+1)/Time Divide)/(1+Inflation)+Resource Budget Boost+Trade Revenue+Effective Tax+Production Revenue+Balance;
    = ;
    Time Speed = 50;
    Time Divide = 20/Time Speed;
  
  
    Levies = 0;
    Light Infantry = 0;
    Heavy Infantry = 0;
    Archers = 0;
    Crossbowmen = 0;
    Light Cavalry = 0;
    Heavy Cavalry = 0;
    Elite Infantry = 0;
    Elite Cavalry = 0;
    Hand Cannon = 0;
    Musketeers = 0;
    Militia = 0;
    Siege Equipment = 0;
    Large Siege Equipment = 0;
    Cannons = 0;
    free Elite Units cap = ((Overall Numbers-Militia-Levies)*2.5%)-(Elite Cavalry+Elite Infantry);
    Unit Upkeep = (Levies*0.75+Light Infantry*2+Heavy Infantry*4+Archers*3+Crossbowmen*2+Light Cavalry*4+Heavy Cavalry*6.5+Elite Infantry*7+Elite Cavalry*8.5+Hand Cannon*5+Musketeers*3.5+Militia*1.25)/1000+Siege Equipment/10+Large Siege Equipment/5+Cannons/10;
    Overall Numbers = Levies+Light Infantry+Heavy Infantry+Archers+Crossbowmen+Light Cavalry+Heavy Cavalry+Elite Infantry+Militia+Elite Cavalry+Hand Cannon+(Siege Equipment+Large Siege Equipment)*10;
    Small Forts = 0;
    Medium Forts = 0;
    Big Forts = 0;
    Huge Forts = 0;
    Extra City Fortifications = 0;
    Fort Upkeep = (Small Forts*2+Medium Forts*4+Big Forts*8+Huge Forts*16+Extra City Fortifications*5)*Army Quality/Time Divide;
    Iron Shortage = MAX(0, Unit Upkeep/200-Iron Supply);
    Sulphur Shortage = MAX(0, (Cannons*100+Musketeers+Hand Cannon+IF(Reiters1, Light Cavalry+Heavy Cavalry))/15000-Sulphur Supply);
    Commander Freedom = 0;
    Army Wages = 1;
    Training Quality = 0.15;
    Army Tech = 1+Army Tech boost;
    Military Tactics = 0.15;
    Army Quality = MAX(0.1, 1+Training Quality+Army Tech+Military Tactics+Commander Freedom/10-Iron Shortage-Sulphur Shortage-Corruption/5);
    Military Loyalty = MIN(1, MAX(0, 1*Army Wages+IF(Early Modern Administration0,IF(Noble Loyalty<50%,(Noble Loyalty-50%)*2))+IF(Military Morale<70%,-(1-Military Morale)/2)+IF(Budget<0, Budget/Army Upkeep)-Commander Freedom/10));
    Military Morale = MAX(0,MIN(1.5, 1+Fervor+IF(Mil. Discipline>1,-Mil. Discipline+1)*2+IF(War Support<0.5,War Support-0.5)+IF(War Support>0.75, War Support-0.75)+Army Wages-1));
    Mil. Discipline = 100.0%;
  
  
  
    Nation Name = Nation name ;
    Cultural Advance = SUM(Divine Right to Rule:Newspapers);
    Cultural Prosperity = 1.00;
    Cultural Power Gain = (Literacy (%)/3+Pop. Happiness/8)*(Cultural Prosperity+Renaissance Thought/10)/Time Divide;
    Cultural Power = Cultural Power;
    Future Cultural Power = MIN(6, (Cultural Power+Cultural Power Gain));
    Divine Right to Rule = 1;
    Serfdom = 1;
    Feudalism = 1;
    Universities = 1;
    Noble Duty = 1;
    Courthouses = 1;
    Renaissance Thought = 0;
    Early Modern Administration = 0;
    National Sovereignity = 0;
    Newspapers = 0;
  
  
  
    Nation name  = ;
    Population = 5000000;
    Future pop. = Future Pop.;
    Literacy (%) = 7.50;
    Future Literacy = Future Literacy;
    Higher Education = 0.25;
    Future Higher Education = Future Higher Education;
    Budget = 250.00;
    Future Budget = Budget+Daily Budget;
    Food = 100.00;
    Future Food = Future Food;
    Research Points = 6.00;
    Future Research points = Future Research Points;
    Public Debt Length = 0;
    Future Public Length = MAX(0, Public Debt Length+IF(Effective Debt>0,1,0)+IF(Effective Debt0,-100,0));
    Cultural Power = 6.00;
    Future Cultural Power = Future Cultural Power;
    = ;
    = ;
    Date in this nation = 1600;
    Future Date = Date in this nation+Time Speed;
  
  
  
    Nation Name = Nation name ;
    High Class Tax = 12.00%;
    Medium Class Tax = 12.00%;
    Lower Class Tax = 12.00%;
    Effective Tax = ((Lower Class*Population*Lower Class Tax/10000+Population*Medium Class*Medium Class Tax/7500*(100%-Clergy Influence-Burghers Influence)+Population*High Class*High Class Tax/5000*(100%-Noble Influence))*Adm. Efficiency/10*(100%-Noble Influence/4-Clergy Influence/4)*(1-Occupation))/Time Divide*(1-Corruption/10);
    ='All Stats'!AL1 = Possible Public Debt+0.01;
    Public Debt Taken = 0.00;
    Effective Debt = Public Debt Taken*(1+Interest Rate);
    Public Debt Length = Public Debt Length;
    Future Debt Length = Future Public Length;
    Interest Rate = 0.05+Public Debt Length*0.02/Time Divide;
    Debt Happiness Effect = IF(Public Debt Length>1,Effective Debt/('All Stats'!AL1+Public Debt Taken)*(2+Public Debt Length),0);
    = ;
    Budget Incoming = 0;
    Budget Outgoing = 0;
    Balance = Budget Incoming-Budget Outgoing;
  
  
  
    Nations = Nation name ;
    Stability = Stability;
    ='All Stats'!AN1 = Daily Budget;
    ='All Stats'!P1 = Adm. Efficiency;
    ='All Stats'!Z1 = War Support;
    MIlitary Expendures = Army Upkeep+Navy Upkeep;
    D.B + M.E = 'All Stats'!AN1+MIlitary Expendures;
  
  
  
    Nation Name = Nation name ;
    Size = ++++++++++++;
    Km2 = Size*20;
    Pop Density (per km2) = Population/(Km2*Habitable Land);
    Disease = Pop Density (per km2)/25-Health/20-IF(Human Anatomy1, 0.15);
    Max Pop. = Population/Disease;
    Under Population = IF(Disease<0.5,(1-Disease)/10);
    Detached Land = 0.00;
    Land Administration  = ((Size-Detached Land)/25000+Detached Land/10000)*(1-Adm. Efficiency/1000);
    Overextension = Under Population/4+Land Administration /1.5;
    = ;
    = ;
    = ;
    = 0;
    Polar Desert = /Size;
    = 0;
    Taiga/Tundra = /Size;
    = 0;
    Montane Forest = /Size;
    = 0;
    Medditereanian = /Size;
    = 0;
    Arid = /Size;
    = 0;
    Steppe = /Size;
    = 10,000;
    Moderate = /Size;
    = 0;
    Sub-Tropical = /Size;
    = 0;
    Tropical = /Size;
    = 0;
    Savanna = /Size;
    = 0;
    Mountainous = /Size;
    = 0;
    Desert = /Size;
    = 0;
    Coastal Desert = /Size;
    = ;
    Habitable Land = Polar Desert*0+Taiga/Tundra*0.25+Montane Forest*0.6+Medditereanian*0.85+Arid*0.65+Steppe*0.75+Moderate*1+Sub-Tropical*0.75+Tropical*0.6+Savanna*0.65+Mountainous*0.35+Desert*0.05+Coastal Desert*0.35;
  
  
  
    Nation Name = Nation name ;
    Navy Improvements = 0.30;
    Navy Tech = 0+Galleons/4+Docks/2+Gunports/2;
    Navy Quality = 1+Navy Improvements+Navy Tech;
    Light Ships = 0;
    Upkeep for 1 L.S. = ((1/8)*Navy Quality)/Time Divide*(1+Gunports);
    Medium Ships = 0;
    Upkeep for 1 M.S. = ((1/4)*Navy Quality)/Time Divide*(1+Gunports);
    Heavy Ships = 0;
    Upkeep for 1 H.S. = ((1/2)*Navy Quality)/Time Divide*(1+Gunports+Galleons/2);
    Pride of the navy = IF(Naval Power>10000,'ACCESSIBLE');
    Overall Ship Count = Light Ships+Medium Ships+Heavy Ships;
    Trade Protection = Light Ships*0.75+Medium Ships*1+Heavy Ships*0.75;
    Naval Power = (Light Ships*0.5+Medium Ships+2*Heavy Ships)*Navy Quality;
    Navy Upkeep = (Light Ships*Upkeep for 1 L.S.+Medium Ships*Upkeep for 1 M.S.+Heavy Ships*Upkeep for 1 H.S.);
  
  
  
    Nation Name = Nation name ;
    Pop. In Agriculture = 100%-Pop. In Military-Artisans-Clergy-Burghers-Nobility-Pop. In Resource Harvest;
    Pop. In Resource Harvest = (Coal+Sulphur+Cotton+Gold+Iron+Tea+Silk+Spices+Wool+Coffee+Fur+Diamonds+Silver+Copper)*20000/Population;
    Pop. In Military = Conscription (%);
    Artisans = 1.00%;
    Clergy = 0.75%;
    Nobility = 1.00%;
    Burghers = 0.50%;
    High Class = Nobility;
    Medium Class = Artisans+Clergy+Burghers;
    Lower Class = Pop. In Agriculture+Pop. In Military;
    Primary Culture = ;
    Culture Group = ;
    Accepted Culture = ;
    Undesirable Culture = ;
    Primary Culture % = 100%-Culture Group %-Accepted Culture %-Undesirable Culture%;
    Culture Group % = 0.00%;
    Accepted Culture % = 0.00%;
    Undesirable Culture% = 0.00%;
    Cultural Disunity = (Culture Group %*0.1+Accepted Culture %*0.35+Undesirable Culture%*0.8)*(10+National Sovereignity*2);
    = ;
    Population Stability Impact = IF(Population>Adm. Efficiency*500000, (Adm. Efficiency*500000-Population)/50000000)*10;
    Population Tech Impact = IF(Population>20000000, (Population-20000000)/250000000);
  
  
  
    Nation Name = Nation name ;
    Mining Efficiency = 1.20;
    =Agriculture!I1 = Farming Efficiency;
    Coal = 0.00;
    Effective Coal = Coal*Mining Efficiency+Coal Incoming-Coal Outgoing;
    Sulphur = 0.00;
    Effective Sulphur = Sulphur*Mining Efficiency+Sulphur Incoming-Sulphur Outgoing;
    Cotton = 0.00;
    Effective Cotton = Cotton*Agriculture!I1+Cotton incoming-Cotton Outgoing;
    Cotton Inf. = IF(Effective Cotton>3,Effective Cotton-3,0);
    Gold = 0.00;
    Effective Gold = Gold*Mining Efficiency+Gold Incoming-Gold Outgoing;
    Gold Inf. = IF(Effective Gold>3,Effective Gold-3,0);
    Iron = 0;
    Effective Iron = Iron*Mining Efficiency+Iron incoming-Iron Outgoing;
    Tea = 0.00;
    Effective Tea = Tea*Agriculture!I1+Tea Incoming-Tea Outgoing;
    Tea Inf. = IF(Effective Tea>3,Effective Tea-3,0);
    Silk = 0;
    Effective Silk = Silk*Agriculture!I1+Silk Incoming-Silk Outgoing;
    Silk Inf. = IF(Effective Silk>3,Effective Silk-3,0);
    Spices = 0;
    Effective Spice = Spices*Agriculture!I1+Spice Incoming-Spice Outgoing;
    Spice Inf. = IF(Effective Spice>5,Effective Spice-5,0);
    Wool = 0;
    Effective Wool = Wool+Wool incoming-Wool Outgoing;
    Wool Inf. = IF(Effective Wool>3.5,Effective Wool-3.5,0);
    Coffee = 0;
    Effective Coffee = Coffee*Agriculture!I1+Coffee incoming-Coffee Outgoing;
    Coffee Inf. = IF(Effective Coffee>3,Effective Coffee-3,0);
    Fur = 0;
    Effective Fur = Fur+Fur Incoming-Fur Outgoing;
    Fur Inf. = IF(Effective Fur>3.5,Effective Fur-3.5,0);
    Diamonds = 0;
    Effective Diamonds = Diamonds*Mining Efficiency+Diamonds incoming-Diamonds Outgoing;
    Diamond Inf. = IF(Effective Diamonds>3,Effective Diamonds-3,0);
    Silver = 0;
    Effective Silver = Silver*Mining Efficiency+Silver Incoming-Silver Outgoing;
    Silver Inf. = IF(Effective Silver>3,Effective Silver-3,0);
    Copper = 0;
    Effective Copper = Copper*Mining Efficiency+Copper Incoming-Copper Outgoing;
    Ivory = 0;
    Effective Ivory = Ivory+Ivory Incoming-Ivory Outgoing;
    Ivory Inf. = IF(Effective Ivory>2.5,Effective Ivory-2.5,0);
    Cocoa = 0;
    Effective Cocoa = Cocoa+Cocoa Incoming-Cocoa Outgoing;
    Cocoa Inf. = IF(Effective Cocoa>3,Effective Cocoa-3,0);
    Tobaco = 0;
    Effective Tobaco = Tobaco+Tobaco Incoming-Tobaco Outgoing;
    Tobacco Inf. = IF(Effective Tobaco>3,Effective Tobaco-3,0);
    Sugar = 0;
    Effective Sugar = Sugar+Sugar Incoming-Sugar Outgoing;
    Sugar Inf. = IF(Effective Sugar>3,Effective Sugar-3,0);
    Exotic Fruit = 0;
    Effective Ex. Fruit = Exotic Fruit+Ex. Fruit Incoming-Ex. Fruit Outgoing;
    Ex. Fruit Inf. = IF(Effective Ex. Fruit>3,Effective Ex. Fruit-3,0);
    Resource Pop. Growth Boost = (Effective Cotton-Cotton Inf.+Effective Spice-Spice Inf.+Effective Wool-Wool Inf.+Effective Fur-Fur Inf.+(Effective Sugar-Sugar Inf.+Effective Ex. Fruit-Ex. Fruit Inf.)/2)/100;
    Resource happiness boost = Effective Cotton-Cotton Inf.+Effective Gold-Gold Inf.+Effective Tea-Tea Inf.+Effective Silk-Silk Inf.+Effective Spice-Spice Inf.+Effective Wool-Wool Inf.+Effective Coffee-Coffee Inf.+Effective Fur-Fur Inf.+Effective Diamonds-Diamond Inf.+Effective Silver-Silver Inf.+Effective Ivory-Ivory Inf.+Effective Cocoa-Cocoa Inf.+Effective Tobaco-Tobacco Inf.+Effective Sugar-Sugar Inf.+Effective Ex. Fruit-Ex. Fruit Inf.;
    Resource Budget Boost = (Effective Coal*Coal Value+Effective Sulphur*Sulphur Value+(Effective Gold-Gold Inf.)*Gold Value+Effective Iron*Iron Value+(Effective Silver-Silver Inf.)*Silver Value+Effective Copper*Copper Value)/Time Divide;
  
  
  
    Nation = Nation name ;
    Coal Supply = Effective Coal;
    Coal Demand = (Iron Supply+Gold Supply+Copper Supply+Silver Supply)*0.5+(Population*Health/500000)+Population/500000;
    Coal Value = Coal Demand/(SQRT(Coal Supply)+0.1);
    Gold Supply = Effective Gold;
    Gold Demand = Population/200000;
    Gold Value = Gold Demand/(SQRT(Gold Supply)+0.1);
    Iron Supply = Effective Iron;
    Iron Demand = ((Unit Upkeep+Fort Upkeep)/50+Population/500000)*(1+Metallurgy/10);
    Iron Value = Iron Demand/(SQRT(Iron Supply)+0.1);
    Sulphur Supply = Effective Sulphur;
    Sulphur Demand = Population/2000000;
    Sulphur Value = Sulphur Demand/(SQRT(Sulphur Supply)+0.1);
    Cotton Supply = Effective Cotton;
    Cotton Demand = Population/500000;
    Cotton Value = Cotton Demand/(SQRT(Cotton Supply)+0.1);
    Tea Supply = Effective Tea;
    Tea Demand = Population/500000;
    Tea Value = Tea Demand/(SQRT(Tea Supply)+0.1);
    Spice Supply = Effective Spice;
    Spice Demand = Population/400000;
    Spice Value = Spice Demand/(SQRT(Spice Supply)+0.1);
    Copper Supply = Effective Copper;
    Copper Demand = (Unit Upkeep+Fort Upkeep)/100+Population/750000;
    Copper Value = Copper Demand/(SQRT(Copper Supply)+0.1);
    Silk Supply = Effective Silk;
    Silk Demand = Population/400000;
    Silk Value = Silk Demand/(SQRT(Silk Supply)+0.1);
    Wool Supply = Effective Wool;
    Wool Demand = Population/700000;
    Wool Value = Wool Demand/(SQRT(Wool Supply)+0.1);
    Coffee Supply = Effective Coffee;
    Coffee Demand = Population/500000;
    Coffee Value = Coffee Demand/(SQRT(Coffee Supply)+0.1);
    Silver Supply = Effective Silver;
    Silver Demand = Population/300000;
    Silver Value = Silver Demand/(SQRT(Silver Supply)+0.1);
    Diamond Supply = Effective Diamonds;
    Diamond Demand = Population/250000;
    Diamond Value = Diamond Demand/(SQRT(Diamond Supply)+0.1);
    Fur Supply = Effective Fur;
    Fur Demand = Population/450000;
    Fur Value = Fur Demand/(SQRT(Fur Supply)+0.1);
    Ivory Supply = Effective Ivory;
    Ivory Demand = Population/250000;
    Ivory Value = Ivory Demand/(SQRT(Ivory Supply)+0.1);
    Cocoa Supply = Effective Cocoa;
    Cocoa Demand = Population/500000;
    Cocoa Value = Cocoa Demand/(SQRT(Cocoa Supply)+0.1);
    Tobaco Supply = Effective Tobaco;
    Tobaco Demand = Population/500000;
    Tobaco Value = Tobaco Demand/(SQRT(Tobaco Supply)+0.1);
    Sugar Supply = Effective Sugar;
    Sugar Demand = Population/350000;
    Sugar Value = Sugar Demand/(SQRT(Sugar Supply)+0.1);
    Ex. Fruit Supply = Effective Ex. Fruit;
    Ex. Fruit Demand = Population/350000;
    Ex. Fruit Value = Ex. Fruit Demand/(SQRT(Ex. Fruit Supply)+0.1);
  
  
  
    Nation = Nation name ;
    Isolation = 1;
    Research Spending = 1.00;
    Research Effectiveness = 1.00;
    Research boost from Tech = 1+Universities/10+Renaissance Thought/5+Experimentation/5;
    Research Point Gain = MAX(1 , (Research Spending*Research Effectiveness*Research boost from Tech*Literacy (%)/Isolation/Time Divide*2/10+Research Spending*Research Effectiveness*Higher Education/Isolation/Time Divide*5/10)*(1-IF(Noble Influence>0.5, Noble Influence-0.5)/1.5-IF(Clergy Influence>0.5, Clergy Influence-0.5)/1.5)*(1-Population Tech Impact));
    Research Points = Research Points;
    Future Research Points = MIN(7.5 ,Research Points+Research Point Gain);
    = ;
    Gunpowder = 1;
    Vertical Loom = 1;
    Saddle & Stirrup = 1;
    Horse Collar = 1;
    Explosives = 1;
    Fire lance = 1;
    Cranes = 1;
    Promissory Notes = 1;
    Bombards = 1;
    Hand Cannons = 1;
    Plate Armour = 1;
    Sappers/Engineers = 1;
    Workshops = 1;
    Standardized Pikes = 1;
    Galleons = 0;
    Printing Press = 0;
    Muskets = 0;
    Limber = 0;
    Docks = 0;
    Gunports = 0;
    Matchlock = 0;
    Star Forts = 0;
    Textile Manfucatories = 0;
    Reiters = 0;
    Mining Carts = 0;
    Human Anatomy = 0;
    Mortars = 0;
    Metallurgy = 0;
    Experimentation = 0;
    Bayonet = 0;
    Socket Bayonet = 0;
    Flintlock = 0;
    = ;
    = ;
    = ;
    = ;
    = ;
    = ;
    = ;
    = ;
    = ;
    = ;
    = ;
    = ;
    = ;
    = ;
    = ;
    Army Tech boost = (Saddle & Stirrup+Matchlock+Socket Bayonet+Flintlock)/5+(Gunpowder+Plate Armour+Standardized Pikes+Muskets+Limber+Mortars+Reiters+Metallurgy+Bayonet)/10+(Fire lance+Bombards+Hand Cannons+Sappers/Engineers)/20;
  
  
  
    Nation Name = Nation name ;
    Food Incoming = 0.00;
    Food Outgoing = 0.00;
    Coal Incoming = 0.00;
    Coal Outgoing = 0.00;
    Sulphur Incoming = 0.00;
    Sulphur Outgoing = 0.00;
    Cotton incoming = 0.00;
    Cotton Outgoing = 0.00;
    Gold Incoming = 0.00;
    Gold Outgoing = 0.00;
    Iron incoming = 0;
    Iron Outgoing = 0;
    Tea Incoming = 0.00;
    Tea Outgoing = 0.00;
    Silk Incoming = 0;
    Silk Outgoing = 0;
    Spice Incoming = 0;
    Spice Outgoing = 0;
    Wool incoming = 0;
    Wool Outgoing = 0;
    Coffee incoming = 0;
    Coffee Outgoing = 0;
    Fur Incoming = 0;
    Fur Outgoing = 0;
    Diamonds incoming = 0;
    Diamonds Outgoing = 0;
    Silver Incoming = 0;
    Silver Outgoing = 0;
    Copper Incoming = 0;
    Copper Outgoing = 0;
    Ivory Incoming = 0;
    Ivory Outgoing = 0;
    Cocoa Incoming = 0;
    Cocoa Outgoing = 0;
    Tobaco Incoming = 0;
    Tobaco Outgoing = 0;
    Sugar Incoming = 0;
    Sugar Outgoing = 0;
    Ex. Fruit Incoming = 0;
    Ex. Fruit Outgoing = 0;
    Trade Power Resource Trade = Sulphur Incoming*Sulphur Value+Coal Incoming*Coal Value+Cotton incoming*Cotton Value+Gold Incoming*Gold Value+Iron incoming*Iron Value+Tea Incoming*Tea Value+Silk Incoming*Silk Value+Spice Incoming*Spice Value+Wool incoming*Wool Value+Coffee incoming*Coffee Value+Fur Incoming*Fur Value+Diamonds incoming*Diamond Value+Silver Incoming*Silver Value+Copper Incoming*Copper Value+Ivory Incoming*Ivory Value+Cocoa Incoming*Cocoa Value+Tobaco Incoming*Tobaco Value+Sugar Incoming*Sugar Value+Ex. Fruit Incoming*Ex. Fruit Value;
  
  
  
    Nation Name Influence = Nation name ;
    Alaska Influence = ;
    = Alaska Influence/(SUM(B:B)+0.000001);
    Cascadia Influence = ;
    = Cascadia Influence/(SUM(D:D)+0.000001);
    West Coast Influence = ;
    = West Coast Influence/(SUM(F:F)+0.000001);
    Hudson Bay Influence = ;
    = Hudson Bay Influence/(SUM(H:H)+0.000001);
    Great Lakes Influence = ;
    = Great Lakes Influence/(SUM(J:J)+0.000001);
    Mississipi Influence = ;
    = Mississipi Influence/(SUM(L:L)+0.000001);
    Gulf of Mexico Influence = ;
    = Gulf of Mexico Influence/(SUM(N:N)+0.000001);
    Lawrence Gulf Influence = ;
    = Lawrence Gulf Influence/(SUM(P:P)+0.000001);
    East Coast Influence = ;
    = East Coast Influence/(SUM(R:R)+0.000001);
    Carribean Influence = ;
    = Carribean Influence/(SUM(T:T)+0.000001);
    Central America Influence = ;
    = Central America Influence/(SUM(V:V)+0.000001);
    Guyana/Suriname Influence = ;
    = Guyana/Suriname Influence/(SUM(X:X)+0.000001);
    Amazon Influence = ;
    = Amazon Influence/(SUM(Z:Z)+0.000001);
    Peru Influence = ;
    = Peru Influence/(SUM(AB:AB)+0.000001);
    Rio Grande Influence = ;
    = Rio Grande Influence/(SUM(AD:AD)+0.000001);
    La Plata Influence = ;
    = La Plata Influence/(SUM(AF:AF)+0.000001);
    Chile Influence = ;
    = Chile Influence/(SUM(AH:AH)+0.000001);
    Patagonia Influence = ;
    = Patagonia Influence/(SUM(AJ:AJ)+0.000001);
    Egypt Influence = ;
    = Egypt Influence/(SUM(AL:AL)+0.000001);
    Red Sea Influence = ;
    = Red Sea Influence/(SUM(AN:AN)+0.000001);
    West Africa Influence = ;
    = West Africa Influence/(SUM(AP:AP)+0.000001);
    Cote d'ivoire Influence = ;
    = Cote d'ivoire Influence/(SUM(AR:AR)+0.000001);
    Nigeria Influence = ;
    = Nigeria Influence/(SUM(AT:AT)+0.000001);
    South Nile Influence = ;
    = South Nile Influence/(SUM(AV:AV)+0.000001);
    Somalia Influence = ;
    = Somalia Influence/(SUM(AX:AX)+0.000001);
    Kongo Influence = ;
    = Kongo Influence/(SUM(AZ:AZ)+0.000001);
    East Africa Influence = ;
    = East Africa Influence/(SUM(BB:BB)+0.000001);
    Mozambique Influence = ;
    = Mozambique Influence/(SUM(BD:BD)+0.000001);
    South Africa Influence = ;
    = South Africa Influence/(SUM(BF:BF)+0.000001);
    Trade Power NA Influence = *'Trade Zone Wealth'!$A$2+*'Trade Zone Wealth'!$B$2+*'Trade Zone Wealth'!$C$2+*'Trade Zone Wealth'!$D$2+*'Trade Zone Wealth'!$E$2+*'Trade Zone Wealth'!$F$2+*'Trade Zone Wealth'!$G$2+*'Trade Zone Wealth'!$H$2+*'Trade Zone Wealth'!$I$2+*'Trade Zone Wealth'!$J$2+*'Trade Zone Wealth'!$K$2;
    Trade Power SA Influence = *'Trade Zone Wealth'!$M$2+*'Trade Zone Wealth'!$N$2+*'Trade Zone Wealth'!$O$2+*'Trade Zone Wealth'!$P$2+*'Trade Zone Wealth'!$Q$2+*'Trade Zone Wealth'!$R$2+*'Trade Zone Wealth'!$S$2;
    Trade Power Africa Influence = *'Trade Zone Wealth'!$AW$2+*'Trade Zone Wealth'!$AX$2+*'Trade Zone Wealth'!$AY$2+*'Trade Zone Wealth'!$AZ$2+*'Trade Zone Wealth'!$BA$2+*'Trade Zone Wealth'!$BB$2+*'Trade Zone Wealth'!$BC$2+*'Trade Zone Wealth'!$BD$2+*'Trade Zone Wealth'!$BE$2+*'Trade Zone Wealth'!$BF$2+*'Trade Zone Wealth'!$BG$2;
    Trade Power Americas + Africa = SUM(Trade Power SA Influence:Trade Power Africa Influence);
  
  
  
    Nation Name Influence = Nation name ;
    Mesopotamia Influence = ;
    = Mesopotamia Influence/(SUM(B:B)+0.000001);
    Persian Gulf Influence = ;
    = Persian Gulf Influence/(SUM(D:D)+0.000001);
    Caucasus Influence = ;
    = Caucasus Influence/(SUM(F:F)+0.000001);
    Don (River) Influence = ;
    = Don (River) Influence/(SUM(H:H)+0.000001);
    Volga Influence = ;
    = Volga Influence/(SUM(J:J)+0.000001);
    Central Asia Influence = ;
    = Central Asia Influence/(SUM(L:L)+0.000001);
    West Siberia Influence = ;
    = West Siberia Influence/(SUM(N:N)+0.000001);
    East Siberia Influence = ;
    = East Siberia Influence/(SUM(P:P)+0.000001);
    Iran Influence = ;
    = Iran Influence/(SUM(R:R)+0.000001);
    Pakistan Influence = ;
    = Pakistan Influence/(SUM(T:T)+0.000001);
    Tibet Influence = ;
    = Tibet Influence/(SUM(V:V)+0.000001);
    Mongolia Influence = ;
    = Mongolia Influence/(SUM(X:X)+0.000001);
    Manchuria Influence = ;
    = Manchuria Influence/(SUM(Z:Z)+0.000001);
    Japan Influence = ;
    = Japan Influence/(SUM(AB:AB)+0.000001);
    North China Influence = ;
    = North China Influence/(SUM(AD:AD)+0.000001);
    Yangtzee River Influence = ;
    = Yangtzee River Influence/(SUM(AF:AF)+0.000001);
    South China Influence = ;
    = South China Influence/(SUM(AH:AH)+0.000001);
    North India Influence = ;
    = North India Influence/(SUM(AJ:AJ)+0.000001);
    West India Influence = ;
    = West India Influence/(SUM(AL:AL)+0.000001);
    East India Influence = ;
    = East India Influence/(SUM(AN:AN)+0.000001);
    Burma Influence = ;
    = Burma Influence/(SUM(AP:AP)+0.000001);
    South-East Asia Influence = ;
    = South-East Asia Influence/(SUM(AR:AR)+0.000001);
    North Australia Influence = ;
    = North Australia Influence/(SUM(AT:AT)+0.000001);
    South Australia Influence = ;
    = South Australia Influence/(SUM(AV:AV)+0.000001);
    Trade Power Asia = *Mesopotamia+*Persian Gulf+*Caucasus+*Don (River)+*Volga+*Central Asia+*West Siberia+*East Siberia+*Iran+*Pakistan+*Tibet+*Mongolia+*Manchuria+*Sea of Japan+*North China+*Yangtzee River+*South China+*North India+*West India+*East India+*Burma+*South-East Asia+*North Australia+*South Australia;
  
  
  
    Nation Name Influence = Nation name ;
    North Sea Influence = ;
    = North Sea Influence/(SUM(B:B)+0.000001);
    British Isles Influence = ;
    = British Isles Influence/(SUM(D:D)+0.000001);
    English Channel Influence = ;
    = English Channel Influence/(SUM(F:F)+0.000001);
    France Influence = ;
    = France Influence/(SUM(H:H)+0.000001);
    Bay of Biscay Influence = ;
    = Bay of Biscay Influence/(SUM(J:J)+0.000001);
    West Iberia Influence = ;
    = West Iberia Influence/(SUM(L:L)+0.000001);
    Gibraltar Influence = ;
    = Gibraltar Influence/(SUM(N:N)+0.000001);
    West Mediterreanian Influence = ;
    = West Mediterreanian Influence/(SUM(P:P)+0.000001);
    Rhine Influence = ;
    = Rhine Influence/(SUM(R:R)+0.000001);
    Central Med Influence = ;
    = Central Med Influence/(SUM(T:T)+0.000001);
    Adriatic Influence = ;
    = Adriatic Influence/(SUM(V:V)+0.000001);
    Germany Influence = ;
    = Germany Influence/(SUM(X:X)+0.000001);
    South Germany Influence = ;
    = South Germany Influence/(SUM(Z:Z)+0.000001);
    Denmark Influence = ;
    = Denmark Influence/(SUM(AB:AB)+0.000001);
    Baltic Influence = ;
    = Baltic Influence/(SUM(AD:AD)+0.000001);
    North Nordics Influence = ;
    = North Nordics Influence/(SUM(AF:AF)+0.000001);
    Barents Sea Influence = ;
    = Barents Sea Influence/(SUM(AH:AH)+0.000001);
    Novgrod Influence = ;
    = Novgrod Influence/(SUM(AJ:AJ)+0.000001);
    Poland Influence = ;
    = Poland Influence/(SUM(AL:AL)+0.000001);
    Dniepr Influence = ;
    = Dniepr Influence/(SUM(AN:AN)+0.000001);
    Crimea Influence = ;
    = Crimea Influence/(SUM(AP:AP)+0.000001);
    Balkans Influence = ;
    = Balkans Influence/(SUM(AR:AR)+0.000001);
    Greece Influence = ;
    = Greece Influence/(SUM(AT:AT)+0.000001);
    North Anatolia Influence = ;
    = North Anatolia Influence/(SUM(AV:AV)+0.000001);
    East Med Influence = ;
    = East Med Influence/(SUM(AX:AX)+0.000001);
    Trade Power Europe = *North Sea+*British Isles+*English Channel+*France+*Bay of Biscay+*West Iberia+*Gibraltar+*West Mediterreanian+*Rhine+*Central Med+*Adriatic+*Germany+*South Germany+*Denmark+*Baltic+*North Nordics+*Barents Sea+*Novgorod+*Poland+*Dniepr+*Crimea+*Balkans+*Greece+*North Anatolia+*East Med;
  
  
  
    Alaska = 1;
    Cascadia = 1;
    West Coast = 1;
    Hudson Bay = 1;
    Great Lakes = 2;
    Mississipi = 1.5;
    Gulf of Mexico = 3;
    Lawrence Gulf = 2;
    East Coast = 4;
    Carribean = 3;
    Central America = 2.5;
    = 0;
    Guyana/Suriname = 1;
    Amazon = 1;
    Peru = 1;
    Rio Grande = 1;
    La Plata = 1.5;
    Chile = 1;
    Patagonia = 1;
    = ;
    = ;
    = ;
    = ;
    North Anatolia = 3;
    North Sea = 2;
    British Isles = 6.5;
    English Channel = 7;
    France = 4;
    Bay of Biscay = 3.5;
    West Iberia = 4;
    Gibraltar = 5;
    West Mediterreanian = 4;
    Rhine = 3.5;
    Central Med = 5;
    Adriatic = 4;
    Germany = 4;
    South Germany = 3.5;
    Denmark = 3.5;
    Baltic = 4;
    North Nordics = 1;
    Barents Sea = 1;
    Novgorod = 3;
    Poland = 2.5;
    Dniepr = 4;
    Crimea = 3;
    Balkans = 3.5;
    Greece = 3.5;
    East Med = 3.5;
    Egypt = 3.5;
    Red Sea = 1.5;
    West Africa = 1;
    Cote d'ivoire = 3;
    Nigeria = 3;
    South Nile = 1.5;
    Somalia = 1;
    Kongo = 1;
    East Africa = 1;
    Mozambique = 1;
    South Africa = 2;
    = ;
    Mesopotamia = 4;
    Persian Gulf = 2;
    Caucasus = 3;
    Don (River) = 3;
    Volga = 2;
    Central Asia = 2;
    West Siberia = 2;
    East Siberia = 2;
    Iran = 2.5;
    Pakistan = 2.5;
    Tibet = 2;
    Mongolia = 1.5;
    Manchuria = 1.5;
    Sea of Japan = 2.5;
    North China = 3;
    Yangtzee River = 4;
    South China = 4;
    North India = 3;
    West India = 3;
    East India = 3;
    Burma = 3.5;
    South-East Asia = 4;
    North Australia = 1;
    South Australia = 1;
  
  
  
    Nation Name = Nation name ;
    Casualties = 0;
    Pillaging = 0.00%;
    Occupation = 0.00%;
    War Exhaustion = (Casualties/Population*500)+(Pillaging*20)+(Occupation*5);
    Minor Battles = 0;
    Major Battles = 0;
    Fervor = MIN(1, MAX(-1, 0+Minor Battles/20+Major Battles/10+Pillaging-(Casualties/(Overall Numbers+Casualties+0.0000001))));
  
   */
  
  }

  clearNewTroops(){

  }
}

class TradeZones{
  Alaska;
  Cascadia;
  WestCoast;
  HudsonBay;
  GreatLakes;
  Mississipi;
  GulfOfMexico;
  LawrenceGulf;
  EastCoast;
  Carribean;
  CentralAmerica;
  
  GuyanaAndSuriname;
  Amazon;
  Peru;
  RioGrande;
  LaPlata;
  Chile;
  Patagonia;
  



  NorthAnatolia;
  NorthSea;
  BritishIsles;
  EnglishChannel;
  France;
  BayOfBiscay;
  WestIberia;
  Gibraltar;
  WestMediterreanian;
  Rhine;
  CentralMed;
  Adriatic;
  Germany;
  SouthGermany;
  Denmark;
  Baltic;
  NorthNordics;
  BarentsSea;
  Novgorod;
  Poland;
  Dniepr;
  Crimea;
  Balkans;
  Greece;
  EastMed;
  Egypt;
  RedSea;
  WestAfrica;
  CoteDIvoire;
  Nigeria;
  SouthNile;
  Somalia;
  Kongo;
  EastAfrica;
  Mozambique;
  SouthAfrica;

  Mesopotamia;
  PersianGulf;
  Caucasus;
  DonRiver;
  Volga;
  CentralAsia;
  WestSiberia;
  EastSiberia;
  Iran;
  Pakistan;
  Tibet;
  Mongolia;
  Manchuria;
  SeaOfJapan;
  NorthChina;
  YangtzeeRiver;
  SouthChina;
  NorthIndia;
  WestIndia;
  EastIndia;
  Burma;
  SouthEastAsia;
  NorthAustralia;
  SouthAustralia;
}

function evaluateNations(){
  for (let i = 0; i < Nations.length; i++) {
    const nation = Nations[i].nationName;
    nation.evaluateNation();
  }
}





