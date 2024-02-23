// class ItemCategory {
//     itemName: string
//     categoryNames: string[]; // item's main categories
//     subCategory: string[]; // item's subcategories (MIGHT BE ABLE TO MERGE THIS WITH THE LINE ABOVE)
//     indScore: number; // individual score of the item
// // 
//     constructor(itemName: string, categoryNames: string[], subCategory: string[], indScore: number) {
//         this.itemName = itemName;
//         this.categoryNames = categoryNames;
//         this.subCategory = subCategory;
//         this.indScore = indScore;
//     }
// }

// const SCORE_MAP = new Map<string, number>();
// SCORE_MAP.set("Walk", 5);
// SCORE_MAP.set("Meditation", 3);
// SCORE_MAP.set("Nature Hike", 7);
// SCORE_MAP.set("Bike", 6);
// SCORE_MAP.set("Gym", 8);
// SCORE_MAP.set("Swim", 7);
// SCORE_MAP.set("Soccer", 9);
// SCORE_MAP.set("Basketball", 8);
// SCORE_MAP.set("Baseball", 8);
// SCORE_MAP.set("Run", 7);
// SCORE_MAP.set("Yoga", 8);
// SCORE_MAP.set("Dance", 7);
// SCORE_MAP.set("Calisthenics", 6);
// SCORE_MAP.set("Climbing", 9);
// SCORE_MAP.set("Volleyball", 8);
// SCORE_MAP.set("Golf", 6);
// SCORE_MAP.set("Focused Meditation", 3);
// SCORE_MAP.set("Breathing Exercises", 2);
// SCORE_MAP.set("Journaling", 4);
// SCORE_MAP.set("Read", 3);
// SCORE_MAP.set("Watch a show", 2);
// SCORE_MAP.set("Phone break", 1);
// SCORE_MAP.set("Tomorrow's to-do list creation", 4);
// SCORE_MAP.set("Stretch", 4);
// SCORE_MAP.set("Hot shower/bath", 4);
// SCORE_MAP.set("Talk through your day", 5);
// SCORE_MAP.set("Puzzle", 4);
// SCORE_MAP.set("Coloring/Craft", 4);

// // Define all items using the ItemCategory class:
// const walk = new ItemCategory("Walk", ["Active"], ["Outdoors", "Low Intensity"], SCORE_MAP.get("Walk"));
// const natureHike = new ItemCategory("Nature Hike", ["Active"], ["Outdoors", "Medium Intensity"], SCORE_MAP.get("Nature Hike"));
// const bike = new ItemCategory("Bike", ["Active"], ["Outdoors", "Medium Intensity"], SCORE_MAP.get("Bike"));
// const gym = new ItemCategory("Gym", ["Active"], ["Indoors", "High Intensity"], SCORE_MAP.get("Gym"));
// const swim = new ItemCategory("Swim", ["Active"], ["Indoors", "Medium Intensity"], SCORE_MAP.get("Swim"));
// const soccer = new ItemCategory("Soccer", ["Active"], ["Outdoors", "High Intensity"], SCORE_MAP.get("Soccer"));
// const basketball = new ItemCategory("Basketball", ["Active"], ["Indoors", "High Intensity"], SCORE_MAP.get("Basketball"));
// const baseball = new ItemCategory("Baseball", ["Active"], ["Outdoors", "High Intensity"], SCORE_MAP.get("Baseball"));
// const run = new ItemCategory("Run", ["Active"], ["Outdoors", "High Intensity"], SCORE_MAP.get("Run"));
// const yoga = new ItemCategory("Yoga", ["Active"], ["Indoors", "Low Intensity"], SCORE_MAP.get("Yoga"));
// const dance = new ItemCategory("Dance", ["Active"], ["Indoors", "Medium Intensity"], SCORE_MAP.get("Dance"));
// const calisthenics = new ItemCategory("Calisthenics", ["Active"], ["Indoors", "Medium Intensity"], SCORE_MAP.get("Calisthenics"));
// const climbing = new ItemCategory("Climbing", ["Active"], ["Indoors", "High Intensity"], SCORE_MAP.get("Climbing"));
// const volleyball = new ItemCategory("Volleyball", ["Active"], ["Outdoors", "High Intensity"], SCORE_MAP.get("Volleyball"));
// const golf = new ItemCategory("Golf", ["Active"], ["Outdoors", "Low Intensity"], SCORE_MAP.get("Golf"));

// const focusedMeditation = new ItemCategory("Focused Meditation", ["Mindfulness"], ["Meditation"], SCORE_MAP.get("Meditation"));
// const breathingExercises = new ItemCategory("Breathing Exercises", ["Mindfulness"], ["Meditation"], 2);
// const musicListening = new ItemCategory("Music Listening", ["Mindfulness"], [], 4);
// const journaling = new ItemCategory("Journaling", ["Mindfulness"], [], 6);
// const read = new ItemCategory("Read", ["Mindfulness"], [], 5);
// const watchShow = new ItemCategory("Watch a Show", ["Mindfulness"], [], 3);
// const phoneBreak = new ItemCategory("Phone Break", ["Mindfulness"], [], 2);
// const tmrToDo = new ItemCategory("Tomorrow's To-Do List Creation", ["Mindfulness"], [], 3);
// const stretch = new ItemCategory("Stretch", ["Mindfulness"], ["Low Intensity"], 4);
// const hotShower = new ItemCategory("Hot Shower/Bath", ["Mindfulness"], [], 6);
// const talkThrough = new ItemCategory("Talk Through Your Day", ["Mindfulness"], [], 5);
// const puzzle = new ItemCategory("Puzzle", ["Mindfulness"], [], 4);
// const coloringCraft = new ItemCategory("Coloring/Craft", ["Mindfulness"], [], 4);


// /*
// - Each item will be created on startup with the ItemCategory class
// - Store these items in an array of tuples [[score, ItemCategory item], ...]
// - to compute the current "score" for each item, we would need to store the current ranks of the categories and the ranking of the individual items
// */

// // score
// // each cateogyr has a score each item has a score
// // we want to rank the items upon voting of the app we 
// // individual score + category score
// // customized for each person

// // understanding
// // itemName = walk
// // categoryName = [active]
// // subcategory = [outdoors, low intensity]
// // 