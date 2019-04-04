import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EstateInfoIdPage } from "./estate-info-id.page";

describe("EstateInfoIdPage", () => {
  let component: EstateInfoIdPage;
  let fixture: ComponentFixture<EstateInfoIdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EstateInfoIdPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstateInfoIdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
