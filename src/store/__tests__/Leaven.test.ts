import { Dough } from "../Dough"
import { presets } from "../../env";

describe('Leaven store tests', () => {

  let dough: Dough;

  beforeEach(() => {
    dough = new Dough(presets);
  })

  it('sets leaven weight', () => {
    expect(dough.leaven.weight).toBe(200);
    dough.leaven.setWeight(666);
    expect(dough.leaven.weight).toBe(666);
  })

  it('sets leaven hydration', () => {
    expect(dough.leaven.leavenHydration).toBe(100);
    dough.leaven.setLeavenHydration(50);
    expect(dough.leaven.leavenHydration).toBe(50);
  })

  it('sets leaven value lock', () => {
    expect(dough.leaven.isLocked).toBeFalsy();
    dough.leaven.toggleLocked()
    expect(dough.leaven.isLocked).toBeTruthy();
  })

  it('yieds flour weight of leaven based on hydration', () => {
    dough.leaven.setWeight(1000);
    dough.leaven.setLeavenHydration(100);
    expect(dough.leaven.leavenFlour).toBe(500);
  })

  it('yieds water weight of leaven based on hydration', () => {
    dough.leaven.setWeight(1000);
    dough.leaven.setLeavenHydration(100);
    expect(dough.leaven.leavenWater).toBe(500);
  })

  it('yields min leaven from app presets', () => {
    expect(dough.leaven.minLeaven).toEqual(presets.minLeaven);
  })

  it('yields min leaven hydration from app presets', () => {
    expect(dough.leaven.minLeavenHydration).toEqual(presets.minLeavenHydration);
  })

  it('yields max leaven from app presets', () => {
    expect(dough.leaven.maxLeaven).toEqual(presets.maxLeaven);
  })

  it('yields max leaven hydration from app presets', () => {
    expect(dough.leaven.maxLeavenHydration).toEqual(presets.maxLeavenHydration);
  })

  it('can set leaven weight via inoculation percentage based on flour in dough', () => {
    dough.flour.setWeight(1000);
    dough.leaven.setLeavenWeightUsingInoculation(20);
    expect(dough.leaven.weight).toBe(200);
  })


  it('yields inoculation of leaven based on its weight and the weight of flour', () => {
    dough.flour.setWeight(1000);
    dough.leaven.setWeight(490);
    expect(dough.leaven.inoculation).toBe(49)
  })


})
