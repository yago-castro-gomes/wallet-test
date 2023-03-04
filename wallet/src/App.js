import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import AddToken from './pages/AddToken';
import EditToken from './pages/EditToken';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route exact path="/addtoken" component={ AddToken } />
      <Route exact path="/edittoken" component={ EditToken } />
    </Switch>
  );
}

export default App;
