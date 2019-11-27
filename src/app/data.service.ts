import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from './model/company.model';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

    getDataSource() {
        return this.http.get('assets/companies.json')
    }
    
    


}
