import React, { useEffect, useState } from 'react';
import { getWallet } from '../context/Service/MovieService';
import { WalletData } from './Type';
import Loader from './Loader';

function Wallet() {

  // use state
  const [loading, setLoading] = useState<boolean>(false);
  const [balance, setBalance] = useState<WalletData[] | null>(null);

  // get the user_id form local storage
  const u_id = localStorage.getItem('user_id');

  // get a wallet balance for the user
  useEffect(() => {
    const getBalance = async () => {
      setLoading(true)
      try {
        const wallet = await getWallet();
        setBalance(wallet)
      } catch (err) {
        console.error("Fetch wallet error: ", err);
      } finally {
        setLoading(false)
      }
    }
    getBalance();
  }, []);

  return (
    <div className="wallet-bg">
      {loading ? (<Loader />) : (
        <div className="wallet">
          <h1 className="wallet-heading">My Wallet</h1>
          <div className="balance-box">
            <p>Total Wallet Balance</p>
            {/* filter the wallet balance using user_id */}
            {balance && balance
              .filter((b) => b.user_id === u_id)
              .map((b, index) => (
                <h2 key={index} className="balance-price">
                  &#x20B9; {b.balance?.toFixed(2) || "0.00"}
                </h2>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Wallet;
