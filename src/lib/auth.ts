export class Auth implements IAuth{
  
  isLoggedIn: boolean = false ;
  
  authenticate(userId: string, password: string){
    return true;
  }

  login(userId: string){

  }

  logout(){

  }

}

interface IAuth{
  authenticate: (userId: string, password: string)=>boolean
  login: (userId:string)=>void
  logout: ()=>void
  isLoggedIn: boolean
}