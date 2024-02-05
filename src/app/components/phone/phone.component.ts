import { Component, Inject, OnInit, inject } from '@angular/core';
import { PhoneDataService } from '../../services/phone-data.service';
import { Phone } from '../../models/phone';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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
}
//   export class PhoneDetailsComponent {
//   private router = inject(Router);
//   private phoneService = inject(PhoneDataService);

//   @Input() phone: Phone | null = null;

//   public select(phone: Phone){
    
//     this.phoneService.select(phone);

//     // navigate to vehicle page
//     this.router.navigate(['/phone/' + phone.id]);
//   }

// }


