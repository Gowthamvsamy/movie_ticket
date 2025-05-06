import React, { useEffect, useState } from 'react';
import Loader from './loader';
import { getWallet } from '../context/service/movieService';
import { WalletData } from './type';

function Wallet() {
  const [loading, setLoading] = useState<boolean>(false);
  const [balance, setBalance] = useState<WalletData | null>(null)

  const user_id = localStorage.getItem('user_id');

  const w_user = balance?.[0]?.user_id

  console.log(w_user);
  



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
      {loading ? (
        <Loader />
      ) : (
        <div className="wallet">
          <h1 className="wallet-heading">My Wallet</h1>
          <div className="balance-box">
            <p>Total Wallet Balance</p>
            {user_id === w_user ? (
              <h2 className="balance-price">&#x20B9; {balance?.[0]?.balance + '.00' || "0.00"}</h2>
            ): (
              <h2 className="balance-price">&#x20B9; 0.00</h2>
            )}
          </div>
        </div>
      )
      }
    </div>
  );
}

export default Wallet;
