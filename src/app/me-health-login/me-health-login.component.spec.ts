import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeHealthLoginComponent } from './me-health-login.component';

describe('MeHealthLoginComponent', () => {
  let component: MeHealthLoginComponent;
  let fixture: ComponentFixture<MeHealthLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeHealthLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeHealthLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
