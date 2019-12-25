import { action, observable } from 'mobx';

export interface IPersistence {
  flour: number;
  water: number;
  leavenWeight: number;
  leavenHydration: number;
  hydration: number;
  doughWeight: number;
  inoculation: number;
}

export class PersistenceModel implements IPersistence {
  @observable public flour: number;
  @observable public water: number;
  @observable public leavenWeight: number;
  @observable public leavenHydration: number;
  @observable public hydration: number;
  @observable public doughWeight: number;
  @observable public inoculation: number;

  @action public static deserialize(data: IPersistence) {
    const model = new PersistenceModel();

    model.flour = data.flour;
    model.water = data.water;
    model.leavenHydration = data.leavenHydration;
    model.leavenWeight = data.leavenWeight;
    model.hydration = data.hydration;
    model.doughWeight = data.doughWeight;
    model.inoculation = data.inoculation;

    return model;
  }

  public serialize = () => {
    return JSON.stringify(this);
  }
}
