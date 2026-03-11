import { useEffect, useState, useRef } from 'react';

// written with the help of Claude.ai and chatgpt.com
export default function EthereumDB() {
    const [data, setData] = useState({ p: 0, s: '', q: 0 });
    const [marketDirection, setMarketDirection] = useState('');
    const updateCount = useRef(0);
    const startPrice = useRef(0);
    const endPrice = useRef(0);
    const priceDiff = useRef('');

    // the fetch, message, and close structure of this useEffect hook have been made with the help of chatgpt.com
    useEffect(() => {
        const socket = new WebSocket("wss://stream.binance.com:9443/ws/ethusdt@trade");

        socket.onopen = () => {
            console.log("You have connected to the Bitcoin WebSocket");
        };

        socket.onmessage = (event) => {
            const newData = JSON.parse(event.data);
            // console.log({
            //     price: newData.p,
            //     type: newData.s,
            //    quantity: newData.q
            // });

            if (updateCount.current === 0) {
                startPrice.current = newData.p;
            };

            setData({
                p: newData.p,
                s: newData.s,
                q: newData.q
            });

            updateCount.current += 1;
            console.log(updateCount.current);
            if (updateCount.current >= 500) {
                updateCount.current = 0;
                endPrice.current = newData.p;

                // formula can be used for both instances, thanks to claude.ai for teaching me math.
                const updatePerc = ((endPrice.current - startPrice.current) / startPrice.current) * 100;

                if (startPrice.current > endPrice.current) {
                    setMarketDirection('⏷');
                    // toFixed() is so much better than "* 100 / 100", will never be doing that again...
                    priceDiff.current = `${updatePerc.toFixed(2)}`;
                } else {
                    setMarketDirection('⏶');
                    priceDiff.current = `+${updatePerc.toFixed(2)}`;
                };
            };

        };

        socket.onclose = () => {
            console.log("Disconnected");

        };

        return () => socket.close();
    }, []);

    return (
        // All the CSS elements in this return statement are Tailwindcss, and i have gotten them from the Tailwind Docs.
        <div className="grid grid-cols-2 grid-rows-2 w-fit h-fit align-center m-4 shadow-lx ring-2 ring-blue-500 bg-black">
            <div className="grid grid-cols-1 grid-rows-3 text-white p-2">
                <div className="grid grid-cols-2 col-span-1 grid-rows-1 items-center h-10 bg-gray-500">
                    <h2 className="">Currency:</h2><h2 className="">{data.s}</h2>
                </div>
                <div className="grid grid-cols-2 grid-rows-1 items-center bg-gray-800 h-10">
                    <p className="">Price: USD$</p><p className="">{Math.trunc(data.p)}</p>
                </div>
                <div className="grid grid-cols-2 grid-rows-1 items-center bg-gray-800 h-10">
                    <p className="">Live Transactions:</p><p>{data.q}</p>
                </div>

            </div>
            <div className="grid grid-cols-2 flex flex-row items-center text-green-400 p-2">
                <p className="">{priceDiff.current} % </p>
                <p className="">{marketDirection}</p>
            </div>
        </div>
    );
}
