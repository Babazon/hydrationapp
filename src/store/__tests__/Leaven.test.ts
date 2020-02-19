import { Dough } from "../Dough/Dough"
import { presets } from "../../env";

describe('Leaven store tests', () => {

  let dough: Dough;

  beforeEach(() => {
    dough = new Dough(presets);
  })

  it('sets leaven weight', () => {
    expect(dough.leavenWeight.value).toBe(200);
    dough.leavenWeight.setValue(666);
    expect(dough.leavenWeight.value).toBe(666);
  })

  it('sets leaven hydration', () => {
    expect(dough.leavenHydration.value).toBe(100);
    dough.leavenHydration.setValue(50);
    expect(dough.leavenHydration.value).toBe(50);
  })

  it('sets leaven value lock', () => {
    expect(dough.leavenWeight.isLocked).toBeFalsy();
    dough.leavenWeight.toggleLocked()
    expect(dough.leavenWeight.isLocked).toBeTruthy();
  })

  it('yieds flour weight of leaven based on hydration', () => {
    dough.leavenWeight.setValue(1000);
    dough.leavenHydration.setValue(100);
    expect(dough.leavenWeight.leavenFlour).toBe(500);
  })

  it('yieds water weight of leaven based on hydration', () => {
    dough.leavenWeight.setValue(1000);
    dough.leavenHydration.setValue(100);
    expect(dough.leavenWeight.leavenWater).toBe(500);
  })

  it('yields min leaven from app presets', () => {
    expect(dough.leavenWeight.minLeaven).toEqual(presets.minLeaven);
  })

  it('yields min leaven hydration from app presets', () => {
    expect(dough.leavenHydration.minLeavenHydration).toEqual(presets.minLeavenHydration);
  })

  it('yields max leaven from app presets', () => {
    expect(dough.leavenWeight.maxLeaven).toEqual(presets.maxLeaven);
  })

  it('yields max leaven hydration from app presets', () => {
    expect(dough.leavenHydration.maxLeavenHydration).toEqual(presets.maxLeavenHydration);
  })

  it('can set leaven weight via inoculation percentage based on flour in dough', () => {
    dough.flour.setValue(1000);
    dough.leavenWeight.setLeavenValueUsingInoculation(20);
    expect(dough.leavenWeight.value).toBe(200);
  })


  it('yields inoculation of leaven based on its weight and the weight of flour', () => {
    dough.flour.setValue(1000);
    dough.leavenWeight.setValue(490);
    expect(dough.leavenWeight.inoculation).toBe(49)
  })


})
