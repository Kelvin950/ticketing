import express  from 'express' ;
import  {currentUserController} from '../controllers/currentUser'

const router  = express.Router();
import  {requireAuth} from '@katickets212/common';
import {currentuser} from '@katickets212/common'
router.get("/api/users/currentuser",currentuser , currentUserController);
 


export {router as CurrentUserRouter};