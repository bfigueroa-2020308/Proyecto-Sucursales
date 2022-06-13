import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoSucursalRestService {
  httpOptions = new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization' : this.getToken()
  })
  constructor(
    private http : HttpClient
  ) { }

  actualizarProducto(params:any){
    return this.http.put(environment.baseUrl + 'ProductoSucursal/actualizarProducto/' + params._id , params , {headers: this.httpOptions});
  }

  eliminarProducto(id:string){
    return this.http.delete(environment.baseUrl + 'ProductoSucursal/eliminarProducto/' + id , {headers:this.httpOptions});
  }

  verProductos(params:any){
    return this.http.get(environment.baseUrl + 'ProductoSucursal/verProductos/'+ params._id,{headers:this.httpOptions});
  }

  verProducto(id: string){
    return this.http.get(environment.baseUrl + 'ProductoSucursal/verProducto/' + id, {headers:this.httpOptions});
  }

  getToken(){
    let globalToken = localStorage.getItem('token');
    let token;
    if(globalToken!=undefined){
      token = globalToken;
    }else{
      token=''
    }
    return token;
  }

}
