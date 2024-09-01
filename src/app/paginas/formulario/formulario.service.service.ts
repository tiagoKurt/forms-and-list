import { Injectable } from '@angular/core';
import { Pessoa } from './formulario.types';

@Injectable({
  providedIn: 'root'
})
export class FormularioServiceService {
  private pessoas: Pessoa[] = [];
  constructor() { }

  adicionarPessoa(pessoa: Pessoa): void {
    this.pessoas.push(pessoa);
    localStorage.setItem('pessoas', JSON.stringify(this.pessoas));
  }

  obterPessoas(): Pessoa[] {
    const pessoas = localStorage.getItem('pessoas');
    if (pessoas) {
      this.pessoas = JSON.parse(pessoas);
    }
    return this.pessoas;
  }

  excluirPessoa(cpf:string): void{
    this.pessoas = this.pessoas.filter(pessoas => pessoas.cpf !== cpf);
    localStorage.setItem('pessoas', JSON.stringify(this.pessoas))
  }

  obterPessoaPorCpf(cpf: string): Pessoa | undefined {
    const pessoas = localStorage.getItem('pessoas');
    if (pessoas) {
      this.pessoas = JSON.parse(pessoas);
    }
    return this.pessoas.find(pessoa => pessoa.cpf === cpf);
  }

}
