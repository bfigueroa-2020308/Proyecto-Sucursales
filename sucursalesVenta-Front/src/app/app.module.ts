import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SucursalesComponent } from './components/sucursales/sucursales.component';
import { GraficaComponent } from './components/grafica/grafica.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { ProductosEmpresaComponent } from './components/productos-empresa/productos-empresa.component';
import { ProductoSucursalComponent } from './components/producto-sucursal/producto-sucursal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    SucursalesComponent,
    GraficaComponent,
    EmpresasComponent,
    ProductosEmpresaComponent,
    ProductoSucursalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
