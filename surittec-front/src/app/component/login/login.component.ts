import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/model/loginUsers.model';
import { ListaPerfil } from 'src/app/model/listaPerfil.model';
import { RegisterUserServiceService } from 'src/app/register-user-service.service';
import { RetornoLogin } from 'src/app/model/returnLogin.mode';
import { RegistroUsersApplication } from 'src/app/model/registerUserAplication.mode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUser = new LoginUser();
  userPerfil = new ListaPerfil();
  listaPerfil = new Array<ListaPerfil>();
  returnLogin = new RetornoLogin();
  registroUser !: RegistroUsersApplication
  returnCriacao !: any;

  constructor(
    private router: Router,
    private registerUserService: RegisterUserServiceService
  ) { }

  ngOnInit(): void {

    this.iniciarUsuarioAdmin();
  }

  iniciarUsuarioAdmin(){
    this.userPerfil.name = "admin";
    this.listaPerfil.push(this.userPerfil);

    this.registroUser = new RegistroUsersApplication();
    this.registroUser.loginUser = "admin"
    this.registroUser.password = "123456"
    this.registroUser.loggedIn = "false"
    this.registroUser.listPerfil = this.listaPerfil

    this.registerUserService.criarUsuariosAplication(this.registroUser).subscribe(
      (data => {
        this.returnCriacao = data;
      })
    )
    this.iniciarUsuarioComum();
  }

  iniciarUsuarioComum(){
    this.userPerfil.name = "comum";
    this.listaPerfil.push(this.userPerfil);

    this.registroUser = new RegistroUsersApplication();
    this.registroUser.loginUser = "comum"
    this.registroUser.password = "123456"
    this.registroUser.loggedIn = "false"
    this.registroUser.listPerfil = this.listaPerfil

    this.registerUserService.criarUsuariosAplication(this.registroUser).subscribe(
      (data => {
        this.returnCriacao = data;
      })
    )
  }

  login (){

    this.userPerfil.name = "";

    this.listaPerfil.push(this.userPerfil);

    this.loginUser.loginUser = this.loginForm.controls['emailFormControl'].value;
    this.loginUser.password = this.loginForm.controls['passwordFormControl'].value;
    this.loginUser.listPerfil = this.listaPerfil;

    console.log("Teste");
    console.log(this.loginUser);

    this.registerUserService.login(this.loginUser).subscribe(
      (data => {
        this.returnLogin = data;
        if(this.returnLogin.status === 'SUCCESS'){
          this.router.navigate(['home']);
        }else{
          this.router.navigate(['']);
        }
        console.log("Retorno login");
        console.log(this.returnLogin);
      })
    )

  }

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

  loginForm = new FormGroup({

    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),

    passwordFormControl: new FormControl('')

  });

  

}
