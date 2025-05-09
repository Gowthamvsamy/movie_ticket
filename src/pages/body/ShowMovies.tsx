import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Cards from '../../component/card';
import Carousel from '../../component/carousel';
import { getUserWallet, wallet } from '../../context/service/movieService';
import { WalletData } from '../../component/type';
import Loader from '../../component/loader';

function Body() {

  const navigate = useNavigate();

  // useState
  const [loading, setLoading] = useState<boolean>(false);

  const u_id = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');
  console.log(u_id);


  useEffect(() => {
    const postWallet = async () => {
      setLoading(true);
      try {
        if (!token || !u_id) return;

        let existingWallet = null;

        try {
          existingWallet = await getUserWallet(u_id);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          // Optional: Check error code or status
          if (err?.response?.status !== 404) {
            throw err; // Rethrow if it's not a "not found" error
          }
        }

        if (existingWallet && existingWallet._id) return;

        const walletData: WalletData = {
          balance: 0,
          user_id: u_id,
          _id: '',
        };

        await wallet(walletData);
        toast.success('Wallet created');
      } catch (err) {
        console.error('Wallet error:', err);
        toast.error('Failed to create wallet');
      } finally {
        setLoading(false);
      }
    };

    postWallet();
  }, []);


  const handleMovieClick = (id: number) => {
    navigate(`/details/${id}`);
  }

  return (
    <>
      {/* Toast */}
      <ToastContainer />
      <div className='footer-space'>
        {loading && <Loader />}
        <div>
          <Carousel />
        </div>
        <div>
          <Cards
            setMovieData={handleMovieClick}
          />
        </div>
      </div>
    </>
  )
}

export default Body