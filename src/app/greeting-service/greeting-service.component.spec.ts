import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetingServiceComponent } from './greeting-service.component';

describe('GreetingServiceComponent', () => {
  let component: GreetingServiceComponent;
  let fixture: ComponentFixture<GreetingServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreetingServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreetingServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
