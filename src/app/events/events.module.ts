import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { DateFormatPipe } from "../pipes/date-format.pipe";
import { NewEventPageComponent } from './pages/new-event-page/new-event-page.component';
import { EditEventPageComponent } from './pages/edit-event-page/edit-event-page.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventLoaderComponent } from './components/event-loader/event-loader.component';

const routes: Routes = [
    {path: '', component: EventsPageComponent},
    {path: 'new', component: NewEventPageComponent},
    {path: ':eventId/edit', component: EditEventPageComponent}
  ];

const pages = [EventsPageComponent];
const components = [EventsListComponent];

@NgModule({
  declarations: [...pages, ...components, DateFormatPipe, NewEventPageComponent, EditEventPageComponent, EventFormComponent, EventLoaderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class EventsModule { }
