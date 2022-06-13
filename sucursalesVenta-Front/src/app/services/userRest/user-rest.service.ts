import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { identity } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/*
export class UserRestService {
  httpOptions = new HttpHeaders({}).set('Content-Type', 'application/json', 'Authorization': this.getToken() );
*/
export class UserRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.getToken()
  })
  constructor(
    private http: HttpClient

    ) { }

  register(params:{}){
    return this.http.post(environment.baseUrl + 'Empresa/agregarEmpresa', params, {headers: this.httpOptions});
  }

  login(params:{}){
    return this.http.post(environment.baseUrl + 'Empresa/login', params, {headers: this.httpOptions});
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

  getEmpresas(){
    return this.http.get(environment.baseUrl + 'empresa/verEmpresas',{headers:this.httpOptions});
  }

  getEmpresa(params:any){
    return this.http.get(environment.baseUrl + 'empresa/verEmpresa/' + params._id, {headers: this.httpOptions});
  }

  actualizarEmpresa(params:any){
    return this.http.put(environment.baseUrl + 'empresa/actualizarEmpresa/' + params._id, params,{headers:this.httpOptions});
  }

  eliminarEmpresa(params:any){
    return this.http.delete(environment.baseUrl+'empresa/eliminarEmpresa/' + params._id, {headers: this.httpOptions});
  }

  enviarProducto(params:any){
    return this.http.post(environment.baseUrl+'empresa/enviarProducto/'+ params.sucursal, params, {headers:this.httpOptions});
  }

}
