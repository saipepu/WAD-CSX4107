import { useState } from 'react';
import './App.css';

function App() {
  const VAT_RATE = 7; // 7% VAT rate
  const [vat, setVat] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  function handleChange(event) {
    const price = parseInt(event.target.value) || 0;
    setPrice(price);
    const vat = (price / (100 + VAT_RATE)) * VAT_RATE;
    setVat(vat);
  }

  function handleDiscountChange(event) {
    setDiscount(parseInt(event.target.value) || 0);
  }

  function handleCalculate() {
    const discountAmount = (price * discount) / 100;
    const total = price + vat - discountAmount;
    setTotalPrice(total.toFixed(2));
  }

  return (
    <div className="container fade-in">
      <h2>VAT Calculator</h2>

      <div className="card">
        <div className="input-group">
          <label className="input-label">Price</label>
          <input
            type="number"
            placeholder="Enter price (e.g., 100.00)"
            value={price === 0 ? '' : price}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="card discount-section">
        <div className="input-group">
          <label className="input-label">Discount Percentage</label>
          <input
            type="number"
            placeholder="Enter discount percentage (e.g., 10)"
            onChange={handleDiscountChange}
            min="0"
            max="100"
          />
        </div>
      </div>

      <button onClick={handleCalculate}>Calculate Total Price</button>

      <div className="results">
        <div>
          <span className="label">Original Price:</span>
          <span className="value">${price.toFixed(2)}</span>
        </div>
        <div>
          <span className="label">VAT Rate:</span>
          <span className="value">{VAT_RATE}%</span>
        </div>
        <div>
          <span className="label">VAT Amount:</span>
          <span className="value">${vat.toFixed(2)}</span>
        </div>
        <div>
          <span className="label">Discount:</span>
          <span className="value">{discount.toFixed(2)}%</span>
        </div>
        <div>
          <span className="label">Total Amount:</span>
          <span className="value">${totalPrice}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
