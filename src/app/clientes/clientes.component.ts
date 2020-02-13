import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Chart } from 'chart.js';
import { Router, RouterModule } from '@angular/router';


import 'chartjs-plugin-colorschemes';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

	cliente$: any = [];
	p: number = 1;

	constructor(private http: HttpClient, private router: Router) { }

	ngOnInit() {
		this.getClientes();
	}

	getClientes(){
		this.http.get('http://localhost:426/cliente').subscribe(resp => 
			this.cliente$ = resp as []
			);	
	}

	gotoDetails(clienteId: any) {
		console.log(clienteId);
		this.router.navigate(['/cliente/', clienteId]);
	}
}
