import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import { RegistrarUsuario } from '../_service';

@Component({
  selector: 'app-registrar-users',
  templateUrl: './registrar-users.component.html',
  styleUrls: ['./registrar-users.component.css']
})
export class RegistrarUsersComponent implements OnInit {

  users: User;
  form : FormGroup;
  formSumitted = false;
  newUser: any;
  datosForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private listasServ: RegistrarUsuario
  ) { }

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      name: [''],
      Surname: [''],
      Address: [''],
      Phone: [''],
      Id: [''],
      Cargo: ['']
    });

    //definimos un nuevo objeto JSON.
    this.newUser={
      "nombre": "",
      "apellido": "",
      "direccion": "",
      "telefono": "",
      "cedula": "",
      "cargo": ""
    };
  }

  
  


  openDialog() {
    this.dialog.open(DialogComponent, {
      panelClass: 'my-class'
    });
  }


  //Validacion del formulario de datos personales.
onInformationSubmit(){
  this.formSumitted = true;
  if (this.form.invalid) {
    return;
  }
  this.Submit();
 }

 Submit(){
    this.datosForm = this.form.value;
    //enviaremos el objeto JSON para consumir el servicio al backend.
    this.newUser.nombre= this.datosForm.name;
    this.newUser.apellido = this.datosForm.Surname;
    this.newUser.direccion = this.datosForm.Address;
    this.newUser.telefono = this.datosForm.Phone;
    this.newUser.cedula = this.datosForm.Id;
    this.newUser.cargo = this.datosForm.Cargo;

    let json = JSON.stringify(this.newUser);
    console.log(json);

    this.listasServ.setNewUser(this.newUser).subscribe(
      response =>{
        if(response.error && response.error.codigo){
          console.log("error al registrar usuario");
          return;
        }
              this.openDialog();
      }, e =>{
          console.log(e);
      }
    )
 }

}

