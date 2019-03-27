import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateInfoPage } from './estate-info.page';

describe('EstateInfoPage', () => {
  let component: EstateInfoPage;
  let fixture: ComponentFixture<EstateInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstateInfoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
