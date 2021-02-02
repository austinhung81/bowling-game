import React from 'react';
import { BowlingContextProvider } from './reducers/store';
import BowlingBoard from './containers/BowlingBoard';


const App = () => {
	return (
		<BowlingContextProvider>
      <BowlingBoard />
    </BowlingContextProvider>
	);
}

export default App;