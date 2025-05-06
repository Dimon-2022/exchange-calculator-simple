// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("USD");
  const [output, setOutput] = useState("Output");

  useEffect(() => {
    if (!amount) {
      setOutput("Здесь будет посчитана сумма");
      return;
    }

    if (from === to) {
      setOutput("Валюты должны отличаться");
      return;
    }

    async function convertCurrency() {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
      );
      const data = await res.json();
      setOutput(data.rates[`${to}`]);
    }

    convertCurrency();
  }, [amount, from, to]);

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.currentTarget.value)}
        placeholder="Выберите количество"
      />
      <select
        onChange={(e) => {
          setFrom(e.currentTarget.value);
        }}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        onChange={(e) => {
          setTo(e.currentTarget.value);
        }}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{output}</p>
    </div>
  );
}
