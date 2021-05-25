import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReturnCorreios } from './model/return-correios.model';
import { take, map } from 'rxjs/operators';
import { SalveUsers } from './model/salveUsers.mode';
import { LoginUser } from './model/loginUsers.model';
import { RetornoLogin } from './model/returnLogin.mode';
import { RegistroUsersApplication } from './model/registerUserAplication.mode';

@Injectable({
  providedIn: 'root'
})
export class RegisterUserServiceService {

  URL_CORREIO = "https://viacep.com.br/ws/";

  URL_LOCAL = "http://localhost:8080"

  constructor(private http: HttpClient){}

  public buscarCep(cep: number): Observable<ReturnCorreios>{

      console.log("Meu cep");
      console.log(cep);

      const URL = this.URL_CORREIO + cep + "/json/";

      console.log("Minha URL");
      console.log(URL);

      return this.http.get<ReturnCorreios>(URL).pipe(map((resposta: ReturnCorreios) => resposta),take(1));

  }

  buscaUsers() : Observable<SalveUsers[]>{
      return this.http.get<SalveUsers[]>(this.URL_LOCAL + "/users").pipe(map((resposta: SalveUsers[]) => resposta), take(1));
  }

  login(usuario: LoginUser) : Observable<RetornoLogin>{
    return this.http.post<RetornoLogin>(this.URL_LOCAL + "/usersApplication/login", {user : usuario}).pipe(map((resposta: RetornoLogin) => resposta));
  }

  criarUsuariosAplication(newUser: RegistroUsersApplication): Observable<any>{
    return this.http.post<any>(this.URL_LOCAL + "/usersApplication/register", {usuario : newUser}).pipe(map((resposta: any) => resposta));
  }

  
}
