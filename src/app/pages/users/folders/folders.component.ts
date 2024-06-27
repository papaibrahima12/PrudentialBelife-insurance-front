import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFolderComponent } from './add-folder/add-folder.component';
import { ViewFolderComponent } from './view-folder/view-folder.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss']
})
export class FoldersComponent implements OnInit {

  folders: any;
  patientsNames:any;
  viewCom: ViewFolderComponent
  status: string = 'En traitement';

  constructor(private dialog: MatDialog, private router:Router){}
  ngOnInit() {
    this.fetchedDossiers();
  }

  openDialog(){
    this.dialog.open(AddFolderComponent);
  }
  fetchedDossiers(){
    // this.doctorService.getAllDossiers().subscribe(
    //   (response) =>{
    //     this.folders = response.results;
    //     console.log('reponse',this.folders);
    //   },
    //   (error) =>{
    //     console.log(error);
    //   }
    // )
  }

  viewDetails(){
    // const selectedFolder = this.folders.find(folder => folder._id === folderId);
    // if (selectedFolder) {
     const dialogRef = this.dialog.open(ViewFolderComponent, {
        autoFocus: true,
        data: {status: this.status, parentDialogRef: this.dialog }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.status = result;
          console.log('Dialog closed with status:', this.status);
        }
      });
    }

    viewFolderDetails(folderId: string) {
      this.router.navigate(['/home/dossier', folderId]);
    }

  }
