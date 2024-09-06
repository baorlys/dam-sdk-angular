import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamUploadWidgetComponent } from './dam-upload-widget.component';

describe('DamUploadWidgetComponent', () => {
  let component: DamUploadWidgetComponent;
  let fixture: ComponentFixture<DamUploadWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DamUploadWidgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DamUploadWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
