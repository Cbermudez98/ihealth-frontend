import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventsCalendarComponent } from './events-calendar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '../../shared.module';
import { ToastrModule } from 'ngx-toastr';

describe('EventsCalendarComponent', () => {
  let component: EventsCalendarComponent;
  let fixture: ComponentFixture<EventsCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventsCalendarComponent],
      imports: [
        HttpClientTestingModule,
        SharedModule,
        ToastrModule.forRoot() 
      ]  
    }).compileComponents();

    fixture = TestBed.createComponent(EventsCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
