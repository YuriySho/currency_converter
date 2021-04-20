/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useContext } from 'react';
import $ from 'jquery';
import axios from 'axios';

import Context from '../context';
import converter from '../сonverter';
import currenciesList from '../renderCurrenciesList';
import Toast from '../components/Toast';

export default () => {
  const { currency } = useContext(Context);
  const [firstCurrency, setFirstCurrency] = useState<string | undefined>('USD');
  const [secondCurrency, setSecondCurrency] = useState<string | undefined>(
    'RUB'
  );

  const handleFirstCurrency = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFirstCurrency(e.currentTarget.dataset.cur);
  };
  const handleSecondCurrency = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSecondCurrency(e.currentTarget.dataset.cur);
  };

  const [rates, setRates] = useState<any>({});
  const [error, setError] = useState<string | undefined>('');

  useEffect(() => {
    const getCurrentRates = async () => {
      try {
        const fetched = await axios.get(
          `https://api.ratesapi.io/api/latest?base=${firstCurrency}`
        );
        setRates(fetched.data.rates);
        setError('');
      } catch (e) {
        setError(e.message);
        ($('.toast') as any).toast('show');
      }
    };
    getCurrentRates();
  }, [firstCurrency]);

  const [sellAmount, setSellAmount] = useState<string>('1');
  const [converteBack, setConverterBack] = useState<boolean>(true);
  const [buyAmount, setBuyAmount] = useState<string>('0');

  useEffect(() => {
    if (converteBack) {
      const convertBuy = converter(
        sellAmount,
        rates[`${secondCurrency}`],
        converteBack
      );
      setBuyAmount(convertBuy);
    } else {
      const convertBuy = converter(
        buyAmount,
        rates[`${secondCurrency}`],
        converteBack
      );
      setSellAmount(convertBuy);
    }
  }, [converteBack, rates, secondCurrency, sellAmount, buyAmount]);

  const handleSellAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellAmount(e.target.value);
    setConverterBack(true);
  };

  const handleBuyAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuyAmount(e.target.value);
    setConverterBack(false);
  };

  const renderFirstListCurrency = currenciesList(currency, handleFirstCurrency);

  const renderSecondListCurrency = currenciesList(
    currency,
    handleSecondCurrency
  );

  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  const currentCurrency = () => {
    if (!favorites) {
      return null;
    }
    return favorites.map((el: string) => (
      <button
        type="button"
        onClick={handleFirstCurrency}
        data-cur={el}
        className="border-0"
        key={el}
      >
        {el}
      </button>
    ));
  };

  return (
    <>
      {error && <Toast message={error} />}
      <div className="row d-flex justify-content-center align-items-center main">
        <div className="col-sm-6">
          <h3 className="card-title text-light">Хочу купить</h3>
          <div className="card border-0 shadow-input">
            <div className="card-body p-0">
              <div className="input-group dropdown d-flex">
                <div className="input-group input-group-lg">
                  <div className="input-group-prepend">
                    <span className="input-group-text">{firstCurrency}</span>
                  </div>
                  <input
                    onChange={handleSellAmount}
                    type="text"
                    className="form-control"
                    aria-label="Dollar amount (with dot and two decimal places)"
                    value={sellAmount}
                  />

                  <button
                    type="button"
                    className="btn btn-info dropdown-toggle"
                    data-toggle="dropdown"
                    data-offset="0, -430"
                    id="dropdownMenuOffset"
                  />
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="dropdownMenuOffset"
                  >
                    <div className="d-flex flex-wrap">
                      {renderFirstListCurrency}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <h3 className="card-title text-light">Хочу продать</h3>
          <div className="card border-0 shadow-input">
            <div className="card-body p-0">
              <div className="input-group dropdown d-flex">
                <div className="input-group input-group-lg">
                  <div className="input-group-prepend">
                    <span className="input-group-text">{secondCurrency}</span>
                  </div>
                  <input
                    onChange={handleBuyAmount}
                    type="text"
                    className="form-control"
                    aria-label="Dollar amount (with dot and two decimal places)"
                    value={buyAmount}
                  />

                  <button
                    type="button"
                    className="btn btn-info dropdown-toggle"
                    data-toggle="dropdown"
                    data-offset="0,-430"
                    data-testid="button1"
                    id="dropdownMenuOffset"
                  />
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="dropdownMenuOffset"
                  >
                    <div className="d-flex flex-wrap">
                      {renderSecondListCurrency}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row align-self-start">
          <div className="d-flex flex-column justify-content-center align-self-center p-1">
            <h4 className="text-light text-center">Избранные</h4>
            <div className="shadow-card m-2">{currentCurrency()}</div>
          </div>
        </div>
      </div>
    </>
  );
};
