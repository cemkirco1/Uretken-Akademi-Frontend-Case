import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataList from './companents/DataList';
import Navi from './companents/Navi';

function App() {
  const [coins, setCoins] = useState([]); // Değişken tanımlaması
  const [search, setSearch] = useState(''); // Değişken tanımlaması

  useEffect(() => { // useEffect ile componentDidMount ve componentDidUpdate işlemlerini yapıyoruz.
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data);
        
      })
      .catch(err => {
        console.log(err);
      })
  });

  const handleChange = (e) => { // Search input'unun değeri değiştiğinde çalışacak fonksiyon.
    setSearch(e.target.value);
  }

  const filteredCoins = coins.filter(coin => { // Search input'unun değeri ile filtreleme işlemi yapılıyor.
    return coin.name.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-amber-400">
    <Navi 
    handleChange={handleChange}
    />

      {filteredCoins.map(coin => { // Coin component'i çağırıyoruz. 
        return (
          
          <DataList
            key={coin.id} // key prop'ününün değeri coin.id olarak belirliyoruz.
            name={coin.name} // name prop'ününün değeri coin.name olarak belirliyoruz.
            image={coin.image} // image prop'ününün değeri coin.image olarak belirliyoruz.
            symbol={coin.symbol} // symbol prop'ününün değeri coin.symbol olarak belirliyoruz.
            price={coin.current_price} // price prop'ününün değeri coin.current_price olarak belirliyoruz.
            marketcap={coin.market_cap} // volume prop'ününün değeri coin.market_cap olarak belirliyoruz.
            priceChange={coin.price_change_percentage_24h} // priceChange prop'ününün değeri coin.price_change_percentage_24h olarak belirliyoruz.
            volume={coin.total_volume} // marketcap prop'ününün değeri coin.market_cap olarak belirliyoruz.
          />
        )
      })}
    </div>
  );
}

export default App;