// let CATEGORY_SCORE_MAP: Map<string, number> = new Map() // string is Activity.name, number is the score
let CATEGORY_SCORE_MAP = new Map();
let SLEEP_GOAL: number

export class Activity {
    name: string;
    numPicks: number;
    categoryNames: string[]; // item's main categories
    subCategory: string[]; // item's subcategories (MIGHT BE ABLE TO MERGE THIS WITH THE LINE ABOVE)
    indScore: number; // individual score of the item

    constructor(name: string, categoryNames: string[], subCategory: string[], indScore: number) {
        this.name = name;
        this.categoryNames = categoryNames;
        this.subCategory = subCategory;
        this.indScore = indScore;
        this.numPicks = 0;
    }

    //CALCULATE THE SCORE BASED ON THE QUALITY OF SLEEP THEY GOT PREVIOUSLY AND THE NUMBER OF TIMES THEY HAD PICKED THE ITEM (if the number of times is high, this sleep would only effect the time minorly)
    updateScore(prevNightSleep: number, sleepGoal: number) {
        let diff = (prevNightSleep - sleepGoal) / sleepGoal; // percentage difference between prevNightSleep and sleepGoal
        diff *= 10; // so if its 0.1 difference, the diff will be 1
        this.indScore += diff / this.numPicks; // divide by numPicks to regularize the results (don't want it to change a lot if this item has a history of being good/bad)
        if (this.numPicks < 7) {
            this.numPicks += 1;
        }

        //update category scores

        this.categoryNames.forEach(catName => {
            if (CATEGORY_SCORE_MAP[catName]) {
                CATEGORY_SCORE_MAP[catName] += (diff / 5) // divided by 5 to make sure one difference doesn't make large difference (not sure if this is important or useful)
            }
            else {
                console.log("ERROR: category name not found in CATEGORY_SCORE_MAP")
            }
        });

        this.subCategory.forEach(catName => {
            if (CATEGORY_SCORE_MAP[catName]) {
                CATEGORY_SCORE_MAP[catName] += (diff / 5) // divided by 5 to make sure one difference doesn't make large difference (not sure if this is important or useful)
            }
            else {
                console.log("ERROR: category name not found in CATEGORY_SCORE_MAP")
            }
        });
    }

    getScore() {
        let categoryScore: number = 0;
        let numCats: number = 0;
        this.categoryNames.forEach(catName => {
            if (CATEGORY_SCORE_MAP[catName]) {
                categoryScore += CATEGORY_SCORE_MAP[catName] // divided by 5 to make sure one difference doesn't make large difference (not sure if this is important or useful)
            }
            else {
                console.log("ERROR: category name not found in CATEGORY_SCORE_MAP")
            }
            numCats += 1
        });
        this.subCategory.forEach(catName => {
            if (CATEGORY_SCORE_MAP[catName]) {
                categoryScore += CATEGORY_SCORE_MAP[catName] // divided by 5 to make sure one difference doesn't make large difference (not sure if this is important or useful)
            }
            else {
                console.log("ERROR: category name not found in CATEGORY_SCORE_MAP")
            }
            numCats += 1
        });

        return this.indScore + (categoryScore / numCats)
    }
}


/*
- Each item will be created on startup with the Activity class
- Store these items in an array of tuples [[score, Activity item], ...]
- to compute the current "score" for each item, we would need to store the current ranks of the categories and the ranking of the individual items
*/

// Set all scores to 0
CATEGORY_SCORE_MAP.set("Walk", 0);
CATEGORY_SCORE_MAP.set("Meditation", 0);
CATEGORY_SCORE_MAP.set("Nature Hike", 0);
CATEGORY_SCORE_MAP.set("Bike", 0);
CATEGORY_SCORE_MAP.set("Gym", 0);
CATEGORY_SCORE_MAP.set("Swim", 0);
CATEGORY_SCORE_MAP.set("Soccer", 0);
CATEGORY_SCORE_MAP.set("Basketball", 0);
CATEGORY_SCORE_MAP.set("Baseball", 0);
CATEGORY_SCORE_MAP.set("Run", 0);
CATEGORY_SCORE_MAP.set("Yoga", 0);
CATEGORY_SCORE_MAP.set("Dance", 0);
CATEGORY_SCORE_MAP.set("Calisthenics", 0);
CATEGORY_SCORE_MAP.set("Climbing", 0);
CATEGORY_SCORE_MAP.set("Volleyball", 0);
CATEGORY_SCORE_MAP.set("Golf", 0);
CATEGORY_SCORE_MAP.set("Focused Meditation", 0);
CATEGORY_SCORE_MAP.set("Breathing Exercises", 0);
CATEGORY_SCORE_MAP.set("Journaling", 0);
CATEGORY_SCORE_MAP.set("Read", 0);
CATEGORY_SCORE_MAP.set("Watch a show", 0);
CATEGORY_SCORE_MAP.set("Phone break", 0);
CATEGORY_SCORE_MAP.set("Tomorrow's to-do list creation", 0);
CATEGORY_SCORE_MAP.set("Stretch", 0);
CATEGORY_SCORE_MAP.set("Hot shower/bath", 0);
CATEGORY_SCORE_MAP.set("Talk through your day", 0);
CATEGORY_SCORE_MAP.set("Puzzle", 0);
CATEGORY_SCORE_MAP.set("Coloring/Craft", 0);

