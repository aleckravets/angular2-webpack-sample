import {Component} from "@angular/core";
import {Record} from "./record";
import {Playlist} from "./playlist";
import {RecordComponent} from "./record/record.component";

@Component({
    selector: "playlist",
    templateUrl: "playlist.html",
    // directives: [RecordComponent]
})
export class PlaylistComponent {
    playlist: Playlist;
    isLoading: boolean;
    
    constructor() {
        this.playlist = new Playlist();
    }
    
    
}
