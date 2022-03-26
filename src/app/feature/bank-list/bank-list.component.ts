
import { Bank } from './../../shared/models/bankmodel';
import { DataService } from './../../../core/service/data.service';
import { AfterViewInit, Component,  ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { merge, Observable, Subject } from 'rxjs';
import { City } from '../../../assets/json/city';
@Component({
  selector: 'app-bank-list',
  templateUrl: './bank-list.component.html',
  styleUrls: ['./bank-list.component.css'],
})
export class BankListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  bankList: any;
  centresTableDataSource: MatTableDataSource<Bank>;
  displayedColumns: string[] = [
    'bank_name',
    'branch',
    'city',
    'state',
    'actions',
  ];
  filterForm: FormGroup;
  private destroy$: Subject<void> = new Subject<void>();
  cityList: any;
  isLoading:boolean = true;
  constructor(
    private apiService: DataService,
    private formBuilder: FormBuilder
  ) {
    this.centresTableDataSource = new MatTableDataSource<Bank>();
    this.filterForm = this.createFormGroup();
  }

  ngAfterViewInit(): void {

    this.fetchBankList();
    this.cityList = City['data'];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onChangeSelectCity(event: any): void {
    console.log(event);
    this.bankList = this.apiService.getFromStorage(
      'local',
      'bankList'
    );
        this.centresTableDataSource.data = this.bankList.filter(
      (item) => item.city === event
    );
    console.log(this.centresTableDataSource.data)
  }

  onClickAddFavourite(index) {
    this.centresTableDataSource.data[index].favourite =
      !this.centresTableDataSource.data[index].favourite;
    this.apiService.addToLocalStorage(
      'local',
      'bankList',
      this.centresTableDataSource.data
    );
  }

  searchBankList() {
    this.bankList = this.apiService.getFromStorage(
      'local',
      'bankList'
    );
    this.centresTableDataSource.data = this.bankList.filter(
      (item) =>
        item.branch
          .toLowerCase()
          .indexOf(this.filterForm.value.name.toLowerCase()) > -1
    );
  }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: [null],
      city: [null],
    });
  }

  private fetchBankList(): void {
    this.apiService.getBankList().subscribe((res: any) => {
      this.bankList = res.map((bankItem) => ({
        ...bankItem,
        favourite: false,
      }));
      this.centresTableDataSource.data = this.apiService.getFromStorage(
        'local',
        'bankList'
      );

      if (
        this.centresTableDataSource.data == null ||
        this.centresTableDataSource.data === undefined
      ) {
        this.apiService.addToLocalStorage('local', 'bankList', this.bankList);
        this.centresTableDataSource.data = this.apiService.getFromStorage(
          'local',
          'bankList'
        );
      }
      this.isLoading = false;
      this.centresTableDataSource.paginator = this.paginator;
    });
  }
}
