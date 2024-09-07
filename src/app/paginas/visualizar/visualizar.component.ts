import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { IPessoa } from '../formulario/formulario.types';
import { FormularioServiceService } from '../formulario/formulario.service.service';

interface Sexo {
  sexo: string;
}

@Component({
  selector: 'app-visualizar',
  standalone: true,
  imports: [FormsModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    DropdownModule,
    InputMaskModule,
    RouterModule],
  templateUrl: './visualizar.component.html',
  styleUrl: './visualizar.component.scss'
})
export class VisualizarComponent implements OnInit{
  sexos: Sexo[] = [
    { sexo: 'Masculino' },
    { sexo: 'Feminino' }
  ];

  constructor(
    private route: ActivatedRoute,
    private formularioService: FormularioServiceService
  ) {}

  pessoa: IPessoa | undefined;

  ngOnInit(): void {
    const cpf = this.route.snapshot.paramMap.get('cpf');
    if (cpf) {
      this.formularioService.getPessoas().subscribe(pessoas => {
        this.pessoa = pessoas.find(p => p.cpf === cpf);
      });
    }
  }
}
