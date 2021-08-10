
var MaxItems = 11;
var showUnavailable = false;
if (window.location.href.indexOf("?su=1") > 0)
  showUnavailable = true;

function CraftableObject(name, levels, type, partType, materialType, traitsNotKnown)
{
  this.name = name;
  this.levels = levels;
  this.type = type;                       // armor, weapon
  this.partType = partType;               // sword, legs, staff, etc.
  this.materialType = materialType;
  this.traitsNotKnown = traitsNotKnown;
}

CraftableObject.prototype = {
  name : null,
  levels : null,
  type : null,
  partType : null,
  materialType : null,
  traitsNotKnown : null
}


function MaterialLevel(level, materialName, count)
{
  this.level = level;
  this.materialName = materialName;
  this.count = count;
}

MaterialLevel.prototype = {
  level : null,
  materialName : null,
  count : null
}

function Style(name, material)
{
  this.name = name;
  this.material = material;
}

Style.prototype = {
  name : null,
  material : null
}

function Trait(name, material)
{
  this.name = name;
  this.material = material;
}

Trait.prototype = {
  name : null,
  material : null
}

function ImprovementLevel(name, materialCount)
{
  this.name = name;
  this.materialCount = materialCount;
}

ImprovementLevel.prototype = {
  name : null,
  materialCount : null
}

/*
 * if negateList is true, partList represents all the parts NOT known.
 */
function StylePartsKnown(styleName, allPartsKnown, partsList, negateList)
{
  this.styleName = styleName;
  this.allPartsKnown = allPartsKnown;
  this.partsList = partsList;
  this.negateList = negateList;
}

StylePartsKnown.prototype = {
  styleName : null,
  allPartsKnown : null,
  partsList : null,
  negateList : null
}

var levelArray = [ "1", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "24", "26", "28", "30", "32", "34", "36", "38", "40", "42", "44", "46", "48", "50", "CP10", "CP20", "CP30", "CP40", "CP50", "CP60", "CP70", "CP80", "CP90", "CP100", "CP110", "CP120", "CP130", "CP140", "CP150", "CP160"];

var setArray = [ "No set", "Adept Rider", "Aetherial Ascension", "Alessia's Bulwark", "Ancient Dragonguard", "Armor Master", "Armor of the Seducer", "Ashen Grip", "Assassin's Guile", "Clever Alchemist", "Coldharbour's Favorite", "Critical Riposte", "Daedric Trickery", "Daring Corsair", "Dauntless Combatant", "Death's Wind", "Diamond's Victory",  "Dragon's Appetite", "Eternal Hunt", "Eyes of Mara", "Fortified Brass", "Grave-Stake Collector",  "Heartland Conqueror", "Hist Bark", "Hunding's Rage", "Innate Axiom", "Kagrenac's Hope", "Kvatch Gladiator", "Law of Julianos", "Legacy of Karth", "Magnus's Gift", "Mechanical Acuity", "Might of the Lost Legion", "Morkuldin", "Naga Shaman", "New Moon Acolyte", "Night Mother's Gaze", "Night's Silence", "Noble's Conquest", "Nocturnal's Favor", "Oblivion's Foe", "Orgnum's Scales", "Pelinal's Aptitude", "Red Eagle's Fury", "Redistributor", "Senche-raht's Grit", "Shacklebreaker", "Shalidor's Curse", "Sload's Semblance", "Song of Lamae", "Spectre's Eye", "Spell Parasite", "Stuhn's Favor", "Tava's Favor", "Torug's Pact", "Trial by Fire", "Twice-born Star", "Twilight's Embrace", "Unchained Aggressor", "Vampire's Kiss", "Varen's Legacy", "Vastarie's Tutelage", "Whitestrake's Retribution", "Willow's Path" "Way of the Arena" ];

