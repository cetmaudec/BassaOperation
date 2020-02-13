import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Chart } from 'chart.js';
import { Router, RouterModule } from '@angular/router';

import 'chartjs-plugin-colorschemes';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  	proveedore$: any = [];
	p: number = 1;

	constructor(private http: HttpClient, private router: Router) { }

	ngOnInit() {
		this.getProveedores();
	}

	getProveedores(){
		this.proveedore$ = [{idProv:1, nombreEmpresa:'PROV_AAA', email:'aaa.p222@gmail.com', celular:'9911223331', tipo:'Herramientas'},
							{idProv:2, nombreEmpresa:'PROV_BBB', email:'BBB.prv@ejemplo.cl', celular:'9988776655', tipo:'Metal'},
							{idProv:3, nombreEmpresa:'PROV_EEE', email:'eee_prov@gmail.com', celular:'3534534632', tipo:'Otros'}]
	}

	gotoDetails(ProveeId: any) {
		this.router.navigate(['/proveedor/', ProveeId]);
	}
}
