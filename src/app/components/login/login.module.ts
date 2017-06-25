import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {MaterialModule} from '@angular/material';
import {LoginComponent} from "./login.component";

@NgModule({
	imports: [
		BrowserModule,
		MaterialModule.forRoot(),
		RouterModule.forChild([
				{ path: 'login', component: LoginComponent }
			]
		)
	],
	exports: [
		RouterModule
	],
	declarations: [
		LoginComponent,
	]
})
export class LoginModule { }
