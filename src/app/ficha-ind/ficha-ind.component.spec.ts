import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaIndComponent } from './ficha-ind.component';

describe('FichaIndComponent', () => {
  let component: FichaIndComponent;
  let fixture: ComponentFixture<FichaIndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaIndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaIndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
