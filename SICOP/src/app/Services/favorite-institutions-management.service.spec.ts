import { TestBed } from '@angular/core/testing';

import { FavoriteInstitutionsManagementService } from './favorite-institutions-management.service';

describe('FavoriteInstitutionsManagementService', () => {
  let service: FavoriteInstitutionsManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteInstitutionsManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
