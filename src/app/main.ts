import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from "./components/app/app.module";
import {loadDriveAPI} from "./services/drive/drive-service";
import './types.ts';
import './utils/array-utils';
import './utils/promise-utils';

if (process.env.ENV === 'production') {
	enableProdMode();
}

loadDriveAPI()
	.then(() => {
		platformBrowserDynamic().bootstrapModule(AppModule);
	});

