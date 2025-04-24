import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersticketsComponent } from './userstickets.component';

describe('UsersticketsComponent', () => {
  let component: UsersticketsComponent;
  let fixture: ComponentFixture<UsersticketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersticketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
