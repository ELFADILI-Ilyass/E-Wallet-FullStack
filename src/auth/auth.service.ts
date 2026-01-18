import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
 getHello(): string {
    return 'Hello World!';
  }

   login(user:any){
    
      const {email,password}=user;
  
      if(email==="test@test" && password==="1234"){
        return{
          success:"True",
          message:"login succcesfily"
  
        };
      }
      else{
        return{
          success:"False",
          message:"login failed"
        };
      }  
  }
    signup(user:any){
      return "sign up successfuly"
    }
  }

