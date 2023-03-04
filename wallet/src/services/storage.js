export const getStorage = () => {
  const tokenStorage = JSON.parse(localStorage.getItem('tokensSave'));

  return tokenStorage;
};

export const checkStorage = () => {
  if (getStorage() === null) {
    localStorage.setItem('tokensSave', JSON.stringify([]));
  }
};
