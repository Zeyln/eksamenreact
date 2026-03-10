import { useEffect, useState, useRef } from 'react';

export default function BitcoinDB() { // written with the help of Claude.ai and chatgpt.com
    const [data, setData] = useState({ p: 0, s: '', q: 0 });
    const [updata, setUpdata] = useState(0);
    const [marketStatus, setMarketStatus] = useState('');
    const updateCount = useRef(0);
    const startPrice = useRef(null);
    const endPrice = useRef(null);
    const priceDiff = useRef(null);
    let percentageLoaded = '';

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

                if (startPrice.current > endPrice.current) {
                    setMarketStatus('⏷');
                    priceDiff.current = ((startPrice.current - endPrice.current) / endPrice.current) * 100;

                }
                else {
                    setMarketStatus('⏶');
                    priceDiff.current = ((start.current - endPrice.current) / startPrice.current) * 100;
                };
            };

        };

        socket.onclose = () => {
            console.log("Disconnected");

        };

        return () => socket.close();
    }, []);

    return (
        <div className="grid-rows-2 grid-cols-none rounded text-white">
            <div className="bg-black">
                <ol>
                    <li><p className="bg-gray-600">Currency: {data.s}</p></li>
                    <li><p className="">price: USD$ {Math.trunc(data.p)}</p></li>
                    <li><p className="">quantity 60s: {data.q}</p></li>
                </ol>

            </div>
            <div className="bg-black">
                <p className="text-green">{priceDiff.current}%</p>
                <p className="text-green">{marketStatus}</p>
            </div>
        </div>
    );
}
