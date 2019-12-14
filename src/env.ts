export const presets = {
  initialFlourWeight: 1000,
  initialLeavenWeight: 200,
  initialLeavenHydratioon: 100,
  initialWaterWeight: 725,
  initialDesiredTargetHydration: 75,
  flourIncrementAmount: 50,
  waterIncrementAmount: 25,
  leavenWeightIncrementAmount: 25,
  leavenHydrationIncrementAmount: 5,
  desiredTargetHydrationIncrementAmount: 1,
  saltRatio: 0.022,
  postBakeWeightRatio: 0.85,
  flourWeightPresets: [1000, 1500, 2000, 3000, 5000],
  leavenInoculationPresets: [15, 20, 25, 30, 35, 50],
  desiredHydrationPresets: [50, 75, 80, 85, 90, 95],
  leavenHydrationPresets: [50, 75, 100, 125, 150, 175],
  minFlour: 0,
  maxFlour: 10000,
  minLeaven: 0,
  maxLeaven: 5000,
  minDesiredHydration: 0,
  maxDesiredHydration: 200,
  minLeavenHydration: 0,
  maxLeavenHydration: 200,
  minWater: 0,
  maxWater: 10000,
  languageConstants: {
    _appTitle: '@sourdoughpie hydration app',
    _flour_weight: 'Flour',
    _leaven_weight: 'Leaven',
    _leaven_hydration: 'Leaven Hydration',
    _water: 'Water',
    _target_hydration: 'Target Hydration',
    _gram_abbvr: 'g',
    _percent: '%',
    _liter_abbvr: 'lt'
  }
};
