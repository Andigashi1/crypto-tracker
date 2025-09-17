import { formatMarketCap, formatPrice } from "../lib/utils";

type DataCardProps = {
    marketCap: number;
    circulatingSupply: number;
    ath: number;
    volume24h: number;
    rank: number;
};


const DataCard = ({marketCap, circulatingSupply, ath, volume24h, rank} : DataCardProps) => {
    const data = [
        {label: 'Market Cap', props: formatMarketCap(marketCap)},
        {label: 'Circulating Supply', props: formatMarketCap(circulatingSupply)},
        {label: 'All Time High', props: formatPrice(ath)},
        {label: 'Rank', props: rank},
    ]
  return (
    <div className='bg-input p-4 rounded-lg'>
        {data.map(info => (
            <div key={info.label} className='flex justify-between py-2 first:pt-0 not-last:border-b'>
                <p>{info.label}</p>
                <p>{info.props}</p>
            </div>
        ))}
    </div>
  )
}



export default DataCard as React.FC<DataCardProps>;