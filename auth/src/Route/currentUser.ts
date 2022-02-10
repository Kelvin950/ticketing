import express  from 'express' ;
import  {currentUserController} from '../controllers/currentUser'
import {currentuser} from '../middleWares/currentUser'
const router  = express.Router();
import  {requireAuth} from '../middleWares/RequireAuth'

router.get("/api/users/currentuser",currentuser , currentUserController);
 


export {router as CurrentUserRouter};