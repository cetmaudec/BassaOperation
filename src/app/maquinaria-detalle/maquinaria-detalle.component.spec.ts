import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquinariaDetalleComponent } from './maquinaria-detalle.component';

describe('MaquinariaDetalleComponent', () => {
  let component: MaquinariaDetalleComponent;
  let fixture: ComponentFixture<MaquinariaDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaquinariaDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaquinariaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
