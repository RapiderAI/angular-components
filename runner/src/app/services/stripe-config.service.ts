import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  getStripeKey(): string {
    return "pi_3JdDdrY2wyK5pM_secret_FXh1J5BxL"
  }
}