var styleArray = [];
styleArray.push(new Style("Abah's Watch", "polished shilling"));
styleArray.push(new Style("Akaviri", "goldscale"));
styleArray.push(new Style("Ancestral Akaviri", "burnished goldscale"));
styleArray.push(new Style("Aldmeri Dominion", "eagle feather"));
styleArray.push(new Style("Altmer", "adamantite"));
styleArray.push(new Style("Ancestral High Elf", "etched adamantite"));
styleArray.push(new Style("Ancestral Nord", "etched corundum"));
styleArray.push(new Style("Ancestral Orc", "etched manganese"));
styleArray.push(new Style("Ancestral Reach", "etched bronze"));
styleArray.push(new Style("Ancient Elf", "palladium"));
styleArray.push(new Style("Ancient Orc", "cassiterite"));
styleArray.push(new Style("Anequina", "shimmering sand"));
styleArray.push(new Style("Apostle", "polished brass"));
styleArray.push(new Style("Argonian", "flint"));
styleArray.push(new Style("Arkthzand Armory", "arkthzand sprocket"));
styleArray.push(new Style("Ashlander", "ash canvas"));
styleArray.push(new Style("Assassins League", "tainted blood"));
styleArray.push(new Style("Barbaric", "copper"));
styleArray.push(new Style("Blackreach Vanguard", "gloomspore chitin"));
styleArray.push(new Style("Black Fin Legion", "marshnettle sprig"));
styleArray.push(new Style("Bloodforge", "bloodroot flux"));
styleArray.push(new Style("Bosmer", "bone"));
styleArray.push(new Style("Breton", "molybdenum"));
styleArray.push(new Style("Buoyant Armiger", "volcant viridian"));
styleArray.push(new Style("Celestial", "star sapphire"));
styleArray.push(new Style("Coldsnap Goblin", "goblin-cloth scrap"));
styleArray.push(new Style("Daedric", "daedra heart"));
styleArray.push(new Style("Daggerfall Covenant", "lion fang"));
styleArray.push(new Style("Dark Brotherhood", "black beeswax"));
styleArray.push(new Style("Dead-Water", "crocodile leather"));
styleArray.push(new Style("Draugr", "pristine shroud"));
styleArray.push(new Style("Dragonguard", "gilding salts"));
styleArray.push(new Style("Dreadhorn", "minotaur bezoar"));
styleArray.push(new Style("Dremora", "warrior's heart ashes"));
styleArray.push(new Style("Dro-m'Athra", "defiled whiskers"));
styleArray.push(new Style("Dunmer", "obsidian"));
styleArray.push(new Style("Dwemer", "dwemer frame"));
styleArray.push(new Style("Ebonheart Pact", "dragon scute"));
styleArray.push(new Style("Ebonshadow", "tenebrous cord"));
styleArray.push(new Style("Ebony", "night pumice"));
styleArray.push(new Style("Elder Argonian", "hackwing plumage"));
styleArray.push(new Style("Fang Lair", "dragon bone"));
styleArray.push(new Style("Frostcaster", "stalhrim"));
styleArray.push(new Style("Glass", "malachite"));
styleArray.push(new Style("Grim Harlequin", "grinstone"));
styleArray.push(new Style("Hazardous Alchemy", "viridian phial"));
styleArray.push(new Style("Hlaalu", "bonemold resin"));
styleArray.push(new Style("Hollowjack", "amber marble"));
styleArray.push(new Style("Honor Guard", "read diamond seals"));
styleArray.push(new Style("Huntsman", "bloodscent dew"));
styleArray.push(new Style("Icereach Coven", "fryse willow"));
styleArray.push(new Style("Imperial", "nickel"));
styleArray.push(new Style("Ivory Brigade", "ivory brigade clasp"));
styleArray.push(new Style("Khajiit", "moonstone"));
styleArray.push(new Style("Malacath", "potash"));
styleArray.push(new Style("Mazzatun", "leviathan scrimshaw"));
styleArray.push(new Style("Mercenary", "laurel"));
styleArray.push(new Style("Meridian", "auroran dust"));
styleArray.push(new Style("Militant Ordinator", "lustrous sphalerite"));
styleArray.push(new Style("Minotaur", "oxblood fungus"));
styleArray.push(new Style("Morag Tong", "boiled carapace"));
styleArray.push(new Style("Nord", "corundum"));
styleArray.push(new Style("Orc", "manganese"));
styleArray.push(new Style("Order of the Hour", "pearl sand"));
styleArray.push(new Style("Outlaw", "rogue's soot"));
styleArray.push(new Style("Pellitine", "dragonthread"));
styleArray.push(new Style("Primal", "argentum"));
styleArray.push(new Style("Psijic Order", "vitrified malondo"));
styleArray.push(new Style("Pyandorean", "sea serpent hide"));
styleArray.push(new Style("Pyre Watch", "consecrated myrrh"));
styleArray.push(new Style("Ra Gada", "ancient sandstone"));
styleArray.push(new Style("Redguard", "starmetal"));
styleArray.push(new Style("Redoran", "polished scarab elytra"));
styleArray.push(new Style("Refabricated", "polished rivets"));
styleArray.push(new Style("Sapiarch", "culanda lacquer"));
styleArray.push(new Style("Sul-Xan", "death"));
styleArray.push(new Style("Scalecaller", "infected flesh"));
styleArray.push(new Style("Sea Giant", "sea snake fang"));
styleArray.push(new Style("Shield of Senchal", "carmine shieldsilk"));
styleArray.push(new Style("Silken Ring", "distilled slowsilver"));
styleArray.push(new Style("Silver Dawn", "argent pelts"));
styleArray.push(new Style("Skinchanger", "wolfsbane incense"));
styleArray.push(new Style("Soul-shriven", "azure plasm"));
styleArray.push(new Style("Stalhrim", "stalhrim shard"));
styleArray.push(new Style("Sunspire", "frost embers"));
styleArray.push(new Style("Telvanni", "wrought ferrofungus"));
styleArray.push(new Style("Thorn Legion", "thorn sigil"));
styleArray.push(new Style("Thieves Guild", "fine chalk"));
styleArray.push(new Style("Trinimac", "auric tusk"));
styleArray.push(new Style("Tsaesci", "snake fang"));
styleArray.push(new Style("Welkynar", "gryphon plume"));
styleArray.push(new Style("Worm Cult", "desecrated grave soil"));
styleArray.push(new Style("Xivkyn", "charcoal of remorse"));
styleArray.push(new Style("Yokundan", "ferrous salts"));

var armorTraitArray = [];
armorTraitArray.push(new Style("None", ""));
armorTraitArray.push(new Style("Divines", "sapphire"));
armorTraitArray.push(new Style("Impenetrable", "diamond"));
armorTraitArray.push(new Style("Infused", "bloodstone"));
armorTraitArray.push(new Style("Invigorating", "garnet"));
armorTraitArray.push(new Style("Nirnhoned", "fortified nirncrux"));
armorTraitArray.push(new Style("Reinforced", "sardonyx"));
armorTraitArray.push(new Style("Sturdy", "quartz"));
armorTraitArray.push(new Style("Training", "emerald"));
armorTraitArray.push(new Style("Well-fitted", "almandine"));

var weaponTraitArray = [];
weaponTraitArray.push(new Style("None", ""));
weaponTraitArray.push(new Style("Charged", "amethyst"));
weaponTraitArray.push(new Style("Decisive", "citrine"));
weaponTraitArray.push(new Style("Defending", "turquoise"));
weaponTraitArray.push(new Style("Infused", "jade"));
weaponTraitArray.push(new Style("Nirnhoned", "potent nirncrux"));
weaponTraitArray.push(new Style("Powered", "chysolite"));
weaponTraitArray.push(new Style("Precise", "ruby"));
weaponTraitArray.push(new Style("Sharpened", "fire opal"));
weaponTraitArray.push(new Style("Training", "carnelian"));

var jewelryTraitArray = [];
jewelryTraitArray.push(new Style("None", ""));
jewelryTraitArray.push(new Style("Arcane", "cobalt"));
jewelryTraitArray.push(new Style("Bloodthirsty", "slaughterstone"));
jewelryTraitArray.push(new Style("Harmony", "dibellium"));
jewelryTraitArray.push(new Style("Healthy", "antimony"));
jewelryTraitArray.push(new Style("Infused", "aurbic amber"));
jewelryTraitArray.push(new Style("Protective", "titanium"));
jewelryTraitArray.push(new Style("Robust", "zinc"));
jewelryTraitArray.push(new Style("Swift", "gilding wax"));
jewelryTraitArray.push(new Style("Triune", "dawn-prism"));

var improvementLevels = [];
improvementLevels.push(new ImprovementLevel("Normal", 0));
improvementLevels.push(new ImprovementLevel("Fine", 2));
improvementLevels.push(new ImprovementLevel("Superior", 3));
improvementLevels.push(new ImprovementLevel("Epic", 4));
improvementLevels.push(new ImprovementLevel("Legendary", 8));

