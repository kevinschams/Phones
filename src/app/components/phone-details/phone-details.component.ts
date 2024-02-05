import { Component, Input, OnInit, inject } from '@angular/core';
import { Phone } from '../../models/phone';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PhoneDataService } from '../../services/phone-data.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-phone-details',
  standalone: true,
  imports: [NgIf],
  templateUrl: './phone-details.component.html',
  styleUrl: './phone-details.component.css'
})
export class PhoneDetailsComponent {
  private router = inject(Router);
  private phoneService = inject(PhoneDataService);

  @Input() phone: Phone | null = null;

  public select(phone : Phone){
    // place into vehicle service
    this.phoneService.select(phone);

    // navigate to vehicle page
    this.router.navigate(['/phone/' + phone.id]);
  }

}
