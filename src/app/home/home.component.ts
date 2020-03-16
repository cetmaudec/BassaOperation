import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Chart } from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import 'chartjs-plugin-colorschemes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	User:any;

    TipoChart1Group$:any = [];
    OT$:any = [];
    PivotData: any[] = [];

	constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) {
		this.User = localStorage.getItem('user');
	}

	async ngOnInit() {		
        this.TipoChart1Group$ = await this.getDataPivotMes();
        this.createChartFlujo();
        this.OT$ = await this.getOT()
	}

	async getDataPivotMes(){
    	this.TipoChart1Group$ = await this.http.get('http://localhost:426/pivot/costo/mes').toPromise();
    	return this.TipoChart1Group$;
  	}

    async getOT(){
        this.OT$ = await this.http.get('http://localhost:426/orden-trabajo/cliente/join').toPromise();
        return this.OT$;
    }

	createChartFlujo(){
    	for(let pivot of this.TipoChart1Group$.data){
            if(pivot.Enero == null ){
                pivot.Enero = 0;
            }
            if(pivot.Febrero == null ){
                pivot.Febrero = 0;
            }
            if(pivot.Marzo == null ){
                pivot.Marzo = 0;
            }
            if(pivot.Abril == null ){
                pivot.Abril = 0;
            }
            if(pivot.Mayo == null ){
                pivot.Mayo = 0;
            }
            if(pivot.Junio == null ){
                pivot.Junio = 0;
            }
            if(pivot.Julio == null ){
                pivot.Julio = 0;
            }
            if(pivot.Agosto == null) {
                pivot.Agosto = 0;
            }
            if(pivot.Septiembre == null ){
                pivot.Septiembre = 0;
            }
            if(pivot.Octubre == null ){
                pivot.Octubre = 0;
            }
            if(pivot.Noviembre == null ){
                pivot.Noviembre = 0;
            }
            if(pivot.Diciembre == null ){
                pivot.Diciembre = 0;
            }
      		this.PivotData.push({
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

    gotoDetails(ordenTrabajoId: any) {
        this.router.navigate(['/ordentrabajo/', ordenTrabajoId]);
    }
}
