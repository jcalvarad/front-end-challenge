import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { toJS, autorun } from "mobx";
import axios from "axios";
import CandleChart from "../../components/candle_chart/CandleChart";
import theme from "./Charts.module.css";

@inject("CandlesStore")
@inject("BooksStore")
@observer
class ChartsContainer extends Component {
  constructor(props) {
    super(props);
    const { CandlesStore, BooksStore } = props;
    autorun(() => {
      axios
        .get(`https://cors-anywhere.herokuapp.com/https://bitso.com/trade/chartJSON/${BooksStore.book}/${CandlesStore.selectedPeriod}`)
        .then(function(response) {
          CandlesStore.setCandlesChart(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }

  render() {
    const { CandlesStore, BooksStore } = this.props;
    const { setPeriod, selectedPeriod } = CandlesStore;

    return (
      <div className={theme.charts}>
        <CandleChart candles={toJS(CandlesStore.candles)} volume={toJS(CandlesStore.volume)} setPeriod={setPeriod} selectedPeriod={toJS(selectedPeriod)} />
      </div>
    );
  }
}

export default ChartsContainer;