var clothImprovementMats = [ '', 'hemming', "embroidery", "elegant lining", "dreugh wax" ];
var metalImprovementMats = [ '', 'honing stone', "dwarven oil", "grain solvent", "tempering alloy" ];
var woodImprovementMats = [ '', 'pitch', "turpen", "mastic", "rosin" ];
var jewelryImprovementMats = [ '', 'terne plating', "iridium plating", "zircon plating", "chromium plating" ];

var woodTypes = ["sanded maple", "sanded oak", "sanded beech", "sanded hickory", "sanded yew", "sanded birch", "sanded ash", "sanded mahogony", "sanded nightwood", "sanded ruby ash"];
var metalTypes = ["iron ingots", "steel ingots", "orichalum ingots", "dwarven ingots", "ebony ingots", "calcinium ingots", "galatite ingots", "quicksilver ingots", "voidstone ingots", "rubedite ingots"];
var clothTypes = ["jute", "flax", "cotton", "spidersilk", "ebonthread", "kresh fiber", "ironthread", "silverweave", "void cloth", "ancestor silk"];
var leatherTypes = ["rawhide", "hide", "leather", "thick leather", "fell hide", "topgrain hide", "iron hide", "superb hide", "shadowhide", "rubedo leather"];
var jewelryTypes = ["pewter ounces", "copper ounces", "silver ounces", "electrum ounces", "platinum ounces"];

function populateLevelArray(typeArray, startingValue, level10start)
{
  var levels = [];
  levels.push(new MaterialLevel("1", typeArray[0], startingValue));
  levels.push(new MaterialLevel("4", typeArray[0], startingValue + 1));
  levels.push(new MaterialLevel("6", typeArray[0], startingValue + 2));
  levels.push(new MaterialLevel("8", typeArray[0], startingValue + 3));
  levels.push(new MaterialLevel("10", typeArray[0], startingValue + 4));
  levels.push(new MaterialLevel("12", typeArray[0], startingValue + 5));
  levels.push(new MaterialLevel("14", typeArray[0], startingValue + 6));
  levels.push(new MaterialLevel("16", typeArray[1], startingValue + 1));
  levels.push(new MaterialLevel("18", typeArray[1], startingValue + 2));
  levels.push(new MaterialLevel("20", typeArray[1], startingValue + 3));
  levels.push(new MaterialLevel("22", typeArray[1], startingValue + 4));
  levels.push(new MaterialLevel("24", typeArray[1], startingValue + 5));
  levels.push(new MaterialLevel("26", typeArray[2], startingValue + 2));
  levels.push(new MaterialLevel("28", typeArray[2], startingValue + 3));
  levels.push(new MaterialLevel("30", typeArray[2], startingValue + 4));
  levels.push(new MaterialLevel("32", typeArray[2], startingValue + 5));
  levels.push(new MaterialLevel("34", typeArray[2], startingValue + 6));
  levels.push(new MaterialLevel("36", typeArray[3], startingValue + 3));
  levels.push(new MaterialLevel("38", typeArray[3], startingValue + 4));
  levels.push(new MaterialLevel("40", typeArray[3], startingValue + 5));
  levels.push(new MaterialLevel("42", typeArray[3], startingValue + 6));
  levels.push(new MaterialLevel("44", typeArray[3], startingValue + 7));
  levels.push(new MaterialLevel("46", typeArray[4], startingValue + 4));
  levels.push(new MaterialLevel("48", typeArray[4], startingValue + 5));
  levels.push(new MaterialLevel("50", typeArray[4], startingValue + 6));
  levels.push(new MaterialLevel("CP10", typeArray[5], startingValue + 5));
  levels.push(new MaterialLevel("CP20", typeArray[5], startingValue + 6));
  levels.push(new MaterialLevel("CP30", typeArray[5], startingValue + 7));
  levels.push(new MaterialLevel("CP40", typeArray[6], startingValue + 6));
  levels.push(new MaterialLevel("CP50", typeArray[6], startingValue + 7));
  levels.push(new MaterialLevel("CP60", typeArray[6], startingValue + 8));
  levels.push(new MaterialLevel("CP70", typeArray[7], startingValue + 7));
  levels.push(new MaterialLevel("CP80", typeArray[7], startingValue + 8));
  levels.push(new MaterialLevel("CP90", typeArray[8], startingValue + 8));
  levels.push(new MaterialLevel("CP100", typeArray[8], startingValue + 9));
  levels.push(new MaterialLevel("CP110", typeArray[8], startingValue + 10));
  levels.push(new MaterialLevel("CP120", typeArray[8], startingValue + 11));
  levels.push(new MaterialLevel("CP130", typeArray[8], startingValue + 12));
  levels.push(new MaterialLevel("CP140", typeArray[8], startingValue + 13));
  levels.push(new MaterialLevel("CP150", typeArray[9], level10start));
  levels.push(new MaterialLevel("CP160", typeArray[9], level10start * 10));
  return levels;
}

