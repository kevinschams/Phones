import { Component, Inject, OnInit, inject } from '@angular/core';
import { PhoneDataService } from '../../services/phone-data.service';
import { Phone } from '../../models/phone';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  
  private phoneService = inject(PhoneDataService);
  private route = inject(ActivatedRoute);

  public phone: Phone | null = null;

  ngOnInit(): void {    
    this.getPhone();
  }

  public getPhone(): void {
    this.phone = this.phoneService.getCurPhone();

    if(!this.phone) {
      this.route.paramMap.pipe(
        switchMap(params => {
          let phoneId = params.get('vehicleId');
          phoneId = (phoneId ? phoneId : '-1');

          return this.phoneService.getPhone(phoneId);
        })
      ).subscribe(phone => {
        this.phone = phone;
      });
    }
  }
}



