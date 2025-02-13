import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private stripeKey: string = '';

  constructor(private http: HttpClient) {}

  async loadConfig() {
    const response: any = await firstValueFrom(this.http.get('/api/stripe-key'));
    this.stripeKey = response.stripePublishableKey || '';
  }

  getStripeKey(): string {
    return this.stripeKey;
  }
}