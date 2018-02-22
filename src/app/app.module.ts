import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DataService } from './services/data.service';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { ManagerComponent } from './manager/manager.component';
import { RegistrationComponent } from './registration/registration.component';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptorService } from "./services/token-Interceptor.service";
import { AlertModule } from "ngx-bootstrap";
import { PanelComponent } from './panel/panel.component';
import {ModalModule} from 'ngx-modal';
import { Panel1Component } from './panel1/panel1.component';
import { Panel2Component } from './panel2/panel2.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { DragulaModule ,DragulaService,DragulaDirective,dragula } from 'ng2-dragula/ng2-dragula';




const appRoutes : Routes = [
    { path : '', component : LoginComponent, pathMatch : 'full'},
    { path : 'login', component : LoginComponent},
    { path : 'user', component : UserComponent },
    { path : 'admin', component : AdminComponent},
    { path : 'manager',component : ManagerComponent},
    { path : 'registration',component:RegistrationComponent},
    { path : 'panel',component:PanelComponent },
    { path : 'panel1', component:Panel1Component },
    { path : 'panel2', component:Panel2Component }

]

@NgModule({
  declarations: [
    
    AppComponent,
    LoginComponent,
    UserComponent,
    AdminComponent,
    ManagerComponent,
    RegistrationComponent,
    PanelComponent,
    Panel1Component,
    Panel2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AlertModule,
    ModalModule,
    AngularDraggableModule,
    DragulaModule,
    
    RouterModule.forRoot(
      appRoutes,
      { enableTracing : false }
    )
  ],
  
  providers: [DragulaService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi : true
    },
    DataService,PanelComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
