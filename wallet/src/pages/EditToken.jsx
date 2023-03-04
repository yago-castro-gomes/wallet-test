import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { getStorage } from '../services/storage';
import '../style/form-token.css';

function EditToken() {
  const [name, setName] = useState('');
  const [balanceValue, setBalanceValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const { token, balance } = useSelector((state) => state.tokenReduce);
  const history = useHistory();

  const tokenStorage = getStorage();
  const findSameToken = tokenStorage
    .find((elment) => elment.name === name);

  useEffect(() => {
    setName(token);
    setBalanceValue(balance);
  }, [token, balance]);

  useEffect(() => {
    const checkInputText = () => {
      setIsDisabled(name.length >= 2 && balanceValue.length > 0);
    };
    return checkInputText();
  }, [name, balanceValue]);

  const handleRemove = () => {
    if (findSameToken) {
      const filterToken = tokenStorage.filter((element) => element.name !== name);
      tokenStorage.push(filterToken);
      localStorage.setItem('tokensSave', JSON.stringify(filterToken));
      global.alert('The token has been deleted');
      history.push('/');
    } else {
      global.alert('You dont own that token, so it wasnt deleted.');
    }
  };

  const handleSave = () => {
    if (findSameToken) {
      const editedToken = tokenStorage.map((element) => {
        if (element.name === name) {
          return {
            ...element,
            balance: balanceValue,
          };
        }
        return element;
      });
      localStorage.setItem('tokensSave', JSON.stringify(editedToken));
    } else {
      const newToken = {
        name,
        balance: balanceValue,
      };
      localStorage.setItem('tokensSave', JSON.stringify([...tokenStorage, newToken]));
    }
    history.push('/');
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
          Edit Token
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
              value={ balanceValue }
              onChange={ (e) => setBalanceValue(e.target.value) }
              className="form-input"
            />
          </label>
        </div>
        <div id="btn-container-edit">
          <button
            id="btn-remove"
            onClick={ handleRemove }
          >
            Remove
          </button>
          <button
            type="button"
            id="btn-save"
            onClick={ handleSave }
            disabled={ !isDisabled }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default connect()(EditToken);
