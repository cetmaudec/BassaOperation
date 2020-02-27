import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Chart } from 'chart.js';
import 'chartjs-plugin-colorschemes';

@Component({
  selector: 'app-estadistico',
  templateUrl: './estadistico.component.html',
  styleUrls: ['./estadistico.component.css']
})
export class EstadisticoComponent implements OnInit {

  	MaxDemanda$: any = [];
  	MesMaxDemanda: string;

  	MaxTipoTrabajo$: any = [];
  	tipoTrabajoLabel: string[] = [];
  	tipoTrabajoCant: number[] = [];

	MaxTipoMaquina$: any = [];
	tipoMaquinaLabel: string[] = [];
	tipoMaquinaCant: number[] = [];

	EstadoGroup$:any = [];
	EstadoLabel: string[] = [];
	EstadoCant: number[] = [];

	IdentificacionMaq$: any = [];
	IdentificacionLabel: string[] = [];
	IdentificacionCant: number[] = [];
	IdentificacionTime: number[] = [];

	TipoChart1Group$: any = [];

  	PivotData: any[] = [];
  
  	costoProducto$: any = [];
  	costoLabel: string[] = [];
  	costoCant: number[] = [];

  	label: any = [];
  	costo: any = [];
  	tiempoEst: any = [];
  	tiempoReal: any = [];
  	ready: Boolean = false;
  	readyInfo: Boolean = false;
    numMaxMes: number = 0;


  	constructor(private http: HttpClient) { }

  	async ngOnInit() { 	
    	this.TipoChart1Group$ = await this.getDataPivtoMes();
      this.MaxDemanda$ = await this.getDataDemanda();
      this.ready = await this.getDataMax();
      this.readyInfo = await this.getInfo();

    	this.createChartFlujo();
    	this.createChartEstado();
    	this.createChartMaquina();
  	}

  	async getDataPivtoMes(){
    	this.TipoChart1Group$ = await this.http.get('http://localhost:426/pivot-tipo-mes').toPromise();
    	return this.TipoChart1Group$;
  	}

  	async getDataDemanda(){
    	this.MaxDemanda$ = await this.http.get('http://localhost:426/demanda/count').toPromise();
      this.numMaxMes = this.MaxDemanda$.data[0].mes;
    	if(this.MaxDemanda$.data[0].mes == 1){
      		this.MesMaxDemanda = 'Enero'
    	}else if(this.MaxDemanda$.data[0].mes == 2){
      		this.MesMaxDemanda = 'Febrero'
   		}else if(this.MaxDemanda$.data[0].mes == 3){
      		this.MesMaxDemanda = 'Marzo'
    	}else if(this.MaxDemanda$.data[0].mes == 4){
     	 	this.MesMaxDemanda = 'Abril'
    	}else if(this.MaxDemanda$.data[0].mes == 5){
      		this.MesMaxDemanda = 'Mayo'
    	}else if(this.MaxDemanda$.data[0].mes == 6){
      		this.MesMaxDemanda = 'Junio'
    	}else if(this.MaxDemanda$.data[0].mes == 7){
      		this.MesMaxDemanda = 'Julio'
    	}else if(this.MaxDemanda$.data[0].mes == 8){
      		this.MesMaxDemanda = 'Agosto'
    	}else if(this.MaxDemanda$.data[0].mes == 9){
      		this.MesMaxDemanda = 'Septiembre'
    	}else if(this.MaxDemanda$.data[0].mes == 10){
      		this.MesMaxDemanda = 'Octubre'
    	}else if(this.MaxDemanda$.data[0].mes == 11){
      		this.MesMaxDemanda = 'Noviembre'
    	}else if(this.MaxDemanda$.data[0].mes == 12){
      		this.MesMaxDemanda = 'Diciembre'
    	}
    	return this.MaxDemanda$;
  	}

  	async getDataMax(){
  		this.MaxTipoTrabajo$ = await this.http.get('http://localhost:426/tipo/trabajo/count').toPromise();
  		this.MaxTipoMaquina$ = await this.http.get('http://localhost:426/tipo/maquina/count').toPromise();
  		this.EstadoGroup$ = await this.http.get('http://localhost:426/orden-trabajo/estado/groupby').toPromise();
  		this.IdentificacionMaq$ = await this.http.get('http://localhost:426/identificacion/maquina/count').toPromise();
  		this.ready = true;
  		return this.ready;
  	}


