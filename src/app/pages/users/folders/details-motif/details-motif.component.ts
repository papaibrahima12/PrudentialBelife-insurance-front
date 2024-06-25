import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ViewFolderComponent } from '../view-folder/view-folder.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-details-motif',
  templateUrl: './details-motif.component.html',
  styleUrls: ['./details-motif.component.scss']
})
export class DetailsMotifComponent implements OnInit {

  disabled: boolean = true;
  form: FormGroup;
  statusDossier: string = '';
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ViewFolderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.statusDossier = data.status;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      'rejectMotif': ['', Validators.required]
    });
    this.form.get('rejectMotif')?.valueChanges.subscribe(value => {
      this.updateStatusButton();
    });
  }

  reject(){
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Dossier rejeté avec succès',
      timer: 2000
    });
    this.statusDossier = 'Rejeté';
    this.dialogRef.close(this.statusDossier);
  }

  updateStatusButton(): void {
    this.disabled = !this.form.get('rejectMotif')?.value.trim();
  }
}
