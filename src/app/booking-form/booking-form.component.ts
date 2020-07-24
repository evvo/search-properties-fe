import {Component, Input, OnInit} from '@angular/core';
import {BookingService} from "../booking.service";
import {ErrorService} from "../error.service";
import * as moment from 'moment'


@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent {
  private dateFormat = 'YYYY-MM-DD'

  public success = false

  public daterange: any = {
    startDate: moment().add(1, 'days').format(this.dateFormat),
    endDate: moment().add(1, 'days').format(this.dateFormat)
  };

  public username: any;

  @Input()
  public property

  @Input()
  public closeFn

  public options: any = {
    locale: { format: this.dateFormat },
    alwaysShowCalendars: false,
    linkedCalendars: false,
    minDate: this.daterange.startDate,
    autoApply: false,
    ...this.daterange
  }

  public selectedDate(value: any, datepicker?: any) {
    this.daterange.startDate = moment(value.start).format(this.dateFormat)
    this.daterange.endDate = moment(value.end).format(this.dateFormat)
  }

  submitForm() {
    this.clearErrors()
    this.bookingService.book({
      propertyId: this.property.id,
      username: this.username,
      startDate: this.daterange.startDate ,
      endDate: this.daterange.endDate
    }).subscribe((booking) => {
      this.success = true
      setTimeout(() => {
        this.closeFn()
      }, 2000)
    })
  }

  constructor(
    private bookingService: BookingService,
    private errorService: ErrorService
  ) {
  }

  clearErrors() {
    this.errorService.errorsChanged.emit([])
  }

  ngOnDestroy(): void {
    this.clearErrors()
  }

}
