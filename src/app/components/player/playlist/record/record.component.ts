import {Component, Input} from "@angular/core";
import {DriveFile} from "../../../../services/drive/drive-file";

@Component({
    selector: "record",
    templateUrl: "record.html",
    styleUrls: ['./record.css']
})
export class RecordComponent {
    @Input() file: DriveFile;
    isSelected: boolean;

    constructor() {
    }
}
