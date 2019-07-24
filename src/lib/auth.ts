import { Users, IUser } from '../db';

export class Auth implements IAuth{
  
  isLoggedIn: boolean = false ;
  
  authenticate(username: string, password: string){
    let user: IUser | undefined = Users.find(user=>user.username === username);
    if(user){
      if(user.password === password){
        this.login(user.username);
        return true;
      }
    }
    return false;
  }

  login(username: string){
  }

  logout(){

  }

}

interface IAuth{
  authenticate: (username: string, password: string)=>boolean
  login: (username:string)=>void
  logout: ()=>void
  isLoggedIn: boolean
}