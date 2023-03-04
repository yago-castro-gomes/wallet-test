import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { checkStorage, getStorage } from '../services/storage';
import '../style/form-token.css';

export default function AddToken() {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  const objStorage = {
    name,
    balance,
  };

  const tokenStorage = getStorage();

  useEffect(() => {
    checkStorage();
  }, []);

  useEffect(() => {
    const checkInputText = () => setIsDisabled(name.length >= 2 && balance.length > 0);
    return checkInputText();
  }, [name, balance]);

  const handleSave = () => {
    const findSameToken = tokenStorage
      .find((elment) => elment.name === name);
    if (findSameToken) {
      global.alert('This token is already in your wallet');
      setName('');
      setBalance('');
    }
    if (!findSameToken) {
      tokenStorage.push(objStorage);
      localStorage.setItem('tokensSave', JSON.stringify(tokenStorage));
      history.push('/');
    }
  };

  return (
    <div>
      <Header
        titleBtn="Back"
        funcBtn={ () => history.goBack() }
        idBtn="btn-back"
      />
      <div className="form-wallet">
        <div className="title-page">
          Add Token
        </div>
        <div className="label-container">
          <label className="label-input">
            <div className="title-label">
              Token
            </div>
            <input
              type="text"
              value={ name }
              onChange={ (e) => setName(e.target.value.toUpperCase()) }
              className="form-input"
            />
          </label>
          <label className="label-input">
            <div className="title-label">
              Balance
            </div>
            <input
              type="number"
              value={ balance }
              onChange={ (e) => setBalance(e.target.value) }
              className="form-input"
            />
          </label>
          <div id="btn-container">
            <button
              type="submit"
              id="btn-save"
              onClick={ handleSave }
              disabled={ !isDisabled }
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
