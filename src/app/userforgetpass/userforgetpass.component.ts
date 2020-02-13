import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from'sweetalert2'
import { AuthService } from '../auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-userforgetpass',
  templateUrl: './userforgetpass.component.html',
  styleUrls: ['./userforgetpass.component.css']
})
export class UserforgetpassComponent implements OnInit {

	UserforgetPassForm: FormGroup;
	user: any;
	user$:any = [];
	users:any = [];

	constructor(public formBuilder: FormBuilder, private router: Router, private http: HttpClient) { }

	async ngOnInit() {
		this.UserforgetPassForm = this.formBuilder.group({
	  		user:['', Validators.required],
	  	})
	  	this.user$ = await this.getUsers();
	}

	async getUsers(){
		this.user$ = await this.http.get('http://localhost:426/users').toPromise();
		for(let us of this.user$.data){
			this.users.push(us.usuario);
		}
		return this.user$;
	}

	async userExist(user:any){
		console.log(user)
		for(let us of this.user$.data){
			console.log(us.usuario)
			if(user == us.usuario){
				return true;
			}
		}
		return false;
	}


	async UserforgetPass(){
		var exist = await this.userExist(this.UserforgetPassForm.get('user').value);
		console.log(exist);
		if(exist){
			this.user = {
				'user': this.UserforgetPassForm.get('user').value
			}
			this.http.post('http://localhost:426/forgetpass/insert', this.user, {responseType: 'text'}).subscribe(
				response =>  this.router.navigate(['/forgetpass/', this.UserforgetPassForm.get('user').value]),  							
				err => Swal.fire({
  						icon: 'error',
  						title: 'Oops...',
  						text: 'El usuario ingresado no existe!'
  					})
			)
		}else{
			Swal.fire({
  				icon: 'error',
  				title: 'Oops...',
  				text: 'El usuario ingresado no existe!'
			})
		}

	}

}
