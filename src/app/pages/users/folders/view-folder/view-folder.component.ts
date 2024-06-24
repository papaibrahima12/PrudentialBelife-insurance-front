import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-folder',
  templateUrl: './view-folder.component.html',
  styleUrls: ['./view-folder.component.scss']
})
export class ViewFolderComponent implements OnInit {

  fetchedDossier : any;
  folderId: any;
  patientName : string;
  insuranceForm: FormGroup;
  date = new Date();
  someDetails : any [] = [];



  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private route: ActivatedRoute){
      this.route.params.subscribe(params => {
        const folderIdFromRoute = params['id'];
        this.folderId = folderIdFromRoute;
        console.log(this.folderId);
      });
  }
  ngOnInit() {
    setTimeout(() => {
      this.someDetails =  [
        {
          "nature": "Avez-vous été malade au cours des 5 dernières années ?",
          "isTrue": true,
          "Précisez": "Grippe saisonnière",
          "dateTraitement": "2021-03-15",
          "lieuTraitement": "Clinique Saint-Martin"
        },
        {
          "nature": "Toussez-vous depuis quelques temps avec en plus de la fièvre ?",
          "isTrue": false,
          "Précisez": "",
          "dateTraitement": "",
          "lieuTraitement": ""
        },
        {
          "nature": "Faites-vous souvent la diarrhée ?",
          "isTrue": false,
          "Précisez": "",
          "dateTraitement": "",
          "lieuTraitement": ""
        },
        {
          "nature": "Avez-vous déjà reçu une transfusion de sang ?",
          "isTrue": true,
          "Précisez": "Accident de voiture",
          "dateTraitement": "2019-08-22",
          "lieuTraitement": "Hôpital Général"
        },
        {
          "nature": "Êtes-vous enceinte ?",
          "isTrue": false,
          "Précisez": "",
          "dateTraitement": "",
          "lieuTraitement": ""
        },
        {
          "nature": "Souffrez-vous d'une fatigue prolongée ?",
          "isTrue": true,
          "Précisez": "Anémie",
          "dateTraitement": "2022-07-10",
          "lieuTraitement": "Centre Médical Universitaire"
        },
        {
          "nature": "Souffrez-vous d'une de ces pathologies suivantes : Maladie Cardiovasculaire, VIH, Maladie de sang",
          "isTrue": false,
          "Précisez": "",
          "dateTraitement": "",
          "lieuTraitement": ""
        },
        {
          "nature": "Souffrez-vous d'une de ces pathologies suivantes : Ulcère, maladie psychique, maladie du système nerveux",
          "isTrue": true,
          "Précisez": "Ulcère",
          "dateTraitement": "2023-05-30",
          "lieuTraitement": "Clinique du Parc"
        },
        {
          "nature": "Avez-vous des informations complémentaires sur votre état de santé susceptible de renseigner l'Assureur ?",
          "isTrue": true,
          "Précisez": "Asthme léger",
          "dateTraitement": "2020-11-15",
          "lieuTraitement": "Centre de Santé Communal"
        }
      ]
    }, 1000);
    console.log('some details', this.someDetails)
    this.insuranceForm = this.fb.group({
      agentName: ['John Doe'],
      agentCode: ['ABC123'],
      agency: ['Agency XYZ'],
      visa: ['123456'],
      deliveryMethod: ['email'],
      subscriber: this.fb.group({
        identityType: ['Passport'],
        identityNumber: ['123456789'],
        birthPlace: ['Paris, France'],

        birthDate: ['1990-01-01'],
        maritalStatus: ['married'],
        email: ['john.doe@example.com'],

        phone: ['123-456-7890'],
        mobile: ['456-789-0123'],
        whatsapp: [''],

        postalAddress: ['123 Main St, Anytown, USA'],
        profession: ['Engineer'],
        employer: ['Tech Company Inc'],

        employerPhone: ['789-012-3456'],
        name: ['Doe'],
        firstName: ['John'],
        residence: ['456 Elm St, Anytown, USA'],
      }),
      health: this.fb.group({
        recentIllness: ['no'],
        cough: ['no'],
        diarrhea: ['no'],
        bloodTransfusion: ['no'],
        pregnancy: ['no'],
        prolongedFatigue: ['no'],
        seriousConditions: ['no'],
        otherConditions: ['no'],
        additionalInfo: [''],
      }),
      beneficiaries: this.fb.array([
        this.fb.group({
          name: ['Smith'],
          firstName: ['Jane'],
          address: ['789 Oak St, Anycity, USA'],
          postalAddress: [''],
          filiation: [''],
          birthDate: ['1985-05-05'],
          quotaShare: [''],
          contact: ['789-123-4567'],
        }),
        this.fb.group({
          name: ['Johnson'],
          firstName: ['Bob'],
          address: ['567 Pine St, Anycity, USA'],
          postalAddress: [''],
          filiation: [''],
          birthDate: ['1978-08-08'],
          quotaShare: [''],
          contact: ['567-234-5678'],
        })
      ]),
      coverage: this.fb.group({
        contractStartDate: ['2024-07-01'],
        premium: ['50000'],
        duration: ['5'],
        paymentFrequency: ['monthly'],
        deathCapital: ['1000000'],
        paymentMethod: ['deduction'],
        accountNumber: ['1234567890'],
      }),
    });
    console.log('form : ',this.insuranceForm.get('suscriber'));
    // this.fetchedDossiersById(this.folderId);
  }

  // fetchedDossiersById(id: any){
  //   this.doctorService.getDossiersById(id).pipe().subscribe({
  //     next: (response) => {
  //       this.fetchedDossier = response;
  //       console.log('API Response:', this.fetchedDossier);
  //       const patientId = this.fetchedDossier.results.identification.patient;
  //       this.doctorService.getPatientById(patientId).subscribe((patient) => {
  //         this.patientName = patient.prenom + ' ' + patient.nom;
  //       });
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   });
  // }

    // updateFolder(id:string){
    //   this.doctorService.updateDossierById(id).pipe().subscribe({
    //     next: (response) => {
    //       Swal.fire({
    //         icon: 'success',
    //         title: 'Success',
    //         text: 'Dossier médical mis à jour avec succès',
    //         timer: 1000,
    //       });
    //       window.location.reload();
    //       console.log('Dossier updated successfully:', response);        },
    //     error: (err) => {
    //       Swal.fire({
    //         icon: 'error',
    //         title: 'Error',
    //         text: err.error.message,
    //         timer: 1000,
    //       });
    //       console.log(err);
    //     }
    //   });
    // }


  closeModal(): void {
    this.dialog.closeAll();
  }

  addBeneficiary() {
    const beneficiaries = this.insuranceForm.get('beneficiaries') as FormArray;
    beneficiaries.push(this.fb.group({
      name: [''],
      firstName: [''],
      address: [''],
      postalAddress: [''],
      filiation: [''],
      birthDate: [''],
      quotaShare: [''],
      contact: [''],
    }));
  }

  generateImageUrl(id: string){

  }

}
