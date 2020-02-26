import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaquinariaComponent } from './add-maquinaria.component';

describe('AddMaquinariaComponent', () => {
  let component: AddMaquinariaComponent;
  let fixture: ComponentFixture<AddMaquinariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMaquinariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMaquinariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
