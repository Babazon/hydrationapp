import { Dough } from "../Dough/Dough"
import { presets } from '../../env';

describe('Dough store tests', () => {

  it('instantiates', () => {
    const dough = new Dough(presets);
    expect(dough).toBeDefined();
  })

  it('resets values', () => {
    const dough = new Dough(presets);
    dough.hydration.toggleLocked();
    expect(dough.hydration.isLocked).toBeTruthy();
    dough.resetValues();
    expect(dough.hydration.isLocked).toBeFalsy();
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
    expect(dough.doughWeight.value).toBe(1000);
    dough.leavenHydration.value = 100;
    dough.leavenHydration.isLocked = true;
    dough.hydration.value = 100;
    dough.hydration.isLocked = true;
    dough.inoculation.value = 20;
    dough.doughWeight.setValue(3000);
    expect(dough.doughWeight.value).toBe(3000);
  })

  it('can compute target baked weight', () => {
    const dough = new Dough(presets);
    dough.leavenHydration.value = 100;
    dough.leavenHydration.isLocked = true;
    dough.hydration.value = 100;
    dough.hydration.isLocked = true;
    dough.inoculation.value = 20;
    dough.doughWeight.setValue(2000);
    expect(dough.doughWeight.bakedTargetDoughWeight).toBe(2000 * 0.85)
  })

  it('can yield total hydration', () => {
    const dough = new Dough(presets);
    dough.water.setValue(1000);
    dough.flour.setValue(1000);
    dough.leavenWeight.setValue(1000);
    dough.leavenHydration.setValue(100);
    expect(dough.totalHydration).toBe(1);
  })

  it('can yield recommended salt amount', () => {
    const dough = new Dough(presets);
    dough.water.setValue(1000);
    dough.flour.setValue(1000);
    dough.leavenWeight.setValue(1000);
    dough.leavenHydration.setValue(100);
    expect(dough.recommendedSalt).toBe(1500 * 0.022)
  })

  it('can yield post bake weight approximation', () => {
    const dough = new Dough(presets);
    dough.water.setValue(1000);
    dough.flour.setValue(1000);
    dough.leavenWeight.setValue(1000);
    dough.leavenHydration.setValue(100);
    expect(dough.postBakeWeight).toBe((3000 + 1500 * 0.022) * 0.85)
  })

  it('can yield experimental dough initial volume', () => {
    const dough = new Dough(presets);
    dough.water.setValue(1000);
    dough.flour.setValue(1000);
    dough.leavenWeight.setValue(1000);
    dough.leavenHydration.setValue(100);
    expect(dough.experimentalDoughVolume).toBe(2000);
  })

  it('can yield experimental dough final volume', () => {
    const dough = new Dough(presets);

    dough.water.setValue(1000);
    dough.flour.setValue(1000);
    dough.leavenWeight.setValue(1000);
    dough.leavenHydration.setValue(100);
    expect(dough.experimentalBulkVolume).toBe(dough.experimentalDoughVolume * 1.25);

    dough.water.setValue(750);
    dough.flour.setValue(1000);
    dough.leavenWeight.setValue(1000);
    dough.leavenHydration.setValue(75);
    expect(dough.experimentalBulkVolume).toBe(dough.experimentalDoughVolume * 1.30);

    dough.water.setValue(660);
    dough.flour.setValue(1000);
    dough.leavenWeight.setValue(1000);
    dough.leavenHydration.setValue(66);
    expect(dough.experimentalBulkVolume).toBe(dough.experimentalDoughVolume * 1.4);


    dough.water.setValue(601);
    dough.flour.setValue(1000);
    dough.leavenWeight.setValue(1000);
    dough.leavenHydration.setValue(61);
    expect(dough.experimentalBulkVolume).toBe(dough.experimentalDoughVolume * 1.45);

    dough.water.setValue(500);
    dough.flour.setValue(1000);
    dough.leavenWeight.setValue(1000);
    dough.leavenHydration.setValue(50);
    expect(dough.experimentalBulkVolume).toBe(dough.experimentalDoughVolume * 1.5);
  })

  it('reacts to total hydration changing by setting target hydration to it if it is not locked', () => {
    const dough = new Dough(presets);
    dough.hydration.setValue = jest.fn().mockImplementation((_: number) => { })
    expect(dough.hydration.isLocked).toBeFalsy();
    dough.water.setValue(1000);
    expect(dough.hydration.setValue).toHaveBeenCalledWith(dough.totalHydration * 100);
  })

  it('reacts to total hydration changing but doesnt set target hydration when it was locked', () => {
    const dough = new Dough(presets);
    dough.hydration.setValue = jest.fn().mockImplementation((_: number) => { })
    dough.hydration.toggleLocked();
    expect(dough.hydration.isLocked).toBeTruthy();
    dough.water.setValue(666);
    expect(dough.hydration.setValue).not.toHaveBeenCalled();
  })

  it('can multiply flour, water and leaven weigh to match target dough weight when it is set and the target hydration was locked', () => {
    const dough = new Dough(presets);
    dough.hydration.value = 100;
    dough.inoculation.value = 20;
    dough.hydration.toggleLocked();
    dough.flour.setValue(10);
    dough.water.setValue(10);
    dough.leavenWeight.setValue(10);

    dough.flour.setValue = jest.fn().mockImplementation((_: number) => { })
    dough.water.setValue = jest.fn().mockImplementation((_: number) => { })
    dough.leavenWeight.setValue = jest.fn().mockImplementation((_: number) => { })

    dough.doughWeight.setValue(200);
    expect(dough.flour.setValue).toHaveBeenCalled();
    expect(dough.water.setValue).toHaveBeenCalled();
    expect(dough.leavenWeight.setValue).toHaveBeenCalled()
  })

  it('can adjust flour, leaven and water weights from scratch using target dough weight, hydration and inoculation', () => {

    const dough = new Dough(presets);


    // prepare
    dough.water.setValue(0);
    dough.flour.setValue(0);
    dough.leavenWeight.setValue(0);

    dough.hydration.setValue(100);
    dough.leavenHydration.setValue(100);
    dough.inoculation.value = 20;
    dough.leavenHydration.isLocked = true;
    dough.hydration.isLocked = true;

    // set required fields
    dough.doughWeight.setValue(1000);


    // set spies
    dough.flour.setValue = jest.fn().mockImplementation((_: number) => { });
    dough.leavenWeight.setValue = jest.fn().mockImplementation((_: number) => { });
    dough.water.setValue = jest.fn().mockImplementation((_: number) => { });


    // call function
    (dough as any).adjustWeightValuesForTargetDoughWeight();

    // assertion

    expect(dough.flour.setValue).toHaveBeenCalledWith(449.59985612804604);
    expect(dough.water.setValue).toHaveBeenCalledWith(449.5998561280461);
    expect(dough.leavenWeight.setValue).toHaveBeenCalledWith(89.91997122560922)
  })
});
