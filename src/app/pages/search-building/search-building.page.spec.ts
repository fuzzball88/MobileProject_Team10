import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBuildingPage } from './search-building.page';

describe('SearchBuildingPage', () => {
  let component: SearchBuildingPage;
  let fixture: ComponentFixture<SearchBuildingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBuildingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBuildingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
