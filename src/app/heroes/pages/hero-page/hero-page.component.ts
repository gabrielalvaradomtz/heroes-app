import { Hero } from './../../interfaces/hero.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { HeroesService } from './../../services/heroes.service';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {
  
  public hero?: Hero;

  constructor( 
    private heroesService: HeroesService,
    private activadedRoute: ActivatedRoute,
    private router: Router
  ) {};

  ngOnInit(): void {
    this.activadedRoute.params
      .pipe(
        //delay(5000),
        switchMap( ({ id }) => this.heroesService.getHeroById( id )),
      )
      .subscribe( hero => {
        if ( !hero ) return this.router.navigate([ '/heroes/list' ]);
        
        this.hero = hero;
        console.log({ hero });
        return;
      })
  }

  goBack() {
    this.router.navigateByUrl('/heroes/list');
  }
}
