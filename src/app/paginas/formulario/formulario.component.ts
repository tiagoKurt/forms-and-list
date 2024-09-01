import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormularioServiceService } from './formulario.service.service';
import { Pessoa } from './formulario.types';
import { ActivatedRoute } from '@angular/router';
import { InputMaskModule } from 'primeng/inputmask';

interface Sexo {
    sexo: string;
}
@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule,
    InputTextModule,
    FloatLabelModule,
    MenubarModule,
    ToastModule,
    ButtonModule,
    DropdownModule,
    InputMaskModule
    ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent implements OnInit {
  sexos: { sexo: string }[] | undefined;
  nome: string | undefined;
  sobrenome: string | undefined;
  idade: number | undefined;
  cpf: string | undefined;
  selectedSexo: { sexo: string } | undefined;
  pessoa: Pessoa | undefined;
  formDesabilitado = false;
  constructor(private formularioService: FormularioServiceService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.sexos = [
      { sexo: 'Masculino' },
      { sexo: 'Feminino' }
    ];

    const cpf = this.route.snapshot.paramMap.get('cpf');
    if (cpf) {
      this.pessoa = this.formularioService.obterPessoaPorCpf(cpf);
      this.formDesabilitado = true;
    }
  }

  cadastrar(): void {
    if (this.nome && this.sobrenome && this.idade && this.selectedSexo && this.cpf) {
      const novaPessoa: Pessoa = {
        nome: this.nome,
        sobrenome: this.sobrenome,
        idade: this.idade,
        sexo: this.selectedSexo.sexo,
        cpf: this.cpf
      };

      this.formularioService.adicionarPessoa(novaPessoa);

      // Limpa os campos após o cadastro
      this.nome = undefined;
      this.sobrenome = undefined;
      this.idade = undefined;
      this.selectedSexo = undefined;
      this.cpf = undefined;
    }
  }

}
