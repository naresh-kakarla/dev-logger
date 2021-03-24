import { Injectable } from '@angular/core';
import { Log } from '../models/Log';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs:Log[];

  private logSource = new BehaviorSubject<Log>({id:null,text:null,date:null});
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() { 
    // this.logs = [
    //   {id:"1",text:"Generated Component",date:new Date('03/21/2021 09:52:30')},
    //   {id:"2",text:"Bootstarp Added",date:new Date('03/22/2021 01:02:30')},
    //   {id:"3",text:"Added Log Component",date:new Date('03/21/2021 09:52:30')},
    // ]
    this.logs = [];
  }

  getLogs():Observable<Log[]>{
    if(localStorage.getItem('logs') === null){
      this.logs = [];
    }else{
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(this.logs);
  }

  setFormLog(log:Log){
    this.logSource.next(log);
  }

  addLog(log: Log){
    this.logs.unshift(log);

    // add local storage
    localStorage.setItem('logs',JSON.stringify(this.logs));
  }

  updateLog(log:Log){
    this.logs.forEach((curr,index) => {
      if(log.id === curr.id){
        this.logs.splice(index,1);
      }
    });
    this.logs.unshift(log);

    //update local storage
    localStorage.setItem('logs',JSON.stringify(this.logs));
  }

  deleteLog(log:Log){
    this.logs.forEach((curr,index) =>{
      if(log.id === curr.id){
        this.logs.splice(index,1);
      }
    });
    
    //update local storage
    localStorage.setItem('logs',JSON.stringify(this.logs));
  }

  clearState(){
    this.stateSource.next(true);
  }
}
