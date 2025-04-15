import './App.css';
import MediaQuery from 'react-responsive';
import { Toaster, toast } from 'sonner'

import HomePage from './components/HomePage'

function App() {
  return (
    <div className="App">
      <Toaster />
      <MediaQuery minWidth={768}>
      </MediaQuery>

      <MediaQuery maxWidth={767}>
        <HomePage />
      </MediaQuery>
    </div>
  );
}

export default App;
