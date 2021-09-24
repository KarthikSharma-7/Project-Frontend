import React,{useState,useContext} from "react";
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';
import { UserContext } from "../../App";

const Signin=()=>{
    const history=useHistory();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {state,dispatch}=useContext(UserContext);

 const SendData=(e)=>{
     e.preventDefault();
     fetch("/signin",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email,
            password,
        })
     })
     .then(res=>res.json())
     .then((data)=>{
         if(data.Error)
         {
            M.toast({html:data.Error,classes:"#f44336 red"});
         }
         else
         {
             localStorage.setItem("jwt",data.token);
             localStorage.setItem("user",JSON.stringify(data.user));
             dispatch({type:"USER",payload:data.user});
            M.toast({html:"Signed in",classes:"#00e676 green accent-3"});
            history.push("/");
         }
     })
     .catch(err=>{console.log(err)});
 }
    return(
        <>
         <div className='mycard'>
          <div className="card auth-card input-field">
              <h2>Instagram</h2>
              <input type='text' placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
              <input type='password' placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} />
              <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={SendData}>Login</button>
              <p><Link to='/signup'>Create account ?</Link></p>
          </div>
        </div> 
        </>
    )
}

export default Signin;