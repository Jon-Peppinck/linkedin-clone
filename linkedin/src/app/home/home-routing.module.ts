import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { ConnectionProfileComponent } from './components/connection-profile/connection-profile.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      { path: '', component: UserProfileComponent },
      {
        path: ':id',
        component: ConnectionProfileComponent,
      },
      {
        path: 'chat/connections',
        component: ChatComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
