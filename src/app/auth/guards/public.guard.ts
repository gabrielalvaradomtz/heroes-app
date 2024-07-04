
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, UrlSegment, RouterStateSnapshot } from "@angular/router";
import { Observable, tap, map } from "rxjs";
import { AuthService } from './../services/auth.services';

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanMatch, CanActivate {

    constructor( 
        private authService: AuthService,
        private router: Router, 
    ) { } 

    private checkAuthStatus(): boolean | Observable<boolean> {

        return this.authService.checkAuthentication()
            .pipe(
                tap( isAuthenticated => console.log('Authenticated: ', isAuthenticated) ),
                tap( isAuthenticated => {
                    if ( isAuthenticated ) {
                        this.router.navigate(['./']);
                    }
                }),
                map( isAuthenticated => !isAuthenticated )
            )
        ;

    }

    canMatch(route: Route, segments: UrlSegment[]): Observable<boolean>|boolean {
        console.log('Can Match');
        console.log({ route, segments });

        return this.checkAuthStatus();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
        console.log('Can Activate');
        console.log({ route, state });
        
        return this.checkAuthStatus();
    }
        

}