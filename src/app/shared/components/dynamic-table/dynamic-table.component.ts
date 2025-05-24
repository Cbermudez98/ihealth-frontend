import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { IHeaders } from '../../interfaces/ITable';
import { ConfirmDialogService } from '../../services/confirmation/confirmation.service';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit, OnChanges {
  @Input() headers!: IHeaders;
  @Output() editRow = new EventEmitter<any>();

  private originalData: Record<string, any>[] = [];

  editingRow: Record<string, any> | null = null;
  originalRow: Record<string, any> | null = null;

  constructor(private confirmDialogService: ConfirmDialogService) {}

  ngOnInit(): void {
    this.setOriginalData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['headers']) {
      this.setOriginalData();
    }
  }

  private setOriginalData() {
    if (this.headers?.data) {
      this.originalData = [...this.headers.data];
      this.headers.data = [...this.originalData]; 
    }
  }

  onUpdate(row: Record<string, any>) {
    this.editRow.emit(row);
  }

  saveEdit() {
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
      this.confirmDialogService.confirm({
        message: '¿Estás seguro de eliminar este registro?',
        header: 'Peligro',
        accept: async () => {
          await this.headers.actions!.delete!(row);
          this.originalData = this.originalData.filter(r => r['id'] !== row['id']);
          this.headers.data = [...this.originalData]; 
        },
        data: row
      });
    }
  }

  sortData(column: string, ascending: boolean): void {
    this.headers.data = [...this.headers.data.sort((a, b) => {
      if (a[column] < b[column]) return ascending ? -1 : 1;
      if (a[column] > b[column]) return ascending ? 1 : -1;
      return 0;
    })];
  }

  onFilter(event: Event, column: string): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();

    this.headers.data = filterValue
      ? this.originalData.filter(row =>
          row[column]?.toString().toLowerCase().includes(filterValue)
        )
      : [...this.originalData];
  }
}
