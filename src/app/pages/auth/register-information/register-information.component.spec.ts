import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInformationComponent } from './register-information.component';

describe('RegisterInformationComponent', () => {
  let component: RegisterInformationComponent;
  let fixture: ComponentFixture<RegisterInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
