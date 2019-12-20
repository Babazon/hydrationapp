import { Dough } from "../Dough"
import { presets } from '../../env';

describe('Dough store tests', () => {

  it('instantiates', () => {
    const dough = new Dough(presets);
    expect(dough).toBeDefined();
  })

  it('resets values', () => {
    const dough = new Dough(presets);
    dough.hydration.toggleTargetHydrationLock();
    expect(dough.hydration.targetHydrationLocked).toBeTruthy();
    dough.resetValues();
    expect(dough.hydration.targetHydrationLocked).toBeFalsy();
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

  it('sets target dough weight', () => {
    const dough = new Dough(presets);
    expect(dough.targetDoughWeight).toBe(0);
    dough.setTargetDoughWeight(3000);
    expect(dough.targetDoughWeight).toBe(3000);
  })

  it('can compute target baked weight', () => {
    const dough = new Dough(presets);
    dough.setTargetDoughWeight(2000);
    expect(dough.bakedTargetDoughWeight).toBe(2000 * 0.85)
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

  it('can yield experimental dough initial volume', () => {
    const dough = new Dough(presets);
    dough.water.setWaterWeight(1000);
    dough.flour.setFlourWeight(1000);
    dough.leaven.setLeavenWeight(1000);
    dough.leaven.setLeavenHydration(100);
    expect(dough.experimentalDoughVolume).toBe(2000);
  })

  it('can yield experimental dough final volume', () => {
    const dough = new Dough(presets);

    dough.water.setWaterWeight(1000);
    dough.flour.setFlourWeight(1000);
    dough.leaven.setLeavenWeight(1000);
    dough.leaven.setLeavenHydration(100);
    expect(dough.experimentalBulkVolume).toBe(dough.experimentalDoughVolume * 1.25);

    dough.water.setWaterWeight(750);
    dough.flour.setFlourWeight(1000);
    dough.leaven.setLeavenWeight(1000);
    dough.leaven.setLeavenHydration(75);
    expect(dough.experimentalBulkVolume).toBe(dough.experimentalDoughVolume * 1.30);

    dough.water.setWaterWeight(660);
    dough.flour.setFlourWeight(1000);
    dough.leaven.setLeavenWeight(1000);
    dough.leaven.setLeavenHydration(66);
    expect(dough.experimentalBulkVolume).toBe(dough.experimentalDoughVolume * 1.4);


    dough.water.setWaterWeight(601);
    dough.flour.setFlourWeight(1000);
    dough.leaven.setLeavenWeight(1000);
    dough.leaven.setLeavenHydration(61);
    expect(dough.experimentalBulkVolume).toBe(dough.experimentalDoughVolume * 1.45);

    dough.water.setWaterWeight(500);
    dough.flour.setFlourWeight(1000);
    dough.leaven.setLeavenWeight(1000);
    dough.leaven.setLeavenHydration(50);
    expect(dough.experimentalBulkVolume).toBe(dough.experimentalDoughVolume * 1.5);
  })

  it('reacts to total hydration changing by setting target hydration to it if it is not locked', () => {
    const dough = new Dough(presets);
    dough.hydration.setTargetHydration = jest.fn().mockImplementation((_: number) => { })
    expect(dough.hydration.targetHydrationLocked).toBeFalsy();
    dough.water.setWaterWeight(1000);
    expect(dough.hydration.setTargetHydration).toHaveBeenCalledWith(dough.totalHydration * 100);
  })

  it('reacts to total hydration changing but doesnt set target hydration when it was locked', () => {
    const dough = new Dough(presets);
    dough.hydration.setTargetHydration = jest.fn().mockImplementation((_: number) => { })
    dough.hydration.toggleTargetHydrationLock();
    expect(dough.hydration.targetHydrationLocked).toBeTruthy();
    dough.water.setWaterWeight(666);
    expect(dough.hydration.setTargetHydration).not.toHaveBeenCalled();
  })

  it('can multiply flour, water and leaven weigh to match target dough weight when it is set and the target hydration was locked', () => {
    const dough = new Dough(presets);
    dough.hydration.setTargetHydration(100);
    dough.hydration.toggleTargetHydrationLock();
    dough.flour.setFlourWeight(10);
    dough.water.setWaterWeight(10);
    dough.leaven.setLeavenWeight(0);

    dough.flour.setFlourWeight = jest.fn().mockImplementation((_: number) => { })
    dough.water.setWaterWeight = jest.fn().mockImplementation((_: number) => { })
    dough.leaven.setLeavenWeight = jest.fn().mockImplementation((_: number) => { })

    dough.setTargetDoughWeight(200);
    expect(dough.flour.setFlourWeight).toHaveBeenCalled();
    expect(dough.water.setWaterWeight).toHaveBeenCalled();
    expect(dough.leaven.setLeavenWeight).toHaveBeenCalledWith(0)
  })
});
