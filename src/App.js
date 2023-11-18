import logo from './logo.svg';
import './App.css';
import MainRouting from './Component/Routing/MainRouting';
import UserContext from './Context/UserContext';
import UserContextProvider from './Context/UserContextProvider';

function App() {
  return (
    <UserContextProvider>
      <MainRouting/>
    </UserContextProvider>
  );
}

export default App;
