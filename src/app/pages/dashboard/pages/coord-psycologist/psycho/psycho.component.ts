import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../../../../shared/services/HTTP/http.service';
import { ToastService } from '../../../../../shared/services/Toast/toast.service';
import { LoaderService } from '../../../../../shared/services/loader/loader.service';
import { environment } from '../../../../../environments/enviroments';
import { IHeaders } from '../../../../../shared/interfaces/ITable';
import { IDocument } from '../../../../../interfaces/IUser';

@Component({
  selector: 'app-psycho',
  templateUrl: './psycho.component.html',
  styleUrls: ['./psycho.component.scss'],
})
export class PsychoComponent implements OnInit {
  public id!: FormControl;
  public name!: FormControl;
  public last_name!: FormControl;
  public age!: FormControl;
  public code!: FormControl;
  public gender!: FormControl;
  public email!: FormControl;
  public password!: FormControl;
  public neighborhood!: FormControl;
  public street!: FormControl;
  public number!: FormControl;
  public aditional_information!: FormControl;
  public document_number!: FormControl;
  public document!: FormControl;

  public addForm!: FormGroup;
  public isEditing = false;

  genderOptions = [
    { label: 'Masculino', value: 'M' },
    { label: 'Femenino', value: 'F' },
  ];

  tableHeaders: IHeaders = {
    columns: [
      { field: 'name', header: 'Nombre', type: 'Text' },
      { field: 'last_name', header: 'Apellido', type: 'Text' },
      { field: 'email', header: 'Correo', type: 'Text' },
    ],
    data: [],
    actions: {
      update: (row: any) => this.onEdit(row),
      sort: false,
      filter: false,
    },
  };

  docOptions: IDocument[] = [];

  constructor(
    private httpService: HttpService,
    private messageService: ToastService,
    private loaderService: LoaderService
  ) {
    this.initForm();
  }

  setDataGender(value: string) {
    this.gender.setValue(value);
  }

  async ngOnInit() {
    console.log('[PsychoComponent] ngOnInit - Cargando documentos...');
    const documents = await this.httpService.request<IDocument[]>(
      `${environment.apiUrl}user/documents`,
      'GET'
    );
    this.docOptions = documents.data;
    console.log('[PsychoComponent] Documentos cargados:', this.docOptions);
    this.loadPsychologists();
  }

