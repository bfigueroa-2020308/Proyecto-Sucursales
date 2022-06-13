import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { GraficaComponent } from './components/grafica/grafica.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductoSucursalComponent } from './components/producto-sucursal/producto-sucursal.component';
import { ProductosEmpresaComponent } from './components/productos-empresa/productos-empresa.component';
import { RegisterComponent } from './components/register/register.component';
import { SucursalesComponent } from './components/sucursales/sucursales.component';
import { EmpresaGuard } from './guards/empresa.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'sucursales', canActivate:[EmpresaGuard] ,component: SucursalesComponent},
  {path: 'sucursales/grafica',canActivate:[EmpresaGuard] ,component: GraficaComponent},
  {path: 'empresas',canActivate:[EmpresaGuard] ,component:EmpresasComponent},
  {path: 'productosEmpresa',canActivate:[EmpresaGuard] ,component: ProductosEmpresaComponent},
  {path: 'sucursales/productosSucursal', canActivate:[EmpresaGuard],component: ProductoSucursalComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
