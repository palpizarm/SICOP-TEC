import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTenderComponent } from './history-tender.component';

describe('HistoryTenderComponent', () => {
  let component: HistoryTenderComponent;
  let fixture: ComponentFixture<HistoryTenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryTenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