// Create instances with scores from CATEGORY_SCORE_MAP
const walk = new Activity("Walk", ["Active"], ["Outdoors", "Low Intensity"], CATEGORY_SCORE_MAP.get("Walk"));
const natureHike = new Activity("Nature Hike", ["Active"], ["Outdoors", "Medium Intensity"], CATEGORY_SCORE_MAP.get("Nature Hike"));
const bike = new Activity("Bike", ["Active"], ["Outdoors", "Medium Intensity"], CATEGORY_SCORE_MAP.get("Bike"));
const gym = new Activity("Gym", ["Active"], ["Indoors", "High Intensity"], CATEGORY_SCORE_MAP.get("Gym"));
const swim = new Activity("Swim", ["Active"], ["Indoors", "Medium Intensity"], CATEGORY_SCORE_MAP.get("Swim"));
const soccer = new Activity("Soccer", ["Active"], ["Outdoors", "High Intensity"], CATEGORY_SCORE_MAP.get("Soccer"));
const basketball = new Activity("Basketball", ["Active"], ["Indoors", "High Intensity"], CATEGORY_SCORE_MAP.get("Basketball"));
const baseball = new Activity("Baseball", ["Active"], ["Outdoors", "High Intensity"], CATEGORY_SCORE_MAP.get("Baseball"));
const run = new Activity("Run", ["Active"], ["Outdoors", "High Intensity"], CATEGORY_SCORE_MAP.get("Run"));
const yoga = new Activity("Yoga", ["Active"], ["Indoors", "Low Intensity"], CATEGORY_SCORE_MAP.get("Yoga"));
const dance = new Activity("Dance", ["Active"], ["Indoors", "Medium Intensity"], CATEGORY_SCORE_MAP.get("Dance"));
const calisthenics = new Activity("Calisthenics", ["Active"], ["Indoors", "Medium Intensity"], CATEGORY_SCORE_MAP.get("Calisthenics"));
const climbing = new Activity("Climbing", ["Active"], ["Indoors", "High Intensity"], CATEGORY_SCORE_MAP.get("Climbing"));
const volleyball = new Activity("Volleyball", ["Active"], ["Outdoors", "High Intensity"], CATEGORY_SCORE_MAP.get("Volleyball"));
const golf = new Activity("Golf", ["Active"], ["Outdoors", "Low Intensity"], CATEGORY_SCORE_MAP.get("Golf"));

const focusedMeditation = new Activity("Focused Meditation", ["Mindfulness"], ["Meditation"], CATEGORY_SCORE_MAP.get("Meditation"));
const breathingExercises = new Activity("Breathing Exercises", ["Mindfulness"], ["Meditation"], CATEGORY_SCORE_MAP.get("Breathing Exercises"));
const musicListening = new Activity("Music Listening", ["Mindfulness"], [], CATEGORY_SCORE_MAP.get("Music Listening"));
const journaling = new Activity("Journaling", ["Mindfulness"], [], CATEGORY_SCORE_MAP.get("Journaling"));
const read = new Activity("Read", ["Mindfulness"], [], CATEGORY_SCORE_MAP.get("Read"));
const watchShow = new Activity("Watch a Show", ["Mindfulness"], [], CATEGORY_SCORE_MAP.get("Watch a show"));
const phoneBreak = new Activity("Phone Break", ["Mindfulness"], [], CATEGORY_SCORE_MAP.get("Phone break"));
const tmrToDo = new Activity("Tomorrow's To-Do List Creation", ["Mindfulness"], [], CATEGORY_SCORE_MAP.get("Tomorrow's to-do list creation"));
const stretch = new Activity("Stretch", ["Mindfulness"], ["Low Intensity"], CATEGORY_SCORE_MAP.get("Stretch"));
const hotShower = new Activity("Hot Shower/Bath", ["Mindfulness"], [], CATEGORY_SCORE_MAP.get("Hot shower/bath"));
const talkThrough = new Activity("Talk Through Your Day", ["Mindfulness"], [], CATEGORY_SCORE_MAP.get("Talk through your day"));

const puzzle = new Activity("Puzzle", ["Mindfulness"], [], 0);
const coloringCraft = new Activity("Coloring/Craft", ["Mindfulness"], [], 0);

export const itemList = [walk, natureHike, bike, gym, swim, soccer, basketball, baseball, run, yoga, dance, calisthenics, climbing, volleyball, golf, focusedMeditation, breathingExercises, musicListening, journaling, read, watchShow, phoneBreak, tmrToDo, stretch, hotShower, talkThrough, puzzle, coloringCraft];