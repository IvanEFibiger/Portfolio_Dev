import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { adminAuthGuard } from './admin-auth.guard';
import { AuthService } from '../services/auth.service';

describe('adminAuthGuard', () => {
  let auth: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let loginTree: UrlTree;

  beforeEach(() => {
    auth = jasmine.createSpyObj<AuthService>('AuthService', ['isAuthenticated']);
    loginTree = {} as UrlTree;
    router = jasmine.createSpyObj<Router>('Router', ['createUrlTree', 'navigate']);
    router.createUrlTree.and.returnValue(loginTree);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: auth },
        { provide: Router, useValue: router },
      ],
    });
  });

  it('permite acceder cuando el usuario esta autenticado', () => {
    auth.isAuthenticated.and.returnValue(true);

    const result = TestBed.runInInjectionContext(() => adminAuthGuard({} as never, {} as never));

    expect(result).toBeTrue();
    expect(router.createUrlTree).not.toHaveBeenCalled();
  });

  it('redirige al login cuando el usuario no esta autenticado', () => {
    auth.isAuthenticated.and.returnValue(false);

    const result = TestBed.runInInjectionContext(() => adminAuthGuard({} as never, {} as never));

    expect(result).toBe(loginTree);
    expect(router.createUrlTree).toHaveBeenCalledWith(['/admin/login']);
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
