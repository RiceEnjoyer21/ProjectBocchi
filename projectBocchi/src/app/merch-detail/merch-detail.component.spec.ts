import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchDetailComponent } from './merch-detail.component';

describe('MerchDetailComponent', () => {
  let component: MerchDetailComponent;
  let fixture: ComponentFixture<MerchDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
