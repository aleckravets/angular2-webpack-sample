import {Component, Input} from "@angular/core";
import {NgIf} from "@angular/common";
import {DriveFile} from "../../../services/drive/drive-file";

@Component({
    selector: "file",
    templateUrl: "file.html",
    styleUrls: ['./file.css']
})
export class FileComponent {
    @Input() file: DriveFile;
    isSelected: boolean;

    constructor() {
    }
}
