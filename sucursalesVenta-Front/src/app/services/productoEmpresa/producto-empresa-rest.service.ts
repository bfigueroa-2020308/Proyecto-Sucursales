import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoEmpresaRestService {
  httpOptions = new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization': this.getToken()
  })
  constructor(
    private http : HttpClient
  ) { }

    agregarProducto(params:{}){
      return this.http.post(environment.baseUrl+ 'ProductoEmpresa/agregarProducto', params, {headers:this.httpOptions});
    }

    actualizarProducto(params:any){
      return this.http.put(environment.baseUrl+'ProductoEmpresa/actualizarProducto/'+ params._id, params, {headers:this.httpOptions});
    }

    eliminarProducto(params:any){
      return this.http.delete(environment.baseUrl+'ProductoEmpresa/eliminarProducto/'+ params._id, {headers:this.httpOptions});
    }

    verProductos(){
      return this.http.get(environment.baseUrl + 'ProductoEmpresa/verProductos', {headers: this.httpOptions});
    }

    verProducto(parmas:any){
      return this.http.get(environment.baseUrl + 'ProductoEmpresa/verProducto/' + parmas.any, {headers: this.httpOptions});
    }

    buscarProducto(params:{}){
      return this.http.post(environment.baseUrl + 'ProductoEmpresa/buscarProductos', params, {headers:this.httpOptions});
    }

    buscarProductoMayor(){
      return this.http.get(environment.baseUrl + 'ProductoEmpresa/productosMayor', {headers: this.httpOptions});
    }

    buscarProductoMenor(){
      return this.http.get(environment.baseUrl + 'ProductoEmpresa/productosMenor', {headers:this.httpOptions});
    }

    getToken(){
      let globalToken = localStorage.getItem('token');
      let token
      if(globalToken != undefined){
        token = globalToken;
      }else{
        token = ''
      }
      return token;
    }

}
