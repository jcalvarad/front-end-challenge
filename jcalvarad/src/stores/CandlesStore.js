import { observable, action } from "mobx";

export class CandlesStore {
  constructor(appStore) {
    this.appStore = appStore;
  }

  @observable candles = [];
  @observable candlesPeriods = [];
  @observable selectedPeriod = "1month";
  @observable volume = [];

  @action
  setCandlesChart = message => {
    this.candles = message.data.map(c => {
      return [new Date(c.date).getTime(), parseFloat(c.open), parseFloat(c.high), parseFloat(c.low), parseFloat(c.close)];
    });

    this.volume = message.data.map(c => {
      return [new Date(c.date).getTime(), parseFloat(c.volume)];
    });
  };

  @action
  setPeriod = period => {
    this.selectedPeriod = period;
  };
}
