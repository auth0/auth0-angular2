import { RouterConfig } from '@angular/router';
import { Home } from './home';
import { Ping } from './ping';
import { Profile } from './profile';
import { NoContent } from './no-content';
import { AuthGuard } from './auth/auth.service';

export const routes: RouterConfig = [
  { path: '',      component: Home },
  { path: 'home',  component: Home },
  { path: 'ping', component: Ping },
  { path: 'profile', component: Profile, canActivate: [AuthGuard] },
  { path: '**',    component: NoContent },
];