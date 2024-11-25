import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarBtnComponent } from './sidebar-btn.component';

describe('SidebarBtnComponent', () => {
  let component: SidebarBtnComponent;
  let fixture: ComponentFixture<SidebarBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
