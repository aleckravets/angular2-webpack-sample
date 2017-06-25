import {Component, OnInit, ViewEncapsulation} from "@angular/core";

@Component({
	selector: "app",
	templateUrl: "app.html"
})
export class AppComponent implements OnInit {
	private isDarkTheme = false;

	constructor() {
		console.log('hello world');
	}

	ngOnInit() {
	}

	toggleDarkTheme() {
		this.isDarkTheme = !this.isDarkTheme;
	}
}
