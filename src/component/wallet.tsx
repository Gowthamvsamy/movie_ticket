import React from 'react';
import Loder from './loder';

function Wallet() {
  const price = localStorage.getItem('refund');

  return (
    // <div className="wallet-bg">
    //   <div className="wallet">
    //     <h1 className="wallet-heading">My Wallet</h1>
    //     <div className="balance-box">
    //       <p>Total Wallet Balance</p>
    //       <h2 className="balance-price">&#x20B9; {price || "0.00"}</h2>
    //     </div>
    //   </div>
    // </div>
    <>
    <Loder />
    </>
  );
}

export default Wallet;
