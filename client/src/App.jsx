import {
  BrowserRouter as Router,
  Routes as Switch, 
  Route,
  Navigate as Redirect
} from 'react-router-dom';
//import {Redirect} from 'react-router';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';

const App = () => {
  const user = true;
  return (
  <Router>
    <Switch>
    <Route exact path='/' element={<Home/>}/>
    <Route path='/products/:category' element={<ProductList/>}/>
    <Route path='/product/:id' element={<Product/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/login' element={user ? <Redirect to='/'/> : <Login/>}/>
    <Route path='/register' element={user ? <Redirect to='/'/> :<Register/>}/>
    </Switch>

  </Router>);
};

export default App;
