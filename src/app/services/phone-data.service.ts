import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Phone } from '../models/phone';
import { PHONES } from '../mock-db/phones';
import { PhoneDbService } from './phone-db.service';
import { PhoneDb } from '../models/phone-db';

@Injectable({
  providedIn: 'root'
})
export class PhoneDataService {

  private phoneDbService = inject(PhoneDbService)
  private curPhoneSubject: BehaviorSubject<Phone | any>;

  constructor() { 
    this.curPhoneSubject = new BehaviorSubject<Phone | null>(null);
  }

  public select(phone: Phone){
    this.curPhoneSubject.next(phone);
  }

  public getCurPhoneSubject(): BehaviorSubject<Phone | null>{
    return this.curPhoneSubject;
  }

  public getCurPhone(): Phone{
    return this.curPhoneSubject.value;
  }


  public getPhones(): Observable<PhoneDb> {    
    // return of(PHONES);
    // const phonesArray: Phone[] = Object.values(PHONES);
    // return of(phonesArray);
    return this.phoneDbService.loadDb();
  }

  public getPhone(id: string): Observable<Phone | null> {
    const phone: Phone | undefined = PHONES[id];
    return of(phone || null);

  }

}