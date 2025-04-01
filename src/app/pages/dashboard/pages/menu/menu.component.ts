import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuService } from '../../../../shared/services/menu/menu.service';
import { IRoute } from '../../../../shared/interfaces/ResponseMenu';
import { HttpService } from '../../../../shared/services/HTTP/http.service';
import { environment } from '../../../../environments/enviroments';
import { ToastService } from '../../../../shared/services/Toast/toast.service';
import { LoaderService } from '../../../../shared/services/loader/loader.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  menuItems: IRoute[] = [];
  careerRoles: { id: number; name: string }[] = [];
  public name!: FormControl;
  public icon!: FormControl;
  public route!: FormControl;
  public roles!: FormControl;
  public id!: FormControl;

  public addForm!: FormGroup;

  newItem: IRoute = { id: 0, name: '', icon: '', route: '', roles: [] };
  rolesControl = new FormControl<number[]>([]); // Control de roles
  isEditing = false;

  constructor(
    private menuService: MenuService,
    private messageService: ToastService,
    private httpService: HttpService,
    private loaderService: LoaderService
  ) {
    this.initForm();
  }

  async ngOnInit(): Promise<void> {
    this.loaderService.show();
    try {
      await this.loadRoles();
      await this.loadMenuItems();
    } finally {
      this.loaderService.hide();
    }
  }

  async loadRoles(): Promise<void> {
    try {
      const url = `${environment.apiUrl}roles`;
      const response = await this.httpService.request<
        { id: number; name: string }[]
      >(url, 'GET');
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
    } catch (error) {
      console.error('Error cargando el menú:', error);
      this.messageService.show({
        severity: 'error',
        sumary: 'Error',
        detail: 'No se pudo cargar el menú',
      });
    }
  }

  async saveMenuItem(): Promise<void> {
    this.loaderService.show();

    try {
      const rolesIds = (this.roles.value || []).map((i: any) => ({ id: i.id }));

      if (this.isEditing && this.id.value) {
        const menuId = this.id.value;

        await this.menuService.updateMenu(menuId, {
          name: this.name.value,
          icon: this.icon.value,
          route: this.route.value,
          roles: rolesIds,
        });

        this.messageService.show({
          severity: 'success',
          sumary: 'Menú actualizado',
          detail: 'El menú se actualizó correctamente',
        });
      } else {
        await this.menuService.createMenu(
          this.name.value,
          this.icon.value.trim(),
          this.route.value.trim(),
          rolesIds
        );
        this.messageService.show({
          severity: 'success',
          sumary: 'Menú creado',
          detail: 'El menú se agregó correctamente',
        });
      }

      this.resetForm();
      await this.loadMenuItems();
    } catch (error) {
      console.error('Error guardando el menú:', error);
      this.messageService.show({
        severity: 'error',
        sumary: 'Error',
        detail: 'No se pudo guardar el menú',
      });
    } finally {
      this.loaderService.hide();
      await this.ngOnInit();
    }
  }

  editMenuItem(menu: IRoute): void {
    console.log('Editando menú:', menu);
    this.id = new FormControl(menu.id, [Validators.required]);
    this.name.setValue(menu.name);
    this.icon.setValue(menu.icon);
    this.route.setValue(menu.route);
    this.roles.setValue(menu.roles);

    this.isEditing = true;
  }

  async deleteMenuItem(id: number): Promise<void> {
    this.loaderService.show();

    try {
      await this.menuService.deleteMenu(Number(id));
      this.messageService.show({
        severity: 'success',
        sumary: 'Menú eliminado',
        detail: 'El menú fue eliminado correctamente',
      });
      await this.loadMenuItems();
    } catch (error) {
      console.error('Error eliminando el menú:', error);
      this.messageService.show({
        severity: 'error',
        sumary: 'Error',
        detail: 'No se pudo eliminar el menú',
      });
    } finally {
      this.loaderService.hide();
    }
  }

  getRolesAsString(roles: { id: number; name?: string }[] | undefined): string {
    if (!Array.isArray(roles) || roles.length === 0) {
      return 'N/A';
    }
    return roles
      .map((role) => (role?.name ? role.name : 'Desconocido'))
      .join(', ');
  }

  resetForm(): void {
    if(this.id) {
      this.id.setValue('');
    }
    this.name.setValue('');
    this.icon.setValue('');
    this.route.setValue('');
    this.roles.setValue([]);
    this.isEditing = false;
  }

  updateRoles(selectedRoles: number[]): void {
    this.roles.setValue(selectedRoles.map((id) => ({ id })));
  }

  isFormValid(): boolean {
    return (
      this.newItem.name.trim() !== '' &&
      this.newItem.icon.trim() !== '' &&
      this.newItem.route.trim() !== '' &&
      (this.rolesControl.value || []).length > 0
    );
  }

  private initForm() {
    this.name = new FormControl('', [Validators.required]);
    this.route = new FormControl('', [Validators.required]);
    this.icon = new FormControl('', [Validators.required]);
    this.roles = new FormControl([], [Validators.required]);

    this.addForm = new FormGroup({
      name: this.name,
      route: this.route,
      icon: this.icon,
      roles: this.roles,
    });
  }
}
