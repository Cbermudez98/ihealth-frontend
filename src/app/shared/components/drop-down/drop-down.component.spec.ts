import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownComponent } from './drop-down.component';
import { SharedModule } from '../../shared.module';

describe('DropDownComponent', () => {
  let component: DropDownComponent<any>;
  let fixture: ComponentFixture<DropDownComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropDownComponent],
      imports: [SharedModule]

    })
    .compileComponents();

    fixture = TestBed.createComponent(DropDownComponent<any>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
