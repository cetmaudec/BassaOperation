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
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {

	changePassForm: FormGroup;
	user:any;
	updateUser: any;


	constructor(private activatedRoute: ActivatedRoute, public formBuilder: FormBuilder, private router: Router, private http: HttpClient, private auth: AuthService) { 
		this.user = this.activatedRoute.snapshot.paramMap.get('user');
	}


	async ngOnInit() {
  		this.changePassForm = this.formBuilder.group({
	  		password:['', Validators.required],
	  		confirm:['', Validators.required]
	  	})
	}


	ChangePass(){
  		if(this.changePassForm.get('password').value==this.changePassForm.get('confirm').value){
  			this.updateUser = {
				'user': this.user,
				'password': this.changePassForm.get('password').value,
				'confirm': this.changePassForm.get('confirm').value				
			};

			this.http.put('http://localhost:426/user/update/pass', this.updateUser, {responseType: 'text'}).subscribe(
				response =>  Swal.fire({
  							icon: 'success',
  							title: 'Clave ha sido cambiada existosamente!',
  							confirmButtonText: 'Ok!'
  							}).then((result) => {
  								if (result.value) {
  									this.router.navigate([''])
  								}
  							}) ,
				err => Swal.fire({
  						icon: 'error',
  						title: 'Ha ocurrido un error, vuelva a intentarlo'
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


	


 	