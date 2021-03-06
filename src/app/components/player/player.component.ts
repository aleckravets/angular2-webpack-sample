import {Component, OnInit, Inject, forwardRef, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {DriveService} from "../../services/drive/drive-service";
import {ControlsComponent} from "./controls/controls.component";
import {PlaylistComponent} from "./playlist/playlist.component";
import {TreeNodeComponent} from "./tree/tree-node/tree-node.component";
import {FileNode} from "./file-node";
import {SearchResultsComponent} from "./search-results/search-results.component";
import {TreeComponent} from "./tree/tree.component";
import {AppComponent} from "../app/app.component";
import {ITreeNode} from "./tree/tree-node/tree-node";
import {DriveFile} from "../../services/drive/drive-file";

@Component({
	templateUrl: "./player.pug"
})
export class PlayerComponent implements OnInit {
	treeRoots: ITreeNode[];
	@ViewChild(PlaylistComponent) playlist: PlaylistComponent;
	@ViewChild(ControlsComponent) controls: ControlsComponent;

	constructor(@Inject(forwardRef(() => AppComponent)) public app: AppComponent,
							private driveService: DriveService,
							private router: Router) {
	}

	ngOnInit() {
		this.initTree();
	}

	onSelectNode(node: TreeNodeComponent) {
		this.router.navigate(['/folders', (node.model as FileNode).file.id]);
	}

	getTreeOptions() {
		return {
			getChildren: node => node.file.children ? this.getNodeChildren(node) : this.loadNodeChildren(node)
		}
	}

	playFile(file: DriveFile) {
		this.playlist.playlist.set([file]);
	}

	private getNodeChildren(node: FileNode) {
		return node.file.children
			.filter(f => f.isFolder)
			.map(file => new FileNode(file));
	}

	private loadNodeChildren(node: FileNode) {
		return this.driveService.getChildren(node.file)
			.then(files => {
				return files.filter(f => f.isFolder)
					.map(file => new FileNode(file));
			});
	}

	private initTree() {
		this.driveService.getFile('root')
			.then(file => {
				this.treeRoots = [
					new FileNode(file),
					{
						name: 'Playlists',
						hasChildren: true,
						type: 'playlists',
						children: []
					}
				];
			});
	}
}
