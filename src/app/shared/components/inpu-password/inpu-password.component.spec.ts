import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InpuPasswordComponent } from './inpu-password.component';

describe('InpuPasswordComponent', () => {
  let component: InpuPasswordComponent;
  let fixture: ComponentFixture<InpuPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InpuPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InpuPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
