import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

    getDataSource() {
        return this.http.get('assets/companies.json').pipe(map(res => res as Company []))
    }
    
    
    getAllCompaniesNames() {
        return this.getDataSource().map(res => res.name)    
    }

}
