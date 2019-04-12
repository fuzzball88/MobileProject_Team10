import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchIntendedUsePage } from './search-intended-use.page';

describe('SearchIntendedUsePage', () => {
  let component: SearchIntendedUsePage;
  let fixture: ComponentFixture<SearchIntendedUsePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchIntendedUsePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchIntendedUsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
