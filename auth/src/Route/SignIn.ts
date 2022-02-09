import express  from 'express' ;
import  {body}  from 'express-validator'
import { signIn} from '../controllers/signInController'
import {validateRequest} from '../middleWares/validate-request'
const router  = express.Router();

router.post("/api/users/signin" , [
    body('email').isEmail().withMessage('Email must be valid') ,
    body('password').trim().notEmpty().withMessage('You must apply a password')
] ,  validateRequest, signIn)

export {router as signInRouter};