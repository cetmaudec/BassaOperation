import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticoComponent } from './estadistico.component';

describe('EstadisticoComponent', () => {
  let component: EstadisticoComponent;
  let fixture: ComponentFixture<EstadisticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
