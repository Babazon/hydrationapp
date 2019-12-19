import { Dough } from "../Dough"
import { presets } from "../../env";

describe('Hydration store tests', () => {
  let dough: Dough;

  beforeEach(() => {
    dough = new Dough(presets);
  })

  it('can set target hydration', () => {
    expect(dough.hydration.targetHydration).toBe(75);

  })
})
