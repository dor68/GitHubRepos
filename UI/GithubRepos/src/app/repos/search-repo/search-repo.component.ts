import { Component } from '@angular/core';
import { RepoListComponent } from "../repo-list/repo-list.component";
import { RepoItem } from '../../model/repo-item';
import { RepoService } from '../../services/repo.service';

@Component({
  selector: 'app-search-repo',
  standalone: true,
  imports: [RepoListComponent],
  templateUrl: './search-repo.component.html',
  styleUrl: './search-repo.component.scss'
})
export class SearchRepoComponent  {

  constructor(public httpService: RepoService) { } 

  bSearching: boolean = false;
  isNotFound: boolean = false;
  errMsg:string = 'No Repos found .';
  arrRepoItems : RepoItem[] = [];

  searchRepos(searchKeyword:string): void {
   if (!searchKeyword || searchKeyword=="") return ;

   this.arrRepoItems = [];
   this.isNotFound = false;
   this.bSearching = true ;

   this.httpService.searchRepos(searchKeyword).subscribe({
     next: (data) => {

       data.items.forEach((item: { id: any; name: any; owner: { avatar_url: any; }; description: any; }) => {
         let temp:RepoItem = {
                id : item.id ,
                name : item.name ,
                ownerAvatarUrl : item.owner.avatar_url ,
                description : item.description?item.description : '.'
              };

       
       this.arrRepoItems.push(temp);
     });

     
     this.bSearching = false ;
      if (this.arrRepoItems.length < 1){
        this.isNotFound = true;
      }
    },
     error: (err) => {
      console.log(err);
      if(err.status == 0){
        this.isNotFound = true;
        this.errMsg = 'error : no data received from source';
      }
      this.bSearching = false ;
     },
     complete() {}
   });
 }


}
