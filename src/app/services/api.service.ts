import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:4000/api';

  headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  // .set('Authorization', `Bearer ${WHATSAPP_TOKEN}`);

  // 1. Send OTP
  sendOtp(phone_no: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/send-otp`, { phone_no }, { headers: this.headers });
  }

  // 2. Verify OTP and check if admin exists
  verifyOtp(phone_no: string, otp: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/verify-otp`, { phone_no, otp });
  }

  // 3. Get current queue list for a given business
  getQueue(business_id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/queue/${business_id}`);
  }

  // 4. Add person to queue
  addToQueue(business_id: string, name: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/queue/add`, { business_id, name });
  }

  // 5. Remove person from queue
  removeFromQueue(business_id: string): Observable<any> {
    // Using http.request with DELETE method and a request body.
    return this.http.request('delete', `${this.baseUrl}/queue/remove`, { body: { business_id } });
  }

  // 6. Subscribe or unsubscribe for realtime alerts
  subscribeRealtime(business_id: string, phone_no: string, subscribe: boolean): Observable<any> {
    return this.http.post(`${this.baseUrl}/whatsapp/subscribe`, { business_id, phone_no, subscribe });
  }
}
