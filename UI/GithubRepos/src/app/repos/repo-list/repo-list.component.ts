import { Component, Input } from '@angular/core';
import { RepoItem } from '../../model/repo-item';
import { RepoCardComponent } from "../repo-card/repo-card.component";
import { RepoService } from '../../services/repo.service';

@Component({
  selector: 'app-repo-list',
  standalone: true,
  imports: [RepoCardComponent],
  templateUrl: './repo-list.component.html',
  styleUrl: './repo-list.component.scss'
})
export class RepoListComponent {
 // constructor(private httpService: RepoService) { } 
 @Input()
 showResults:boolean = false;

 @Input()
 unMark:boolean = false;

  @Input()
  reposList: RepoItem[] = [];

  

  bookmarkRepo(repoItem: RepoItem) {
    console.log(repoItem);
    let repoList:RepoItem[] = this.getBookmarkedRepos(repoItem);
    if (repoList != null){
     var foundRepo = repoList.find(item => item.id == repoItem.id);
     if(this.unMark && foundRepo){
      this.removeMarkedRepo(repoList,foundRepo);
      return;
     }
     if(foundRepo) {
      return;
     }
    }
    else{
      repoList = [] ;
    }
    this.setBookmarkedRepos(repoList,repoItem);
    console.log(repoList);
    }
   
   setBookmarkedRepos(repoList:RepoItem[],repoItem:RepoItem){
    repoList.push(repoItem);
    sessionStorage.setItem('reposBookmarkedList',JSON.stringify(repoList));
    
   }

   removeMarkedRepo(repoList:RepoItem[],repoItem:RepoItem){
    let index = repoList.findIndex(d => d.id === repoItem.id); 
    repoList.splice(index, 1);
    sessionStorage.setItem('reposBookmarkedList',JSON.stringify(repoList));
    this.reposList = repoList;
   }

   getBookmarkedRepos(repoItem:RepoItem):any{
     var temp = sessionStorage.getItem('reposBookmarkedList');
     if(temp != null){
      return  JSON.parse(temp) as RepoItem[];
     }
     else{
      return null;
     }
   }

}
