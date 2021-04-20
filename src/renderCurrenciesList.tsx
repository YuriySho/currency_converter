/* eslint-disable no-unused-vars */
import React from 'react';

export default (
  currency: any,
  handleCurrency: (e: React.MouseEvent<HTMLButtonElement>) => void
) => {
  if (!currency) {
    return null;
  }
  const nameCurrency = Object.keys(currency.rates);
  return nameCurrency.map((el: string) => (
    <button
      className="dropdown-item w-25 p-2"
      type="button"
      key={el}
      onClick={handleCurrency}
      data-cur={el}
    >
      {el}
    </button>
  ));
};
