import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Table from '../components/Table';
import { checkStorage } from '../services/storage';
import '../style/home.css';

function Home() {
  const history = useHistory();

  useEffect(() => {
    checkStorage();
  }, []);

  return (
    <div>
      <Header
        titleBtn="Add Token"
        funcBtn={ () => history.push('/addtoken') }
        idBtn="add-btn"
      />
      <div>
        <Table />
      </div>
    </div>
  );
}

export default connect()(Home);
