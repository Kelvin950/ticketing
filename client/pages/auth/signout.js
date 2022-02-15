import Router  from 'next/router';
import {useEffect} from 'react';

import useRequest from '../../hooks/useRequest';

function Signout() {
    const {doRequest}= useRequest({
      url:"/api/users/signout",
      method:"post",
      body:{} ,
      onSuccess:()=>{Router.replace('/')} 
    });

    useEffect(()=>{
        doRequest();
    } ,[doRequest]);
    return (<div>
        Signing you out ......
    </div>  );
}

export default Signout;