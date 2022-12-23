import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CtgovApiService } from 'src/app/services/ctgov-api.service';
import { CTGovItem } from '../interfaces';

const ELEMENT_DATA: CTGovItem[] = [];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public numTrials: number = 0;
  public trials = new MatTableDataSource<CTGovItem>(ELEMENT_DATA);
  public displayedColumns: string[] = ['Rank', 'NCTId', 'BriefTitle', 'Condition', 'OverallStatus', 'PrimaryCompletionDate'];

  constructor(
    private ctgovService: CtgovApiService
  ) { }

  ngAfterViewInit() {
    this.trials.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getTrialData();
  }

  public getTrialData(): void {
    this.ctgovService.numTrials$.subscribe(numTrials => {
      this.numTrials = numTrials;
    });

    this.ctgovService.trials$.subscribe(trials => {
      this.trials.data = trials;
      console.log(this.trials)
    });
  }

}
