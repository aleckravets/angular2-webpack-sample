import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {MaterialModule} from '@angular/material';
import {PlayerComponent} from "./player.component";
import {ControlsComponent} from "./controls/controls.component";
import {TreeComponent} from "./tree/tree.component";
import {PlaylistComponent} from "./playlist/playlist.component";
import {FolderComponent} from "./folder/folder.component";
import {FileComponent} from "./file/file.component";
import {RecordComponent} from "./playlist/record/record.component";
import {TreeNodeComponent} from "./tree/tree-node/tree-node.component";
import {AuthGuard} from "../../services/auth-guard";

const routes = [
	{
		path: '',
		canActivate: [AuthGuard],
		component: PlayerComponent,
		children: [
			{
				path: '',
				children: [
					{ path: '', component: FolderComponent },
					{ path: 'folders/:id',  component: FolderComponent },
				]
			},
		]
	}
];

@NgModule({
	imports: [
		BrowserModule,
		MaterialModule.forRoot(),
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	],
	declarations: [
		PlayerComponent,
		ControlsComponent,
		TreeComponent,
		TreeNodeComponent,
		PlaylistComponent,
		RecordComponent,
		FolderComponent,
		FileComponent
	]
})
export class PlayerModule { }
