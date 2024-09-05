import { Component, Input, OnInit } from '@angular/core';
import { RepoListComponent } from "../repo-list/repo-list.component";
import { RepoItem } from '../../model/repo-item';

@Component({
  selector: 'app-bookmark-repos',
  standalone: true,
  imports: [RepoListComponent],
  templateUrl: './bookmark-repos.component.html',
  styleUrl: './bookmark-repos.component.scss'
})
export class BookmarkReposComponent implements OnInit {

  arrRepoItems: RepoItem[] = [];

  ngOnInit(): void {
    this.arrRepoItems = this.getBookmarkedRepos();
}

getBookmarkedRepos():any{
    var temp = sessionStorage.getItem('reposBookmarkedList');
    if(temp != null){
    return  JSON.parse(temp) as RepoItem[];
    }
    else{
    return null;
    }
}

}
