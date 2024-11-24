import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlAsistenciaPage } from './control-asistencia.page';

describe('ControlAsistenciaPage', () => {
  let component: ControlAsistenciaPage;
  let fixture: ComponentFixture<ControlAsistenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
