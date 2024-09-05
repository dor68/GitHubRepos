import { Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RepoCardComponent} from './repos/repo-card/repo-card.component';
import { RepoListComponent } from "./repos/repo-list/repo-list.component";
import { RepoService } from './services/repo.service';
import { SearchRepoComponent } from "./repos/search-repo/search-repo.component";
import { BookmarkReposComponent } from "./repos/bookmark-repos/bookmark-repos.component";
import { AuthService } from './services/auth.service';
import { LoginRequest } from './interfaces/login-request';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RepoCardComponent, RepoListComponent, SearchRepoComponent, BookmarkReposComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
 title = "Github Repos";

  constructor(public httpService: RepoService) { } 
  authService = inject(AuthService);
  ngOnInit(): void {

     var dataLogin:LoginRequest = {
        Username:'GitHubRepo',
        Password:'githubrepo@123'
      }

      this.authService.login(dataLogin);
  }

  displaySearch:boolean = true;
  displayBookmark:boolean = false;

  isBookmarkedRepos():boolean{
    return sessionStorage.getItem('reposBookmarkedList') != null ;
  }

  showSearch(){
    this.displaySearch =true;
    this.displayBookmark = false;
  }

  showBookmark(){
    this.displaySearch =false;
    this.displayBookmark = true;
  }


}

