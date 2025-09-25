import './MainScreen.css'
import icon from '../assets/exchange.svg'


function MainScreen(){
    return (
        <div className="container">
            <h3>Currency Converter</h3>
            <div className="amount">
                <label htmlFor="amount">Enter Amount</label>
                <input type="number" id="amount" placeholder='0'/>
            </div>

            <div className="converter">
                <div className="from">
                    <label htmlFor="from">From</label>
                    <input type="number" id="from" placeholder='0'/>
                </div>
                <button>
                    <img src={icon} alt="exchange" />
                </button>
                <div className="to">
                    <label htmlFor="to">To</label>
                    <input type="number" id="to" placeholder='0'/>
                </div>
            </div>
            <button className="get-rate">Get Exchange Rate</button>
        </div>
    )
}

export default MainScreen;