import React, { useEffect, createContext, useReducer,useContext } from 'react';
import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Home from './components/screens/home';
import Signin from './components/screens/signin';
import Signup from './components/screens/signup';
import Profile from './components/screens/profile';
import Createpost from './components/screens/createpost';
import { initialState, reducer } from './reducers/usereducer';
import UserProfile from './components/screens/UserProfile';
export const UserContext = createContext();


const Routing = () => {
  const history = useHistory();
  const {state,dispatch}=useContext(UserContext);
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"));
    if(user)
    {
      dispatch({type:"USER",payload:user});
    }
    else{
      history.push('/signin');
    }
  },[])
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/signin' component={Signin} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/profile' component={Profile} />
      <Route exact path='/createpost' component={Createpost} />
      <Route exact path='/profile/:userid' component={UserProfile} />
    </Switch>
  )
}


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
