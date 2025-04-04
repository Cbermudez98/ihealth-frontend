import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../../shared/services/auth/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../shared/interfaces/User';
import { ToastService } from '../../../shared/services/Toast/toast.service';
import { MenuItem } from 'primeng/api';
import { HttpService } from '../../../shared/services/HTTP/http.service';
import { environment } from '../../../environments/enviroments';
<<<<<<< Updated upstream
import { LoaderService } from '../../../shared/services/loader/loader.service';
import { IDocument } from '../../../interfaces/IUser';
=======

>>>>>>> Stashed changes
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  items: MenuItem[] = [];
  activeIndex: number = 0;
<<<<<<< Updated upstream
=======
  private loginService = inject(LoginService);
  private router = inject(Router);
  public formBuild = inject(FormBuilder);
  public httpService = inject(HttpService);

  docOptions = [
    { name: 'C.C', id: 'CC' },
    { name: 'T.I', id: 'TI' },
    { name: 'C.E', id: 'CE' },
    { name: 'P.A', id: 'PA' },
  ];
>>>>>>> Stashed changes

  docOptions: IDocument[] = [];

  genderOptions = [
    { name: 'Hombre', code: 'H' },
    { name: 'Mujer', code: 'M' },
  ];

  careerOptions: { id: number; name: string }[] = [];
<<<<<<< Updated upstream

  constructor(
    private toastService: ToastService,
    private readonly loadingSrv: LoaderService,
    private readonly Loginservice: LoginService,
    private readonly router: Router,
    private formBuild: FormBuilder,
    private httpService: HttpService
  ) {}

  async ngOnInit() {
    this.items = [
      { label: 'Correo electronico' },
      { label: 'Información personal' },
      { label: 'Dirección' },
      { label: 'Contraseña' },
    ];

    this.loadCareers();
    const documents = await this.httpService.request<IDocument[]>(
      `${environment.apiUrl}user/documents`,
      'GET'
    );
    this.docOptions = documents.data;
  }

  updateForm(event: number) {
    const idControl = this.personalForm.get('document_number');

    if (event) {
      const doc: IDocument | undefined = this.docOptions.find(
        (doc) => doc.id === event
      );
      console.log(doc);

      idControl?.setValidators([
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]);
      idControl?.enable();

      if (!doc) {
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

  loadCareers(): void {
    const url = `${environment.apiUrl}career`;
    this.httpService
      .request<{ id: number; name: string }[]>(url, 'GET')
      .then((response) => {
        if (response && Array.isArray(response.data)) {
          this.careerOptions = response.data;
        }
      });
  }

  semesterOptions = [
    { name: '1', id: '1' },
    { name: '2', id: '2' },
    { name: '3', id: '3' },
    { name: '4', id: '4' },
    { name: '5', id: '5' },
    { name: '6', id: '6' },
    { name: '7', id: '7' },
    { name: '8', id: '8' },
    { name: '9', id: '9' },
    { name: '10', id: '10' },
  ];

=======

  semesterOptions = Array.from({ length: 10 }, (_, i) => ({
    name: `${i + 1}`,
    id: `${i + 1}`,
  }));

>>>>>>> Stashed changes
  public emailForm: FormGroup = this.formBuild.group({
    email: ['', [Validators.required, Validators.email]],
  });

  public personalForm: FormGroup = this.formBuild.group({
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    birthdate: ['', [Validators.required]],
    age: [{ value: '', disabled: true }], // Se calcula automáticamente
    id: ['', [Validators.required]], // Se habilita/deshabilita dinámicamente
    document: ['', [Validators.required]],
    document_number: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    code: ['', [Validators.required]],
    carreer: ['', [Validators.required]],
    semester: ['', [Validators.required]],
  });

  public directionForm: FormGroup = this.formBuild.group({
    neighborhood: ['', [Validators.required]],
    street: ['', [Validators.required]],
    number: ['', [Validators.required]],
    aditional: [''],
  });

  public passwordForm: FormGroup = this.formBuild.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

<<<<<<< Updated upstream
=======
  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.items = [
      { label: 'Correo electrónico' },
      { label: 'Información personal' },
      { label: 'Dirección' },
      { label: 'Contraseña' },
    ];

    this.loadCareers();

    this.personalForm.get('document')?.valueChanges.subscribe((value) => {
      const idControl = this.personalForm.get('id');

      if (value) {

        idControl?.enable();


        if (['CC', 'TI', 'CE'].includes(value)) {
          idControl?.setValidators([
            Validators.required,
            Validators.pattern(/^\d+$/),
          ]);
        } else if (value === 'PA') {
          idControl?.setValidators([
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9]+$/),
          ]);
        }
      } else {

        idControl?.disable();
        idControl?.clearValidators();
      }


      idControl?.updateValueAndValidity();
    });
  }

  loadCareers(): void {
    const url = `${environment.apiUrl}/career`;
    this.httpService
      .request<{ id: number; name: string }[]>(url, 'GET')
      .then((response) => {
        if (response && Array.isArray(response.data)) {
          this.careerOptions = response.data;
        }
      })
      .catch((error) => console.error('Error loading careers:', error));
  }

  calcularEdad(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Conversión explícita

    if (!inputElement || !inputElement.value) return; // Manejo de null/undefined

    const birthdate = inputElement.value;
    const fechaNac = new Date(birthdate);
    if (isNaN(fechaNac.getTime())) return;

    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mesActual = hoy.getMonth();
    const diaActual = hoy.getDate();
    const mesNacimiento = fechaNac.getMonth();
    const diaNacimiento = fechaNac.getDate();

    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
      edad--;
    }

    this.personalForm.get('age')?.setValue(edad);
  }

