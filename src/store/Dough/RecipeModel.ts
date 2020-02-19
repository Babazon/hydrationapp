import { observable } from 'mobx';
import { persist } from 'mobx-persist';

export interface IRecipeJSON {
  recipeFlour: number;
  recipeWater: number;
  leavenWeight: number;
  leavenHydration: number;
}

export class RecipeModel {

  @persist @observable public recipeFlour: number = 1000;
  @persist @observable public recipeWater: number = 750;
  @persist @observable public leavenWeight: number = 200;
  @persist @observable public leavenHydration: number = 100;

  public static fromJSON(data: IRecipeJSON) {
    const model = new RecipeModel();
    model.recipeFlour = data.recipeFlour;
    model.recipeWater = data.recipeWater;
    model.leavenWeight = data.leavenHydration;
    model.leavenHydration = data.leavenHydration;
    return model;
  }
}
