import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

const StockTicker: React.FC = () => {
  const [stockData, setStockData] = useState<StockData[]>([
    { symbol: 'SENSEX', price: 66589.93, change: 234.12, changePercent: 0.35 },
    { symbol: 'NIFTY', price: 19674.25, change: -45.32, changePercent: -0.23 },
    { symbol: 'BANKNIFTY', price: 44251.15, change: 125.67, changePercent: 0.28 },
    { symbol: 'RELIANCE', price: 2456.80, change: 12.45, changePercent: 0.51 },
    { symbol: 'TCS', price: 3542.10, change: -18.90, changePercent: -0.53 },
    { symbol: 'INFY', price: 1456.25, change: 23.75, changePercent: 1.66 },
    { symbol: 'HDFCBANK', price: 1634.50, change: 8.20, changePercent: 0.50 },
    { symbol: 'ICICIBANK', price: 987.35, change: -5.45, changePercent: -0.55 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStockData(prevData =>
        prevData.map(stock => ({
          ...stock,
          price: stock.price + (Math.random() - 0.5) * 10,
          change: (Math.random() - 0.5) * 50,
          changePercent: (Math.random() - 0.5) * 2
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-blue-900 text-white py-2 sm:py-3 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex">
        {stockData.map((stock, index) => (
          <div key={index} className="inline-flex items-center mx-4 sm:mx-8">
            <span className="font-semibold text-xs sm:text-sm">{stock.symbol}</span>
            <span className="mx-1 sm:mx-2 text-xs sm:text-sm">₹{stock.price.toFixed(2)}</span>
            <div className="flex items-center">
              {stock.change >= 0 ? (
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 mr-1" />
              )}
              <span className={`text-xs sm:text-sm ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockTicker;