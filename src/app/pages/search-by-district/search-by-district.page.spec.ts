import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByDistrictPage } from './search-by-district.page';

describe('SearchByDistrictPage', () => {
  let component: SearchByDistrictPage;
  let fixture: ComponentFixture<SearchByDistrictPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByDistrictPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByDistrictPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
