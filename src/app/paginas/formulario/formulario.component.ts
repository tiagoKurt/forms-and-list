import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormularioServiceService } from './formulario.service.service';
import { IPessoa } from './formulario.types';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { InputMaskModule } from 'primeng/inputmask';

interface Sexo {
  sexo: string;
}

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    MenubarModule,
    ToastModule,
    ButtonModule,
    DropdownModule,
    InputMaskModule,
    RouterModule
  ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent implements OnInit {
  sexos: Sexo[] = [
    { sexo: 'Masculino' },
    { sexo: 'Feminino' }
  ];

  formDesabilitado = false;

  pessoas: IPessoa[] = [];

  pessoa: IPessoa = { nome: '', sobrenome: '', idade: null, sexo: '', cpf: '' }

  constructor(
    private formularioService: FormularioServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const cpf = this.route.snapshot.paramMap.get('cpf');
    if (cpf) {
      // this.pessoa = this.formularioService.obterPessoaPorCpf(cpf);
      this.formDesabilitado = true;
    }
  }

  cadastrar(): void {
    this.formularioService.criarPessoa(this.pessoa).subscribe(
      (resposta) => {
        this.pessoa = { nome: '', sobrenome: '', idade: null, sexo: '', cpf: '' }; // Reseta idade para null
      }
    );
  }
}
