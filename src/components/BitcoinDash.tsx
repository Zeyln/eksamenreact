import { useEffect, useState, useRef } from 'react';

export default function BitcoinDB() { // written with the help of Claude.ai and chatgpt.com
    const [data, setData] = useState({ p: 0, s: '', q: 0 });
    const [updata, setUpdata] = useState(0);
    const [marketDirection, setMarketDirection] = useState('');
    const updateCount = useRef(0);
    const startPrice = useRef(null);
    const endPrice = useRef(null);
    const priceDiff = useRef('');

    useEffect(() => {
        const socket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

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
        <div className="flex flex-row">
            <div className="bg-black text-white">
                <ol>
                    <li><p className="bg-gray-600">Currency: {data.s}</p></li>
                    <li><p className="">Price: USD$ {Math.trunc(data.p)}</p></li>
                    <li><p className="">Live Transactions: {data.q}</p></li>
                </ol>

            </div>
            <div className="flex flex-row bg-black text-green-400 justify-center">
                <p className="">{priceDiff.current} % </p>
                <p className="">{marketDirection}</p>
            </div>
        </div>
    );
}
