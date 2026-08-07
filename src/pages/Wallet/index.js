import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../../components/Header';
import WalletForm from '../../components/WalletForm';
import { fetchCurrencies } from '../../actions';
import './index.css';

function Wallet() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  return (
    <div className="wallet-page">
      <Header />
      <main className="wallet-main">
        <WalletForm />
      </main>
    </div>
  );
}

export default Wallet;