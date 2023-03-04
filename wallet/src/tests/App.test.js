import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import AddToken from '../pages/AddToken';
import EditToken from '../pages/EditToken';
import renderWithRouterAndRedux from './helpers/renderWithRedux';

describe('Test home page', () => {
  test('Test elements on screen', () => {
    renderWithRouterAndRedux(<App />);
    const logoKlever = screen.getByRole('img', {
      name: /logo-name/i,
    });
    const starLogo = screen.getByRole('img', {
      name: /shooting-name/i,
    });
    const wishWalletText = screen.getByText(/wish wallet/i);
    const btnAdd = screen.getByRole('button', {
      name: /add token/i,
    });
    const tokensText = screen.getByRole('columnheader', {
      name: /tokens/i,
    });
    const balanceText = screen.getByRole('columnheader', {
      name: /balance/i,
    });

    expect(logoKlever).toBeInTheDocument();
    expect(starLogo).toBeInTheDocument();
    expect(wishWalletText).toBeInTheDocument();
    expect(btnAdd).toBeInTheDocument();
    expect(tokensText).toBeInTheDocument();
    expect(balanceText).toBeInTheDocument();
  });
  test('Click on Add Button', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const btnAdd = screen.getByRole('button', {
      name: /add token/i,
    });

    userEvent.click(btnAdd);

    expect(history.location.pathname).toBe('/addtoken');
  });
});

describe('Test Add Token page', () => {
  test('Possible to type on inputs', () => {
    const { history } = renderWithRouterAndRedux(<AddToken />);

    const inputText = screen.getByRole('textbox', {
      name: /token/i,
    });
    const inputNumber = screen.getByRole('spinbutton', {
      name: /balance/i,
    });
    const saveButton = screen.getByRole('button', {
      name: /save/i,
    });

    expect(inputText).toBeInTheDocument();
    expect(inputNumber).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();

    expect(saveButton).toBeDisabled();

    userEvent.type(inputText, 'RTX');
    userEvent.type(inputNumber, '45');

    expect(saveButton).toBeEnabled();

    userEvent.click(saveButton);

    expect(history.location.pathname).toBe('/');
  });
  test('Test path and storage', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    expect(history.location.pathname).toBe('/');

    const btnAdd = screen.getByRole('button', {
      name: /add token/i,
    });

    userEvent.click(btnAdd);

    expect(history.location.pathname).toBe('/addtoken');

    const inputText = screen.getByRole('textbox', {
      name: /token/i,
    });
    const inputNumber = screen.getByRole('spinbutton', {
      name: /balance/i,
    });
    const saveButton = screen.getByRole('button', {
      name: /save/i,
    });

    userEvent.type(inputText, 'RTX');
    userEvent.type(inputNumber, '45');

    userEvent.click(saveButton);

    const expectedValue = '[{"name":"RTX","balance":"45"}]';

    const storagelValue = localStorage.getItem('tokensSave');

    expect(storagelValue).toBe(expectedValue);
  });
  test('Test button back', () => {
    const { history } = renderWithRouterAndRedux(<AddToken />);
    const backButton = screen.getByRole('button', {
      name: /back/i,
    });

    expect(backButton).toBeInTheDocument();

    userEvent.click(backButton);

    expect(history.location.pathname).toBe('/');
  });
});

describe('Test page Edit Token', () => {
  global.alert = jest.fn();

  test('Test btn click and inputs', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const rtxCell = screen.getByRole('cell', {
      name: /rtx/i,
    });

    userEvent.click(within(rtxCell).getByRole('button'));

    expect(history.location.pathname).toBe('/edittoken');

    const inputTextEdit = screen.getByRole('textbox', {
      name: /token/i,
    });

    const inputBalanceEdit = screen.getByRole('spinbutton', {
      name: /balance/i,
    });

    expect(inputTextEdit).toHaveValue('RTX');
    expect(inputBalanceEdit).toHaveValue(45);

    const btnRemove = screen.getByRole('button', {
      name: /remove/i,
    });

    userEvent.click(btnRemove);

    const storagelValue = localStorage.getItem('tokensSave');
    expect(storagelValue).toBe('[]');

    expect(global.alert)
      .toBeCalledWith('The token has been deleted');

    expect(history.location.pathname).toBe('/');
  });
  test('Test back button on edit page', () => {
    renderWithRouterAndRedux(<EditToken />);

    const backButton = screen.getByRole('button', {
      name: /back/i,
    });

    expect(backButton).toBeInTheDocument();

    userEvent.click(backButton);
  });
});
