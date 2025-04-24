import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersmerchComponent } from './usersmerch.component';

describe('UsersmerchComponent', () => {
  let component: UsersmerchComponent;
  let fixture: ComponentFixture<UsersmerchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersmerchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersmerchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
