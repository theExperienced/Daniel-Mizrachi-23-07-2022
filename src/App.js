import { useState, useEffect } from 'react';

import Loading from './pages/Loading';

import MainDisplay from './components/MainDisplay';

const App = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 4000);
  }, []);

  return <>{isLoading ? <Loading /> : <MainDisplay />}</>;
};

export default App;
