import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, SubscriptionLike } from 'rxjs';
import { IEvent } from '../../../api/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.pug',
  styleUrls: ['./event-form.component.styl']
})
export class EventFormComponent implements OnInit {
  @Input() eventItem: Observable<IEvent>;
  @Input() action: string = 'new';
  @Output() formSubmit = new EventEmitter<FormBuilder>();
  @Output() formCancel = new EventEmitter<FormBuilder>();

  private _dataSub: SubscriptionLike;
  public eventForm: FormGroup;

  get isDisabled(): boolean {
    return this.eventForm.pristine || this.eventForm.disabled || this.eventForm.invalid;
  }

  get actionButton(): string {
    return this.action === 'new' ? 'Create' : 'Update';
  }

  public submitForm(): void {
    for (const i in this.eventForm.controls) {
      if (this.eventForm.controls.hasOwnProperty(i)) {
        this.eventForm.controls[i].markAsDirty();
        this.eventForm.controls[i].updateValueAndValidity();
      }
    }
    if (this.eventForm.valid) {
      this.formSubmit.emit(this.eventForm.getRawValue());
    }
  }

  public clearForm($event): void {
    $event.preventDefault();
    this.eventForm.reset();
    this.formCancel.emit();
  }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      type: ['', [Validators.required]],
      cowId: ['', [Validators.required]],
      animalId: ['', [Validators.required]],
      deletable: ['', []],
      lactationNumber: ['', []],
      daysInLactation: ['', []],
      ageInDays: ['', []],
      startDateTime: ['', []],
      reportingDateTime: ['', []],
      minValueDateTime: ['', []],
      endDate: ['', []],
      healthIndex: ['', []],
      alertType: ['', []],
      duration: ['', []],
      originalStartDateTime: ['', []],
      endDateTime: ['', []],
      daysInPregnancy: ['', []],
      heatIndexPeak: ['', []],
      newGroupId: ['', []],
      newGroupName: ['', []],
      currentGroupId: ['', []],
      currentGroupName: ['', []],
      destinationGroup: ['', []],
      destinationGroupName: ['', []],
      calvingEase: ['', []],
      newborns: ['', []],
      birthDateCalculated: ['', []],
      sire: ['', []],
      breedingNumber: ['', []],
      isOutOfBreedingWindow: ['', []],
      interval: ['', []],
      eventId: ['', []]
    });

    if (this.action === 'edit') {
      this._dataSub = this.eventItem.subscribe(data => {
        if (typeof data === 'object' && data !== null) {
          this.eventForm.patchValue(data);
          this.eventForm.markAsPristine();
        } else {
          this.router.navigate(['/']).then();
        }
      });
    }
  }

  constructor(private fb: FormBuilder, private router: Router) {
  }
}
