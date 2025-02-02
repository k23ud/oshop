import { UserService } from './services/user.service';
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private userService: UserService, private auth: AuthService, router: Router) {
    auth.user$.subscribe(user => {
      if(user) {
        userService.save(user);

        let returnUrl : any = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    })
  }

}
