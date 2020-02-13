import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { UserforgetpassComponent } from './userforgetpass/userforgetpass.component';
import { ChangepassComponent } from './changepass/changepass.component';
import { AuthGuard } from './auth.guard';


import { HomeComponent } from './home/home.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { MaquinariaComponent } from './maquinaria/maquinaria.component';
import { EstadisticoComponent } from './estadistico/estadistico.component';
import { FichaComponent } from './ficha/ficha.component';
import { FichaIndComponent } from './ficha-ind/ficha-ind.component';
import { ClienteDetalleComponent } from './cliente-detalle/cliente-detalle.component';
import { OrdenTrabajoComponent } from './orden-trabajo/orden-trabajo.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'register', component:RegisterComponent},
  { path: 'forgetpass', component:UserforgetpassComponent },
  { path: 'forgetpass/:user', component: ForgetpassComponent },
  { path: 'forgetpass/password/:user', component: ChangepassComponent },
  {	path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {	path: 'cliente', component: ClientesComponent, canActivate: [AuthGuard] },
  {	path: 'cliente/:id', component: ClienteDetalleComponent, canActivate: [AuthGuard] },
  {	path: 'proveedor', component: ProveedoresComponent, canActivate: [AuthGuard] },
  {	path: 'proveedor/:id', component: ProveedoresComponent, canActivate: [AuthGuard] },
  {	path: 'maquinaria', component: MaquinariaComponent, canActivate: [AuthGuard] },
  {	path: 'estadistico', component: EstadisticoComponent, canActivate: [AuthGuard] },
  { path: 'ordentrabajo', component: FichaComponent, canActivate: [AuthGuard] },
  { path: 'ordentrabajo/:id', component: FichaIndComponent, canActivate: [AuthGuard] },
  { path: 'ordentrabajo/nueva/:id', component: OrdenTrabajoComponent, canActivate: [AuthGuard] },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
