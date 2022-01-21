import {CustomError} from  './CustomError'
export class DatabaseConnectionError extends  CustomError{

reason = 'Error Connecting to the database'
statusCode  =  500;
    constructor(){
        super("Error connection to db");


        Object.setPrototypeOf(this , DatabaseConnectionError.prototype);
    }

    serializeErrors(){

        return [
            {
                message:this.reason
            }
        ]
    }

}