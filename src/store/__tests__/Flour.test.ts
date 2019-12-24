import { Dough } from "../Dough"
import { presets } from "../../env";

describe('Flour store tests', () => {

  let dough: Dough;

  beforeEach(() => {
    dough = new Dough(presets);

  })


  it('sets flour weight', () => {
    expect(dough.flour.value).toBe(1000);
    dough.flour.setValue(666);
    expect(dough.flour.value).toBe(666);
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
    dough.water.setValue(1000);
    dough.leavenWeight.setValue(1000);
    dough.leavenHydration.setValue(100);
    dough.hydration.setValue(100);

    expect(dough.flour.flourValueToMatchTargetHydration).toBe(1000);
  })


})
