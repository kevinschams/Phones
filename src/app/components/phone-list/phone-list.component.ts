import { Component, inject, OnInit } from '@angular/core';
import { PhoneDetailsComponent } from "../phone-details/phone-details.component";
import { AsyncPipe, KeyValuePipe, NgFor } from '@angular/common';
import { Observable, of } from 'rxjs';
import { PhoneDbService } from '../../services/phone-db.service';
import { PhoneDataService } from '../../services/phone-data.service';
import { Phone } from '../../models/phone';
import { PhoneDb } from '../../models/phone-db';



@Component({
    selector: 'app-phone-list',
    standalone: true,
    templateUrl: './phone-list.component.html',
    styleUrl: './phone-list.component.css',
    imports: [PhoneDetailsComponent, NgFor, AsyncPipe, KeyValuePipe]
})
export class PhoneListComponent implements OnInit {

  // phones: Observable<Phone[]> = new Observable<Phone[]>();

  // constructor(private phoneService: PhoneDataService) { }
  private phoneService = inject(PhoneDataService);
  phones: Observable<PhoneDb | null> = of(null);

  ngOnInit(): void {
    this.phones = this.phoneService.getPhones();
  }
}



