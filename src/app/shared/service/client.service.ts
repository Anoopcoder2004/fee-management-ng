import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Member } from '../../modules/member/member.component'; // 👈 importing interface
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getClient(): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.baseUrl}/api/clients`);
  }

  addClient(clientData: Member): Observable<Member> {
    return this.http.post<Member>(
      `${this.baseUrl}/api/clients/add-client`,
      clientData
    );
  }

  searchByName(name: string): Observable<Member[]> {
    return this.http.get<Member[]>(
      `${this.baseUrl}/api/clients/search/name?name=${name}`
    );
  }

  searchByPhone(phone: string): Observable<Member[]> {
    return this.http.get<Member[]>(
      `${this.baseUrl}/api/clients/search/phone?phone=${phone}`
    );
  }
}
