import { Routes } from '@angular/router';
import { ListarComponent } from './paginas/listar/listar.component';
import { FormularioComponent } from './paginas/formulario/formulario.component';

export const routes: Routes = [

    {path: 'formulario', component: FormularioComponent},
    {path: 'listar', component: ListarComponent},
    {path: 'formulario/:cpf', component: FormularioComponent}
];
