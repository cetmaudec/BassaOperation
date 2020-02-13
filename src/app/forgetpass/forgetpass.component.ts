import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from'sweetalert2'
import { AuthService } from '../auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent implements OnInit {

	questionPassForm: FormGroup;
	user: any;
	user$:any = [];
	forgetpas$:any = [];

	users:any = [];
	getIntentos: any = [];
	userUpdate: any;

	displayDate: any;
	anio: any;
	mes: any;
	dia: any;

	constructor(private activatedRoute: ActivatedRoute, public formBuilder: FormBuilder, private router: Router, private http: HttpClient) { 
		this.user = this.activatedRoute.snapshot.paramMap.get('user');
		this.displayDate = new Date();
		this.anio = this.displayDate.getFullYear();
		this.mes = this.displayDate.getMonth()+1;
		this.dia = this.displayDate.getDate();
		if(this.mes<=9){
			this.mes = '0'+this.mes;
		}
	}

	async ngOnInit() {
		this.questionPassForm = this.formBuilder.group({
	  		question1:['', Validators.required],
	  		question2:['', Validators.required],
	  		question3:['', Validators.required]
	  	})
	  	this.user$ = await this.getUsers();
	  //	this.forgetpas$ = await this.getTry();
	}


	async getUsers(){
		this.user$ = await this.http.get('http://localhost:426/users').toPromise();
		for(let us of this.user$.data){
			this.users.push(us.usuario);
		}
		return this.user$;
	}

	async getTry(){
		this.forgetpas$ = await this.http.get('http://localhost:426/forgetpass/'+this.user).toPromise();
		for(let us of this.forgetpas$.data){
			if(us.fecha_cambio == this.anio+"-"+this.mes+"-"+this.dia){
				return us.intentos;
			}		
		}
	}

	async AnswerQuestion(question1:any, question2:any, question3:any){
		var correct = 0;
		for(let us of this.user$.data){
			if(question1 == us.question1){
				correct++;
			}
			if(question2 == us.question2){
				correct++;
			}
			if(question3 == us.question3){
				correct++;
			}
		}
		return correct;
	}



	async forgetPassQuestion(){
		var correctAnswer = await this.AnswerQuestion(this.questionPassForm.get('question1').value,this.questionPassForm.get('question2').value,this.questionPassForm.get('question3').value);
		var intentos= await this.getTry();
		console.log(correctAnswer);
		console.log(intentos);
		console.log("enter 1");
			this.userUpdate = {
				'user': this.user
			}
			this.http.put('http://localhost:426/forgetpass/update', this.userUpdate, {responseType: 'text'}).subscribe(							
				(response) => {
					console.log('response from post data is ', response);
				},
				(error)=>{
					console.log('error during post is ', error)
				}
			)

		intentos = intentos+1;
		if(correctAnswer == 3 && intentos<= 3){
			this.router.navigate(['/forgetpass/password/', this.user]);
		}else if(correctAnswer!= 3 && intentos == 3){
			this.userUpdate = {
				'user': this.user
			}
			this.http.put('http://localhost:426/user/delete', this.userUpdate, {responseType: 'text'}).subscribe(							
				response => Swal.fire({
  				icon: 'warning',
  				title: 'Ha superado los intentos por recuperar su contraseña!',
  				text: 'Como medida de seguridad su cuenta ha sido eliminada.',
  				confirmButtonText: 'Ok!'
  				}).then((result) => {
  					if (result.value) {
  						this.router.navigate([''])
  					}
  				})
  			); 
		}else{
			Swal.fire({
  				icon: 'error',
  				title: 'Oops...',
  				text: 'No ha respondido correctamente las preguntas!\n Respuestas correctas '+correctAnswer+'/3 \n Intento '+intentos+'/3'
			})
		}

	}		
}

