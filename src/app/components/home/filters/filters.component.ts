import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CtgovApiService } from 'src/app/services/ctgov-api.service';
import { STATUSES } from '../statuses';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  
  public numTrials: number = 0;
  public statusesList: string[] = STATUSES;
  public statusFilter: string;
  public completitionDate = new FormGroup({
    primaryCompletionDateFrom: new FormControl(),
    primaryCompletionDateUntil: new FormControl()
  });

  constructor(
    private ctgovService: CtgovApiService
  ) { }

  ngOnInit(): void {
    this.getTrialData();
  }

  getTrialData() {
    this.ctgovService.loadTrialData(this.statusFilter, null, this.formatDate(this.completitionDate.value.primaryCompletionDateFrom), this.formatDate(this.completitionDate.value.primaryCompletionDateUntil));

    this.ctgovService.numTrials$.subscribe(numTrials => {
      this.numTrials = numTrials;
    });
  }

  private formatDate(date: Date): string {
    if (date)
      return date.getFullYear() + '%2F' + (date.getMonth() + 1) + '%2F' + date.getDay();

    return null;
  }

}
