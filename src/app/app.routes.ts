import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PhoneDetailsComponent } from './components/phone-details/phone-details.component';
import { PhoneListComponent } from './components/phone-list/phone-list.component';
import { PhoneComponent } from './components/phone/phone.component';
import { EditComponent } from './components/edit/edit.component';


export const routes: Routes = [
    { path: '', component: HomeComponent},
    // { path: 'phone/id', component: PhoneDetailsComponent},
    { path: 'phone/all', component: PhoneListComponent},
    { path: 'phone/:phoneId', component: PhoneComponent},
    
    
    // { path: '**', component: PageNotFoundComponent}, // matches every path
];