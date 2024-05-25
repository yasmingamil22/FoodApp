/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HaveCodeComponent } from './have-code.component';

describe('HaveCodeComponent', () => {
  let component: HaveCodeComponent;
  let fixture: ComponentFixture<HaveCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaveCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaveCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
