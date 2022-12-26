import { TestBed } from '@angular/core/testing';

import { UserAuthentificatedGuard } from './user-authentificated.guard';

describe('UserAuthentificatedGuard', () => {
  let guard: UserAuthentificatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserAuthentificatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