function populateRingLevelArray(typeArray)
{
  var levels = [];
  var startingValue = 2;
  levels.push(new MaterialLevel("1", typeArray[0], startingValue));
  levels.push(new MaterialLevel("4", typeArray[0], startingValue + 1));
  levels.push(new MaterialLevel("6", typeArray[0], startingValue + 2));
  levels.push(new MaterialLevel("8", typeArray[0], startingValue + 3));
  levels.push(new MaterialLevel("10", typeArray[0], startingValue + 4));
  levels.push(new MaterialLevel("12", typeArray[0], startingValue + 5));
  levels.push(new MaterialLevel("14", typeArray[0], startingValue + 6));
  levels.push(new MaterialLevel("16", typeArray[0], startingValue + 7));
  levels.push(new MaterialLevel("18", typeArray[0], startingValue + 8));
  levels.push(new MaterialLevel("20", typeArray[0], startingValue + 9));
  levels.push(new MaterialLevel("22", typeArray[0], startingValue + 10));
  levels.push(new MaterialLevel("24", typeArray[0], startingValue + 11));
  levels.push(new MaterialLevel("26", typeArray[1], startingValue + 1));
  levels.push(new MaterialLevel("28", typeArray[1], startingValue + 2));
  levels.push(new MaterialLevel("30", typeArray[1], startingValue + 3));
  levels.push(new MaterialLevel("32", typeArray[1], startingValue + 4));
  levels.push(new MaterialLevel("34", typeArray[1], startingValue + 5));
  levels.push(new MaterialLevel("36", typeArray[1], startingValue + 6));
  levels.push(new MaterialLevel("38", typeArray[1], startingValue + 7));
  levels.push(new MaterialLevel("40", typeArray[1], startingValue + 8));
  levels.push(new MaterialLevel("42", typeArray[1], startingValue + 9));
  levels.push(new MaterialLevel("44", typeArray[1], startingValue + 10));
  levels.push(new MaterialLevel("46", typeArray[1], startingValue + 11));
  levels.push(new MaterialLevel("48", typeArray[1], startingValue + 12));
  levels.push(new MaterialLevel("50", typeArray[1], startingValue + 13));
  levels.push(new MaterialLevel("CP10", typeArray[2], startingValue + 2));
  levels.push(new MaterialLevel("CP20", typeArray[2], startingValue + 4));
  levels.push(new MaterialLevel("CP30", typeArray[2], startingValue + 6));
  levels.push(new MaterialLevel("CP40", typeArray[2], startingValue + 8));
  levels.push(new MaterialLevel("CP50", typeArray[2], startingValue + 10));
  levels.push(new MaterialLevel("CP60", typeArray[2], startingValue + 12));
  levels.push(new MaterialLevel("CP70", typeArray[2], startingValue + 14));
  levels.push(new MaterialLevel("CP80", typeArray[3], startingValue + 4));
  levels.push(new MaterialLevel("CP90", typeArray[3], startingValue + 6));
  levels.push(new MaterialLevel("CP100", typeArray[3], startingValue + 8));
  levels.push(new MaterialLevel("CP110", typeArray[3], startingValue + 10));
  levels.push(new MaterialLevel("CP120", typeArray[3], startingValue + 12));
  levels.push(new MaterialLevel("CP130", typeArray[3], startingValue + 14));
  levels.push(new MaterialLevel("CP140", typeArray[3], startingValue + 16));
  levels.push(new MaterialLevel("CP150", typeArray[4], 10));
  levels.push(new MaterialLevel("CP160", typeArray[4], 100));
  return levels;
}

function populateNecklaceLevelArray(typeArray)
{
  var levels = [];
  levels.push(new MaterialLevel("1", typeArray[0], 3));
  levels.push(new MaterialLevel("4", typeArray[0], 5));
  levels.push(new MaterialLevel("6", typeArray[0], 6));
  levels.push(new MaterialLevel("8", typeArray[0], 8));
  levels.push(new MaterialLevel("10", typeArray[0], 9));
  levels.push(new MaterialLevel("12", typeArray[0], 11));
  levels.push(new MaterialLevel("14", typeArray[0], 12));
  levels.push(new MaterialLevel("16", typeArray[0], 14));
  levels.push(new MaterialLevel("18", typeArray[0], 15));
  levels.push(new MaterialLevel("20", typeArray[0], 17));
  levels.push(new MaterialLevel("22", typeArray[0], 19));
  levels.push(new MaterialLevel("24", typeArray[0], 20));
  levels.push(new MaterialLevel("26", typeArray[1], 5));
  levels.push(new MaterialLevel("28", typeArray[1], 6));
  levels.push(new MaterialLevel("30", typeArray[1], 8));
  levels.push(new MaterialLevel("32", typeArray[1], 9));
  levels.push(new MaterialLevel("34", typeArray[1], 11));
  levels.push(new MaterialLevel("36", typeArray[1], 12));
  levels.push(new MaterialLevel("38", typeArray[1], 14));
  levels.push(new MaterialLevel("40", typeArray[1], 15));
  levels.push(new MaterialLevel("42", typeArray[1], 17));
  levels.push(new MaterialLevel("44", typeArray[1], 18));
  levels.push(new MaterialLevel("46", typeArray[1], 20));
  levels.push(new MaterialLevel("48", typeArray[1], 21));
  levels.push(new MaterialLevel("50", typeArray[1], 23));
  levels.push(new MaterialLevel("CP10", typeArray[2], 6));
  levels.push(new MaterialLevel("CP20", typeArray[2], 9));
  levels.push(new MaterialLevel("CP30", typeArray[2], 12));
  levels.push(new MaterialLevel("CP40", typeArray[2], 15));
  levels.push(new MaterialLevel("CP50", typeArray[2], 18));
  levels.push(new MaterialLevel("CP60", typeArray[2], 21));
  levels.push(new MaterialLevel("CP70", typeArray[2], 24));
  levels.push(new MaterialLevel("CP80", typeArray[3], 8));
  levels.push(new MaterialLevel("CP90", typeArray[3], 12));
  levels.push(new MaterialLevel("CP100", typeArray[3], 16));
  levels.push(new MaterialLevel("CP110", typeArray[3], 20));
  levels.push(new MaterialLevel("CP120", typeArray[3], 24));
  levels.push(new MaterialLevel("CP130", typeArray[3], 28));
  levels.push(new MaterialLevel("CP140", typeArray[3], 32));
  levels.push(new MaterialLevel("CP150", typeArray[4], 15));
  levels.push(new MaterialLevel("CP160", typeArray[4], 150));
  return levels;
}

/* Weapons */
var woodWeaponLevels = populateLevelArray(woodTypes, 3, 12);
var oneHandLevels = populateLevelArray(metalTypes, 3, 11);
var twoHandLevels = populateLevelArray(metalTypes, 5, 14);
var daggerLevels = populateLevelArray(metalTypes, 2, 10);

var bow = new CraftableObject("bow", woodWeaponLevels, "weapon", "bow", "wood", []);
var infernoStaff = new CraftableObject("inferno staff", woodWeaponLevels, "weapon", "staff", "wood", []);
var iceStaff = new CraftableObject("ice staff", woodWeaponLevels, "weapon", "staff", "wood", []);
var lightningStaff = new CraftableObject("lightning staff", woodWeaponLevels, "weapon", "staff", "wood", []);
var restorationStaff = new CraftableObject("restoration staff", woodWeaponLevels, "weapon", "staff", "wood", []);
var axe = new CraftableObject("axe (1h)", oneHandLevels, "weapon", "axe", "metal", []);
var mace = new CraftableObject("mace (1h)", oneHandLevels, "weapon", "mace", "metal", ['Training']);
var sword = new CraftableObject("sword (1h)", oneHandLevels, "weapon", "sword", "metal", []);
var battleaxe = new CraftableObject("battle axe (2h)", twoHandLevels, "weapon", "axe", "metal", []);
var maul = new CraftableObject("maul (2h)", twoHandLevels, "weapon", "mace", "metal", []);
var greatsword = new CraftableObject("greatsword (2h)", twoHandLevels, "weapon", "sword", "metal", []);
var dagger = new CraftableObject("dagger", daggerLevels, "weapon", "dagger", "metal", ['Training']);

