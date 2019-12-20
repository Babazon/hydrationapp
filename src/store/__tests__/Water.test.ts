import { Dough } from "../Dough"
import { presets } from "../../env";

describe('Water store tests', () => {
  let dough: Dough;

  beforeEach(() => {
    dough = new Dough(presets);
  })

  it('can set water weight', () => {
    expect(dough.water.weight).toBe(725);
    dough.water.setWeight(1000);
    expect(dough.water.weight).toBe(1000);
  })

  it('can lock and unlock water weight input', () => {
    expect(dough.water.isLocked).toBeFalsy();
    dough.water.toggleLocked();
    expect(dough.water.isLocked).toBeTruthy();
  })

  it('can yield minimum water weight from presets', () => {
    expect(dough.water.minWater).toEqual(presets.minWater);
  })

  it('can yield maximum water weight from presets', () => {
    expect(dough.water.maxWater).toEqual(presets.maxWater);
  })

  it('can yield the required water to match target hydration based on flour and leaven values', () => {
    dough.flour.setWeight(1000);
    dough.leaven.setWeight(1000);
    dough.leaven.setLeavenHydration(100);
    dough.hydration.setTargetHydration(100);
    expect(dough.water.waterWeightToMatchTargetHydration).toBe(1000);
  })





})
