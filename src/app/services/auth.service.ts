import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/internal/Observable';
//import { localizedString } from '@angular/compiler/src/output/output_ast';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  
  apiURL: string = 'http://localhost:8081/users';

 // users: User[] = [{"username":"admin","password":"123","roles":['ADMIN']},
  //{"username":"amira","password":"123","roles":['USER']} ];
  public loggedUser!:string;
  public isloggedIn: Boolean = false;
   public roles!:string[];

   private token!: string;
   private helper = new JwtHelperService();

  constructor(private router: Router,private http : HttpClient) { }

  login(user : User)
{
return this.http.post<User>(this.apiURL+'/login', user , {observe:'response'});
}

saveToken(jwt:string){
 localStorage.setItem('jwt',jwt);
 this.token = jwt;
 this.isloggedIn = true;
 this.decodeJWT();
 }
 /* getToken():string {
  return this.token;
  }*/



  getToken():string {
    return this.token;
    }

    decodeJWT()
{ if (this.token == undefined)
 return;
const decodedToken = this.helper.decodeToken(this.token);
this.roles = decodedToken.roles;
console.log("roles"+this.roles);
this.loggedUser = decodedToken.sub;
}

  logout() {
    this.loggedUser = undefined!;
this.roles = undefined!;
this.token= undefined!;
this.isloggedIn = false;
localStorage.removeItem('jwt');
this.router.navigate(['/login']);
}


loadToken() {
//  this.token= localStorage.getItem('jwt');
  this.decodeJWT();
  }


/*SignIn(user :User):Boolean{
    let validUser: Boolean = false;
    this.users.forEach((curUser) => {
    if(user.username== curUser.username && user.password==curUser.password) {
    validUser = true;
    this.loggedUser = curUser.username;
    this.isloggedIn = true;
    this.roles = curUser.roles;
    localStorage.setItem('loggedUser',this.loggedUser);
    localStorage.setItem('isloggedIn',String(this.isloggedIn));
    }
    });
    return validUser;
    }*/
    isAdmin():Boolean{
      if (!this.roles)
      return false;
     return this.roles.indexOf('ADMIN') >=0;
     }
    setLoggedUserFromLocalStorage(login : string) {
      this.loggedUser = login;
      this.isloggedIn = true;
    //  this.getUserRoles(login);
      }
     /* getUserRoles(username :string){
        this.users.forEach((curUser) => {
        if( curUser.username == username ) {
        this.roles = curUser.roles;
        }
        });}  */     

      /*  public isLoggedIn(): boolean 
        {     this.loadToken(); // load token
          // if token isnt null or empty ill login, otherwise logout and return false
          if(this.token != null && this.token !=='')
          {
            // now we need to get make sure subject isnt null or empty
            if(this.jwtHelper.decodeToken(this.token).sub != null || '')
              if(!this.jwtHelper.isTokenExpired(this.token))
              {
              this.LoggedInUsername = this.jwtHelper.decodeToken(this.token).sub; 
              } 
          }
          else 
          {
          this.logOut();
          return false;
          } 
        }*/
        isTokenExpired(): Boolean
{
return this.helper.isTokenExpired(this.token); }
}
