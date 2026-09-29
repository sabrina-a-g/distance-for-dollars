"use client";

import React, { useState } from "react";

export default function PledgeAmountInput() {
  const [amount, setAmount] = useState(0.5);

  return ( 
    <>
    <input
      type="range"
      step="0.05"
      min="0.10"
      max="5.00"
      value={amount}
      onChange={(e) => setAmount(parseFloat(e.target.value))}
    ></input>
    <p>Pledge Amount: ${amount.toFixed(2)} / mile</p>
    </>
  );

}