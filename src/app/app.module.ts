import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { RatingModule } from "ng-starrating";
import { SearchComponent } from './components/search/search.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FoodPageComponent } from './components/food-page/food-page.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MatCardModule } from "@angular/material/card";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { MatSelectModule } from "@angular/material/select";
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import {AuthGuard} from "./auth.guard";



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    FoodPageComponent,
    CartPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AdminPageComponent,
    NotFoundPageComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        HttpClientModule,
        MatToolbarModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatButtonModule,
        RatingModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        ReactiveFormsModule,
        MatSelectModule,
    ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
