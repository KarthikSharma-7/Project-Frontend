import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';

const RenderList = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  if (state) {
    return [
      <li><Link to="/profile">Profile</Link></li>,
      <li><Link to="/createpost">CreatePost</Link></li>,
      <li>
        <button className="btn #f44336 red" onClick={()=>{
          localStorage.clear();
          dispatch({type:"CLEAR"});
          history.push('/signin');
        }}>Logout</button>

      </li>
    ]
  }
  else {
    return [
      <li><Link to="/signin">SignIn</Link></li>,
      <li><Link to="/signup">SignUp</Link></li>
    ]
  }
}


const Navbar = () => {
  const { state } = useContext(UserContext);
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={state ? "/" : '/signin'} className="brand-logo left">Instagram</Link>
        <ul id="nav-mobile" className="right">
          {RenderList()}
        </ul>
      </div>
    </nav>
  )
}
export default Navbar;