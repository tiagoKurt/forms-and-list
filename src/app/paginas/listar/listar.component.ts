import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Product } from '../formulario/formulario.types';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [ButtonModule,
    TagModule,
    CommonModule,
    CardModule,
    TableModule,],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.scss'
})
export class ListarComponent implements OnInit{
  products!: Product[];
  
  constructor(){}
  
  ngOnInit(){
    this.products = [
      { code: 'P001', name: 'Product 1', category: 'Category A', quantity: 10 },
      { code: 'P002', name: 'Product 2', category: 'Category B', quantity: 20 },
      { code: 'P003', name: 'Product 3', category: 'Category C', quantity: 30 },
      { code: 'P004', name: 'Product 4', category: 'Category A', quantity: 40 }
  ];
  }
  
}
