import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import useRoutes from './routes';
import Navbar from './components/Navbar';
import Context from './context';
import Loader from './components/Loader';

function App() {
  const routes = useRoutes();
  const [currency, setCurrency] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getCurrency = async () => {
      setLoading(false);
      try {
        const fetched = await axios.get(
          'https://api.ratesapi.io/api/latest?base=USD'
        );
        setCurrency(fetched.data);
        setLoading(true);
      } catch (e) {
        setLoading(false);
      }
    };
    getCurrency();
  }, []);

  if (!loading) {
    return <Loader />;
  }

  return (
    <Context.Provider value={{ currency }}>
      <Router>
        <Navbar />
        <div className="container-fluent d-flex justify-content-center bg-dark">
          {routes}
        </div>
      </Router>
    </Context.Provider>
  );
}

export default App;
