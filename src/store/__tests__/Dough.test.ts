import { Dough } from "../Dough"
import { presets } from '../../env';

describe('Dough store tests', () => {

  it('instantiates', () => {
    const dough = new Dough(presets);
    expect(dough).toBeDefined();
  })

  it('resets values', () => {
    const dough = new Dough(presets);
    dough.hydration.toggleDesiredHydationLock();
    expect(dough.hydration.desiredHydrationLocked).toBeTruthy();
    dough.resetValues();
    expect(dough.hydration.desiredHydrationLocked).toBeFalsy();
  })

  it('computes salt ratio', () => {
    const dough = new Dough(presets);
    expect(dough.saltRatio).toBeDefined();
    expect(dough.saltRatio).toEqual(presets.saltRatio);
  })

  it('computes postbake weight ratio', () => {
    const dough = new Dough(presets);
    expect(dough.postBakeWeightRatio).toBeDefined();
    expect(dough.postBakeWeightRatio).toEqual(presets.postBakeWeightRatio);
  })

  it('computes total flour weight', () => {
    const dough = new Dough(presets);
    expect(dough.totalFlour).toBeDefined();
    expect(dough.totalFlour).toEqual(1100);
  })

  it('computes total water weight', () => {
    const dough = new Dough(presets);
    expect(dough.totalWater).toBeDefined();
    expect(dough.totalWater).toEqual(825);
  })

  it('sets desired target weight', () => {
    const dough = new Dough(presets);
    expect(dough.desiredTargetWeight).toBe(2000);
    dough.setDesiredTargetWeight(3000);
    expect(dough.desiredTargetWeight).toBe(3000);
  })

  it('can compute desired target baked weight', () => {
    const dough = new Dough(presets);
    expect(dough.desiredTargetBakedWeight).toBe(2000 * 0.85)
  })

  it('can yield total hydration', () => {
    const dough = new Dough(presets);
    dough.water.setWaterWeight(1000);
    dough.flour.setFlourWeight(1000);
    dough.leaven.setLeavenWeight(1000);
    dough.leaven.setLeavenHydration(100);
    expect(dough.totalHydration).toBe(100 / 100);
  })

  it('can yield recommended salt amount', () => {
    const dough = new Dough(presets);
    dough.water.setWaterWeight(1000);
    dough.flour.setFlourWeight(1000);
    dough.leaven.setLeavenWeight(1000);
    dough.leaven.setLeavenHydration(100);
    expect(dough.recommendedSalt).toBe(1500 * 0.022)
  })

  it('can yield post bake weight approximation', () => {
    const dough = new Dough(presets);
    dough.water.setWaterWeight(1000);
    dough.flour.setFlourWeight(1000);
    dough.leaven.setLeavenWeight(1000);
    dough.leaven.setLeavenHydration(100);
    expect(dough.postBakeWeight).toBe((3000 + 1500 * 0.022) * 0.85)
  })


})
