export class ItemCategory {
  name: string
  categoryNames: string[]; // item's main categories
  subCategory: string[]; // item's subcategories (MIGHT BE ABLE TO MERGE THIS WITH THE LINE ABOVE)
  indScore: number; // individual score of the item

  constructor(name: string, categoryNames: string[], subCategory: string[], indScore: number) {
      this.name = name;
      this.categoryNames = categoryNames;
      this.subCategory = subCategory;
      this.indScore = indScore;
  }
}

let SCORE_MAP: Map<string, number> = new Map()
/*
- Each item will be created on startup with the ItemCategory class
- Store these items in an array of tuples [[score, ItemCategory item], ...]
- to compute the current "score" for each item, we would need to store the current ranks of the categories and the ranking of the individual items
*/