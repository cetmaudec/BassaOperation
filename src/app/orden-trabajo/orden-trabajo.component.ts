import { NgModule, Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import Swal from'sweetalert2';


@Component({
  selector: 'app-orden-trabajo',
  templateUrl: './orden-trabajo.component.html',
  styleUrls: ['./orden-trabajo.component.css']
})
export class OrdenTrabajoComponent implements OnInit {

  OTform: FormGroup;
  Clienteform: FormGroup;

  estadoCliente = false

  cliente$: any = [];
  tipo$: any = [];
  LastOT$: any = [];

  prueba:any;

  clienteOT = {
      nombre_empresa:null,
      rut_empresa:null,
      nombre:null,
      apellidoPat:null,
      apellidoMat:null,
      rut:null,
      correo:null,
      Dir_calle:null,
      Dir_numero:null,
      Dir_comuna:null,
      Telefono:null,
      Celular:null
  }

  dataOT = {
    nombreCliente:'',
    tipo:'',
    descripcion:'',
    fecha_ingreso:'',
    forma_pago:'',
    monto_cobrado:'',
    pagado: false,
    estado:''
  }

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.OTform = this.formBuilder.group({
      nombreCliente:[''],
      tipo:['', Validators.required],
      descripcion:[''],
      fecha_ingreso:['', Validators.required],
      forma_pago:['', Validators.required],
      monto_cobrado:['', Validators.required],
    });
    this.Clienteform = this.formBuilder.group({
      nombre_empresa:['', Validators.required],
      rut_empresa:['', Validators.required],
      nombre:[''],
      apellidoPat:[''],
      apellidoMat:[''],
      rut:[''],
      correo:['', Validators.required],
      Dir_calle:[''],
      Dir_numero:[''],
      Dir_comuna:['', Validators.required],
      Telefono:[''],
      Celular:['', Validators.required],
    });
  }

  ngOnInit() {
    this.CleanDatos();
    this.getClientes();
    this.getTipos();
  }

  AddClient(){
    this.estadoCliente=true;
  }

  CleanDatos(){
    this.OTform.reset();
    this.Clienteform.reset();
    this.estadoCliente = false
  }

  getClientes(){
    this.http.get('http://localhost:426/cliente').subscribe(resp =>
      this.cliente$ = resp as []
      );
  }

  getTipos(){
    this.http.get('http://localhost:426/tipo').subscribe(resp =>
      this.tipo$ = resp as []
      );
  }



  SubmitOTCliente(){
    if(this.estadoCliente == true){
      this.dataOT = {
        'nombreCliente':this.cliente$.data[0].idCliente+1,
        'tipo':this.OTform.get('tipo').value,
        'descripcion':this.OTform.get('descripcion').value,
        'fecha_ingreso':this.OTform.get('fecha_ingreso').value,
        'forma_pago':this.OTform.get('forma_pago').value,
        'monto_cobrado': this.OTform.get('monto_cobrado').value,
        'pagado': 0,
        'estado': 'No iniciado'
      };
    }else{
      this.dataOT = {
        'nombreCliente':this.OTform.get('nombreCliente').value,
        'tipo':this.OTform.get('tipo').value,
        'descripcion':this.OTform.get('descripcion').value,
        'fecha_ingreso':this.OTform.get('fecha_ingreso').value,
        'forma_pago':this.OTform.get('forma_pago').value,
        'monto_cobrado': this.OTform.get('monto_cobrado').value,
        'pagado': 0,
        'estado': 'No iniciado'
      };
    }

    this.http.post('http://localhost:426/orden-trabajo/insert', this.dataOT, {responseType: 'text'}).subscribe(
      response =>  Swal.fire({
                icon: 'success',
                title: 'Nueva orden de trabajo!',
                text: 'La OT ha sido creada exitosamente.',
                confirmButtonText: 'Ok!'
                }).then((result) => {
                  if (result.value) {
                    this.router.navigate(['/ordentrabajo']);
                  }
                }) ,
        err => Swal.fire({
              icon: 'error',
              title: 'Oops!',
              text: 'Ha ocurrido un error, vuelva a intentarlo'
          })
    );
    this.CleanDatos();      
  }

  SubmitCliente(){
    this.clienteOT = {
      'nombre_empresa':this.Clienteform.get('nombre_empresa').value,
      'rut_empresa':this.Clienteform.get('rut_empresa').value,
      'nombre':this.Clienteform.get('nombre').value,
      'apellidoPat':this.Clienteform.get('apellidoPat').value,
      'apellidoMat':this.Clienteform.get('apellidoMat').value,
      'rut':this.Clienteform.get('rut').value,
      'correo':this.Clienteform.get('correo').value,
      'Dir_calle':this.Clienteform.get('Dir_calle').value,
      'Dir_numero':this.Clienteform.get('Dir_numero').value,
      'Dir_comuna':this.Clienteform.get('Dir_comuna').value,
      'Telefono':this.Clienteform.get('Telefono').value,
      'Celular':this.Clienteform.get('Celular').value
    }


    this.http.post('http://localhost:426/cliente/insert', this.clienteOT, {responseType: 'text'}).subscribe(
      (response) => {

        console.log('response from post data is ', response);
      },
      (error)=>{
        console.log('error during post is ', error);
      }
    );
    this.SubmitOTCliente();
  }
}