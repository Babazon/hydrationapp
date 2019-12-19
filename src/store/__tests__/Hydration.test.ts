import { Dough } from "../Dough"
import { presets } from "../../env";

describe('Hydration store tests', () => {
  let dough: Dough;

  beforeEach(() => {
    dough = new Dough(presets);
  })

  it('can set target hydration', () => {
    expect(dough.hydration.targetHydration).toBe(75);
    dough.hydration.setTargetHydration(99);
    expect(dough.hydration.targetHydration).toBe(99);
  })


  it('yields min target hydration from app presets', () => {
    expect(dough.hydration.minTargetHydration).toEqual(presets.minTargetHydration);
  })

  it('yields max target hydration from app presets', () => {
    expect(dough.hydration.maxTargetHydration).toEqual(presets.maxTargetHydration);
  })

  it('can lock target hydration in place', () => {
    expect(dough.hydration.targetHydrationLocked).toBeFalsy();
    dough.hydration.toggleTargetHydrationLock();
    expect(dough.hydration.targetHydrationLocked).toBeTruthy();
  })

  it('invokes callback to match water to target hydration when the lock is toggled', () => {
    dough.water.setWaterWeight = jest.fn().mockImplementation((_: number) => {
    });
    expect(dough.hydration.targetHydrationLocked).toBeFalsy();
    dough.hydration.toggleTargetHydrationLock();
    expect(dough.hydration.targetHydrationLocked).toBeTruthy();
    expect(dough.water.setWaterWeight).toHaveBeenCalled();
  })


})
