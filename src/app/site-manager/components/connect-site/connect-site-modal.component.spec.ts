import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectSiteModalComponent } from './connect-site-modal.component';

describe('ConnectSiteComponent', () => {
  let component: ConnectSiteModalComponent;
  let fixture: ComponentFixture<ConnectSiteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnectSiteModalComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectSiteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
