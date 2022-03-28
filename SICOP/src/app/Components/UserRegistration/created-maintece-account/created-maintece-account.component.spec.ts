import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedMainteceAccountComponent } from './created-maintece-account.component';

describe('CreatedMainteceAccountComponent', () => {
  let component: CreatedMainteceAccountComponent;
  let fixture: ComponentFixture<CreatedMainteceAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedMainteceAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedMainteceAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
