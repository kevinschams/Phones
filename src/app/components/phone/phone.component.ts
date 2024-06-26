import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { PhoneDataService } from '../../services/phone-data.service';
import { Phone } from '../../models/phone';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [NgIf],
  templateUrl: './phone.component.html',
  styleUrl: './phone.component.css'
})
export class PhoneComponent implements OnInit {
  
    private phoneService = inject(PhoneDataService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
  
    public phone: Phone | null = null;
  
    ngOnInit(): void {    
      this.getPhone();
    }
  
    public getPhone(): void {
      this.phone = this.phoneService.getCurPhone();
  
      if(!this.phone) {
        this.route.paramMap.pipe(
          switchMap(params => {
            let phoneId = params.get('phoneId');
            phoneId = (phoneId ? phoneId : '-1');
  
            return this.phoneService.getPhone(phoneId);
          })
        ).subscribe(phone => {
          this.phone = phone;
        });
      }
    }

    public select(phone: Phone){
    
      this.phoneService.select(phone);
      this.router.navigate(['/phone/edit/' + phone.id]);
    }
  }






