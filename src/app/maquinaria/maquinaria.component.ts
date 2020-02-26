import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { Chart } from 'chart.js';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import 'chartjs-plugin-colorschemes';
import Swal from'sweetalert2';


@Component({
  selector: 'app-maquinaria',
  templateUrl: './maquinaria.component.html',
  styleUrls: ['./maquinaria.component.css']
})
export class MaquinariaComponent implements OnInit {

  Maq$: any = [];
  Tipo$: any = [];

	p: number = 1;
  addmaq:Boolean = false;
  MaqAddform: FormGroup;

  data={
    identificacion:'',
    marca:'',
    modelo:'',
    tipo:''
  };

	constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) { }

	async ngOnInit() {
    this.MaqAddform = this.formBuilder.group({
      identificacion:[''],
      marca:['', Validators.required],
      modelo:['', Validators.required],
      tipo:['', Validators.required],
    });
		this.Maq$ = await this.getMaquina();
    this.Tipo$ = await this.getTipo();
	}

  async getMaquina(){
    this.http.get('http://localhost:426/maquina/select').subscribe(
      (resp) => {
        this.Maq$ = resp as []
      });
  	return this.Maq$;
  }

  async getTipo(){
    this.http.get('http://localhost:426/tipo/maquina/select').subscribe(
      (resp) => {
        this.Tipo$ = resp as []
      });
    return this.Tipo$;
  }

	gotoDetails(MaqId: any) {
		this.router.navigate(['/maquinaria/', MaqId]);
	}

  NuevaMaq(){
    this.addmaq=true;
  }

  SubmitAddMaq(){
    this.data = {
      'identificacion':this.MaqAddform.get('identificacion').value,
      'marca':this.MaqAddform.get('marca').value,
      'modelo':this.MaqAddform.get('modelo').value,
      'tipo':this.MaqAddform.get('tipo').value
    };

    this.http.post('http://localhost:426/maquina/insert', this.data, {responseType: 'text'}).subscribe(
      response =>  Swal.fire({
                icon: 'success',
                title: 'Nueva Máquina!',
                text: 'La nueva maquina ha sido creada exitosamente.',
                confirmButtonText: 'Ok!'
                }).then((result) => {
                  if (result.value) {
                    this.addmaq=false;
                    this.router.navigate(['/maquinaria']);
                  }
                }) ,
        err => Swal.fire({
              icon: 'error',
              title: 'Oops!',
              text: 'Ha ocurrido un error, vuelva a intentarlo'
          })
    );
  }
}
