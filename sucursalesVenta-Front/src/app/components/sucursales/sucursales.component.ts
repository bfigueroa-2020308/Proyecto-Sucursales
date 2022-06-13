import { Component, OnInit } from '@angular/core';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import { SucursalModel } from 'src/app/models/sucursal.model';
import { SucursalesRestService } from 'src/app/services/sucursalesRest/sucursales-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent implements OnInit {
  sucursal : SucursalModel;
  sucursales : any;
  identity : any;
  oneSucursal : any;
  constructor(
    private empresaRest : UserRestService,
    private sucursalRest : SucursalesRestService
  ) { 
    this.identity = this.empresaRest.getIdentity()
    this.sucursal = new SucursalModel("","",this.identity._id)
    this.oneSucursal = new SucursalModel("","", this.identity._id)
  }

  ngOnInit(): void {
    this.getSucursales()

  }

  getSucursales(){
    this.sucursalRest.verSucursales().subscribe({
      next:(res:any)=>{this.sucursales = res.sucursales
      console.log(this.getSucursales)},
      error:(err)=>{console.log(err)}
    })
  }

  agregarSucursal(form:any){
    this.sucursalRest.agregarSucursal(this.sucursal).subscribe({
      next:(res:any)=>{console.log(res.message),
      Swal.fire('Listo!',res.message, 'success'),
      this.getSucursales()
      form.reset()},
      error:(err)=>{console.log(err),
      Swal.fire('error',err.error.message||err.error,'error')}
    })
  }

  getOneSucursal(sucursal:{}){
    this.oneSucursal = sucursal;
    console.log(this.oneSucursal)
  }

  deleteSucursal(){
    this.sucursalRest.eliminarSucursal(this.oneSucursal).subscribe({
      next:(res:any)=>{
        console.log(res.message),
        Swal.fire('Listo!', res.message, 'success')
        this.getSucursales();
      },
      error:(err)=>{
        console.log(err.error.message||err.error);
        Swal.fire('ERROR', err.error||err.error.message, 'error');
        }
    })
  }

  actualizarSucursal(){
    this.sucursalRest.actualizarSucursal(this.oneSucursal).subscribe({
      next:(res:any)=>{console.log(res.message),
      Swal.fire('Listo!', res.message, 'success')
      this.getSucursales();},
      error:(err)=>{console.log(err),
      Swal.fire('ERROR!', err.error.message, 'error')}
    })
  }

  obtenerSucursal(){
    this.sucursalRest.verSucursal(this.oneSucursal).subscribe({
      next:(res:any)=>{
        localStorage.setItem('sucursal', JSON.stringify(res.sucursal))
      },
      error:(err)=>{console.log(err)}
    })
  }

}
