import PropTypes from 'prop-types';
import React from 'react';
import logo from '../assets/logo.svg';
import star from '../assets/shooting-star.svg';
import '../style/header.css';

export default function Header({ titleBtn, funcBtn, idBtn }) {
  return (
    <div id="header-container">
      <div id="logo-klever">
        <img src={ logo } alt="logo-name" id="logo-name" />
      </div>
      <div id="wish-wallet">
        <div id="wish-logo">
          <img src={ star } alt="shooting-name" id="shooting-star" />
          Wish Wallet
        </div>
        <label htmlFor="header-btn">
          <button
            className="header-btn"
            onClick={ funcBtn }
            id={ idBtn }
          >
            { titleBtn }
          </button>
        </label>
      </div>
    </div>
  );
}

Header.propTypes = {
  funcBtn: PropTypes.func.isRequired,
  titleBtn: PropTypes.string.isRequired,
  idBtn: PropTypes.string.isRequired,
};
