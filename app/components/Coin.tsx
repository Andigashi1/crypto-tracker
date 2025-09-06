import { Coin as CoinType } from "./Market";
import MiniChart from "./MiniChart";

type CoinProps = {
  coin: CoinType;
};

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  const formatMarketCap = (value: number) => {
  if (value >= 1_000_000_000_000) {
    return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
  } else if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  } else if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  } else if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}K`;
  }
  return `$${value}`;
};

const formatPercentage = (value: number) => `${value.toFixed(2)}%`;

const Coin = ({ coin }: CoinProps) => {

  return (
    <tr className="hover:bg-white/10">
      <td className="flex items-center gap-4 py-2 lg:pl-2">
        <img src={coin.image} alt={coin.name} width={32} />
        <div>
          <p>{coin.name}</p>
          <p className="uppercase">{coin.symbol}</p>
        </div>
      </td>
      <td className="max-lg:text-right">
        <div className="max-lg:flex flex-col items-end">
          <span>{formatPrice(coin.current_price)}</span>
          <span
            className={`text-sm ${
              coin.price_change_percentage_24h >= 0
                ? "text-green-500"
                : "text-red-500"
            } lg:hidden`}
          >
            {coin.price_change_percentage_24h}%
          </span>
        </div>
      </td>
      <td
        className={`${
          coin.price_change_percentage_24h >= 0
            ? "text-green-500"
            : "text-red-500"
        } max-lg:hidden`}
      >
        {coin.price_change_percentage_24h}%
      </td>
      <td className="max-lg:hidden">
        <MiniChart data={coin.sparkline_in_7d?.price || []} />
      </td>
      <td className="max-lg:hidden">{formatMarketCap(coin.market_cap)}</td>
      <td className="max-lg:hidden">{formatPrice(coin.ath)}</td>
      <td className="text-right pr-2 max-lg:hidden">{coin.market_cap_rank}</td>
    </tr>
  );
};

export default Coin;
