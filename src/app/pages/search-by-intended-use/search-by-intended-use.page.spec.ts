import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByIntendedUsePage } from './search-by-intended-use.page';

describe('SearchByIntendedUsePage', () => {
  let component: SearchByIntendedUsePage;
  let fixture: ComponentFixture<SearchByIntendedUsePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByIntendedUsePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByIntendedUsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
