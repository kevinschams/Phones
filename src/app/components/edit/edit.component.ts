import { Component, Inject, OnInit, inject } from '@angular/core';
import { PhoneDataService } from '../../services/phone-data.service';
import { Phone } from '../../models/phone';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
// export class EditComponent implements OnInit {
  
//   private phoneService = inject(PhoneDataService);
//   private route = inject(ActivatedRoute);

//   public phone: Phone | null = null;

//   formData: any = {};

//   ngOnInit(): void {    
//     this.getPhone();
//   }

  export class EditComponent implements OnInit {
    public phone: Phone | null = null;
    public formData: any = {};
  
    
    private phoneService = inject(PhoneDataService);
    private route = inject(ActivatedRoute)
    
    
  
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
          // Assigning phone data to formData object for two-way data binding
          this.formData = { ...phone };
        });
      }
    }
  
    public submit(){
      console.log("done");
      // Handle form submission logic here
      console.log('Form data:', this.formData);
      // You can send this data to your service for further processing
    }
  }

//   public getPhone(): void {
//     this.phone = this.phoneService.getCurPhone();

//     if(!this.phone) {
//       this.route.paramMap.pipe(
//         switchMap(params => {
//           let phoneId = params.get('vehicleId');
//           phoneId = (phoneId ? phoneId : '-1');

//           return this.phoneService.getPhone(phoneId);
//         })
//       ).subscribe(phone => {
//         this.phone = phone;
//       });
//     }
//   }

//   public submit(){
//     console.log("done");
//   }
// }



