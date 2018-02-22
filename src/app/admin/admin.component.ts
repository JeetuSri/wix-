import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { FormsModule } from '@angular/forms';
import { PanelComponent } from '../panel/panel.component';
import {ModalModule} from 'ngx-modal';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  items: any = [];
  item: any;
  dropeDown: any = true;
  theme1: any;
  theme2: any;
  theme3: any;
  disabled: any = false;
  theItem: any = [];
  getObj: any = [];
  contents:any=[];
  content: any;
  temp:any=[];
  id: any;
  check: boolean = false;
  hide: boolean = true;

  constructor(private dataService: DataService, private router: Router, private panel: PanelComponent) {
    this.getItemsTheme();
    
  }

  ngOnInit() { }


  //  get the selected theme items in drop down

  getSelectedThemeItems(item) {
    this.check = true;
    let itList = this.dataService.retrieveItems();
    this.disabled = true
    for (let i in itList) {
      if (itList[i].theme === item) {
        this.theItem.push(itList[i]);
        this.hide = false;
        console.log(this.theItem);
      }
    }

    console.log(this.theItem);
  }//end of the selected theme item in drop down

  // getting the data in checkbox method

  getItemsTheme() {
    this.dataService.getItem().subscribe(
      (res) => {
        this.items = res;
        this.dataService.storeItems(this.items);
        this.theme1 = this.items[0].theme;
        this.theme2 = this.items[1].theme;
        this.theme3 = this.items[2].theme;

      }, (error) => {

      }
    );
  }//End of getItem method


  // get the select value id method

  valueChange(content) {
    console.log(content);
    for (let i in this.theItem) {
      if (this.theItem[i].content == content) {
        this.getObj = this.theItem[i];
      }
    }
  }//end of getting select value id  method

  // Update the theme method

  updateTheme() {
    this.dataService.updateItem(this.getObj).subscribe(
      (res) => {
        this.items = res;
        this.content=this.items.content;
        console.log(this.items.content)
      }, (error) => { }
    );
  }//end of update theme method

// get the content of penal create in textbox

  valueAdd(content){
    // console.log(content)
    // this.contents.push(content);
    for(let i in this.theItem){
       if(this.theItem[i].content==content){  
          this.temp=this.theItem[i];
    console.log(this.temp)
       }
    }
  }//end the content of penal create

// create new panel

createPenal(){
  this.dataService.createPanel(this.temp)
  .subscribe((res)=>{  })

}//end of create new panel


}//end of admin component
