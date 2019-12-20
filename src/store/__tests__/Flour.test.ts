import { Dough } from "../Dough"
import { presets } from "../../env";

describe('Flour store tests', () => {

  let dough: Dough;

  beforeEach(() => {
    dough = new Dough(presets);

  })


  it('sets flour weight', () => {
    expect(dough.flour.weight).toBe(1000);
    dough.flour.setWeight(666);
    expect(dough.flour.weight).toBe(666);
  })

  it('locks and unlocks flour input', () => {
    expect(dough.flour.isLocked).toBeFalsy();
    dough.flour.toggleLocked();
    expect(dough.flour.isLocked).toBeTruthy()
  })


  it('yields min flour from presets', () => {
    expect(dough.flour.minFlour).toEqual(presets.minFlour);
  })

  it('yields max flour from presets', () => {
    expect(dough.flour.maxFlour).toEqual(presets.maxFlour);
  })

  it('yields the flour weight to satisfy target hydration on water weight change', () => {
    dough.water.setWeight(1000);
    dough.leaven.setWeight(1000);
    dough.leaven.setLeavenHydration(100);
    dough.hydration.setTargetHydration(100);

    expect(dough.flour.flourWeightToMatchTargetHydration).toBe(1000);
  })


})
