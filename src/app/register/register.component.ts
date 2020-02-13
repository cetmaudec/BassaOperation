import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from'sweetalert2'
import { AuthService } from '../auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	registerForm: FormGroup;
	newUser:any;


	constructor(public formBuilder: FormBuilder, private router: Router, private http: HttpClient) { 
	
	}

  	async ngOnInit() {
  		this.registerForm = this.formBuilder.group({
	  		name:['', Validators.required],
	  		email:['', Validators.required],
	  		user:['', Validators.required],
	  		password:['', Validators.required],
	  		confirm:['', Validators.required],
	  		question1:['', Validators.required],
	  		question2:['', Validators.required],
	  		question3:['', Validators.required]
	  	})
	}

  	registerUser(){
  		if(this.registerForm.get('password').value==this.registerForm.get('confirm').value){
  			this.newUser = {
  				'name': this.registerForm.get('name').value,
				'email': this.registerForm.get('email').value,
				'user': this.registerForm.get('user').value,
				'password': this.registerForm.get('password').value,
				'confirm': this.registerForm.get('confirm').value,
				'question1': this.registerForm.get('question1').value,
				'question2': this.registerForm.get('question2').value,
				'question3': this.registerForm.get('question3').value				
			};
			this.http.post('http://localhost:426/user/add', this.newUser, {responseType: 'text'}).subscribe(
				response =>  Swal.fire({
  							icon: 'success',
  							title: 'Usuario Registrado existosamente!',
  							confirmButtonText: 'Ok!'
  							}).then((result) => {
  								if (result.value) {
  									this.router.navigate([''])
  								}
  							}) ,
				err => Swal.fire({
  						icon: 'error',
  						title: 'El usuario '+this.registerForm.get('user').value+' ya existe'
  				})
			);
  		}else{
  			Swal.fire({
  				icon: 'error',
  				title: 'Oops...',
  				text: 'La clave ingresada no coinciden!'
			})
	   	}
	}
}	