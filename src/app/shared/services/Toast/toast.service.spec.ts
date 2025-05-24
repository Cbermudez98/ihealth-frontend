import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../../shared.module';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(),SharedModule] 
    });
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
