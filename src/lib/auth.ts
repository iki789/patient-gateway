import jwt from 'jwt-simple';
import { Users, IUser } from '../db';

export class Auth implements IAuth{
  isLoggedIn: boolean = false ;
  
  constructor(){
    this.isLoggedIn = this.loggedIn();
  }

  authenticate(username: string, password: string): boolean{
    let user: IUser | undefined = Users.find(user=>user.username === username);
    if(user){
      if(user.password === password){
        this.login(user);
        this.isLoggedIn = true;
        return true;
      }
    }
    return false;
  }

  private generateToken(user: IUser): string{
    let secret = "The lost castle";
    let payload = {
      sub: user.id, 
      name: `${user.firstname} ${user.middleInitial.length ? user.middleInitial + '.' : ''} ${user.lastname}`,
      exp: Math.floor(Date.now() / 1000) + (60 * 60)
    };
    let token: string = jwt.encode(payload,secret);
    return token;
  }

  login(user: IUser): IUser{
    localStorage.setItem('token', this.generateToken(user))
    return user;
  }

  logout(): void{
    localStorage.removeItem('token');
  }

  private loggedIn():boolean{
    let isLoggedIn = localStorage.getItem('token') ? true : false ;
    this.isLoggedIn = isLoggedIn;
    return this.isLoggedIn;
  }
}

interface IAuth{
  authenticate: (username: string, password: string)=>boolean
  login: (user: IUser)=>IUser
  logout: ()=>void
  isLoggedIn: boolean
}