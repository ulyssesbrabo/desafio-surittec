import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ReturnCorreios } from 'src/app/model/return-correios.model';
import { RegisterUserServiceService } from 'src/app/register-user-service.service';
import { SalveUsers } from 'src/app/model/salveUsers.mode';
import { EmaislUsers } from 'src/app/model/emailUsers.model';
import { TypePhone } from 'src/app/model/typePhone.model';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  empForm: FormGroup;

  retornoCorreios !: ReturnCorreios;

  envioDados = new SalveUsers();

  tipoTelefone !: string;

  cellPhone = '(00) 0 0000-0000';
  phone= '(00) 0000-0000';

  phoneMask = '';

  typePhone: TypePhone[] = [
    {value: "residencial", viewValue: 'Residencial'},
    {value: "comercial", viewValue: 'Comercial'},
    {value: "celular", viewValue: 'Celular'}
  ];
 
  constructor(private fb: FormBuilder, private registerUserService: RegisterUserServiceService) {
    this.empForm=this.fb.group({
      employees: this.fb.array([]) ,
    })
  }
 
  ngOnInit() {
    this.empForm = this.fb.group({
      userName: new FormControl(''),
      userCPF: new FormControl(''),
      userCEP: new FormControl(''),
      userLOG: new FormControl(''),
      nameBAR: new FormControl(''),
      userCID: new FormControl(''),
      nameUF: new FormControl(''),
      emailsUser: this.fb.array([]),
      phoneUser: this.fb.array([])
    });

    this.addEmployee();
    this.addEmployeePhone();

  }

  carregarMasck(event:any) {

    const value = event.target.value;
    console.log("Valor selecionado");
    console.log(value);
    this.tipoTelefone = value;
  }

  onPhoneChanged() {
    if (this.empForm.controls['phone'].value.length <= 10) {
      this.phoneMask = this.phone;
    }
    else if (this.empForm.controls['phone'].value.length === 10) {
      this.phoneMask = this.cellPhone;
    }
 
  }

  onSearch(event:any) {
    const value = event.target.value;

    this.buscaCep(value);
  }

  buscaCep(entrada: string) {

    var cep !: number;

    cep = Number(entrada.replace(/[^0-9]/g,''));

    return this.registerUserService.buscarCep(cep)
    .subscribe(
      (data => {
        this.retornoCorreios = data;
        this.empForm.controls['userLOG'].setValue(this.retornoCorreios.logradouro);
        this.empForm.controls['nameBAR'].setValue(this.retornoCorreios.bairro);
        this.empForm.controls['userCID'].setValue(this.retornoCorreios.localidade);
        this.empForm.controls['nameUF'].setValue(this.retornoCorreios.uf);
      })
    )
  };
 
  emailsUser(): FormArray {
    return this.empForm.get('emailsUser') as FormArray;
  }

  phoneUser(): FormArray {
    return this.empForm.get('phoneUser') as FormArray;
  }
 
  newEmployee(): FormGroup {
    return this.fb.group({
      emails: ''
    });
  }

  newEmployeePhone(): FormGroup {
    return this.fb.group({
      phone: ''
    });
  }

  addEmployeePhone() {
    this.phoneUser().push(this.newEmployeePhone());
  }
 
  addEmployee() {
    this.emailsUser().push(this.newEmployee());
  }
 
  removeEmployeePhone(empIndex: number) {
    this.phoneUser().removeAt(empIndex);
  }

  removeEmployee(empIndex: number) {
    this.emailsUser().removeAt(empIndex);
  }
 
  enviarDados() {

    var entrada !: string;

    var cpf !: number;

    entrada = this.empForm.controls['userCPF'].value;

    cpf = Number(entrada.replace(/[^0-9]/g,''));

    this.envioDados.name = this.empForm.controls['userName'].value;
    this.envioDados.cpf = String(cpf);
    this.envioDados.logradouro = this.empForm.controls['userName'].value;
    this.envioDados.bairro = this.empForm.controls['userName'].value;
    this.envioDados.cidade = this.empForm.controls['userName'].value;
    this.envioDados.uf = this.empForm.controls['userName'].value;
    this.envioDados.listEmails = this.empForm.controls['emailsUser'].value;
    this.envioDados.phones
    console.log(this.empForm.value);
  }


}
