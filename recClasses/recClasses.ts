let CATEGORY_SCORE_MAP = new Map();

let SLEEP_GOAL: number

export class Activity {
    name: string;
    numPicks: number;
    categoryNames: string[]; // item's main categories
    // subCategory: string[]; // item's subcategories (MIGHT BE ABLE TO MERGE THIS WITH THE LINE ABOVE)
    indScore: number; // individual score of the item

    constructor(name: string, categoryNames: string[], indScore: number) {
        this.name = name;
        this.categoryNames = categoryNames;
        // this.subCategory = subCategory;
        this.indScore = indScore;
        this.numPicks = 0;
    }

    //CALCULATE THE SCORE BASED ON THE QUALITY OF SLEEP THEY GOT PREVIOUSLY AND THE NUMBER OF TIMES THEY HAD PICKED THE ITEM (if the number of times is high, this sleep would only effect the time minorly)
    updateScore(prevNightSleep: number, sleepGoal: number, sleepQuality: number) {
    //    ubtract by 6 and dvide by 2 
        sleepQuality -= 6;
        sleepQuality /= 2;
        let diff = (prevNightSleep - sleepGoal) / sleepGoal; // percentage difference between prevNightSleep and sleepGoal
        diff *= 10; // so if its 0.1 difference, the diff will be 1
        diff += sleepQuality;
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

        // this.subCategory.forEach(catName => {
        //     if (CATEGORY_SCORE_MAP[catName]) {
        //         categoryScore += CATEGORY_SCORE_MAP[catName] // divided by 5 to make sure one difference doesn't make large difference (not sure if this is important or useful)
        //     }
        //     else {
        //         console.log("ERROR: category name not found in CATEGORY_SCORE_MAP")
        //     }
        //     numCats += 1
        // });

        return this.indScore + (categoryScore / numCats)
    }
}


/*
- Each item will be created on startup with the Activity class
- Store these items in an array of tuples [[score, Activity item], ...]
- to compute the current "score" for each item, we would need to store the current ranks of the categories and the ranking of the individual items
*/

const walk = new Activity("Walk", ["Active", "Outdoors", "Low Intensity"], 0);
const natureHike = new Activity("Nature Hike", ["Active", "Outdoors", "Medium Intensity"], 0);
const bike = new Activity("Bike", ["Active", "Outdoors", "Medium Intensity"], 0);
const gym = new Activity("Gym", ["Active", "Indoors", "High Intensity"], 0);
const swim = new Activity("Swim", ["Active", "Indoors", "Medium Intensity"], 0);
const soccer = new Activity("Soccer", ["Active", "Outdoors", "High Intensity"], 0);
const basketball = new Activity("Basketball", ["Active", "Indoors", "High Intensity"], 0);
const baseball = new Activity("Baseball", ["Active", "Outdoors", "High Intensity"], 0);
const run = new Activity("Run", ["Active", "Outdoors", "High Intensity"], 0);
const yoga = new Activity("Yoga", ["Active", "Indoors", "Low Intensity"], 0);
const dance = new Activity("Dance", ["Active", "Indoors", "Medium Intensity"], 0);
const calisthenics = new Activity("Calisthenics", ["Active", "Indoors", "Medium Intensity"], 0);
const climbing = new Activity("Climbing", ["Active", "Indoors", "High Intensity"], 0);
const volleyball = new Activity("Volleyball", ["Active", "Outdoors", "High Intensity"], 0);
const golf = new Activity("Golf", ["Active", "Outdoors", "Low Intensity"], 0);

const focusedMeditation = new Activity("Focused Meditation", ["Mindfulness", "Meditation"], 0);
const breathingExercises = new Activity("Breathing Exercises", ["Mindfulness", "Meditation"], 0);
const musicListening = new Activity("Music Listening", ["Mindfulness"], 0);
const journaling = new Activity("Journaling", ["Mindfulness"], 0);
const read = new Activity("Read", ["Mindfulness"], 0);
const watchShow = new Activity("Watch a Show", ["Mindfulness"], 0);
const phoneBreak = new Activity("Phone Break", ["Mindfulness"], 0);
const tmrToDo = new Activity("Tomorrow's To-Do List Creation", ["Mindfulness"], 0);
const stretch = new Activity("Stretch", ["Mindfulness", "Low Intensity"], 0);
const hotShower = new Activity("Hot Shower/Bath", ["Mindfulness"], 0);
const talkThrough = new Activity("Talk Through Your Day", ["Mindfulness"], 0);


const puzzle = new Activity("Puzzle", ["Mindfulness"], 0);
const coloringCraft = new Activity("Coloring/Craft", ["Mindfulness"], 0);


let categoryList = ["Walk", "Nature Hike", "Bike", "Gym", "Swim", "Soccer", "Basketball", "Baseball", "Run", "Yoga", "Dance", "Calisthenics", "Climbing", "Volleyball", "Golf", "Focused Meditation", "Breathing Exercises", "Music Listening", "Journaling", "Read", "Watch a show", "Phone break", "Tomorrow's to-do list creation", "Stretch", "Hot shower/bath", "Talk through your day", "Puzzle", "Coloring/Craft", "Active", "Mindfulness", "Outdoors", "Indoors", "Low Intensity", "Medium Intensity", "High Intensity"];

for (let i = 0; i < categoryList.length; i++) {
    CATEGORY_SCORE_MAP[categoryList[i]] = 0;
}


export const itemList = [walk, natureHike, bike, gym, swim, soccer, basketball, baseball, run, yoga, dance, calisthenics, climbing, volleyball, golf, focusedMeditation, breathingExercises, musicListening, journaling, read, watchShow, phoneBreak, tmrToDo, stretch, hotShower, talkThrough, puzzle, coloringCraft];
export const categoryMapList = CATEGORY_SCORE_MAP;

