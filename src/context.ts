import { createContext } from 'react';

type ProviderProps = {
  currency: any;
};

export default createContext<ProviderProps>({
  currency: {}
});
