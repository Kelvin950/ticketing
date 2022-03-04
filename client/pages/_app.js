import 'bootstrap/dist/css/bootstrap.css';
import { Fragment } from 'react';
import buildClient from '../api/build-client';
import Header from '../Components/Header'
const AppComponent =  ({Component , pageProps ,currentUser})=>{

    return <Fragment>
    <Header currentUser = {currentUser}/>
    <div className="container">

   
<Component currentUser={currentUser} {...pageProps}/>
</div>
    </Fragment>
    
    

}; 


AppComponent.getInitialProps= async (appContext)=>{
const client =  buildClient(appContext.ctx);
const res =  await client.get("/api/users/currentuser");

let pageProps={};

if(appContext.Component.getInitialProps){
   pageProps =  await appContext.Component.getInitialProps(appContext.ctx ,client ,res.data.currentUser);
}


console.log(pageProps);

return {
    pageProps ,
    currentUser:res.data.currentUser
};

}

export default AppComponent;