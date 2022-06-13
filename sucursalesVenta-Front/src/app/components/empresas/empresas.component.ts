import { Component, OnInit } from '@angular/core';
import { BusinessModel } from 'src/app/models/business.model';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
  empresa : BusinessModel;
  empresas: any;
  oneEmpresa : any;
  constructor(
    private empresaRest : UserRestService
  ) {
    this.empresa = new BusinessModel('','','','','','','');
    this.oneEmpresa = new BusinessModel('','','','','','','');
   }

  ngOnInit(): void {
    this.getEmpresas();
  }

  getEmpresas(){
    return this.empresaRest.getEmpresas().subscribe({
      next:(res:any)=>{this.empresas = res.empresas},
      error:(err)=>{console.log(err)}
    })
  }

  register(registerForm:any){
    this.empresaRest.register(this.empresa).subscribe({
      next: (res:any)=>{
      Swal.fire('Listo!', res.message, 'success');
        this.getEmpresas()
      },
      error: (err)=> {
        registerForm.reset();
        return Swal.fire('Error',err.error||err.error.message,'error')
      }
    })
  }

  getOneEmpresa(empresa:any){
    this.oneEmpresa=empresa;
  }

  eliminarEmpresa(){
    if(this.oneEmpresa.role!='ADMIN'){ 
      this.empresaRest.eliminarEmpresa(this.oneEmpresa).subscribe({
        next:(res:any)=>{
          Swal.fire('Listo!', res.message, 'success');
          this.getEmpresas();
        },
        error:(err)=>{
          Swal.fire('Error', err.error.message, 'error');
        }
      })
   }else{
    Swal.fire('ERROR!','NO PUEDES ELIMINAR ESTE REGISTRO', 'error');
   }
  }

  actualizarEmpresa(){
    this.empresaRest.actualizarEmpresa(this.oneEmpresa).subscribe({
      next:(res:any)=>{console.log(res)
      this.getEmpresas()},
      error:(err)=>Swal.fire('ERROR', err.error.message, 'error')
    })
  }

}
