import Convert from "../components/Convert";
import DataCard from "../components/DataCard";
import MiniChart from "../components/MiniChart";
import { formatPrice, formatPercentage } from "../lib/utils";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`,
    { next: { revalidate: 60 } }
  );

  const data = await res.json();
  return (
    <div className="space-y-6 max-lg:mb-20 container mx-auto">
      <div className="mt-10 font-bold">
        <p className="text-2xl">{data.name}</p>
        <p className="uppercase">{data.symbol}</p>
      </div>

      {/* Chart */}
      <div className="lg:flex justify-center gap-6 space-y-6">
        <div className="bg-input rounded-lg p-4 w-full">
          <div>
            <p className="text-4xl font-bold">
              {formatPrice(data.market_data.current_price.usd)}
            </p>
            <p
              className={`${
                data.market_data.price_change_percentage_24h > 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {formatPercentage(data.market_data.price_change_percentage_24h)}
            </p>
          </div>
          <MiniChart data={data.market_data.sparkline_7d.price} />
        </div>
        {/* Converter */}
        <div className="space-y-6 lg:min-w-1/4">
          <Convert
            price={data.market_data.current_price.usd}
            symbol={data.symbol}
          />
          {/* Other data */}
          <DataCard
            marketCap={data.market_data.market_cap.usd}
            circulatingSupply={data.market_data.circulating_supply}
            ath={data.market_data.ath.usd}
            volume24h={data.market_data.total_volume.usd}
            rank={data.market_cap_rank}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
