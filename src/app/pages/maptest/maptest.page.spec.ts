import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaptestPage } from './maptest.page';

describe('MaptestPage', () => {
  let component: MaptestPage;
  let fixture: ComponentFixture<MaptestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaptestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaptestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
