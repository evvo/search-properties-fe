import {Component, Input, OnInit} from '@angular/core';
import {ErrorService} from "../error.service";

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  @Input()
  public mode = 'fixed'

  public errors = []

  constructor(
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.errorService.errorsChanged.subscribe(errors => {
      this.errors = errors
    })
  }

  clearErrors() {
    this.errors = []
  }

}
