import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDistrictPage } from './search-district.page';

describe('SearchDistrictPage', () => {
  let component: SearchDistrictPage;
  let fixture: ComponentFixture<SearchDistrictPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDistrictPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDistrictPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
