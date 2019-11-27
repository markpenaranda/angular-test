import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
    
    
    searchBar = new FormControl()
    filteredCompanies$: Observable<Company []>
    companies: Company [] = []
    
    constructor() {
        this.filteredCompanies$ = this.searchBar.valueChanges
            .pipe(
                startsWith(''),
                map(word => word ? this.getAllCompanyThatStartsWith(word) : this.companies.slice())
            )
    }
    
    
    
    
    private getAllCompanyThatStartsWith(word) {
        let w = word.toLowerCase()
        
        return this.companies.filter(company => company.name.toLowerCase().indexOf(w) === 0)
    }
}
