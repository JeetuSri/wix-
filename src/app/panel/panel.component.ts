import { Component, OnInit,ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';
import { DataService } from '../services/data.service';
import {NgClass} from '@angular/common';
import {  DragulaService,dragula,DragulaModule } from 'ng2-dragula/ng2-dragula';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent  {
  
  item: any;
  panel: any = [];
  draggableEnabled:boolean =true;
  dragId:any;
  dragArray:any;
  


  constructor(public dataService: DataService ,public dragulaService : DragulaService ) {

    this.dataService.getItem().subscribe(
      (res) => {
        this.item = res;
        for (let i in this.item) {
          if (this.item[0].theme === this.item[i].theme) {
            this.panel.push(this.item[i]);
          }
        }
      }
    )
  }

  ngOnInit() {
    if(this.draggableEnabled==true){
      console.log("true wala hai")
    this.dragulaService.setOptions('bag',{
     moves:function(el,container,handle){
       return false
       }
    })
  }
 
  }


  edit(){
this.draggableEnabled=false;
    console.log("click hua?")
    if(this.draggableEnabled==false){
      console.log("false wala hai")
    this.dragulaService.setOptions('b-bag',{
      moves:function(el,container,handle){
        return true
        }
     })
    }
}

save(){
  this.draggableEnabled=true;
}


close(panels){
console.log(this.panel[panels]);
  //  this.x =false;
   this.panel[panels].content="";
   if(this.panel[panels] !== -1){
     this.panel.splice(panels,1)
   }
  }
}
