import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu/menu.service';
import { IRoute } from '../../interfaces/ResponseMenu';
import { HttpService } from '../../services/HTTP/http.service';
import { environment } from '../../../environments/enviroments';
import { ToastService } from '../../services/Toast/toast.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuItems: IRoute[] = [];
  careerRoles: { id: number; name: string }[] = [];

  newItem: IRoute = { id: 0, name: '', icon: '', route: '', roles: [] };
  isEditing = false;

  constructor(private menuService: MenuService, private messageService: ToastService, private HttpService: HttpService) {}

  async ngOnInit(): Promise<void> {
    await this.loadRoles();
    await this.loadMenuItems();
  }

  async loadRoles(): Promise<void> {
    try {
      const url = `${environment.apiUrl}roles`;
      const response = await this.HttpService.request<{ id: number; name: string }[]>(url, 'GET');
      this.careerRoles = response.data;
    } catch (error) {
      this.messageService.show({
        detail: 'No se pudieron obtener los datos de los roles',
        severity: 'error',
        sumary: 'Error',
      });
    }
  }

  private async loadMenuItems(): Promise<void> {
    try {
      this.menuItems = await this.menuService.getMenuItems();

      this.menuItems.forEach(menu => {
        if (!Array.isArray(menu.roles)) {
          menu.roles = [];
        } else {
          menu.roles = menu.roles.map(role => {
            if (typeof role === 'object' && role !== null && 'id' in role && 'name' in role) {
              return role;
            } else if (typeof role === 'number') {
              const foundRole = this.careerRoles.find(r => r.id === role);
              return foundRole ? { id: role, name: foundRole.name } : { id: role, name: 'Desconocido' };
            }
            return { id: 0, name: 'Desconocido' };
          });
        }
      });

      console.log('Menú actualizado con nombres de roles:', this.menuItems);
    } catch (error) {
      console.error('Error cargando el menú:', error);
      this.messageService.show({ severity: 'error', sumary: 'Error', detail: 'No se pudo cargar el menú' });
    }
  }

  async saveMenuItem(): Promise<void> {
    if (!this.newItem.name.trim() || !this.newItem.route.trim() || !this.newItem.icon.trim()) {
      this.messageService.show({ severity: 'warn', sumary: 'Campos obligatorios', detail: 'Todos los campos son requeridos' });
      return;
    }

    const rolesIds = Array.isArray(this.newItem.roles)
      ? this.newItem.roles.map(role => (typeof role === 'object' && role !== null ? Number(role.id) : 0))
      : [];

    if (rolesIds.length === 0) {
      this.messageService.show({ severity: 'warn', sumary: 'Faltan roles', detail: 'Debes seleccionar al menos un rol' });
      return;
    }

    try {
      const formattedName = this.newItem.name.charAt(0).toUpperCase() + this.newItem.name.slice(1);
      const formattedRoute = `dashboard/${this.newItem.route.trim().toLowerCase().replace(/^dashboard\//, '')}`;

      console.log('Guardando menú:', { formattedName, formattedRoute, rolesIds });

      if (this.isEditing) {
        const menuId = Number(this.newItem.id);
        if (!menuId || menuId <= 0) {
          this.messageService.show({ severity: 'error', sumary: 'Error', detail: 'ID inválido para actualizar' });
          return;
        }

        await this.menuService.updateMenu(menuId, {
          name: formattedName,
          icon: this.newItem.icon.trim(),
          route: formattedRoute,
          rolesIds,
        });
        this.messageService.show({ severity: 'success', sumary: 'Menú actualizado', detail: 'El menú se actualizó correctamente' });
      } else {
        await this.menuService.createMenu(formattedName, this.newItem.icon.trim(), formattedRoute, rolesIds);
        this.messageService.show({ severity: 'success', sumary: 'Menú creado', detail: 'El menú se agregó correctamente' });
      }

      this.resetForm();
      await this.loadMenuItems();
    } catch (error) {
      console.error('Error guardando el menú:', error);
      this.messageService.show({ severity: 'error', sumary: 'Error', detail: 'No se pudo guardar el menú' });
    }
  }

  editMenuItem(menu: IRoute): void {
    console.log('Editando menú:', menu);

    this.newItem = {
      id: menu.id,
      name: menu.name,
      icon: menu.icon,
      route: menu.route.replace(/^dashboard\//, ''), 
      roles: Array.isArray(menu.roles)
        ? menu.roles.map(role => {
            if (typeof role === 'object' && role !== null && 'id' in role && 'name' in role) {
              return { id: role.id, name: role.name };
            } else if (typeof role === 'number') {
              const foundRole = this.careerRoles.find(r => r.id === role);
              return foundRole ? { id: foundRole.id, name: foundRole.name } : { id: role, name: 'Desconocido' };
            }
            return { id: 0, name: 'Desconocido' };
          })
        : [],
    };

    this.isEditing = true;
  }

  async deleteMenuItem(id: number): Promise<void> {
    try {
      await this.menuService.deleteMenu(Number(id));
      this.messageService.show({ severity: 'success', sumary: 'Menú eliminado', detail: 'El menú fue eliminado correctamente' });
      await this.loadMenuItems();
    } catch (error) {
      console.error('Error eliminando el menú:', error);
      this.messageService.show({ severity: 'error', sumary: 'Error', detail: 'No se pudo eliminar el menú' });
    }
  }

  getRolesAsString(roles: { id: number; name?: string }[] | undefined): string {
    if (!Array.isArray(roles) || roles.length === 0) {
      return 'N/A';
    }
    return roles.map(role => role.name ?? 'Desconocido').join(', ');
  }

  resetForm(): void {
    this.newItem = { id: 0, name: '', icon: '', route: '', roles: [] };
    this.isEditing = false;
  }

  addMenuItem(): void {
    this.isEditing = false;
    this.resetForm();
  }
}
