import { RouterConfig } from '@angular/router';
import { Home } from './home.component';
import { Ping } from './ping.component';
import { Profile } from './profile.component';
import { NoContent } from './no-content';
import { AuthGuard } from './auth.service';

export const routes: RouterConfig = [
  { path: '',      component: Home },
  { path: 'home',  component: Home },
  { path: 'ping', component: Ping },
  { path: 'profile', component: Profile, canActivate: [AuthGuard] },
  { path: '**',    component: NoContent },
];