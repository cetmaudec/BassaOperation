import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Chart } from 'chart.js';

import 'chartjs-plugin-colorschemes';


@Component({
  selector: 'app-maquinaria',
  templateUrl: './maquinaria.component.html',
  styleUrls: ['./maquinaria.component.css']
})
export class MaquinariaComponent implements OnInit {

    maquinaria$: any = [];
	p: number = 1;

	constructor(private http: HttpClient) { }

	ngOnInit() {
		this.getMaquinarias();
	}


	getMaquinarias(){
		this.maquinaria$ = [{idMaq:1, identificacion:'Cepilladora1', tipo:'cepilladora', modelo:'X01'},
							{idMaq:2, identificacion:'Fresadora1', tipo:'fresadora', modelo:'X02'},
							{idMaq:3, identificacion:'Fresadora2', tipo:'fresadora', modelo:'X03'},
							{idMaq:4, identificacion:'Cortadora', tipo:'cortadora', modelo:'X04'},
							{idMaq:5, identificacion:'Torno', tipo:'torno', modelo:'X05'},
							{idMaq:6, identificacion:'Soldadora1', tipo:'soldadora', modelo:'X06'},
							{idMaq:7, identificacion:'Soldadora2', tipo:'soldadora', modelo:'X07'}]
	}

}
