import { Component, Inject, OnInit, inject } from '@angular/core';
import { PhoneDataService } from '../../services/phone-data.service';
import { PhoneDbService } from '../../services/phone-db.service';
import { Phone } from '../../models/phone';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})

  export class EditComponent implements OnInit {
    public phone: Phone | null = null;
    public saveSuccess: boolean = false;
    // public formData: any = {};
    // private phoneService = inject(PhoneDataService)
    // private phoneDbService = inject(PhoneDbService)
    // private route = inject(ActivatedRoute)
    constructor(
    private router: Router,
    private route: ActivatedRoute,
    private phoneService: PhoneDataService,
    private phoneDbService: PhoneDbService) { }
    
    
  
    ngOnInit(): void {    
      this.getPhone();
    }
  
    public getPhone(){
      this.phone = this.phoneService.getCurPhone();
  
      if(!this.phone) {
        this.route.paramMap.pipe(
          switchMap(params => {
            let phoneId = params.get('phoneId');
            phoneId = (phoneId ? phoneId : '-1');
  
            return this.phoneDbService.getPhone(phoneId);
          })
        ).subscribe(phone => {
          this.phone = phone;
        });
      }
    }
  
    public save(){
      this.saveSuccess = true;
      setTimeout(() => { this.saveSuccess = false; }, 6000);
      // console.log("done");
      this.phoneDbService.updatePhone(this.phone);
      
    }  


    cancel() {
      this.router.navigate(['/phone/edit/']);
    }
  }




