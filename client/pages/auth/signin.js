import {useState } from 'react';
import  Router from 'next/router'
import useRequest from '../../hooks/useRequest';


function Signin() {
const [email , setEmail] =  useState('');
const  [password , setPassword] =  useState('');

  const  {doRequest , errors}   =  useRequest({

url:"/api/users/signin",
method:"post",
body:{
    email , password
} ,
onSuccess: ()=>{
    Router.push("/")
}
  })
function changeEmail(e){

    setEmail(e.target.value);
}

function changePassword(e){
    setPassword(e.target.value);
}

async function onSubmit(event){
    event.preventDefault();

  
   setPassword('');
   setEmail('');
        await doRequest();
}

    return ( 
        <form onSubmit={onSubmit}>
            <h1>
                Sign in
            </h1>
        <div className="form-group">
            <label>
                Email Address
            </label>
            <input type="text" className="form-control" onChange={changeEmail} value={email}/>

        </div>
        <div className="form-group">
            <label>
                Password
            </label>
            <input type="password"  className="form-control" onChange={changePassword} value={password}/>

        </div>
     {
        errors
     }
        <button className="btn btn-primary">
                Sign in
        </button>
        </form>
     )
    ;
}

export default Signin;
