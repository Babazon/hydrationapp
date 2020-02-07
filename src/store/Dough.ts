import { action, computed, observable, reaction } from 'mobx';
import { Persistence } from '../utilities/persistence';
import { DoughWeight } from './DoughWeight';
import { Flour } from './Flour';
import { Hydration } from './Hydration';
import { Inoculation } from './Inoculation';
import { LeavenHydration } from './LeavenHydration';
import { LeavenWeight } from './LeavenWeight';
import { RecipeModel } from './RecipeModel';
import { UserInterface } from './UserInterface';
import { Water } from './Water';

// tslint:disable-next-line: max-classes-per-file
export class Dough {

  // tslint:disable-next-line: cognitive-complexity
  constructor(protected readonly appPresets: any) {

    // persistence
    this.hydrate();

    // SIDE EFFECTS

    reaction(() => this.totalHydration, (totalHydration: number) => {
      if (!this.hydration.isLocked && totalHydration != null) {
        this.hydration.setValue(totalHydration * 100);
      }
    });

    reaction(() => this.doughWeight.value, (_: number) => {
      if (this.hydration.isLocked) {
        if (this.flour.value > 0 && this.water.value > 0 && this.leavenWeight.value > 0 && this.leavenHydration.value > 0) {
          this.adjustWeightValuesForTargetDoughWeightWithNonZeroWeights();
        } else if (this.leavenHydration.isLocked &&
          this.leavenHydration.value > 0 &&
          this.inoculation.value > 0) {
          this.adjustWeightValuesForTargetDoughWeight();
        }
      }
    });

    reaction(() => this.hydration.isLocked, (_: boolean) => {
      if (this.hydration.isLocked && this.doughWeight.value) {
        if (this.flour.value > 0 && this.water.value > 0 && this.leavenWeight.value > 0 && this.leavenHydration.value > 0) {
          this.adjustWeightValuesForTargetDoughWeightWithNonZeroWeights();
        } else if (this.leavenHydration.isLocked &&
          this.leavenHydration.value > 0 &&
          this.inoculation.value > 0) {
          this.adjustWeightValuesForTargetDoughWeight();
        }
      }
    });

    reaction(() => this.inoculation.value, (targetInoculation: number) => {
      if (this.leavenHydration.isLocked &&
        this.leavenHydration.value > 0 &&
        this.hydration.isLocked &&
        targetInoculation > 0) {
        this.adjustWeightValuesForTargetDoughWeight();
      }
    });

    // --- SIDE EFFECTS
  }

  @action private adjustWeightValuesForTargetDoughWeightWithNonZeroWeights = () => {
    const actualTargetFlourWeight: number = this.doughWeight.value * (1 / (1 + this.hydration.value / 100 + this.saltRatio));
    const ratioToMultiply: number = (actualTargetFlourWeight / this.totalFlour) ?? 0; // in case of divide by 0
    this.flour.setValue(this.flour.value * ratioToMultiply);
    this.water.setValue(this.water.value * ratioToMultiply);
    this.leavenWeight.setValue(this.leavenWeight.value * ratioToMultiply);
  }

  @action private adjustWeightValuesForTargetDoughWeight = () => {

    const finalTotalFlourWeight: number = this.doughWeight.value / ((1 + (this.hydration.value / 100)) + this.saltRatio);
    const finalTotalWaterWeight: number = finalTotalFlourWeight * (this.hydration.value / 100);
    const finalFlourWeight: number = finalTotalFlourWeight / (1 + ((this.inoculation.value / 100) * (1 / (1 + (this.leavenHydration.value / 100)))));
    const finalLeavenWeight: number = finalFlourWeight * (this.inoculation.value / 100);
    const finalLeavenFlourWeight: number = finalLeavenWeight * (1 / (1 + (this.leavenHydration.value / 100)));
    const finalLeavenWaterWeight: number = finalLeavenWeight - finalLeavenFlourWeight;
    const finalWaterWeight: number = finalTotalWaterWeight - finalLeavenWaterWeight;

    this.flour.setValue(finalFlourWeight);
    this.water.setValue(finalWaterWeight);
    this.leavenWeight.setValue(finalLeavenWeight);
  }

  //////////// PERSISTENCE

  @observable private readonly persistence: Persistence<RecipeModel> = new Persistence();

  @observable public localRecipes: { [index: string]: RecipeModel } = {};

  @computed public get localRecipesArray(): Array<[string, RecipeModel]> {
    // SORT BY DATE, also the key, first value of the tuple
    return Object.entries(this.localRecipes).sort((recipe1, recipe2) => {
      if (recipe1[0] > recipe2[0]) { return 1; }
      if (recipe1[0] < recipe2[0]) { return -1; }
      return 0;
    });
  }

