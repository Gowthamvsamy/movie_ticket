import React, { useEffect, useState } from 'react';
import { getWallet } from '../context/Service/MovieService';
import { WalletData } from './Type';
import Loader from './Loader';


function Wallet() {
  // use state with proper type annotations
  const [loading, setLoading] = useState<boolean>(false);
  const [balance, setBalance] = useState<WalletData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // get the user_id from local storage with type assertion
  const userId = localStorage.getItem('user_id') as string | null;

  // get a wallet balance for the user
  useEffect(() => {
    const getBalance = async () => {
      if (!userId) {
        setError('User ID not found. Please login again.');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const wallet = await getWallet();
        setBalance(wallet);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch wallet balance';
        console.error("Fetch wallet error: ", errorMessage);
        setError('Unable to fetch wallet balance. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getBalance();
  }, [userId]);

  // Find the user's balance
  const userBalance = balance?.find((b) => b.user_id === userId)?.balance?.toFixed(2) || "0.00";

  return (
    <div className={`wallet-bg`}>
      {loading && <Loader />}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      {!loading && !error && (
        <div className="wallet">
          <h1 className="wallet-heading">My Wallet</h1>
          <div className="balance-box">
            <p>Total Wallet Balance</p>
            <h2 className="balance-price">
              &#x20B9; {userBalance}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Wallet;
