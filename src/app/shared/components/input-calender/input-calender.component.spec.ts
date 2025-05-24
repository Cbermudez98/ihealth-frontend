import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCalenderComponent } from './input-calender.component';
import { SharedModule } from '../../shared.module';

describe('InputCalenderComponent', () => {
  let component: InputCalenderComponent<any>;
  let fixture: ComponentFixture<InputCalenderComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputCalenderComponent],
      imports: [SharedModule]

    })
    .compileComponents();

    fixture = TestBed.createComponent(InputCalenderComponent<any>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
