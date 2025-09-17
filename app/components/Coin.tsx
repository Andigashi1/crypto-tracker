import { Coin as CoinType } from "./Market";
import MiniChart from "./MiniChart";
import Link from "next/link";
import { formatPrice, formatMarketCap, formatPercentage } from "../lib/utils";

type CoinProps = {
  coin: CoinType;
};


const Coin = ({ coin }: CoinProps) => {
  return (
    <tr className="hover:bg-white/10 cursor-pointer">
      <td className="flex items-center gap-4 py-2">
        <Link href={`/${coin.id}`} className="flex items-center gap-4">
          <img src={coin.image} alt={coin.name} width={32} />
          <div>
            <p>{coin.name}</p>
            <p className="uppercase">{coin.symbol}</p>
          </div>
        </Link>
      </td>

      <td className="max-lg:text-right">
        <div className="max-lg:flex flex-col items-end">
          <Link href={`/${coin.id}`}>
            <span>{formatPrice(coin.current_price)}</span>
          </Link>
          <span
            className={`text-sm ${
              coin.price_change_percentage_24h >= 0
                ? "text-green-500"
                : "text-red-500"
            } lg:hidden`}
          >
            {formatPercentage(coin.price_change_percentage_24h)}
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
        {formatPercentage(coin.price_change_percentage_24h)}
      </td>

      <td className="max-lg:hidden">
        <Link href={`/markets/${coin.id}`}>
          <MiniChart data={coin.sparkline_in_7d?.price || []} />
        </Link>
      </td>

      <td className="max-lg:hidden">
        <Link href={`/markets/${coin.id}`}>{formatMarketCap(coin.market_cap)}</Link>
      </td>

      <td className="max-lg:hidden">
        <Link href={`/markets/${coin.id}`}>{formatPrice(coin.ath)}</Link>
      </td>

      <td className="text-right pr-2 max-lg:hidden">
        <Link href={`/markets/${coin.id}`}>{coin.market_cap_rank}</Link>
      </td>
    </tr>
  );
};

export default Coin;
