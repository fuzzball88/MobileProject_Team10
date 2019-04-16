import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvermapPage } from './overmap.page';

describe('OvermapPage', () => {
  let component: OvermapPage;
  let fixture: ComponentFixture<OvermapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvermapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvermapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
