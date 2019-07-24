import jwt from 'jwt-simple';
import { Users, IUser } from '../db';

class Auth implements IAuth{
  isLoggedIn: boolean = false ;
  token: string | null = '';
  private secret: string = "An apple a day keeps the doctor away!";
  
  constructor(){
    this.isLoggedIn = this.loggedIn();
    if(this.isLoggedIn){
      this.token = localStorage.getItem('token');
    }
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
    let payload = {
      sub: user.id, 
      name: `${user.firstname} ${user.middleInitial.length ? user.middleInitial + '.' : ''} ${user.lastname}`,
      exp: Math.floor(Date.now() / 1000) + (60 * 60)
    };
    this.token = jwt.encode(payload, this.secret);
    return this.token;
  }

  private decodeToken(){}

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

  get user(){
    if(this.token){
      let user = jwt.decode(this.token, this.secret);
      return {id: user.sub, name: user.name }; 
    }
  }
}


let Singleton = new Auth();

export { Singleton as Auth};

export interface IAuth{
  authenticate: (username: string, password: string)=>boolean
  login: (user: IUser)=>IUser
  logout: ()=>void
  isLoggedIn: boolean
}