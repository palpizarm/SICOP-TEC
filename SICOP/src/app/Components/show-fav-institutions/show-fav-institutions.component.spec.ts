import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFavInstitutionsComponent } from './show-fav-institutions.component';

describe('ShowFavInstitutionsComponent', () => {
  let component: ShowFavInstitutionsComponent;
  let fixture: ComponentFixture<ShowFavInstitutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFavInstitutionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFavInstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