var weapons = [bow, infernoStaff, iceStaff, lightningStaff, restorationStaff, axe, mace, sword, battleaxe, maul, greatsword, dagger];



/* Armor */

var lightChestLevels = populateLevelArray(clothTypes, 7, 15);
var lightLegsLevels = populateLevelArray(clothTypes, 6, 14);
var light1Levels = populateLevelArray(clothTypes, 5, 13);

var robe = new CraftableObject("robe", lightChestLevels, "armor", "chest", "cloth", ['Well-fitted']);
var shirt = new CraftableObject("shirt", lightChestLevels, "armor", "chest", "cloth", ['Well-fitted' ]);
var lightGloves = new CraftableObject("light gloves", light1Levels, "armor", "gloves", "cloth", []);
var lightBoots = new CraftableObject("light boots", light1Levels, "armor", "boots", "cloth", []);
var lightHelmet = new CraftableObject("light helmet", light1Levels, "armor", "helmet", "cloth", []);
var lightShoulders = new CraftableObject("light shoulders", light1Levels, "armor", "shoulders", "cloth", []);
var lightWaist = new CraftableObject("light waist", light1Levels, "armor", "belt", "cloth", ['Impenetrable']);
var lightLegs = new CraftableObject("light legs", lightLegsLevels, "armor", "legs", "cloth", []);

var mediumChestLevels = populateLevelArray(leatherTypes, 7, 15);
var mediumLegsLevels = populateLevelArray(leatherTypes, 6, 14);
var medium1Levels = populateLevelArray(leatherTypes, 5, 13);

var mediumChest = new CraftableObject("medium chest", mediumChestLevels, "armor", "chest", "cloth", []);
var mediumGloves = new CraftableObject("medium gloves", medium1Levels, "armor", "gloves", "cloth", []);
var mediumBoots = new CraftableObject("medium boots", medium1Levels, "armor", "boots", "cloth", []);
var mediumHelmet = new CraftableObject("medium helmet", medium1Levels, "armor", "helmet", "cloth", []);
var mediumShoulders = new CraftableObject("medium shoulders", medium1Levels, "armor", "shoulders", "cloth", []);
var mediumWaist = new CraftableObject("medium waist", medium1Levels, "armor", "belt", "cloth", []);
var mediumLegs = new CraftableObject("medium legs", mediumLegsLevels, "armor", "legs", "cloth", []);

var heavyChestLevels = populateLevelArray(metalTypes, 7, 15);
var heavyLegsLevels = populateLevelArray(metalTypes, 6, 14);
var heavy1Levels = populateLevelArray(metalTypes, 5, 13);

var heavyChest = new CraftableObject("heavy chest", heavyChestLevels, "armor", "chest", "metal", []);
var heavyGloves = new CraftableObject("heavy gloves", heavy1Levels, "armor", "gloves", "metal", []);
var heavyBoots = new CraftableObject("heavy boots", heavy1Levels, "armor", "boots", "metal", []);
var heavyHelmet = new CraftableObject("heavy helmet", heavy1Levels, "armor", "helmet", "metal", []);
var heavyShoulders = new CraftableObject("heavy shoulders", heavy1Levels, "armor", "shoulders", "metal", []);
var heavyWaist = new CraftableObject("heavy waist", heavy1Levels, "armor", "belt", "metal", []);
var heavyLegs = new CraftableObject("heavy legs", heavyLegsLevels, "armor", "legs", "metal", []);

var shieldLevels = populateLevelArray(woodTypes, 6, 14);
var shield = new CraftableObject("shield", shieldLevels, "armor", "shield", "wood", ['Prosperous']);

var armor = [robe, shirt, lightHelmet, lightGloves, lightShoulders, lightBoots, lightLegs, lightWaist,
             mediumChest, mediumHelmet, mediumGloves, mediumShoulders, mediumBoots, mediumLegs, mediumWaist,
             heavyChest, heavyHelmet, heavyGloves, heavyShoulders, heavyBoots, heavyLegs, heavyWaist, shield ];



/* Jewelry */
var ring = new CraftableObject("ring", populateRingLevelArray(jewelryTypes), "jewelry", "ring", "jewelry", []);
var necklace = new CraftableObject("necklace", populateNecklaceLevelArray(jewelryTypes), "jewelry", "necklace", "jewelry", []);
var jewelry = [ ring, necklace ];




