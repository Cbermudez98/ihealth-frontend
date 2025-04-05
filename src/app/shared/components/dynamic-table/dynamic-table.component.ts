import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { IHeaders } from '../../interfaces/ITable';
import { ConfirmDialogService } from '../../services/confirmation/confirmation.service';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit, OnChanges {
  @Input() headers!: IHeaders;

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
    }
  }

  onUpdate(row: Record<string, any>) {
    this.editingRow = row;
    this.originalRow = { ...row };
    this.headers.actions?.update?.(row);
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
          this.headers.data = this.headers.data.filter(r => r['id'] !== row['id']);
          this.originalData = [...this.headers.data];
        },
        data: row
      });
    }
  }

  sortData(column: string, ascending: boolean): void {
    this.headers.data = [...this.headers.data.sort((a, b) =>
      a[column] < b[column] ? (ascending ? -1 : 1) : a[column] > b[column] ? 1 : -1
    )];
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
