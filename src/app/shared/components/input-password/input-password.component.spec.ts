import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputPasswordComponent } from './input-password.component';
import { SharedModule } from '../../shared.module';

describe('InputPasswordComponent', () => {
  let component: InputPasswordComponent<any>;
  let fixture: ComponentFixture<InputPasswordComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputPasswordComponent],
      imports: [SharedModule]

    })
    .compileComponents();

    fixture = TestBed.createComponent(InputPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
