import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequestPageComponent } from './service-request-page.component';

describe('ServiceRequestPageComponent', () => {
  let component: ServiceRequestPageComponent;
  let fixture: ComponentFixture<ServiceRequestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceRequestPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
