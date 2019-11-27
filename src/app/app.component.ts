import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Company } from './model/company.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    
    
    searchBar = new FormControl()
    filteredCompanies$: Observable<Company []>
    companies: Company [] = []
    
    constructor(
        private dataService: DataService
    ) {
        this.filteredCompanies$ = this.searchBar.valueChanges
            .pipe(
                startWith(''),
                map(word => word ? this.getAllCompanyThatStartsWith(word) : this.companies.slice())
            )
    }
    
    ngOnInit () {
        this.getAllCompanies()
    }
    
    
    private getAllCompanies() {
        this.dataService.getDataSource().subscribe(
            companies => {
                this.companies = []
                let names = Object.keys(companies)

                names.forEach(name => {
                    let company = new Company()
                    company.name = name
                    company.data = this.dataService.getDataSource()['name']
                    this.companies.push(company)
                })

                console.log(names)
                console.log(this.companies)
            }
        )
    }
    
    private getAllCompanyThatStartsWith(word) {
        let w = word.toLowerCase()
        
        return this.companies.filter(company => company.name.toLowerCase().indexOf(w) === 0)
    }


}
