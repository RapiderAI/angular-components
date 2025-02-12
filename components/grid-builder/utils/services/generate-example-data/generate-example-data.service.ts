import { Injectable } from '@angular/core';
import { CrudTableViewColumn, CrudViewColumnType } from '@rapider/angular-components/core/list-grid';
import moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class GenerateExampleDataService {

  constructor() { }

  generateExampleDataFromCrudTableColumns(crudViewColumns: CrudTableViewColumn[]) {
    const populatedData = crudViewColumns.reduce((acc, column) => {
      acc[column.fieldName] = this.getExampleDataFromCrudViewColumn(column);
      return acc;
    }, {}
    );

    return [populatedData];
  }

  getExampleDataFromCrudViewColumn(crudViewColumn: CrudTableViewColumn) {
    switch (crudViewColumn.type) {
      case CrudViewColumnType.Boolean:
        return true;
      case CrudViewColumnType.Currency:
        return 100.0;
      case CrudViewColumnType.Date:
        return moment(new Date()).format('LL');
      case CrudViewColumnType.DateTime:
        return moment(new Date()).format('LL');
      case CrudViewColumnType.Icon:
        return 'fa-regular fa-user';
      case CrudViewColumnType.Image:
        return 'assets/img/placeholders/img-placeholder.png';
      case CrudViewColumnType.Link:
        return 'rappider.com';
      case CrudViewColumnType.Number:
        return 20;
      case CrudViewColumnType.Rate:
        return 4.5;
      case CrudViewColumnType.Switch:
        return true;
      case CrudViewColumnType.Tag:
        return 'Tag';
      case CrudViewColumnType.Text:
        return crudViewColumn.title;
      case CrudViewColumnType.ActionLink:
        return 'rappider.com';
      default:
        return;
    }
  }
}