  updateForm(event: number) {
    console.log('[PsychoComponent] updateForm - Documento seleccionado:', event);
    const idControl = this.addForm.get('document_number');

    if (event) {
      const doc: IDocument | undefined = this.docOptions.find(
        (doc) => doc.id === event
      );
      console.log('[PsychoComponent] Documento encontrado:', doc);

      idControl?.setValidators([
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]);
      idControl?.enable();

      if (!doc) {
        console.warn('[PsychoComponent] Documento no encontrado, deshabilitando control');
        idControl?.disable();
        idControl?.clearValidators();
      } else if (doc?.name === 'PA') {
        idControl?.setValidators([
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]+$/),
        ]);
      }
    }

    idControl?.updateValueAndValidity();
  }

  private initForm(): void {
    this.id = new FormControl(null);

    this.name = new FormControl('', Validators.required);
    this.last_name = new FormControl('', Validators.required);
    this.age = new FormControl(null, Validators.required);
    this.code = new FormControl(null, Validators.required);
    this.gender = new FormControl('', Validators.required);

    this.email = new FormControl('', []);
    this.password = new FormControl('', []);

    this.neighborhood = new FormControl('', Validators.required);
    this.street = new FormControl('', Validators.required);
    this.number = new FormControl('', Validators.required);
    this.aditional_information = new FormControl('');
    this.document_number = new FormControl('');
    this.document = new FormControl('');

    this.addForm = new FormGroup({
      name: this.name,
      last_name: this.last_name,
      age: this.age,
      code: this.code,
      gender: this.gender,
      email: this.email,
      password: this.password,
      neighborhood: this.neighborhood,
      street: this.street,
      number: this.number,
      aditional_information: this.aditional_information,
      document_number: this.document_number,
      document: this.document
    });
  }

  async loadPsychologists(): Promise<void> {
    console.log('[PsychoComponent] Cargando psicólogos...');
    this.loaderService.show();
    try {
      const url = `${environment.apiUrl}user/psychologist`;
      const response = await this.httpService.request<any[]>(url, 'GET');
      this.tableHeaders.data = response.data;
      console.log('[PsychoComponent] Psicólogos cargados:', this.tableHeaders.data);
    } catch (error) {
      console.error('[PsychoComponent] Error al cargar psicólogos:', error);
      this.messageService.show({
        severity: 'error',
        sumary: 'Error',
        detail: 'No se pudieron cargar los psicólogos',
      });
    } finally {
      this.loaderService.hide();
    }
  }

  async savePsychologist(): Promise<void> {

    if (!this.isEditing) {
      this.email.setValidators([Validators.required, Validators.email]);
      this.password.setValidators([Validators.required]);
    } else {
      this.email.clearValidators();
      this.password.clearValidators();
    }
    this.email.updateValueAndValidity();
    this.password.updateValueAndValidity();

    if (this.addForm.invalid) {
      console.warn('[PsychoComponent] Formulario inválido, no se puede guardar');
      return;
    }
    this.loaderService.show();

    const body: any = {
      name: this.name.value,
      last_name: this.last_name.value,
      age: this.age.value,
      code: Number(this.code.value),
      gender: this.gender.value,
      direction: {
        neighborhood: this.neighborhood.value,
        street: this.street.value,
        number: this.number.value,
        aditional_information: this.aditional_information.value,
      },
      document_number: this.document_number.value,
      document: {
        id: this.document.value,
      },
      role: {
        id: 3,
      }
    };


    if (!this.isEditing) {
      body.auth = {
        email: this.email.value,
        password: this.password.value,
      };
    }

    console.log('[PsychoComponent] Enviando datos del psicólogo:', body);

    try {
      if (this.isEditing && this.id.value) {
        console.log('[PsychoComponent] Actualizando psicólogo con ID:', this.id.value);
        await this.httpService.request(`${environment.apiUrl}user/psychologists/${this.id.value}`, 'PATCH', body);
        this.messageService.show({
          severity: 'success',
          sumary: 'Psicólogo actualizado',
          detail: 'El psicólogo se actualizó correctamente',
        });
      } else {
        console.log('[PsychoComponent] Creando nuevo psicólogo');
        await this.httpService.request(`${environment.apiUrl}user/psychologists`, 'POST', body);
        this.messageService.show({
          severity: 'success',
          sumary: 'Psicólogo creado',
          detail: 'El psicólogo fue creado correctamente',
        });
      }

      this.resetForm();
      await this.loadPsychologists();
    } catch (error) {
      console.error('[PsychoComponent] Error al guardar psicólogo:', error);
      this.messageService.show({
        severity: 'error',
        sumary: 'Error',
        detail: 'No se pudo guardar el psicólogo',
      });
    } finally {
      this.loaderService.hide();
    }
  }

  onEdit(data: any): void {
    console.log('[PsychoComponent] Editando psicólogo:', data);

    this.id.setValue(data.id);
    this.name.setValue(data.name);
    this.last_name.setValue(data.last_name);
    this.age.setValue(data.age);
    this.code.setValue(data.code);
    this.gender.setValue(data.gender);
    this.email.setValue(data.auth?.email || '');
    this.password.setValue('');
    this.neighborhood.setValue(data.direction?.neighborhood || '');
    this.street.setValue(data.direction?.street || '');
    this.number.setValue(data.direction?.number || '');
    this.aditional_information.setValue(data.direction?.aditional_information || '');
    this.document.setValue(data.document?.id || '');
    this.document_number.setValue(data.document_number || '');
    this.isEditing = true;
  }

  async onDelete(id: number): Promise<void> {
    console.log('[PsychoComponent] Eliminando psicólogo con ID:', id);
    this.loaderService.show();
    try {
      await this.httpService.request(`${environment.apiUrl}users/${id}`, 'DELETE');
      this.messageService.show({
        severity: 'success',
        sumary: 'Psicólogo eliminado',
        detail: 'El psicólogo fue eliminado correctamente',
      });
      await this.loadPsychologists();
    } catch (error) {
      console.error('[PsychoComponent] Error al eliminar psicólogo:', error);
      this.messageService.show({
        severity: 'error',
        sumary: 'Error',
        detail: 'No se pudo eliminar el psicólogo',
      });
    } finally {
      this.loaderService.hide();
    }
  }

  resetForm(): void {
    console.log('[PsychoComponent] Reseteando formulario');
    this.addForm.reset();
    this.id.setValue(null);
    this.isEditing = false;
  }
}
