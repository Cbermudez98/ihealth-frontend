import { Component, Input, OnInit } from '@angular/core';
import { IHeaders } from '../../interfaces/ITable';
import { ConfirmDialogService } from '../../services/confirmation/confirmation.service';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit {
  @Input() headers!: IHeaders;
  filteredData: Record<string, any>[] = [];
  editingRow: Record<string, any> | null = null;
  originalRow: Record<string, any> | null = null;

  constructor(private confirmDialogService: ConfirmDialogService) {}

  ngOnInit(): void {
    this.filteredData = [...this.headers.data];
  }

  onUpdate(row: Record<string, any>) {
    this.editingRow = row; 
    this.originalRow = { ...row }; 
  }
  
  saveEdit() {
    if (!this.editingRow) return;
    this.editingRow = null;
    this.originalRow = null;
  }
  
  cancelEdit() {
    if (this.editingRow && this.originalRow) {
      Object.assign(this.editingRow, this.originalRow); 
    }
    this.editingRow = null;
    this.originalRow = null;
  }
  

  onDelete(row: Record<string, any>): void {
    if (this.headers.actions?.delete) {
      this.confirmDialogService.confirm('¿Estás seguro de eliminar este registro?', () => {
        this.headers.actions!.delete!(row);
        this.filteredData = this.filteredData.filter(r => r['id'] !== row['id']); 
      });
    }
  }

  sortData(column: string, ascending: boolean): void {
    this.headers.data.sort((a, b) => (a[column] < b[column] ? (ascending ? -1 : 1) : (a[column] > b[column] ? 1 : -1)));
    this.filteredData = [...this.headers.data];
  }

  onFilter(event: Event, column: string): void {
    const inputElement = event.target as HTMLInputElement;
    this.filteredData = this.headers.data.filter(row =>
      row[column]?.toString().toLowerCase().includes(inputElement.value.toLowerCase())
    );
  }
}
