import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { RequestOptions,Headers } from '@angular/http';

@Injectable()
export class DataService {
  loggedInUser: any;
  baseUrl = "http://localhost:10297/SpringOauthSecurity/";
  public clientId = "my-trusted-client";
  public clientSecret = "secret";
  itemsList : any = [];
  updateContent:any;
  

  constructor(public http: HttpClient ) {   }

  // get LogIn Method

  doLogin(username, password): Observable<any> {
    console.log("login service");
    let Params = new HttpParams();
    // Begin assigning parameters
    Params = Params.append("grant_type", "password");
    Params = Params.append("username", username);
    Params = Params.append("password", password);

    return this.http.post(
      this.baseUrl + "oauth/token",
      {},
      {
        headers: new HttpHeaders().set(
          "Authorization",
          "Basic " + btoa(this.clientId + ":" + this.clientSecret)
        ),
        params: Params
      }
    );
  }// End of LogIn method



  // registration method call

  registration(user): Observable<any> {
    return this.http.post(
      this.baseUrl + "saveUser", {}, {}
    )
  }//End of registration

//  getItems method 

  getItem(): Observable<any> {
    let token = JSON.parse(localStorage.getItem("access_token"));
    let params: HttpParams = new HttpParams();
    params.set("access_token", token.access_token);
    return this.http.get(this.baseUrl + 'admin/getItem');
  }//End of getItem method

  // get the items_id

  storeItems(it){
this.itemsList = it;
  }

  retrieveItems() {
    return this.itemsList;
  }//end of get items_id method

// update method 

  updateItem(content):Observable<any>{
    console.log(content.content);
    this.updateContent=content.content;
  let params:HttpParams=new HttpParams();
  params.set("content",content)  
   return this.http.put(this.baseUrl + 'admin/updateItem',content)
   .map((res:Response)=>res.json());
  }   //end of update method

//  create panel

createPanel(panel):Observable<any>{
  delete panel.id;
  console.log(panel);
  let params:HttpParams=new HttpParams();
  params.set("panel",panel)
return this.http.post(this.baseUrl + 'admin/addItem',panel,{});

}//end of create panel

}

