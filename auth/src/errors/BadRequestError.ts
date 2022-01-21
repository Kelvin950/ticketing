import {CustomError} from  './CustomError'


export class BadRequestError extends CustomError{


    statusCode =  400;

    constructor(public message:string){

        super(message);
    
        Object.setPrototypeOf(this , BadRequestError);
    }



    serializeErrors(){

        return [{
            message:this.message
        }]
    }


}