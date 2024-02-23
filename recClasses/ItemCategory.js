export default class ItemCategory {

    constructor(itemName, categoryNames, subCategory, indScore) {
        this.itemName = itemName;
        this.categoryNames = categoryNames;
        this.subCategory = subCategory;
        this.indScore = indScore;
    }
}

const SCORE_MAP = new Map();
// Set all scores to 0
SCORE_MAP.set("Walk", 0);
SCORE_MAP.set("Meditation", 0);
SCORE_MAP.set("Nature Hike", 0);
SCORE_MAP.set("Bike", 0);
SCORE_MAP.set("Gym", 0);
SCORE_MAP.set("Swim", 0);
SCORE_MAP.set("Soccer", 0);
SCORE_MAP.set("Basketball", 0);
SCORE_MAP.set("Baseball", 0);
SCORE_MAP.set("Run", 0);
SCORE_MAP.set("Yoga", 0);
SCORE_MAP.set("Dance", 0);
SCORE_MAP.set("Calisthenics", 0);
SCORE_MAP.set("Climbing", 0);
SCORE_MAP.set("Volleyball", 0);
SCORE_MAP.set("Golf", 0);
SCORE_MAP.set("Focused Meditation", 0);
SCORE_MAP.set("Breathing Exercises", 0);
SCORE_MAP.set("Journaling", 0);
SCORE_MAP.set("Read", 0);
SCORE_MAP.set("Watch a show", 0);
SCORE_MAP.set("Phone break", 0);
SCORE_MAP.set("Tomorrow's to-do list creation", 0);
SCORE_MAP.set("Stretch", 0);
SCORE_MAP.set("Hot shower/bath", 0);
SCORE_MAP.set("Talk through your day", 0);
SCORE_MAP.set("Puzzle", 0);
SCORE_MAP.set("Coloring/Craft", 0);

// Create instances with scores from SCORE_MAP
const walk = new ItemCategory("Walk", ["Active"], ["Outdoors", "Low Intensity"], SCORE_MAP.get("Walk"));
const natureHike = new ItemCategory("Nature Hike", ["Active"], ["Outdoors", "Medium Intensity"], SCORE_MAP.get("Nature Hike"));
const bike = new ItemCategory("Bike", ["Active"], ["Outdoors", "Medium Intensity"], SCORE_MAP.get("Bike"));
const gym = new ItemCategory("Gym", ["Active"], ["Indoors", "High Intensity"], SCORE_MAP.get("Gym"));
const swim = new ItemCategory("Swim", ["Active"], ["Indoors", "Medium Intensity"], SCORE_MAP.get("Swim"));
const soccer = new ItemCategory("Soccer", ["Active"], ["Outdoors", "High Intensity"], SCORE_MAP.get("Soccer"));
const basketball = new ItemCategory("Basketball", ["Active"], ["Indoors", "High Intensity"], SCORE_MAP.get("Basketball"));
const baseball = new ItemCategory("Baseball", ["Active"], ["Outdoors", "High Intensity"], SCORE_MAP.get("Baseball"));
const run = new ItemCategory("Run", ["Active"], ["Outdoors", "High Intensity"], SCORE_MAP.get("Run"));
const yoga = new ItemCategory("Yoga", ["Active"], ["Indoors", "Low Intensity"], SCORE_MAP.get("Yoga"));
const dance = new ItemCategory("Dance", ["Active"], ["Indoors", "Medium Intensity"], SCORE_MAP.get("Dance"));
const calisthenics = new ItemCategory("Calisthenics", ["Active"], ["Indoors", "Medium Intensity"], SCORE_MAP.get("Calisthenics"));
const climbing = new ItemCategory("Climbing", ["Active"], ["Indoors", "High Intensity"], SCORE_MAP.get("Climbing"));
const volleyball = new ItemCategory("Volleyball", ["Active"], ["Outdoors", "High Intensity"], SCORE_MAP.get("Volleyball"));
const golf = new ItemCategory("Golf", ["Active"], ["Outdoors", "Low Intensity"], SCORE_MAP.get("Golf"));

const focusedMeditation = new ItemCategory("Focused Meditation", ["Mindfulness"], ["Meditation"], SCORE_MAP.get("Meditation"));
const breathingExercises = new ItemCategory("Breathing Exercises", ["Mindfulness"], ["Meditation"], SCORE_MAP.get("Breathing Exercises"));
const musicListening = new ItemCategory("Music Listening", ["Mindfulness"], [], SCORE_MAP.get("Music Listening"));
const journaling = new ItemCategory("Journaling", ["Mindfulness"], [], SCORE_MAP.get("Journaling"));
const read = new ItemCategory("Read", ["Mindfulness"], [], SCORE_MAP.get("Read"));
const watchShow = new ItemCategory("Watch a Show", ["Mindfulness"], [], SCORE_MAP.get("Watch a show"));
const phoneBreak = new ItemCategory("Phone Break", ["Mindfulness"], [], SCORE_MAP.get("Phone break"));
const tmrToDo = new ItemCategory("Tomorrow's To-Do List Creation", ["Mindfulness"], [], SCORE_MAP.get("Tomorrow's to-do list creation"));
const stretch = new ItemCategory("Stretch", ["Mindfulness"], ["Low Intensity"], SCORE_MAP.get("Stretch"));
const hotShower = new ItemCategory("Hot Shower/Bath", ["Mindfulness"], [], SCORE_MAP.get("Hot shower/bath"));
const talkThrough = new ItemCategory("Talk Through Your Day", ["Mindfulness"], [], SCORE_MAP.get("Talk through your day"));

const puzzle = new ItemCategory("Puzzle", ["Mindfulness"], [], 0);
const coloringCraft = new ItemCategory("Coloring/Craft", ["Mindfulness"], [], 0);

export const itemList = [walk, natureHike, bike, gym, swim, soccer, basketball, baseball, run, yoga, dance, calisthenics, climbing, volleyball, golf, focusedMeditation, breathingExercises, musicListening, journaling, read, watchShow, phoneBreak, tmrToDo, stretch, hotShower, talkThrough, puzzle, coloringCraft];
