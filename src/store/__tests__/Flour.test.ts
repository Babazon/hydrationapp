import { Dough } from "../Dough"
import { presets } from "../../env";

describe('Flour store tests', () => {

  let dough: Dough;

  beforeEach(() => {
    dough = new Dough(presets);

  })


  it('sets flour weight', () => {
    expect(dough.flour.flourWeight).toBe(1000);
    dough.flour.setFlourWeight(666);
    expect(dough.flour.flourWeight).toBe(666);
  })

  it('locks and unlocks flour input', () => {
    expect(dough.flour.flourLocked).toBeFalsy();
    dough.flour.toggleFlourLock();
    expect(dough.flour.flourLocked).toBeTruthy()
  })


  it('yields min flour from presets', () => {
    expect(dough.flour.minFlour).toEqual(presets.minFlour);
  })

  it('yields max flour from presets', () => {
    expect(dough.flour.maxFlour).toEqual(presets.maxFlour);
  })

  it('yields the flour weight to satisfy target hydration on water weight change', () => {
    dough.water.setWaterWeight(1000);
    dough.leaven.setLeavenWeight(1000);
    dough.leaven.setLeavenHydration(100);
    dough.hydration.setDesiredTargetHydration(100);

    expect(dough.flour.flourWeightToMatchDesiredTargetHydration).toBe(1000);
  })


})
