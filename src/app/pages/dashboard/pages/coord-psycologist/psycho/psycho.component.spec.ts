import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PsychoComponent } from './psycho.component';
import { SharedModule } from '../../../../../shared/shared.module';

// Importa el token de configuración y las clases necesarias de ngx-toastr:
import { TOAST_CONFIG, ToastrConfig, ToastrModule } from 'ngx-toastr';

describe('PsychoComponent', () => {
  let component: PsychoComponent;
  let fixture: ComponentFixture<PsychoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PsychoComponent],
      imports: [
        HttpClientTestingModule,
        SharedModule,
        ToastrModule.forRoot() 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PsychoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
