import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ChartDataset } from 'chart.js';
import { ChartOptions, Color } from 'chart.js';
import { Label } from 'ng2-charts';
import { DataService } from './../../Services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  ListOfCountries = [];
  allData = [];
  ListOfCamp = [];
  ListOfSchool = [];
  filter: FormGroup;
  loading: boolean = true;
  filteredData = [];
  
  constructor(private data: DataService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getAllData();
    this.filter = this.fb.group({
      country: [''],
      camp: [''],
      school: [''],
    });
  }
  getAllData() {
    this.data.getData().subscribe({
      next: this.handelResponse.bind(this),
    });
  }
  handelResponse(response: any) {
    this.allData = response;
    console.log(this.allData);
    this.ListOfCountries = [
      ...new Set(this.allData.map((item) => item.country)),
    ];
    console.log(this.ListOfCountries);
    this.ListOfCamp = [...new Set(this.allData.map((item) => item.camp))];
    console.log(this.ListOfCamp);
    this.ListOfSchool = [...new Set(this.allData.map((item) => item.school))];
    console.log(this.ListOfSchool);
    this.loading = false;
  }
  changeFilter() {
    this.getFilteredData(this.filter.value);
  }
  getFilteredData(value) {
    this.filteredData = this.allData;
    if (value.country) {
      this.filteredData = this.filteredData.filter(
        (item) => item.country === value.country
      );
    }
    if (value.camp) {
      this.filteredData = this.filteredData.filter(
        (item) => item.camp === value.camp
      );
    }
    if (value.school) {
      this.filteredData = this.filteredData.filter(
        (item) => item.school === value.school
      );
    }
    console.log(this.filteredData);
  }
}
