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



})