  	async getInfo(){
  		for(let tipoT of this.MaxTipoTrabajo$.data){
  			this.tipoTrabajoLabel.push(tipoT.tipo);
  			this.tipoTrabajoCant.push(tipoT.cantidad);
  		}
  		for(let tipoM of this.MaxTipoMaquina$.data){
  			this.tipoMaquinaLabel.push(tipoM.tipo);
  			this.tipoMaquinaCant.push(tipoM.cantidad);
  		}
  		for(let st of this.EstadoGroup$.data){
  			this.EstadoLabel.push(st.estado);
  			this.EstadoCant.push(st.cantidad);
  		}
  		for(let st of this.IdentificacionMaq$.data){
  			this.IdentificacionLabel.push(st.identificacion);
  			this.IdentificacionCant.push(st.cantidad);
  			this.IdentificacionTime.push(st.prom);
  		}
  		this.readyInfo = true;
  		return this.readyInfo;
  	}

  	createChartFlujo(){
    	for(let pivot of this.TipoChart1Group$.data){
      		this.PivotData.push(
      		{
        		label: pivot.tipo,
        		data: [pivot.Enero, pivot.Febrero, pivot.Marzo, pivot.Abril, pivot.Mayo, pivot.Junio, pivot.Julio, pivot.Agosto, pivot.Septiembre, pivot.Octubre, pivot.Noviembre, pivot.Diciembre]
      		})
    	}
    	var ctx = document.getElementById("FlowChart");
    	var myLineChart = new Chart(ctx, {
    		type: 'line',
    		data: {
    		  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    		  datasets: this.PivotData
    		},
    		options: {
          scales: {
                yAxes: {
                  type: 'linear',
                  ticks: {
                    min: 0
                  }
                }
          },

    			maintainAspectRatio: false,
    			plugins: {
    				colorschemes: {
    		      		scheme: 'office.Kilter6'
    		    	}
    		  	},
    		  	layout: {
    		    	padding: {
    		      		left: 10,
    		      		right: 25,
    		      		top: 25,
    		      		bottom: 0
    		    	}
    		  	},
	
	    		  	legend: {
	    		  		display: true,
	        	  		position: 'bottom',
	        	  		align: 'center'
	        	  	},
        	}
        });
  	}

  
	createChartEstado(){
		var ctx = document.getElementById('ChartEstado');
    	var myChart = new Chart(ctx, {
    	    type: 'pie',
    	    data: {
    	        labels: this.EstadoLabel,
    	        datasets: [{
    	            data:this.EstadoCant,
    	            borderWidth: 1
    	        }]
    	    },
    	    options: {
    	      maintainAspectRatio: false,
    	      plugins: {
    	        colorschemes: {
    	          scheme: 'office.Marquee6'
    	        }
    	      },
    	      legend: {
    	        display: true,
    	        position: 'right',
    	        align: 'center'
	
	    	      },
	    	      tooltips: {
	    	        backgroundColor: "rgb(255,255,255)",
	    	        bodyFontColor: "#858796",
	    	        borderColor: '#dddfeb',
	    	        borderWidth: 1,
	    	        xPadding: 15,
	    	        yPadding: 15,
	    	        displayColors: false,
	    	        caretPadding: 10,
	    	      },
	    	    }
    	});
  }


	createChartMaquina(){
    	var ctx = document.getElementById("LineChartMaquin");
    	var mixedChart = new Chart(ctx, {
    		type: 'line',
    		data: {
    		    datasets: [{
    		        label: 'Tiempo promedio de uso (min)',
    		        data: this.IdentificacionTime,
    		        yAxisID: 'right-yAxes'
    		    },
    		    {
    		        label: 'Cantidad de veces utilizadas',
    		        data: this.IdentificacionCant,
    		        yAxisID: 'left-yAxes',
    		        type: 'bar'
    		    }],
    		    labels: this.IdentificacionLabel
    		},
    
    		options: {
    			scales: {
    		        yAxes: [{
    		        	id: 'left-yAxes',
    		            type: 'linear',
    		            position: 'left',
    		            ticks: {
    		                min: 0,
                        max: this.IdentificacionCant[0]+3
    		            }
    		        },
    		        {
    		        	id: 'right-yAxes',
    		            type: 'linear',
    		            position: 'right',
    		            ticks: {
    		                min: 0
    		            }
    		        }]
    		    },
    		    plugins: {
    			    colorschemes: {
    	      		scheme: 'office.Marquee6'
    	    	}
    			},
    			legend: {
    				display: true,
    				position: 'bottom',
    				align: 'center'
        		},
        	}
        });
  	}

}