var stylePartsKnownHash = new Object();
stylePartsKnownHash["Abah's Watch"] = new StylePartsKnown("Abah's Watch", true, [], false);
stylePartsKnownHash["Akaviri"] = new StylePartsKnown("Akaviri", true, [], true);
stylePartsKnownHash['Aldmeri Dominion'] = new StylePartsKnown('Aldmeri Dominion', true, [], false);
stylePartsKnownHash['Altmer'] = new StylePartsKnown('Altmer', true, [], true);
stylePartsKnownHash['Ancient Elf'] = new StylePartsKnown('Ancient Elf', true, [], true);
stylePartsKnownHash['Ancient Orc'] = new StylePartsKnown('Ancient Orc', false, [], true);
stylePartsKnownHash['Apostle'] = new StylePartsKnown('Apostle', true, [], true);
stylePartsKnownHash['Argonian'] = new StylePartsKnown('Argonian', true, [], false);
stylePartsKnownHash['Ashlander'] = new StylePartsKnown('Ashlander', true, [], false);
stylePartsKnownHash["Assassins League"] = new StylePartsKnown("Assassins League", true, [], false);
stylePartsKnownHash['Barbaric'] = new StylePartsKnown('Barbaric', true, [], false);
stylePartsKnownHash['Bloodforge'] = new StylePartsKnown('Bloodforge', true, [], false);
stylePartsKnownHash['Bosmer'] = new StylePartsKnown('Bosmer', true, [], false);
stylePartsKnownHash['Breton'] = new StylePartsKnown('Breton', true, [], false);
stylePartsKnownHash['Celestial'] = new StylePartsKnown('Celestial', true, [], false);
stylePartsKnownHash['Daedric'] = new StylePartsKnown('Daedric', true, [], false);
stylePartsKnownHash['Daggerfall Covenant'] = new StylePartsKnown('Daggerfall Covenant', true, [], false);
stylePartsKnownHash['Dark Brotherhood'] = new StylePartsKnown('Dark Brotherhood', true, [], true);
stylePartsKnownHash['Dead-Water'] = new StylePartsKnown('Dead-Water', true, [], false);
stylePartsKnownHash['Draugr'] = new StylePartsKnown('Draugr', true, [], true);
stylePartsKnownHash['Dreadhorn'] = new StylePartsKnown('Dreadhorn', true, [], true);
stylePartsKnownHash['Dremora'] = new StylePartsKnown('Dremora', true, [], true);
stylePartsKnownHash["Dro-m'Athra"] = new StylePartsKnown("Dro-m'Athra", true, [], false);
stylePartsKnownHash['Dunmer'] = new StylePartsKnown('Dunmer', true, [], false);
stylePartsKnownHash['Dwemer'] = new StylePartsKnown('Dwemer', true, [], false);
stylePartsKnownHash['Ebonheart Pact'] = new StylePartsKnown('Ebonheart Pact', true, [], false);
stylePartsKnownHash['Ebonshadow'] = new StylePartsKnown('Ebonshadow', true, [], true);
stylePartsKnownHash['Ebony'] = new StylePartsKnown('Ebony', true, [], true);
stylePartsKnownHash['Elder Argonian'] = new StylePartsKnown('Elder Argonian', true, [], true);
stylePartsKnownHash['Fang Lair'] = new StylePartsKnown('Fang Lair', true, [], false);
stylePartsKnownHash['Glass'] = new StylePartsKnown('Glass', true, [], false);
stylePartsKnownHash['Hlaalu'] = new StylePartsKnown('Hlaalu', true, [], false);
stylePartsKnownHash['Hollowjack'] = new StylePartsKnown('Hollowjack', true, [], false);
stylePartsKnownHash['Imperial'] = new StylePartsKnown('Imperial', true, [], false);
stylePartsKnownHash['Khajiit'] = new StylePartsKnown('Khajiit', true, [], false);
stylePartsKnownHash['Malacath'] = new StylePartsKnown('Malacath', true, [], true);
stylePartsKnownHash['Mazzatun'] = new StylePartsKnown('Mazzatun', true, [], true);
stylePartsKnownHash['Mercenary'] = new StylePartsKnown('Mercenary', true, [], false);
stylePartsKnownHash['Minotaur'] = new StylePartsKnown('Minotaur', true, [], false);
stylePartsKnownHash['Morag Tong'] = new StylePartsKnown('Morag Tong', true, [], false);
stylePartsKnownHash['Nord'] = new StylePartsKnown('Nord', true, [], false);
stylePartsKnownHash['Orc'] = new StylePartsKnown('Orc', true, [], false);
stylePartsKnownHash['Order of the Hour'] = new StylePartsKnown('Order of the Hour', true, [], false);
stylePartsKnownHash['Outlaw'] = new StylePartsKnown('Outlaw', true, [], false);
stylePartsKnownHash['Psijic Order'] = new StylePartsKnown('Psijic Order', true, [], false);
stylePartsKnownHash['Pyandorean'] = new StylePartsKnown('Pyandorean', true, [], false);
stylePartsKnownHash['Primal'] = new StylePartsKnown('Primal', true, [], false);
stylePartsKnownHash['Ra Gada'] = new StylePartsKnown('Ra Gada', true, [], false);
stylePartsKnownHash['Redguard'] = new StylePartsKnown('Redguard', true, [], false);
stylePartsKnownHash['Redoran'] = new StylePartsKnown('Redoran', true, [], false);
stylePartsKnownHash['Sapiarch'] = new StylePartsKnown('Sapiarch', true, [], false);
stylePartsKnownHash['Scalecaller'] = new StylePartsKnown('Scalecaller', true, [], false);
stylePartsKnownHash['Silken Ring'] = new StylePartsKnown('Silken Ring', true, [], false);
stylePartsKnownHash['Skinchanger'] = new StylePartsKnown('Skinchanger', true, [], false);
stylePartsKnownHash['Soul-shriven'] = new StylePartsKnown('Soul-shriven', true, [], false);
stylePartsKnownHash['Telvanni'] = new StylePartsKnown('Telvanni', true, [], true);
stylePartsKnownHash['Thieves Guild'] = new StylePartsKnown('Thieves Guild', true, [], false);
stylePartsKnownHash['Trinimac'] = new StylePartsKnown('Trinimac', true, [], true);
stylePartsKnownHash['Worm Cult'] = new StylePartsKnown('Worm Cult', true, [], false);
stylePartsKnownHash['Xivkyn'] = new StylePartsKnown('Xivkyn', true, [], false);
stylePartsKnownHash["Yokundan"] = new StylePartsKnown("Yokundan", true, [], false);


function populateAllItems()
{
  var idx;
  for (idx = 0; idx < MaxItems; idx++) {
    populateArmorWeaponSelect(idx);
    populateLevels(idx);
    populateItemType(idx);
    populateStyles(idx);
    populateTraits(idx, true)
    populateImprovements(idx)
    populateSets(idx);
  }
}

function itemTypeChanged(itemIdx)
{
  populateItemType(itemIdx);
  populateTraits(itemIdx, true);
  populateStyles(itemIdx);
  calculateTotalMaterials();
}

function itemChanged(itemIdx)
{
  populateTraits(itemIdx, false);
  populateStyles(itemIdx);
  populateMats(itemIdx);
  calculateTotalMaterials();
}

function styleChanged(itemIdx)
{
  var itemSelect = document.getElementById("style" + itemIdx);
  itemSelect.style.color = itemSelect.options[itemSelect.selectedIndex].style.color;
  populateMats(itemIdx);
}

function traitChanged(itemIdx)
{
  var itemSelect = document.getElementById("trait" + itemIdx);
  itemSelect.style.color = itemSelect.options[itemSelect.selectedIndex].style.color;
  calculateTotalMaterials();
}


function populateArmorWeaponSelect(itemIdx)
{
  var itemSelect = document.getElementById("armorweapon" + itemIdx);
  var newItem = document.createElement("option");
  newItem.text = "armor";
  itemSelect.options.add(newItem);
  newItem = document.createElement("option");
  newItem.text = "weapon";
  itemSelect.options.add(newItem);
  newItem = document.createElement("option");
  newItem.text = "jewelry";
  itemSelect.options.add(newItem);
}

