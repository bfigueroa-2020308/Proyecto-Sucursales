import { Component, OnInit } from '@angular/core';
import { ProductoEmpresaRestService } from 'src/app/services/productoEmpresa/producto-empresa-rest.service';
import { SucursalesRestService } from 'src/app/services/sucursalesRest/sucursales-rest.service';
import { ProductoEmpresaModel } from 'src/app/models/productoEmpresa.model';
import { UserRestService } from 'src/app/services/userRest/user-rest.service';
import Swal from 'sweetalert2';
import { ProductoSucursalModel } from 'src/app/models/productoSucursal.model';

@Component({
  selector: 'app-productos-empresa',
  templateUrl: './productos-empresa.component.html',
  styleUrls: ['./productos-empresa.component.css']
})
export class ProductosEmpresaComponent implements OnInit {
  producto : ProductoEmpresaModel;
  productoSucursal : ProductoSucursalModel;
  identity : any
  sucursales : any
  productos : any;
  oneProducto :any;
  constructor(
    private sucursalRest : SucursalesRestService,
    private productoRest : ProductoEmpresaRestService,
    private empresaRest : UserRestService
  ) {
    this.identity = this.sucursalRest.getIdentity();
    this.producto = new ProductoEmpresaModel("","",0,this.identity._id);
    this.oneProducto = new ProductoEmpresaModel("","",0,this.identity._id);
    this.productoSucursal = new ProductoSucursalModel("",0,0,"")
     }

  ngOnInit(): void {
    this.getProductos()
    this.getSucursales();
  }

  getSucursales(){
    this.sucursalRest.verSucursales().subscribe({
      next:(res:any)=>{this.sucursales = res.sucursales;
      console.log(this.sucursales)},
      error:(err)=>console.log(err)
    })
  }

  getProductos(){
    this.productoRest.verProductos().subscribe({
      next:(res:any)=>{this.productos = res.productos,
      console.log(res.productos)},
      error:(err)=>{console.log(err)}
    })
  }

  agregarProducto(form:any){
    this.productoRest.agregarProducto(this.producto).subscribe({
      next:(res:any)=>{console.log(res),
      Swal.fire('Listo!', res.message, 'success'),
      this.getProductos()
      form.reset()},
      error:(err)=>{console.log(err),
      Swal.fire('ERROR!', err.error|| err.error.message,'error')}
    })
  }

  getOneProducto(producto:{}){
    this.oneProducto = producto;
    console.log(this.oneProducto);
    this.productoSucursal.producto = this.oneProducto._id,
    this.productoSucursal.stock = this.oneProducto.stock,
    console.log(this.productoSucursal);
  }

  eliminarProducto(){
    this.productoRest.eliminarProducto(this.oneProducto).subscribe({
      next:(res:any)=>{
        Swal.fire('Listo!', res.message, 'success');
        this.getProductos();
      },
      error:(err)=>{
        console.log(err);
        Swal.fire('ERROR', err.error||err.error.message, 'error');
      }
    })
  }

  actualizarProducto(){
    this.productoRest.actualizarProducto(this.oneProducto).subscribe({
      next:(res:any)=>{
        Swal.fire('Listo!', res.message, 'success');
        this.getProductos()
      },
      error:(err)=>{console.log(err),
        Swal.fire('ERROR',err.error||err.error.message,'error');
      }
    })
  }

  enviarProducto(form:{}){
    this.empresaRest.enviarProducto(this.productoSucursal).subscribe({
      next:(res:any)=>{console.log(res),
      Swal.fire("Listo!", res.message, "success")},
      error:(err)=>{console.log(err),
      Swal.fire("ERROR!", err.error.message, "error")}
    })
  }

}
