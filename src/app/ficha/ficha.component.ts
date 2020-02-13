import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.css']
})
export class FichaComponent implements OnInit {

  ordenTrabajo$: any = [];
  p: number = 1;

  constructor(private router: Router, private http:HttpClient) { }

  ngOnInit() {
    this.getClientes();
  }

  getClientes(){
    
    this.http.get('http://localhost:426/orden-trabajo/join/cliente/orderby/desc').subscribe(resp =>
      this.ordenTrabajo$ = resp as []
      );
  }

  gotoDetails(ordenTrabajoId: any) {
    this.router.navigate(['/ordentrabajo/', ordenTrabajoId]);
  }

  GenerarOT(){
    this.router.navigate(['/ordentrabajo/nueva',0]);
  }

}
