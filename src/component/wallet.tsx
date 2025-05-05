import React, { useEffect, useState } from 'react';
import Loader from './loader';

function Wallet() {
  const price = localStorage.getItem('refund');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])

  return (
    <div className="wallet-bg">
      {loading ? (
        <Loader />
      ) : (
        <div className="wallet">
          <h1 className="wallet-heading">My Wallet</h1>
          <div className="balance-box">
            <p>Total Wallet Balance</p>
            <h2 className="balance-price">&#x20B9; {price || "0.00"}</h2>
          </div>
        </div>
      )
      }
    </div>
  );
}

export default Wallet;
