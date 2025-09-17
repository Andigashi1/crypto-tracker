"use client";

import { useState } from "react";
import { formatPrice } from "../lib/utils";
import { ArrowDownUp } from "lucide-react";

const Convert = ({ price, symbol }: { price: number; symbol: string }) => {
  const [quantity, setQuantity] = useState(1);
  const [priceUSD, setPriceUSD] = useState(price);
  const [isSwapped, setIsSwapped] = useState(false);

  const calculatePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Handle empty input - clear both values
    if (inputValue === "") {
      setQuantity(0);
      setPriceUSD(0);
      return;
    }

    const value = Number(inputValue);
    
    // Handle invalid numbers
    if (isNaN(value)) {
      return;
    }

    if (!isSwapped) {
      setQuantity(value);
      setPriceUSD(value * price);
    } else {
      setPriceUSD(value);
      setQuantity(value / price);
    }
  };

  return (
    <div className="bg-input rounded-lg p-4 flex flex-col gap-2 relative">
      <button
        onClick={() => setIsSwapped(!isSwapped)}
        className="absolute z-10 top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 cursor-pointer"
      >
        <ArrowDownUp className="bg-input rounded-full p-2 w-10 h-10" />
      </button>

      <div className="relative">
        <input
          type={!isSwapped ? "number" : "text"}
          value={!isSwapped ? (quantity === 0 ? "" : quantity) : (priceUSD === 0 ? "" : priceUSD)}
          onChange={calculatePrice}
          className="bg-[#292929] w-full py-2 px-4 rounded-full [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                           [-moz-appearance:textfield]"
        />
        <span className="absolute uppercase top-2 right-6">{!isSwapped ? symbol : 'USD'}</span>
      </div>

      <div className="relative w-full">
        <p className="bg-[#292929] w-full py-2 px-4 rounded-full">
          {!isSwapped ? formatPrice(priceUSD) : quantity}
        </p>
        <span className="absolute uppercase top-2 right-6">{isSwapped ? symbol : 'USD'}</span>
      </div>
    </div>
  );
};

export default Convert;