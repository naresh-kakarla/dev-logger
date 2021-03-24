import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/Log';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  id:string;
  text: string;
  date:any;

  isNew:boolean = true;

  constructor(private logService: LogService) { }

  ngOnInit(): void {
    //subscribe to the selectedLog Observable
    this.logService.selectedLog.subscribe(log =>{
      if(log.id !== null ){
        this.isNew = false;
        this.id = log.id,
        this.text = log.text,
        this.date = log.date
      }
    })
  }

  onSubmit(){
    //check if the log is new
    if(this.isNew){
      console.log(this.text)
      const newLog = {
        id:this.generateId(),
        text: this.text,
        date: Date.now()
      }
      this.logService.addLog(newLog);
    }else{
      const updLog ={
        id: this.id,
        text: this.text,
        date: Date.now()
      }
      this.logService.updateLog(updLog);
    }
    this.clearState();
  }

  clearState(){
    this.id = null,
    this.text = null,
    this.date = null
    this.isNew = true;
    this.logService.clearState();
  }


  generateId(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
