import mongoose, { Mongoose } from 'mongoose';
import {Password} from  '../services/password';
const Schema = mongoose.Schema ;

//an interface that describes the properties that are required to create a new user

interface UserAttr{

    email:string;
    password:string;
}

//An interface that describes the properties a user model has

interface UserModel  extends mongoose.Model<UserDoc>{
    
   build(attrs:UserAttr):UserDoc ;

}

//an interface that describes the properties a user document has

interface UserDoc extends mongoose.Document{

    email:string ;
    password:string;
    
}

const userSchema =  new Schema({

    email:{
        type:String ,
        required:true
    }
     ,
     password:{
         type:String ,
         required:true
     }
// }  , {
//     toJSON:{
//         transform(doc ,ret){
//             ret.id =  ret._id;
//             delete ret._id;
//             delete ret.password;
//             delete ret.__v;

//         }
    //}
});


userSchema.pre('save' , async function(done){
         if(this.isModified('password')){
             const hashed =  await Password.toHash(this.get('password'));
             this.set('password',  hashed);
         }
       done();  
});

userSchema.statics.build =  (attrs:UserAttr)=>{

    return new User(attrs);
};


const User = mongoose.model<UserDoc, UserModel>("USER" , userSchema);



export {User };