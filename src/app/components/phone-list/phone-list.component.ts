import { Component, inject, OnInit } from '@angular/core';
import { PhoneDetailsComponent } from "../phone-details/phone-details.component";
import { AsyncPipe, NgFor } from '@angular/common';
import { Observable, of } from 'rxjs';
import { PhoneDbService } from '../../services/phone-db.service';
import { PhoneDataService } from '../../services/phone-data.service';
import { Phone } from '../../models/phone';



@Component({
    selector: 'app-phone-list',
    standalone: true,
    templateUrl: './phone-list.component.html',
    styleUrl: './phone-list.component.css',
    imports: [PhoneDetailsComponent, NgFor, AsyncPipe]
})
export class PhoneListComponent implements OnInit {

  phones: Observable<Phone[]> = new Observable<Phone[]>();

  constructor(private phoneService: PhoneDataService) { }

  ngOnInit(): void {
    this.phones = this.phoneService.getPhones();
  }
}



