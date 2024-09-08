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
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
interface Sexo {
  sexo: string;
}

@Component({
  selector: 'app-visualizar',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    DropdownModule,
    InputMaskModule,
    RouterModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './visualizar.component.html',
  styleUrl: './visualizar.component.scss',
})
export class VisualizarComponent implements OnInit {
  sexos: Sexo[] = [{ sexo: 'Masculino' }, { sexo: 'Feminino' }];

  constructor(
    private route: ActivatedRoute,
    private formularioService: FormularioServiceService,
    private messageService: MessageService
  ) {}

  pessoa: IPessoa | undefined;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.formularioService.getPessoas().subscribe((pessoas) => {
        this.pessoa = pessoas.find((p) => p.id === id);
      });
    }
  }

  excluirPessoa(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('chegou');
    if (id) {
      this.formularioService.deletarPessoa(id).subscribe(
        () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Concluído!',
            detail: `Usuário foi removido com sucesso!`,
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro!',
            detail: 'Falha ao excluir o usuário.',
          });
        }
      );
    }
  }
}
