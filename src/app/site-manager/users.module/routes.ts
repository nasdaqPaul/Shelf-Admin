import {Routes} from "@angular/router";
import {UsersPageComponent} from "./components/users.page/users-page.component";
import {UsersListComponent} from "./components/users-list/users-list.component";
import {CreateUserPageComponent} from "./components/create-user.page/create-user-page.component";
import {UserDetailsPageComponent} from "./components/user-details.page/user-details.page.component";

export const ROUTES: Routes = [
  {
    path: 'users', component: UsersPageComponent, children: [
      {path: '', component: UsersListComponent},
      {path: 'create', component: CreateUserPageComponent},
      {path: ':id', component: UserDetailsPageComponent}
    ]
  }
]
