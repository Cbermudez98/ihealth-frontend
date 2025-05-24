// dynamic-table.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicTableComponent } from './dynamic-table.component';
import { ConfirmDialogService } from '../../services/confirmation/confirmation.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { SharedModule } from '../../shared.module';

describe('DynamicTableComponent', () => {
  let component: DynamicTableComponent;
  let fixture: ComponentFixture<DynamicTableComponent>;
  let confirmDialogServiceSpy: jasmine.SpyObj<ConfirmDialogService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ConfirmDialogService', ['confirm']);

    await TestBed.configureTestingModule({
      declarations: [DynamicTableComponent],
      providers: [
        { provide: ConfirmDialogService, useValue: spy },
        ConfirmationService 
      ],
      imports: [
        ConfirmDialogModule,SharedModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicTableComponent);
    component = fixture.componentInstance;
    confirmDialogServiceSpy = TestBed.inject(ConfirmDialogService) as jasmine.SpyObj<ConfirmDialogService>;
  });

  it('Should order items by asc', () => {
    component.headers = {
      columns: [],
      data: [
        { id: 2, name: 'Carlos' },
        { id: 1, name: 'Ana' }
      ],
      actions: {}
    };

    component.sortData('name', true);

    expect(component.headers.data[0]['name']).toBe('Ana');
    expect(component.headers.data[1]['name']).toBe('Carlos');
  });

  it('Should order items by desc', () => {
    component.headers = {
      columns: [],
      data: [
        { id: 2, name: 'Carlos' },
        { id: 1, name: 'Ana' }
      ],
      actions: {}
    };

    component.sortData('name', false);

    expect(component.headers.data[0]['name']).toBe('Carlos');
    expect(component.headers.data[1]['name']).toBe('Ana');
  });
});
