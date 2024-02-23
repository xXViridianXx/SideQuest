let SCORE_MAP: Map<string, number> = new Map() // string is ItemCategory.name, number is the score
let SLEEP_GOAL: number

export class ItemCategory {
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
  }

//CALCULATE THE SCORE BASED ON THE QUALITY OF SLEEP THEY GOT PREVIOUSLY AND THE NUMBER OF TIMES THEY HAD PICKED THE ITEM (if the number of times is high, this sleep would only effect the time minorly)
  updateScore(prevNightSleep: number, sleepGoal: number) {
    let diff = (prevNightSleep - sleepGoal) / sleepGoal; // percentage difference between prevNightSleep and sleepGoal
    diff *= 10; // so if its 0.1 difference, the diff will be 1
    this.indScore += diff / this.numPicks; // divide by numPicks to regularize the results (don't want it to change a lot if this item has a history of being good/bad)
    if(this.numPicks < 7) {
      this.numPicks += 1;
    }

    //update category scores

    this.categoryNames.forEach(catName => {
      if(SCORE_MAP[catName]) {
        SCORE_MAP[catName] += (diff / 5) // divided by 5 to make sure one difference doesn't make large difference (not sure if this is important or useful)
      }
      else {
        console.log("ERROR: category name not found in SCORE_MAP")
      }
    });

    this.subCategory.forEach(catName => {
      if(SCORE_MAP[catName]) {
        SCORE_MAP[catName] += (diff / 5) // divided by 5 to make sure one difference doesn't make large difference (not sure if this is important or useful)
      }
      else {
        console.log("ERROR: category name not found in SCORE_MAP")
      }
    });
  }

  getScore() {
    let categoryScore: number = 0;
    let numCats: number = 0;
    this.categoryNames.forEach(catName => {
      if(SCORE_MAP[catName]) {
        categoryScore += SCORE_MAP[catName] // divided by 5 to make sure one difference doesn't make large difference (not sure if this is important or useful)
      }
      else {
        console.log("ERROR: category name not found in SCORE_MAP")
      }
      numCats += 1
    });
    this.subCategory.forEach(catName => {
      if(SCORE_MAP[catName]) {
        categoryScore += SCORE_MAP[catName] // divided by 5 to make sure one difference doesn't make large difference (not sure if this is important or useful)
      }
      else {
        console.log("ERROR: category name not found in SCORE_MAP")
      }
      numCats += 1
    });

    return this.indScore + (categoryScore/numCats)
  }
}


/*
- Each item will be created on startup with the ItemCategory class
- Store these items in an array of tuples [[score, ItemCategory item], ...]
- to compute the current "score" for each item, we would need to store the current ranks of the categories and the ranking of the individual items
*/



