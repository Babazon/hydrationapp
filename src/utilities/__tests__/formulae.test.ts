import { yieldRecipeFromTargetDough, yieldRecipeFactorFromTargetDough, yieldFlourToMatchHydration } from "../formulae";
import { RecipeModel } from "../../store/Dough/RecipeModel";

describe('Formulae Unit Tests', () => {
  it('Yields Recipe for Target Dough With Zero Values', () => {
    const doughWeight = 100000;
    const hydration = 100;
    const leavenHydration = 100;
    const inoculation = 20;
    const saltRatio = 0.22;

    const yieldedRecipe = yieldRecipeFromTargetDough({
      doughWeight,
      hydration,
      leavenHydration,
      inoculation,
      saltRatio
    });

    expect(yieldedRecipe instanceof RecipeModel).toBeTruthy();
    expect(+(yieldedRecipe.recipeFlour.toFixed(0))).toBe(40950);
    expect(+(yieldedRecipe.recipeWater.toFixed(0))).toBe(40950);
    expect(+(yieldedRecipe.leavenWeight.toFixed(0))).toBe(8190);
    expect(+(yieldedRecipe.leavenHydration.toFixed(0))).toBe(100);


  })


  it('Yields Recipe for Target Dough using preexisting ratio without changing hydration or inoculation', () => {
    const doughWeight = 100000;
    const hydration = 100;
    const saltRatio = 0.22;
    const totalFlour = 1100;
    const flourWeight = 1000;
    const waterWeight = 1000;
    const leavenWeight = 200;
    const yieldedRecipe = yieldRecipeFactorFromTargetDough({
      doughWeight,
      hydration,
      saltRatio,
      totalFlour,
      flourWeight,
      waterWeight,
      leavenWeight,
    });
    expect(yieldedRecipe instanceof RecipeModel).toBeTruthy();

    expect(yieldedRecipe instanceof RecipeModel).toBeTruthy();
    expect(+(yieldedRecipe.recipeFlour.toFixed(0))).toBe(40950);
    expect(+(yieldedRecipe.recipeWater.toFixed(0))).toBe(40950);
    expect(+(yieldedRecipe.leavenWeight.toFixed(0))).toBe(8190);
    expect(+(yieldedRecipe.leavenHydration.toFixed(0))).toBe(100);

  })

  it('Yields the Recipe Flour value to match target hydration based on water and other values', () => {
    const waterWeight = 1000;
    const leavenWeight = 200;
    const leavenHydration = 100;
    const hydration = 100;
    const totalWater = 1100;
    const leavenFlour = 100;

    const yieldedFlour = yieldFlourToMatchHydration({
      waterWeight,
      leavenFlour,
      leavenHydration,
      leavenWeight,
      totalWater,
      hydration
    })

    expect(typeof yieldedFlour).toBe('number');
    expect(yieldedFlour).toBe(1000);
  })
})
