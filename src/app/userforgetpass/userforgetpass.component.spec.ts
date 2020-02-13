import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserforgetpassComponent } from './userforgetpass.component';

describe('UserforgetpassComponent', () => {
  let component: UserforgetpassComponent;
  let fixture: ComponentFixture<UserforgetpassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserforgetpassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserforgetpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
