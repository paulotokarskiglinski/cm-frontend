import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { CTGovItem, CTGovResponse } from '../components/home/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CtgovApiService {

  private numTrials = new Subject<number>();
  numTrials$ = this.numTrials.asObservable();

  private trials = new Subject<CTGovItem[]>();
  trials$ = this.trials.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  loadTrialData(
    status?: string, 
    condition?: string, 
    primaryCompletionDateFrom?: string, // Takes format 'YYYY/MM/DD'
    primaryCompletionDateUntil?: string // Takes format 'YYYY/MM/DD'
  ): void {
    // API Documentation: https://www.clinicaltrials.gov/api/gui/ref/api_urls
    const baseUrl = 'https://ClinicalTrials.gov/api/query/study_fields';

    const queryExpression = this.generateAPIQueryString(
      status, condition, primaryCompletionDateFrom, primaryCompletionDateUntil
    );

    let params = new HttpParams()
    .set('expr', queryExpression)
    .set('fields', 'NCTId,Condition,BriefTitle,OverallStatus,PrimaryCompletionDate')

    this.http.get<CTGovResponse>(baseUrl, {params})
    .subscribe(trials => {
      this.numTrials.next(trials.StudyFieldsResponse.NStudiesReturned);
      this.trials.next(trials.StudyFieldsResponse.StudyFields);
      console.log(trials.StudyFieldsResponse.NStudiesReturned + ' trials were loaded!');
    }, error => {
      console.error(error.error);
    });
  }

  private generateAPIQueryString(
    status?: string, 
    condition?: string, 
    primaryCompletionDateFrom?: string, // Takes format 'YYYY/MM/DD'
    primaryCompletionDateUntil?: string // Takes format 'YYYY/MM/DD'
  ): string {
    let queryExpression = '"machine learning"';
    if(status) {
      queryExpression += ' AND AREA[OverallStatus]' + status;
    }
    if(condition) {
      queryExpression += ' AND AREA[Condition]' + condition;
    }
    if(primaryCompletionDateFrom && primaryCompletionDateUntil) {
      queryExpression += ' AND AREA[PrimaryCompletionDate]RANGE[' + primaryCompletionDateFrom + ',' + primaryCompletionDateUntil + ']';
    }

    return queryExpression
  }


}
