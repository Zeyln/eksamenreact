import { useEffect, useState, useRef } from 'react';

export default function BitcoinDB() { // written with the help of Claude.ai and chatgpt.com
    const [data, setData] = useState({ p: 0, s: '', q: 0 });
    const [updata, setUpdata] = useState(0)
    const [marketstatus, setMarketstatus] = useState('')
    const updateCount = useRef(0);
    const startPrice = useRef(null);
    const endPrice = useRef(null);

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
            if (updateCount.current >= 100) {
                updateCount.current = 0;
                endPrice.current = newData.p;

                if (startPrice.current > endPrice.current) {
                    setMarketstatus('↓');

                }
                else {
                    setMarketstatus('↑');
                };
            };



        };

        socket.onclose = () => {
            console.log("Disconnected");

        };

        return () => socket.close();
    }, []);

    return (
        <div className="btc-market-dashboard">
            <div className="btc-units">
                <p id="btc-currency">Currency: {data.s}</p>
                <p id="btc-pricing">price: USD$ {Math.trunc(data.p)}</p>
                <p id="btc-quantity">quantity 60s: {data.q}</p>

            </div>
            <div className="market-trend">
                <p id="market-trend-indicator">{marketstatus}</p>
            </div>
        </div>
    );
}
