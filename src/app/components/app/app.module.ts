import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import {AppComponent} from './app.component';
import {DriveService} from "../../services/drive/drive-service";
import {AuthGuard} from "../../services/auth-guard";
import {PlayerModule} from "../player/player.module";
import {LoginModule} from "../login/login.module";

@NgModule({
	imports: [
		BrowserModule,
		LoginModule,
		PlayerModule,
		RouterModule.forRoot([])
	],
	declarations: [
		AppComponent
	],
	providers: [DriveService, AuthGuard],
	bootstrap: [AppComponent]
})
export class AppModule { }