>>>>>>> Stashed changes
  next() {
    const forms = [
      this.emailForm,
      this.personalForm,
      this.directionForm,
      this.passwordForm,
    ];

    const currentForm = forms[this.activeIndex];
    if (currentForm.invalid) {
      currentForm.markAllAsTouched();
      return;
    }

    if (this.activeIndex < this.items.length - 1) {
      this.activeIndex++;
    }
  }

  previous() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  async register() {
    try {
      if (this.passwordForm.invalid) return;
      this.loadingSrv.show();

<<<<<<< Updated upstream
      const object: User = {
        name: this.personalForm.value.name,
        auth: {
          email: this.emailForm.value.email,
          password: this.passwordForm.value.password,
=======
    const birthdate = this.personalForm.value.birthdate;
    if (!birthdate) {
      this.toastService.show({
        severity: 'error',
        detail: 'Fecha de nacimiento es obligatoria',
        sumary: 'Error',
      });
      return;
    }

    const age = this.personalForm.value.age; // Ya se calculó automáticamente

    const object: User = {
      name: this.personalForm.value.name,
      auth: {
        email: this.emailForm.value.email,
        password: this.passwordForm.value.password,
      },
      last_name: this.personalForm.value.lastname,
      age: age, // Ahora es un número válido
      code: this.personalForm.value.code,
      gender: this.personalForm.value.gender,
      direction: {
        neighborhood: this.directionForm.value.neighborhood,
        street: this.directionForm.value.street,
        number: this.directionForm.value.number,
        aditional_information: this.directionForm.value.aditional,
      },
      student_detail: {
        career: {
          id: this.personalForm.value.carreer,
>>>>>>> Stashed changes
        },
        last_name: this.personalForm.value.lastname,
        document: {
          id: this.personalForm.value.document,
        },
        document_number: this.personalForm.value.document_number,
        age: 18,
        code: this.personalForm.value.code,
        gender: this.personalForm.value.gender,
        direction: {
          neighborhood: this.directionForm.value.neighborhood,
          street: this.directionForm.value.street,
          number: this.directionForm.value.number,
          aditional_information: this.directionForm.value.aditional,
        },
        student_detail: {
          career: {
            id: this.personalForm.value.carreer,
          },
          semester: this.personalForm.value.semester,
        },
        role: {
          id: 1,
        },
      };

<<<<<<< Updated upstream
      const data = await this.Loginservice.register(object);
      console.log(object);
      this.router.navigate(['auth/login']);
      this.toastService.show({
        severity: 'success',
        detail: 'Registro realizado con exito',
        sumary: 'Exito',
      });
      this.loadingSrv.hide();
    } catch (error) {
      this.loadingSrv.hide();
      this.toastService.show({
        severity: 'error',
        sumary: 'Error',
        detail: 'No se pudo guardar',
=======
    try {
      await this.loginService.register(object);
      this.router.navigate(['auth/login']);
      this.toastService.show({
        severity: 'success',
        detail: 'Registro exitoso',
        sumary: 'Éxito',
      });
    } catch (error) {
      console.error('Error en el registro:', error);
      this.toastService.show({
        severity: 'error',
        detail: 'Hubo un error en el registro',
        sumary: 'Error',
>>>>>>> Stashed changes
      });
    }
  }

  login() {
    this.router.navigate(['auth/login']);
  }
}
