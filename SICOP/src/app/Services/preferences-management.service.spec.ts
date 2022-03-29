import { TestBed } from '@angular/core/testing';

import { PreferencesManagementService } from './preferences-management.service';

describe('PreferencesManagementService', () => {
  let service: PreferencesManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreferencesManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
