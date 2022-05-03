import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFavTendersComponent } from './show-fav-tenders.component';

describe('ShowFavTendersComponent', () => {
  let component: ShowFavTendersComponent;
  let fixture: ComponentFixture<ShowFavTendersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFavTendersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFavTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
