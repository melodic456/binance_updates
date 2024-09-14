const api = require('@marcius-capital/binance-api')

async function save_by_pair(item) {
   await fetch('http://localhost:3000/api/save', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({name: item.symbol, value: item.price}),
                    })
                        .then(response => {
                            if (response.ok) {
                                console.log('Data saved successfully!');
                            } else {
                                console.error('Error saving data:', response.statusText);
                            }
                        });
}
// const symbols = ['btcusdt', 'ethusdt', 'ltcusdt', 'xrpusdt', 'bchusdt', 'dogeusdt', 'bnbusdt', 'trxusdt', 'polusdt'];
const symbols = ['btcusdt', 'ethusdt', 'ltcusdt', 'xrpusdt', 'bchusdt', 'dogeusdt', 'bnbusdt', 'trxusdt', 'polusdt', 'tonusdt', 'wavesusdt'];

symbols.forEach((symbol) => {
  api.stream.aggTrade(symbol, (cb) => save_by_pair(cb));
});

setTimeout(() => {
    api.stream.close.all()
}, 5000)



async function updateData(item) {
    console.log(item.symbol, item.price)
    await fetch('http://localhost:3000/api/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: item.symbol, value: item.price}),
    }).then(response2 => {
        if (response2.ok) {
            console.log('Value updated successfully!');
        } else {
            console.error('Error updating value:', response2.statusText);
        }
            });
}

setInterval(() => {
    api.stream.aggTrade('btcusdt', cb => updateData(cb))
    api.stream.aggTrade('ethusdt', cb => updateData(cb))
    api.stream.aggTrade('ltcusdt', cb => updateData(cb))
    api.stream.aggTrade('xrpusdt', cb => updateData(cb))
    api.stream.aggTrade('bchusdt', cb => updateData(cb))
    api.stream.aggTrade('dogeusdt', cb => updateData(cb))
    api.stream.aggTrade('bnbusdt', cb => updateData(cb))
    // api.stream.aggTrade('usdt', cb => updateData(cb))
    api.stream.aggTrade('trxusdt', cb => updateData(cb))
    api.stream.aggTrade('polusdt', cb => updateData(cb))

setTimeout(() => {
    api.stream.close.all()
}, 2000)
}, 10000)

// api.stream.close.all()
