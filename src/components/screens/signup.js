import React,{useState} from "react";
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';

const Signup=()=>{
    const history=useHistory();
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [cpassword,setCpassword]=useState("");
  

 const SendData=(e)=>{
     e.preventDefault();
     fetch("/signup",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name,
            email,
            password,
            cpassword
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
            M.toast({html:data.Message,classes:"#00e676 green accent-3"});
            history.push("/signin");
         }
     })
     .catch(err=>{console.log(err)});
 }


    return(
        <>
         <div className='mycard'>
          <div className="card auth-card input-field">
              <h2>Instagram</h2>
              <input type='text' placeholder='Username' value={name} onChange={(e)=>{setName(e.target.value) }}/>
              <input type='text' placeholder='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
              <input type='password' placeholder='Password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
              <input type='password' placeholder='Confirm-Password' value={cpassword} onChange={(e)=>{setCpassword(e.target.value)}}/>
              <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" type='submit' onClick={SendData}>SignUp</button>
              <p><Link to='/signin'>Already have an account?</Link></p>
          </div>
        </div> 
        </>
    )
}

export default Signup;