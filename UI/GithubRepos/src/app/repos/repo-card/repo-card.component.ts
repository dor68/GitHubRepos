import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RepoItem } from '../../model/repo-item';

@Component({
  selector: 'app-repo-card',
  standalone: true,
  imports: [],
  templateUrl: './repo-card.component.html',
  styleUrl: './repo-card.component.scss'
})
export class RepoCardComponent {
  @Input()
   unMark: boolean = false;

  @Input()
   repoItem: RepoItem | undefined;

  @Output ('repoChanged')
   repoEmitter = new EventEmitter<RepoItem>();

getBtnBookmarkText():string{
  return !this.unMark ? "Bookmark Repo" : "UnBookmark Repo";
}
   

  onBookmarkClicked(repoId: number|undefined) {
    console.log('repoId : ' + repoId);
    this.repoEmitter.emit(this.repoItem);
    }

}
