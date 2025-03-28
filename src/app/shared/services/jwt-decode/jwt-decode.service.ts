import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtDecodeService {

  constructor() { }

  decode(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  }

  getRole(token: string): string | null {
    const decodedToken = this.decode(token);
    return decodedToken ? decodedToken.role : null;
  }
}
