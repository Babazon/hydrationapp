import { Dough } from "../Dough/Dough"
import { presets } from "../../env";

describe('Water store tests', () => {
  let dough: Dough;

  beforeEach(() => {
    dough = new Dough(presets);
  })

  it('can set water weight', () => {
    expect(dough.water.value).toBe(725);
    dough.water.setValue(1000);
    expect(dough.water.value).toBe(1000);
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
    dough.flour.setValue(1000);
    dough.leavenWeight.setValue(1000);
    dough.leavenHydration.setValue(100);
    dough.hydration.setValue(100);
    expect(dough.water.waterValueToMatchTargetHydration).toBe(1000);
  })





})
