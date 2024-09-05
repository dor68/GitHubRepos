import { HttpClient, HttpHeaders} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RepoItem } from '../model/repo-item';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';


//const baseUrl = 'https://localhost:7222/api/Repos?searchKeyword=';
const baseUrl = environment.apiUrl + 'Repos?searchKeyword=';


@Injectable({
  providedIn: 'root'
})
export class RepoService {
  authService = inject(AuthService);
  constructor(private http:HttpClient) { }

    
  searchRepos(searchKeyword:string): Observable<any> {
   let headers = new HttpHeaders()
   .set('Authorization', 'Bearer ' + this.authService.getToken() ) //  + localStorage.getItem('token'))
   .set('Content-Type', 'application/json'); 
      return   this.http.get<any>(baseUrl + searchKeyword,{ headers });
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
