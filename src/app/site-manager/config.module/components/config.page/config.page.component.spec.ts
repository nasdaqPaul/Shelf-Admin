import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Config.PageComponent } from './config.page.component';

describe('Config.PageComponent', () => {
  let component: Config.PageComponent;
  let fixture: ComponentFixture<Config.PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Config.PageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Config.PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
