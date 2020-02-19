import { runInAction } from 'mobx';
import { RecipeModel } from '../store/Dough/RecipeModel';

export const yieldRecipeFromTargetDough = ({ doughWeight, hydration, leavenHydration, inoculation, saltRatio }: { doughWeight: number, hydration: number, leavenHydration: number, inoculation: number, saltRatio: number }): RecipeModel => {
  const model = new RecipeModel();
  const finalTotalFlourWeight: number = doughWeight / ((1 + (hydration / 100)) + saltRatio);
  const finalTotalWaterWeight: number = finalTotalFlourWeight * (hydration / 100);
  const finalFlourWeight: number = finalTotalFlourWeight / (1 + ((inoculation / 100) * (1 / (1 + (leavenHydration / 100)))));
  const finalLeavenWeight: number = finalFlourWeight * (inoculation / 100);
  const finalLeavenFlourWeight: number = finalLeavenWeight * (1 / (1 + (leavenHydration / 100)));
  const finalLeavenWaterWeight: number = finalLeavenWeight - finalLeavenFlourWeight;
  const finalWaterWeight: number = finalTotalWaterWeight - finalLeavenWaterWeight;

  runInAction(() => {
    model.leavenHydration = leavenHydration;
    model.recipeFlour = finalFlourWeight;
    model.recipeWater = finalWaterWeight;
    model.leavenWeight = finalLeavenWeight;
  });

  return model;
};

export const yieldRecipeFactorFromTargetDough = ({ doughWeight, hydration, saltRatio, totalFlour, flourWeight, waterWeight, leavenWeight }: { doughWeight: number, hydration: number, saltRatio: number, totalFlour: number, flourWeight: number, waterWeight: number, leavenWeight: number }): RecipeModel => {
  const model = new RecipeModel();

  const actualTargetFlourWeight: number = doughWeight * (1 / (1 + hydration / 100 + saltRatio));
  const ratioToMultiply: number = (actualTargetFlourWeight / totalFlour) ?? 0; // in case of divide by 0

  model.recipeFlour = flourWeight * ratioToMultiply;
  model.recipeWater = waterWeight * ratioToMultiply;
  model.leavenWeight = leavenWeight * ratioToMultiply;

  return model;
};

export const yieldFlourToMatchHydration = ({
  waterWeight,
  leavenHydration,
  leavenWeight,
  hydration,
  totalWater,
  leavenFlour,
}: {
  waterWeight: number,
  leavenWeight: number,
  leavenHydration: number,
  hydration: number,
  totalWater: number,
  leavenFlour: number
}): number => {
  if (waterWeight != null &&
    leavenWeight != null &&
    leavenHydration != null &&
    hydration > 0) {
    return ((totalWater / hydration) * 100) - leavenFlour;
  }
  return 0;
};
