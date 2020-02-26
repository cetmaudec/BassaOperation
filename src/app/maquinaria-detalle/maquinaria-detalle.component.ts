import { NgModule, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';
import Swal from'sweetalert2';


@Component({
  selector: 'app-maquinaria-detalle',
  templateUrl: './maquinaria-detalle.component.html',
  styleUrls: ['./maquinaria-detalle.component.css']
})
export class MaquinariaDetalleComponent implements OnInit {

	id: any;
	Maq$: any = [];
	OT_Maq$: any = [];
	time$: any = [];

	p: number = 1;


	constructor(private activatedRoute: ActivatedRoute, private router: Router, private http:HttpClient) {
		this.id = this.activatedRoute.snapshot.paramMap.get('id');

	}

	async ngOnInit() {
   		var ready = await this.getData();
	}

	async getData(){
		this.http.get('http://localhost:426/maquina/select/'+this.id).subscribe(
      		resp => this.Maq$ = resp as []
    	);
    	this.http.get('http://localhost:426/ot/maquina/select/'+this.id).subscribe(
      		resp => this.OT_Maq$ = resp as []
    	);
    	this.http.get('http://localhost:426/ot/maquina/sum/time/'+this.id).subscribe(
      		resp => this.time$ = resp as []
    	);
    	return true;
	}


  gotoDetailsOT(idOT: any) {
    console.log(idOT);
    this.router.navigate(['/ordentrabajo/', idOT]);
  }


}
