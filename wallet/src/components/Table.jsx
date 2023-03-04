import React, { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { balanceAction, tokenAction } from '../redux/actions';
import '../style/table.css';

function Table() {
  const [tokenRender, setTokenRender] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenStorage = JSON.parse(localStorage.getItem('tokensSave'));
    if (tokenStorage === null) {
      localStorage.setItem('tokensSave', JSON.stringify([]));
    }
    if (tokenStorage !== null) {
      setTokenRender(tokenStorage);
    }
  }, []);

  const handleEdit = (token, balance) => {
    if (tokenRender !== null) {
      dispatch(tokenAction(token));
      dispatch(balanceAction(balance));
      history.push('/edittoken');
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th id="token-title">Tokens</th>
            <th>Balance</th>
          </tr>
        </thead>
        { tokenRender.map((token) => (
          <tbody key={ token.name }>
            <tr>
              <td id="token-name">
                <div id="edit-container">
                  <input
                    type="button"
                    onClick={ () => handleEdit(token.name, token.balance) }
                    id="edit-btn"
                    data-testid="btn-edit"
                  />
                </div>
                { token.name }
              </td>
              <td>
                { token.balance }
              </td>
            </tr>
          </tbody>
        )) }
      </table>

    </div>
  );
}
export default connect()(Table);
