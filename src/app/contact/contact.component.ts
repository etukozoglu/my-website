import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  contactForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.createForm();
  }

  createForm() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required, Validators.maxLength(100)],
      firstname: ['', [Validators.required, Validators.maxLength(100)]],
      company: ['', Validators.required, Validators.maxLength(100)],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^(?=.{1,64}@)\w+([\.-]?\w+)*@(?=.{4,252}$)\w+([\.-]?\w+)*(\.\w{2,4})+$/)]],
      message: ['', [Validators.required, Validators.maxLength(1000)]]
    });
  }

  isSubmittedSuccessfully = false;

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;

      // Utilisation de HttpClient pour envoyer les données
      this.http.post('URL', formData, {
        headers: { 'Content-Type': 'application/json' }
      }).subscribe({
        next: (response) => {
          console.log('Email envoyé avec succès');
          this.contactForm.reset();
          this.isSubmittedSuccessfully = true;
          alert('Votre message est envoyé !');
        },
        error: (error) => {
          console.error('Erreur lors de l\'envoi de l\'e-mail', error);
          // Gérer les erreurs d'envoi d'e-mail ici
        }
      });
    } else {
      // Afficher des erreurs de validation si le formulaire n'est pas valide
      console.log('Validation errors, please check your inputs!');
      alert('Validation errors, please check your inputs!');
    }
  }
}
