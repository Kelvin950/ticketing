
import buildClient from '../api/build-client';

const LandingPage=({currentUser})=> {

 return currentUser ? <h1>You are signed in</h1> : <h1>
   You are not signed in
 </h1>
}


LandingPage.getInitialProps= async (context)=>{

  const res = await buildClient(context).get("/api/users/currentuser");

  return res.data

};

export default LandingPage;