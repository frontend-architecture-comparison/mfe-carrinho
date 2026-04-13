import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RemoteEntryComponent } from './remote-entry.component';

const routes: Routes = [
  {
    path: '',
    component: RemoteEntryComponent,
  },
];

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class RemoteEntryModule {}
