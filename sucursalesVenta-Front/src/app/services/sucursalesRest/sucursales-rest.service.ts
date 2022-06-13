import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SucursalesRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization' : this.getToken()
  })
  constructor(
    private http : HttpClient
  ) { }

    agregarSucursal(params: {}){
      return this.http.post(environment.baseUrl + 'Sucursal/agregarSucursal', params, {headers: this.httpOptions});
    }

    actualizarSucursal(params:any){
      return this.http.put(environment.baseUrl + 'Sucursal/actualizarSucursal/' + params._id, params, {headers:this.httpOptions});
    }

    eliminarSucursal(params:any){
      return this.http.delete(environment.baseUrl + 'Sucursal/eliminarSucursal/' + params._id, {headers:this.httpOptions});
    }

    verSucursales(){
      return this.http.get(environment.baseUrl + 'Sucursal/verSucursales', {headers: this.httpOptions});
    }

    verSucursal(params:any){
      return this.http.get(environment.baseUrl + 'Sucursal/verSucursal/' + params._id, {headers:this.httpOptions});
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

    getIdentity(){
      let globalIdentity = localStorage.getItem('identity');
      let identity;
      if(globalIdentity!= undefined){
        identity = JSON.parse(globalIdentity);
      }else{
        identity='';
      } 
      return identity;
    }

    obtenerSucursal(){
      let globalSucursal = localStorage.getItem('sucursal');
      let sucursal;
      if(globalSucursal!= undefined){
        sucursal = JSON.parse(globalSucursal);
      }else{
        sucursal=''
      }
      return sucursal
    }

}
