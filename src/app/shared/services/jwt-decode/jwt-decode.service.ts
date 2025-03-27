import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtDecodeService {

  constructor() { }

  decode(token: string) {
    return jwtDecode(token);
  }
}
