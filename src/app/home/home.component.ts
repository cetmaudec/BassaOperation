import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Chart } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import 'chartjs-plugin-colorschemes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	User:any;
	ordenTrabajoAct$ = [{ordenTrabajo: 'OT01', estadoOT: 'En ejecución', nombre: 'AA', apellido_p: 'PP', apellido_m: 'MM' , iniciada:0, finalizada:0, app:10, na: 5},
	{ordenTrabajo: 'OT02', estadoOT: 'En ejecución', nombre: 'NN1', apellido_p: 'PP1', apellido_m: 'MM1' , iniciada:1, finalizada:9, app:5, na: 5},
	{ordenTrabajo: 'OT03', estadoOT: 'En ejecución', nombre: 'NN2', apellido_p: 'PP2', apellido_m: 'MM2' , iniciada:0, finalizada:4, app:2, na: 5},
	{ordenTrabajo: 'OT04', estadoOT: 'Finalizada', nombre: 'NN3', apellido_p: 'PP3', apellido_m: 'MM3' , iniciada:0, finalizada:10, app:0, na: 4}];
	otPorc: any = [];

	constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
		this.User = localStorage.getItem('user');
	}

	ngOnInit() {
		this.getActOT();
	}

	getActOT(){
		for(const ot of this.ordenTrabajoAct$){
			if(ot.finalizada == 0){
				this.otPorc.push({'orden': ot.ordenTrabajo, 'porcentaje': 0});
			}else{
				this.otPorc.push({'orden': ot.ordenTrabajo, 'porcentaje': (ot.finalizada*100 / (ot.finalizada + ot.iniciada + ot.app)).toPrecision(3)});
			}
		}
	}
}
