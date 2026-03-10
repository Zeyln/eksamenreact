import { useEffect, useState } from 'react';

export default function PullStocks() {
    const [data, setData] = useState({ p: 0, s: '', q: 0 });
    useEffect(() => {
        const socket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

        socket.onopen = () => {
            console.log("You have connected to the Massive WebSocket");
        };

        socket.onmessage = (event) => {
            const newData = JSON.parse(event.data);
            console.log({
                price: newData.p,
                type: newData.s,
                quantity: newData.q
            });

            setData({
                p: newData.p,
                s: newData.s,
                q: newData.q
            });

        };

        socket.onclose = () => {
            console.log("Disconnected");

        };

        return () => socket.close();
    }, []);

    return (
        <div className="btc-stock-units">
            <p id="btc-currency">Currency: {data.s}</p>
            br
            <p id="btc-pricing">price: {data.p}</p>
            <p id="btc-quantity">amount traded: {data.q}</p>

        </div>

    );
}