function isStylePartKnown(stylePartKnown, itemName)
{
  var found = false;
  var idx;
  if (stylePartKnown == null) {
    found = false;
  } else if (stylePartKnown.allPartsKnown) {
    found = true;
  } else {
    found = stylePartKnown.negateList;
    for (idx = 0; idx < stylePartKnown.partsList.length; idx++) {
      if (stylePartKnown.partsList[idx] == itemName) {
        found = ! stylePartKnown.negateList;
        break;
      }
    }
  }

  return found;
}

function populateStyles(itemIdx)
{
  var armorweapon = document.getElementById("armorweapon" + itemIdx);
  var styleSelect = document.getElementById("style" + itemIdx);
  var itemSelect = document.getElementById("itemType" + itemIdx);
  var itemName = itemSelect.value;
  var idx;
  var selectedIndex = styleSelect.selectedIndex;
  if (selectedIndex < 0)
    selectedIndex = 0;
  if (armorweapon.value == "jewelry") {
    // Remove all the items from the dropdown.
    while (styleSelect.options.length > 0) {
      styleSelect.options.remove(0);
    }
    var newItem = document.createElement("option");
    newItem.text = "None";
    styleSelect.options.add(newItem);
    return;
  }

  // Extract the part type (chest, sword, legs, etc.) from the selected item.
  var selectedItemIdx = itemSelect.selectedIndex;
  if (selectedItemIdx < 0)
    selectedItemIdx = 0;
  var itemObj = null;
  var itemPartName = null;
  if (itemName != 'none') {
    itemObj = itemSelect.options[selectedItemIdx].myBaseObject;
    if (itemObj != null)
      itemPartName = itemObj.partType;
  }

  // Remove all the items from the dropdown.
  while (styleSelect.options.length > 0) {
    styleSelect.options.remove(0);
  }

  styleSelect.style.color = 'black';
  for (idx = 0; idx < styleArray.length; idx++) {
    var newItem = document.createElement("option");
    newItem.text = styleArray[idx].name;
    if (itemName != 'none') {
      var part = stylePartsKnownHash[newItem.text];
      if (! isStylePartKnown(part, itemPartName)) {
        if (showUnavailable) {
          newItem.style.color = 'red';
          if (selectedIndex == idx) {
            styleSelect.style.color = 'red';
          }
        }
      } else {
        newItem.style.color = 'black';
      }
    }
    styleSelect.options.add(newItem);
  }
  if (selectedIndex < 0) {
    styleSelect.selectedIndex = 0;
  } else {
    styleSelect.selectedIndex = selectedIndex;
  }
}

function isKnownSet(text)
{
  var rtn = true;
//  if (text == 'Armor Master' ||
//      text == "Noble's Conquest" ||
//      text == 'Redistributor') {
//    rtn = false;
//  }
  return rtn;
}

function populateSets(itemIdx)
{
  var itemSelect = document.getElementById("set" + itemIdx);
  var idx;

  for (idx = 0; idx < setArray.length; idx++) {
    var newItem = document.createElement("option");
    newItem.text = setArray[idx];
    if (showUnavailable && ! isKnownSet(newItem.text)) {
      newItem.style.color = 'red';
    } else {
      newItem.style.color = 'black';
    }
    itemSelect.options.add(newItem);
  }
}

function setChanged(itemIdx)
{
  if (showUnavailable) {
    var itemSelect = document.getElementById("set" + itemIdx);
    if (isKnownSet(itemSelect.value)) {
      itemSelect.style.color = 'black';
    } else {
      itemSelect.style.color = 'red';
    }
  }
}

function isInStringList(list, value)
{
  var found = false;
  var idx;
  if (list != null && list.length > 0) {
    for (idx = 0; idx < list.length; idx++) {
      if (list[idx] == value) {
        found = true;
        break;
      }
    }
  }
  return found;
}

function populateTraits(itemIdx, typeChanged)
{
  var armorweapon = document.getElementById("armorweapon" + itemIdx);
  var itemSelect = document.getElementById("trait" + itemIdx);
  var selectedIndex = itemSelect.selectedIndex;
  if (selectedIndex < 0 || typeChanged) {
    selectedIndex = 0;
  }
  var mats = getMaterial(itemIdx);
  var traitsNotKnown = [];
  if (mats != null) {
    traitsNotKnown = mats.traitsNotKnown;
  }
  var idx;
  var arr;

  while (itemSelect.options.length > 0) {
    itemSelect.options.remove(0);
  }
  if (armorweapon.value == "armor") {
    arr = armorTraitArray;
  } else if (armorweapon.value == "weapon") {
    arr = weaponTraitArray;
  } else {
    arr = jewelryTraitArray;
  }
  itemSelect.style.color = 'black';
  for (idx = 0; idx < arr.length; idx++) {
    var newItem = document.createElement("option");
    newItem.text = arr[idx].name;
    if (isInStringList(traitsNotKnown, newItem.text)) {
      if (showUnavailable) {
        newItem.style.color = 'red';
        if (selectedIndex == idx) {
          itemSelect.style.color = 'red';
        }
      }
    } else {
      newItem.style.color = 'black';
    }
    itemSelect.options.add(newItem);
  }

  itemSelect.selectedIndex = selectedIndex;
}

function populateImprovements(itemIdx)
{
  var itemSelect = document.getElementById("improvement" + itemIdx);
  var idx;

  for (idx = 0; idx < improvementLevels.length; idx++) {
    var newItem = document.createElement("option");
    newItem.text = improvementLevels[idx].name;
    itemSelect.options.add(newItem);
  }
}

function populateItemType(itemIdx)
{
  var armorweapon = document.getElementById("armorweapon" + itemIdx);
  var itemSelect = document.getElementById("itemType" + itemIdx);
  var idx;
  var itemarray = weapons;
  if (armorweapon.value == "armor")
    itemarray = armor;
  else if (armorweapon.value == "jewelry")
    itemarray = jewelry;
  while (itemSelect.options.length > 0) {
    itemSelect.options.remove(0);
  }
  var newItem = document.createElement("option");
  newItem.text = "none";
  itemSelect.options.add(newItem);
  for (idx = 0; idx < itemarray.length; idx++) {
    newItem = document.createElement("option");
    newItem.text = itemarray[idx].name;
    newItem.myBaseObject = itemarray[idx];
    itemSelect.options.add(newItem);
  }
  populateMats(itemIdx);
}

