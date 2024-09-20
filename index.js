const api = require('@marcius-capital/binance-api')

async function save_by_pair(item) {
   try {
       await fetch('http://195.7.6.213:3000/api/save', {
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
   } catch (error) {
       console.error('Error saving data:', error);
   }
}
// const symbols = ['btcusdt', 'ethusdt', 'ltcusdt', 'xrpusdt', 'bchusdt', 'dogeusdt', 'bnbusdt', 'trxusdt', 'polusdt'];
const symbols = ['btcusdt', 'ethusdt', 'ltcusdt', 'xrpusdt', 'bchusdt', 'dogeusdt', 'bnbusdt', 'trxusdt', 'polusdt', 'tonusdt', 'wavesusdt'];

symbols.forEach((symbol) => {
  try {
      api.stream.aggTrade(symbol, (cb) => save_by_pair(cb));
  } catch (error) {
      console.error(`Error streaming ${symbol}:`, error);
  }
});

setTimeout(() => {
    try {
        api.stream.close.all()
    } catch (error) {
        console.error('Error closing streams:', error);
    }
}, 5000)



async function updateData(item) {
    console.log(item.symbol, item.price)
    try {
        await fetch('http://195.7.6.213:3000/api/update', {
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
    } catch (error) {
        console.error('Error updating value:', error);
    }
}

setInterval(() => {
    try {
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
            try {
                api.stream.close.all()
            } catch (error) {
                console.error('Error closing streams:', error);
            }
        }, 2000)
    } catch (error) {
        console.error('Error streaming data:', error);
    }
}, 10000)

// api.stream.close.all()
