import { Pagination, IPagination } from './pagination';
import { Patients as PatientsDB, IPatient } from '../db/index';

export class Patient implements IBase{
  userId: number;
  patients: IPatient[] = [];
  perPage = 5;
  paginationHelper: IPagination;

  constructor(userId: number){
    this.userId = userId;
    this.patients = PatientsDB.filter(p=>p.userId === this.userId);
    this.paginationHelper = new Pagination(this.patients, this.perPage);
  }

  getById(id:number){
    return this.patients.filter(p=>p.id === id)[0];
  }

  getAll(page:number){
    page = page < 1 ? 1 : page;
    return this.paginationHelper.getItemsOnPage(page);
  }

  set setPerPage(perPage: number){
    this.perPage = perPage;
    this.paginationHelper.perPage = perPage;
  }
  get pageCount(){
    return this.paginationHelper.pages;
  }

  getAge(birthday: string):number{
    return ((new Date()).getFullYear()) - ((new Date(birthday).getFullYear()));
  }
}

interface IBase{
  perPage: number;
  paginationHelper: IPagination;
  pageCount: number
  getById: (id: number)=>IPatient;
  getAll: (page: number)=>Array<IPatient>;
}