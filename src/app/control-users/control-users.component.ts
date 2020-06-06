import { Component, OnInit } from '@angular/core';
import { RegistrarUsuario } from '../_service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-control-users',
  templateUrl: './control-users.component.html',
  styleUrls: ['./control-users.component.css']
})
export class ControlUsersComponent implements OnInit {

  allUsers: any[]=[];

  constructor(
    private listasServ: RegistrarUsuario,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getListas();

  }


  getListas(){
  
    this.listasServ.getAllUsers().subscribe(
      res=>{
        this.allUsers= res;
        console.log(this.allUsers);
      }, e=>{
        console.log(e);
      } 
    );
  }

  update(){
    console.log("Actualizar");
  }

  delete(cedula){
    this.listasServ.delete(cedula).subscribe(
      response => {
        alert(response);
      },
      error => {
        console.log(error);
      });
  }

}
