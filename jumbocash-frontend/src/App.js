import './App.css';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import LoginButton from './components/LoginLogoutComponents/LoginButton';
import DrawerComponent from './components/Navbar/DrawerComponent';
import ProtectedRoute from './components/LoginLogoutComponents/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LoginButton} />
            <ProtectedRoute path="/dashboard" component={DrawerComponent} />
            <ProtectedRoute path="/transactions" component={DrawerComponent} />
            <ProtectedRoute path="/add-transaction" component={DrawerComponent} />
            <ProtectedRoute path="/entities" component={DrawerComponent} />
            <ProtectedRoute path="/add-entity" component={DrawerComponent} />
            <ProtectedRoute path="/profile" component={DrawerComponent} />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
