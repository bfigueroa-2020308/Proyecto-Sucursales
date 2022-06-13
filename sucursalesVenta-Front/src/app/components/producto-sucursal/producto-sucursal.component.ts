import { Component, OnInit } from '@angular/core';
import { ProductoSucursalModel } from 'src/app/models/productoSucursal.model';
import { ProductoSucursalRestService } from 'src/app/services/productoSucursal/producto-sucursal-rest.service';
import { SucursalesRestService } from 'src/app/services/sucursalesRest/sucursales-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-sucursal',
  templateUrl: './producto-sucursal.component.html',
  styleUrls: ['./producto-sucursal.component.css']
})
export class ProductoSucursalComponent implements OnInit {
  productos : any;
  identity: any;
  sucursal: any;
  oneProducto : any;
  
  constructor(
    private sucursalRest : SucursalesRestService,
    private productoRest : ProductoSucursalRestService
  ) { 
    this.identity = this.sucursalRest.getIdentity();
    this.sucursal = this.sucursalRest.obtenerSucursal();
    this.oneProducto = new ProductoSucursalModel("",0,0,"");
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this.productoRest.verProductos(this.sucursal).subscribe({
      next:(res:any)=>{this.productos = res.productos},
      error:(err)=>{console.log(err)}
    })
  }

  getOneProducto(producto:{}){
    this.oneProducto = producto;
    console.log(this.oneProducto);
  }

  eliminarProducto(){
    this.productoRest.eliminarProducto(this.oneProducto._id).subscribe({
      next:(res:any)=>{Swal.fire('Listo!', res.message, 'success')
        this.obtenerProductos()},
      error:(err)=>{console.log(err);
        Swal.fire('ERROR', err.error.message||err.error,'error')}
    })
  }

  actualizarProducto(){
    this.productoRest.actualizarProducto(this.oneProducto).subscribe({
      next:(res:any)=>{console.log(res),
        Swal.fire('Listo!', res.message, 'success')
        this.obtenerProductos()
      },
      error:(err)=>{console.log(err),
        Swal.fire('ERROR', err.error.message||err.error, 'error')
      }
    })
  }

}
