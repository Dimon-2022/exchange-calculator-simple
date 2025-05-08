// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useState, useEffect } from "react";

export default function App() {
  const [amount, setAmount] = useState(100);
  const [output, setOutput] = useState(null);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("USD");

  useEffect(() => {
    async function makeExchange() {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
      );
      let output = await res.json();
      console.log( output);

      if(output.message === 'bad currency pair'){
        setOutput('Валюты должны быть разные');
        return;
      }      
      output = output.rates[to] ?? null;
      setOutput(output);
    }

    makeExchange();
  }, [amount, from, to]);

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <select
        onChange={(e) => {
          setFrom(e.target.value);
        }}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        onChange={(e) => {
          setTo(e.target.value);
        }}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{output ? output : "OUTPUT"}</p>
    </div>
  );
}
