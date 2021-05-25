import { Component, OnInit } from '@angular/core';
import { SalveUsers } from 'src/app/model/salveUsers.mode';
import { RegisterUserServiceService } from 'src/app/register-user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listUser !: SalveUsers[];

  displayedColumns: string[] = ['name', 'cpf', 'logradouro', 'bairro', 'cidade', 'uf'];

  constructor(private registerUserService: RegisterUserServiceService) { }

  ngOnInit(): void {
    this.buscaUsers();
  }

  buscaUsers(){
    return this.registerUserService.buscaUsers()
      .subscribe((
        data => {
          this.listUser = data;
          console.log("Retorno");
          console.log(this.listUser);
        }
      ));
  }

}