function populateLevels(itemIdx)
{
  var levelSelect = document.getElementById("level" + itemIdx);
  var idx;
  var newItem;
  for (idx = 0; idx < levelArray.length; idx++) {
    newItem = document.createElement("option");
    newItem.text = levelArray[idx];
    levelSelect.options.add(newItem);
  }
  var totalMats = document.getElementById("totalMats").value = '';
  var totalMats = document.getElementById("totalStyleMats").value = '';
  var totalMats = document.getElementById("totalTraitMats").value = '';
  var totalMats = document.getElementById("totalImpMats").value = '';
}

function populateMats(itemIdx)
{
  var armorweapon = document.getElementById("armorweapon" + itemIdx);
  var itemType = document.getElementById("itemType" + itemIdx);
  var levelSelect = document.getElementById("level" + itemIdx);
  var matsText = document.getElementById("mats" + itemIdx);
  var itemarray = weapons;
  if (armorweapon.value == "armor")
    itemarray = armor;
  else if (armorweapon.value == "jewelry")
    itemarray = jewelry;
  var selectedItemIdx = itemType.selectedIndex - 1; // Ignore "none"
  var selectedLevelIdx = levelSelect.selectedIndex;
  if (selectedItemIdx == -1) { // "none"
    matsText.value = "";
  } else {
    var mats = itemarray[selectedItemIdx].levels[selectedLevelIdx];
    matsText.value = "" + mats.count + " " + mats.materialName;
    calculateTotalMaterials();
  }
}

function getMaterial(itemIdx)
{
  var armorweapon = document.getElementById("armorweapon" + itemIdx);
  var itemType = document.getElementById("itemType" + itemIdx);
  var itemarray = weapons;
  var mats = null;
  if (armorweapon.value == "armor")
    itemarray = armor;
  else if (armorweapon.value == "jewelry")
    itemarray = jewelry;
  var selectedItemIdx = itemType.selectedIndex - 1; // Ignore "none"
  if (selectedItemIdx >= 0) {
    mats = itemarray[selectedItemIdx];
  }
  return mats;
}

function getMaterialLevel(itemIdx)
{
  var matLevels = null;
  var mat = getMaterial(itemIdx);
  if (mat != null) {
    var levelSelect = document.getElementById("level" + itemIdx);
    var selectedLevelIdx = levelSelect.selectedIndex;
    matLevels = mat.levels[selectedLevelIdx];
  }
  return matLevels;
}

function getMaterialType(itemIdx)
{
  var armorweapon = document.getElementById("armorweapon" + itemIdx);
  var itemType = document.getElementById("itemType" + itemIdx);
  var levelSelect = document.getElementById("level" + itemIdx);
  var itemarray = weapons;
  var mats = null;
  if (armorweapon.value == "armor")
    itemarray = armor;
  else if (armorweapon.value == "jewelry")
    itemarray = jewelry;
  var selectedItemIdx = itemType.selectedIndex - 1; // Ignore "none"
  var selectedLevelIdx = levelSelect.selectedIndex;
  if (selectedItemIdx >= 0) {
    mats = itemarray[selectedItemIdx].materialType
  }
  return mats;
}


function calculateTotalMaterials()
{
  var idx;
  var hash = new Object();
  var styleMats = new Object();
  var traitMats = new Object();
  var improvementMats = new Object();
  for (idx = 0; idx < MaxItems; idx++) {
    var armorweapon = document.getElementById("armorweapon" + idx);
    var mats = getMaterialLevel(idx);
    if (mats != null) {
      if (hash[mats.materialName] == null)
        hash[mats.materialName] = mats.count;
      else
        hash[mats.materialName] += mats.count;
      if (armorweapon.value != "jewelry") {
        var styleSelect = document.getElementById("style" + idx);
        var name = styleArray[styleSelect.selectedIndex].material;
        if (styleMats[name] == null)
          styleMats[name] = 1;
        else
          styleMats[name]++;
      }
      var traitArray = weaponTraitArray;
      if (armorweapon.value == "armor")
        traitArray = armorTraitArray;
      else if (armorweapon.value == "jewelry")
        traitArray = jewelryTraitArray;
      var traitSelect = document.getElementById("trait" + idx);
      var name = traitArray[traitSelect.selectedIndex].material;
      if (name != '') {
        if (traitMats[name] == null)
          traitMats[name] = 1;
        else
          traitMats[name]++;
      }

      var improvementSelect = document.getElementById("improvement" + idx);
      if (improvementSelect.selectedIndex > 0) {
        var improvementMat = metalImprovementMats;
        var matsType = getMaterialType(idx);
        var isJewelry = false;
        if (matsType == "wood")
          improvementMat = woodImprovementMats;
        else if (matsType == "cloth")
          improvementMat = clothImprovementMats;
        else if (matsType == "jewelry") {
          improvementMat = jewelryImprovementMats;
          isJewelry = true;
        }
        var impIdx = 1;
        for (impIdx = 1; impIdx <= improvementSelect.selectedIndex; impIdx++) {
          name = improvementMat[impIdx];
          if (isJewelry)
            count = impIdx;
          else
            count = improvementLevels[impIdx].materialCount;
          if (improvementMats[name] == null)
            improvementMats[name] = count;
          else
            improvementMats[name] += count;
        }
      }
    }
  }
  var totalMats = document.getElementById("totalMats");
  totalMats.value = '';
  for (var key in hash) {
    if (hash.hasOwnProperty(key)) {
      totalMats.value += hash[key] + " " + key + "\n";
    }
  }
  totalMats = document.getElementById("totalStyleMats");
  totalMats.value = '';
  for (var key in styleMats) {
    if (styleMats.hasOwnProperty(key)) {
      totalMats.value += styleMats[key] + " " + key + "\n";
    }
  }
  totalMats = document.getElementById("totalTraitMats");
  totalMats.value = '';
  for (var key in traitMats) {
    if (traitMats.hasOwnProperty(key)) {
      totalMats.value += traitMats[key] + " " + key + "\n";
    }
  }
  totalMats = document.getElementById("totalImpMats");
  totalMats.value = '';
  for (var key in improvementMats) {
    if (improvementMats.hasOwnProperty(key)) {
      totalMats.value += improvementMats[key] + " " + key + "\n";
    }
  }
}
