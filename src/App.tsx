import './App.css';
// router
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// redux
import store from './store/store';
import { Provider } from 'react-redux';
// views
import { Home } from './views';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
