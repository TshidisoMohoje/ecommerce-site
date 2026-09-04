import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Toastc } from './toastc';

describe('Toastc', () => {
  let component: Toastc;
  let fixture: ComponentFixture<Toastc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Toastc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Toastc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
