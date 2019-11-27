import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Company } from './model/company.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent implements OnInit {
    
    
    searchBar = new FormControl()
    filteredCompanies$: Observable<Company []>
    companies: Company [] = []
    selectedCompany: Company = null
    selectedRange: {
        AC: number,
        PC: number,
        NPC: number
    } = null
    
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
    
    getCompany(value) {
        console.log(value)
        this.selectedCompany = this.companies.filter(company => company.name == value)[0]
        this.getRange("7DAYS")
    }

    getRange(range) {
        this.selectedRange = this.selectedCompany.data[range]
    }
    
    private getAllCompanies() {
        this.dataService.getDataSource().subscribe(
            companies => {
                this.companies = []
                let names = Object.keys(companies)

                names.forEach(name => {
                    let company = new Company()
                    company.name = name
                    company.data = companies[name]
                    this.companies.push(company)
                })

           
            }
        )
    }
    
    private getAllCompanyThatStartsWith(word) {
        let w = word.toLowerCase()
        
        return this.companies.filter(company => company.name.toLowerCase().indexOf(w) === 0)
    }


}
