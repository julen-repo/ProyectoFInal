import { Component } from '@angular/core';
import { MenuComponent } from '../menu.component';
import * as XLSX from 'xlsx';
import { ImportService } from '../../../services/import.service';

@Component({
  selector: 'app-import',
  imports: [MenuComponent],
  templateUrl: './import.component.html',
  styleUrl: './import.component.css'
})
export class ImportComponent {
  productos: any[] = [];

  constructor(private importService: ImportService) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const bstr = e.target.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const wsname = workbook.SheetNames[0];
      const ws = workbook.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      this.productos = data;
      console.log(this.productos);
    };
    reader.readAsBinaryString(file);
  }

  importarProductos() {
    this.importService.importarProductos(this.productos).subscribe({
      next: res => {
        alert(res.message || 'Importación exitosa');
        this.productos = [];
      },
      error: err => {
        console.error('Error en la importación', err);
        alert('Error al importar productos');
      }
    });
  }
}