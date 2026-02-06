import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

 private baseUrl = environment.apiUrl;

  constructor(private http : HttpClient) { }

  getClient(){
    return this.http.get(`${this.baseUrl}/api/clients`);
  }
  addClient(clientData: any){
    return this.http.post(`${this.baseUrl}/api/clients/add-client`, clientData);
  }
}
