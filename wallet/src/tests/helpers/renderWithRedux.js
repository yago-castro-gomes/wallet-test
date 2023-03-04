import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../../redux/reducers';

const renderWithRouterAndRedux = (component, initialState, route = '/') => {
  const store = createStore(rootReducer, initialState, applyMiddleware());
  const history = createMemoryHistory({ initialEntries: [route] });
  return {
    ...render(
      <Provider store={ store }>
        <Router history={ history }>
          {component}
        </Router>
      </Provider>,
    ),
    history,
    store,
  };
};
export default renderWithRouterAndRedux;
