import './App.css';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import LoginButton from './components/LoginLogoutComponents/LoginButton';
import DrawerComponent from './components/Navbar/DrawerComponent';
import ProtectedRoute from './components/LoginLogoutComponents/ProtectedRoute';
import ViewTransactionComponent from './components/TransactionComponents/ViewTransactionComponent';
import AddTransactionComponent from './components/TransactionComponents/AddTransactionComponent';
import ViewEntityComponent from './components/EntityComponents/ViewEntityComponent';
import AddEntityComponent from './components/EntityComponents/AddEntityComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LoginButton} />
            <ProtectedRoute path="/dashboard" component={DrawerComponent} />
            <ProtectedRoute path="/transactions" component={ViewTransactionComponent} />
            <ProtectedRoute path="/add-transaction" component={AddTransactionComponent} />
            <ProtectedRoute path="/entity" component={ViewEntityComponent} />
            <ProtectedRoute path="/add-entity" component={AddEntityComponent} />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
