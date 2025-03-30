import { Injectable } from '@angular/core';
import { HttpService } from '../HTTP/http.service';
import { IRoute } from '../../interfaces/ResponseMenu';
import { environment } from '../../../environments/enviroments';
import { StorageService } from '../storage/storage.service';
import { KEYS } from '../../../core/constants.enum';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = `${environment.apiUrl}menu/all`;
  private addMenuUrl = `${environment.apiUrl}menu`;

  constructor(private httpService: HttpService, private storageService: StorageService) {}

  async getMenuItems(): Promise<IRoute[]> {
    try {
      const response = await this.httpService.request<{ data: IRoute[] }>(this.apiUrl, 'GET');
      const menuItems = Array.isArray(response.data) ? response.data : [];

      return menuItems
    } catch (error) {
      console.error('Error obteniendo el menú:', error);
      return [];
    }
  }

  async createMenu(name: string, icon: string, route: string, rolesIds: number[]): Promise<void> {
    try {
      if (!name || !icon || !route || !Array.isArray(rolesIds) || rolesIds.length === 0) {
        throw new Error('Todos los campos son obligatorios y debe haber al menos un rol.');
      }

      const formattedName = name.trim().charAt(0).toUpperCase() + name.trim().slice(1);
      const formattedRoute = `dashboard/${route.trim().toLowerCase()}`;

      const menuData = {
        icon: icon.trim(),
        name: formattedName,
        route: formattedRoute,
        roles: rolesIds.map(id => ({ id }))
      };

      await this.httpService.request(this.addMenuUrl, 'POST', menuData);
    } catch (error) {
      console.error('Error creando el menú:', error);
      throw error;
    }
  }

  async updateMenu(menuId: number, menuData: Partial<IRoute & { rolesIds?: number[] }>): Promise<void> {
    try {
      if (menuData.rolesIds && menuData.rolesIds.length > 0) {
        menuData.roles = menuData.rolesIds.map(id => ({ id }));
      }
      delete menuData.rolesIds;


      await this.httpService.request(`${this.apiUrl}/${menuId}`, 'PUT', menuData);
    } catch (error) {
      console.error('Error actualizando el menú:', error);
      throw error;
    }
  }

  async deleteMenu(menuId: number): Promise<void> {
    try {
      await this.httpService.request(`${this.apiUrl}/${menuId}`, 'DELETE');
    } catch (error) {
      console.error('Error eliminando el menú:', error);
    }
  }
}
