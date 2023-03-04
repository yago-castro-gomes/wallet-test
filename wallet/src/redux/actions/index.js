export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SAVE_BALANCE = 'SAVE_BALANCE';

export const tokenAction = (payload) => ({
  type: SAVE_TOKEN,
  payload,
});

export const balanceAction = (payload) => ({
  type: SAVE_BALANCE,
  payload,
});
