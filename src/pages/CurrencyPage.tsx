import React, { useContext, useEffect, useState } from 'react';

import Context from '../context';
import currenciesList from '../renderCurrenciesList';

export default () => {
  useEffect(() => {
    if (!localStorage.getItem('favorites')) {
      localStorage.setItem('favorites', JSON.stringify(['RUB', 'USD', 'EUR']));
    }
  }, []);

  const { currency } = useContext(Context);

  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const [chosenCur, setChosenCur] = useState(favorites);

  const handleAddChosenCur = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget.dataset.cur;
    if (!chosenCur.includes(target)) {
      setChosenCur((prev: Array<string>) => [...prev, target]);
      localStorage.setItem('favorites', JSON.stringify([...chosenCur, target]));
    }
  };

  const handleDeleteFromFavorites = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const target = e.currentTarget.dataset.cur;
    const restFavorites = chosenCur.filter((el: string) => el !== target);
    setChosenCur(restFavorites);
    localStorage.setItem('favorites', JSON.stringify(restFavorites));
  };

  const currentCurrency = () => favorites.map((el: string) => (
    <button
      onClick={handleDeleteFromFavorites}
      data-cur={el}
      type="button"
      className="btn btn-light rounded-0"
      key={el}
    >
      {el}
    </button>
  ));

  return (
    <div className="row d-flex align-items-center justify-content-center main m-auto">
      <div className="col-sm-4 d-flex flex-column">
        <h2 className="text-light text-center h3">
          Добавить или удалить избранные валюты
        </h2>
        <div
          className="btn-group btn-group-sm flex-wrap justify-content-center align-self-center mw-50 m-2"
          role="group"
          aria-label="Basic example"
        >
          {currentCurrency()}
        </div>
      </div>
      <div className="col-sm-4">
        <div className="bg-light d-flex flex-wrap w-50 p-4 m-auto shadow-card">
          {currenciesList(currency, handleAddChosenCur)}
        </div>
      </div>
    </div>
  );
};
