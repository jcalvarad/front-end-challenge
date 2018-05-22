import { observable, action } from 'mobx';

const websocket = new WebSocket('wss://ws.bitso.com');

websocket.onopen = function () {
    websocket.send(JSON.stringify({ action: 'subscribe', book: 'btc_mxn', type: 'trades' }));
};

export class TradesStore {

    @observable 
    trades = [];
    
    @action
    getTrades = message => {
        var data = JSON.parse(message.data);
        var now = new Date();

        if (data.type === 'trades' && data.payload) {
            const wspayload = data.payload[0];
            this.trades.push({
                time: now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds(),
                rate: wspayload.r,
                amount:wspayload.a
            });
            console.log(data);
        } else {
            console.log("error", data);
        }
    }
}