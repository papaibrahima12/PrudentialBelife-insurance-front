import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/admin/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { AuthGuardGuard } from 'src/app/guards/auth-guard.guard';
import { UsersComponent } from 'src/app/pages/users/users.component';
import { UserResolverResolver } from 'src/app/pages/users/user.resolver';
import { ViewFolderComponent } from 'src/app/pages/users/folders/view-folder/view-folder.component';
import { FoldersComponent } from 'src/app/pages/users/folders/folders.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboardAdmin',   component: DashboardComponent, canActivate: [AuthGuardGuard]},
    { path: 'user-profile',  component: UserProfileComponent },
    { path: 'users',         component: UsersComponent, resolve:{nodes: UserResolverResolver} },
    { path: 'folders',       component: FoldersComponent },
    { path: 'dossier/:id',      component: ViewFolderComponent },


];
