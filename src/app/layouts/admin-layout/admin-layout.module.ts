import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ClipboardModule } from 'ngx-clipboard';
import { MatIconModule } from '@angular/material/icon'
import { MatRadioModule } from '@angular/material/radio';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/admin/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from 'src/app/pages/users/users.component';
import { AddUserComponent } from 'src/app/pages/users/add-user/add-user.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatDialogModule } from '@angular/material/dialog';
import { FoldersComponent } from 'src/app/pages/users/folders/folders.component';
import { AddFolderComponent } from 'src/app/pages/users/folders/add-folder/add-folder.component';
import { ViewFolderComponent } from 'src/app/pages/users/folders/view-folder/view-folder.component';
import { DeleteFolderComponent } from 'src/app/pages/users/folders/delete-folder/delete-folder.component';
import { UserService } from 'src/app/services/user.service';
import { DetailsMotifComponent } from 'src/app/pages/users/folders/details-motif/details-motif.component';
import { ViewPieceComponent } from 'src/app/pages/users/folders/view-piece/view-piece.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { ToastrModule } from 'ngx-toastr';
// import {
//   MatFormFieldModule,
//   MatInputModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule,
    ClipboardModule,
    FullCalendarModule,
    MatInputModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatPaginatorModule,
    FontAwesomeModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    UsersComponent,
    FoldersComponent,
    AddUserComponent,
    AddFolderComponent,
    ViewFolderComponent,
    DeleteFolderComponent,
    DetailsMotifComponent,
    ViewPieceComponent

  ],
  providers:[UserService]
})

export class AdminLayoutModule {}
