import Coin from "./Coin";
import MiniChart from "./MiniChart";

export type Coin = {
  id: string;
  symbol: string;
  name: string;
  market_cap: number;
  market_cap_rank: number;
  current_price: number;
  image: string;
  price_change_percentage_24h: number;
  ath: number;
  sparkline_in_7d?: {
    price: number[];
  };
};

const Market = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true"
,
    {
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-moSedeMvAokQaSbgGW5Py59Z",
      },
    }
  );

  const coins: Coin[] = await res.json();
  return (
    <div className="px-8">
      <h1>All Coins</h1>
      <table className="w-full table-fixed">
        <thead className="">
          <tr className="text-left w-full">
            <th className="">Name</th>
            <th className="max-lg:text-right">Price</th>
            <th className="max-lg:hidden">Change 24h</th>
            <th className="max-lg:hidden">Last 24h</th>
            <th className="max-lg:hidden">Market Cap</th>
            <th className="max-lg:hidden">ATH Price</th>
            <th className="text-right w-10 max-lg:hidden">Rank</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin: Coin) => (
              <Coin key={coin.id} coin={coin}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Market;
