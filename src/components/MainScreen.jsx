import { useState, useEffect } from 'react';
import './MainScreen.css'
import icon from '../assets/exchange.svg'



function MainScreen(){
    const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [result, setResult] = useState(null);
    const [currencies, setCurrencies] = useState([]);
    
    useEffect(() => {
        fetch(`https://api.fxratesapi.com/latest?api_key=${API_KEY}&base=USD`)
          .then(res => res.json())
          .then(data => {
            setCurrencies(Object.keys(data.rates));
          })
          .catch(err => console.error(err));
    }, []);

    async function getRate(){
        const amount = document.getElementById("amount").value;
        const fromCurrency = document.getElementById("from").value;
        const toCurrency = document.getElementById("to").value;
    
    
        try{
            const res = await fetch(`https://api.fxratesapi.com/latest?api_key=${API_KEY}&base=${fromCurrency}`);
            const data = await res.json();
            const rate = data.rates[toCurrency];
            const total = amount * rate;
            setResult(total);
        }
        catch(err){
            console.error(err)
        };
    }


    function resetRate(){
        setAmount('');
        setFromCurrency('');
        setToCurrency('');
        setResult(null); 
    }


    return (
        <div className="container">
            <h3>Currency Converter</h3>
            <div className="amount">
                <label htmlFor="amount">Enter Amount</label>
                <input type="number" id="amount" placeholder='0' value={amount} onChange={(e) => setAmount(e.target.value)}/>
            </div>

            <div className="converter">
                <div className="from">
                    <label htmlFor="from">From</label>
                    <select id="from" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </div>
                <button>
                    <img src={icon} alt="exchange" />
                </button>
                <div className="to">
                    <label htmlFor="to">To</label>
                    <select id="to" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <p className="conversion-result">{`= ${result !== null ? result : ""}`}</p>
            <button className="get-rate" onClick={getRate}>Get Exchange Rate</button>
            <button className="reset-rate" onClick={resetRate}>Reset</button>
        </div>
    )
}

export default MainScreen;