  @action public persistRecipe = async () => {
    const recipe = RecipeModel.fromJSON({
      leavenHydration: this.leavenHydration.value,
      leavenWeight: this.leavenWeight.value,
      recipeFlour: this.flour.value,
      recipeWater: this.water.value
    });
    try {
      await this.persistence.persist(recipe);
      await this.hydrate();
    } catch (error) {
      // could not persist
    }

  }

  @action private hydrate = async () => {
    try {
      const flattenedRecipes = await this.persistence.hydrate();
      if (flattenedRecipes) {
        this.createRecipeTable(flattenedRecipes);
      }
    } catch (error) {
      // could not hydrate
    }
  }

  @action private createRecipeTable = (flattenedRecipes: Array<[string, string | null]>) => {
    this.localRecipes = flattenedRecipes
      .reduce((accumulator, [key, recipe]: [string, string]) => {
        accumulator[key] = RecipeModel.fromJSON(JSON.parse(recipe));
        return accumulator;
      }
        , {} as { [index: string]: RecipeModel });
  }

  @action public setToSelectedRecipe = (recipe: RecipeModel) => {
    this.flour.value = recipe.recipeFlour;
    this.water.value = recipe.recipeWater;
    this.leavenWeight.value = recipe.leavenWeight;
    this.leavenHydration.value = recipe.leavenHydration;
  }

  ///////////////////////////////

  @observable public flour: Flour = new Flour(this);
  @observable public water: Water = new Water(this);
  @observable public leavenWeight: LeavenWeight = new LeavenWeight(this);
  @observable public leavenHydration: LeavenHydration = new LeavenHydration(this);
  @observable public hydration: Hydration = new Hydration(this);
  @observable public userInterface: UserInterface = new UserInterface(this, this.appPresets);
  @observable public inoculation: Inoculation = new Inoculation(this);
  @observable public doughWeight: DoughWeight = new DoughWeight(this);

  @action public resetValues = () => {
    this.flour.value = this.appPresets.initialFlourValue;
    this.water.value = this.appPresets.initialWaterValue;
    this.leavenWeight.value = this.appPresets.initialLeavenValue;
    this.leavenHydration.value = this.appPresets.initialLeavenHydration;
    this.hydration.isLocked = false;
    this.water.isLocked = false;
    this.flour.isLocked = false;
    this.leavenHydration.isLocked = false;
    this.doughWeight.isLocked = false;
    this.inoculation.isLocked = false;
    this.hydration.value = this.appPresets.initialTargetHydration;
    this.doughWeight.value = this.appPresets.initialTargetDoughWeight;
    this.inoculation.value = this.appPresets.initialTargetInoculation;
  }

  ////////////////////

  @computed public get saltRatio(): number {
    return this.appPresets.saltRatio;
  }

  @computed public get eggWaterRatio(): number {
    return this.appPresets.eggWaterRatio;
  }

  @computed public get milkWaterRatio(): number {
    return this.appPresets.milkWaterRatio;
  }

  @computed public get butterWaterRatio(): number {
    return this.appPresets.butterWaterRatio;
  }

  @computed public get postBakeWeightRatio(): number {
    return this.appPresets.postBakeWeightRatio;
  }

  @computed public get totalFlour(): number {
    if (this.flour.value != null && this.leavenWeight.leavenFlour != null) {
      return this.flour.value + this.leavenWeight.leavenFlour;
    }
    return 0;
  }

  @computed public get totalWater(): number {
    if (this.water.value != null && this.leavenWeight.leavenWater != null) {
      return this.water.value + this.leavenWeight.leavenWater;
    }
    return 0;
  }

  @computed public get totalHydration(): number {
    if (this.totalFlour > 0 && this.totalWater != null && !isNaN(this.totalWater / this.totalFlour)) {
      return this.totalWater / this.totalFlour;
    }
    return 0;
  }

  @computed public get recommendedSalt(): number {
    if (this.totalFlour != null) {
      return this.totalFlour * this.appPresets.saltRatio;
    }
    return 0;
  }

  @computed public get postBakeWeight(): number {
    if (this.totalFlour != null && this.totalWater != null) {
      return this.postBakeWeightRatio * (this.totalWater + this.totalFlour + this.recommendedSalt);
    }
    return 0;
  }

  @computed public get experimentalDoughVolume(): number {
    return (this.totalFlour + this.totalWater) * (2 / 3);
  }

  @computed public get experimentalBulkVolume(): number {

    if (this.totalHydration > 0.75) {
      return this.experimentalDoughVolume * 1.25;
    }
    if (this.totalHydration > 0.70) {
      return this.experimentalDoughVolume * 1.30;
    }
    if (this.totalHydration > 0.65) {
      return this.experimentalDoughVolume * 1.4;
    }
    if (this.totalHydration > 0.60) {
      return this.experimentalDoughVolume * 1.45;
    }
    return this.experimentalDoughVolume * 1.5;
  }

}
