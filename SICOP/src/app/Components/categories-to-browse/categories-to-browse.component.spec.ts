import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesToBrowseComponent } from './categories-to-browse.component';

describe('CategoriesToBrowseComponent', () => {
  let component: CategoriesToBrowseComponent;
  let fixture: ComponentFixture<CategoriesToBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesToBrowseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesToBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
