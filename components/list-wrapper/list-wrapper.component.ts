import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudTableViewConfig, CrudViewColumnType } from '@rapider/angular-components/core/list-grid';
import { CardDataMapConfig, ItemActions, ListMode } from '@rapider/angular-components/core/crud-view';
import { HeadingComponentConfig } from '@rapider/angular-components/heading';
import { HeadingType } from '@rapider/angular-components/core/heading';
import { Action, ActionBehavior, RedirectUrlMode } from '@rapider/angular-components/core/action';
import { ButtonComponentConfig } from '@rapider/angular-components/button';
import { ButtonType } from '@rapider/angular-components/core/button';
import { DropdownMenuComponentConfig } from '@rapider/angular-components/dropdown-menu';
import { SwitchComponentConfig } from '@rapider/angular-components/switch';
import { BreadcrumbOption } from 'ng-zorro-antd/breadcrumb';
import { InputGroupComponentConfig } from '@rapider/angular-components/input-group';
import { IconType } from '@rapider/angular-components/core/icon';
import { TemplatingService } from '@rapider/angular-components/core/services';
import { NzUploadComponent, NzUploadFile } from 'ng-zorro-antd/upload';
import { CommonModule } from '@angular/common';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';

import * as Papa from 'papaparse';
import * as jsonata from 'jsonata';
import { RappiderInputGroupComponent } from '../input-group';
import { RappiderCardCcsComponent } from '../card-ccs';
import { FormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAlertComponent } from 'ng-zorro-antd/alert';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { RappiderListGridComponent } from '../list-grid/list-grid.component';
import { RappiderTitleToolbarComponent } from '@rapider/angular-components/title-toolbar';

export enum ComponentActions {
  ImportData = 'importData',
  ExportData = 'exportData'
}

@Component({
  selector: 'rappider-list-wrapper',
  templateUrl: './list-wrapper.component.html',
  imports:[
    CommonModule,
    RappiderListGridComponent,
    RappiderTitleToolbarComponent,
    RappiderInputGroupComponent,
    NzEmptyModule,
    RappiderCardCcsComponent,
    FormsModule,
    NzGridModule,
    NzAlertComponent,
    NzUploadComponent,
    NzButtonComponent,
    NzIconModule,
    NzModalModule
  ],
  standalone: true,
  styleUrls: ['./list-wrapper.component.scss']
})
export class RappiderListWrapperComponent implements OnInit, OnChanges {
  @Input() listMode = ListMode.Card;

  /* Crud configs */
  @Input() listGridConfig: CrudTableViewConfig;
  @Input() cardListConfig: CardDataMapConfig;
  @Input() isDataLoading = false;
  @Input() isListGridBorderless = true;
  @Input() redirectUrlData: Record<string, unknown>;
  /* data  */
  @Input() data: Record<string, unknown | any>[];
  /* flag to display or hide the toolbar */
  @Input() displayToolbar = false;
  /* explicit option to pass to the toolbar in order to set the visibility of back button */
  @Input() displayToolbarBackButton = false;
  /** title bar */
  @Input() titleBarActionMenu?: DropdownMenuComponentConfig;
  @Input() titleBarSwitchSettings: SwitchComponentConfig;

  /* flag to display breadcrumb under title */
  @Input() displayBreadCrumb = true;
  @Input() breadCrumbOptions: BreadcrumbOption[] | string[] | string;
  @Input() titleBarActionButtons?: ButtonComponentConfig[] = [];

  /* config to set title according to crud pages */
  @Input() mainTitleConfig: HeadingComponentConfig;

  @Input() showCreateButton = true;
  @Input() createButtonTitle = 'Create';
  @Input() addListGridItemDefaultActions = true;
  @Input() addCardItemDefaultActions = true;

  @Input() allowDataImport? = false;

  @Input() importDataConfig?: any = {
    title: 'Import Data',
    helpTitle: 'How to Import Data',
    helpDescription: 'Import data from a file',
    downloadTemplateURL: '/assets/templates/sample_template.csv',
    downloadedTemplateFilename: 'template.csv',
    okText: 'Import',
    cancelText: 'Cancel',
    previewTableMaxHeight: '300px',
    validationFunction: (item: any) => !!item, // Example validation function, validates each row
  };

  @Output() itemDeleted = new EventEmitter<any>();
  @Output() itemUpdated = new EventEmitter<any>();
  @Output() titleBarActionButtonClicked = new EventEmitter<ButtonComponentConfig | Action>();
  @Output() cardListItemActionClicked = new EventEmitter<any>();
  @Output() cardListItemSelected = new EventEmitter<any>();
  @Output() listGridListActionDropdownItemClick = new EventEmitter<any>();
  @Output() listGridColumnActionClick = new EventEmitter<any>();
  @Output() listActionClick = new EventEmitter<any>();
  @Output() dataImported = new EventEmitter<any[]>();
  @Output() createValidEntity = new EventEmitter<any>();


  /* Active item id in the path for editing or displaying the details of an item */
  activeItemId?: string;
  activeItem?: Record<string, unknown>;

  titleBarRadioButtonSettings = [
    {
      key: '<i class="fa-light fa-table-list"></i>',
      value: 'grid-view',
      tooltipText: 'Grid View'
    },
    {
      key: '<i class="fa-thin fa-grid-2"></i>',
      value: 'card-view',
      tooltipText: 'Card View'
    }
  ];

  cardListSearchText: string;
  filteredDataForCardMode: Object[];

  cardSearchInputConfig: InputGroupComponentConfig = {
    textbox: {
      placeholder: 'Search'
    },
    suffixIcon: {
      name: 'fas fa-search',
      type: IconType.FontAwesome
    }
  };

  ListMode = ListMode;

  /* Import Data modal visibility */
  isImportDataModalVisible = false;
  /* Files that are selected/dropped to import */
  importedFileList: NzUploadFile[] = [];
  importedEntities: any[] = [];
  listGridConfigForImportData: CrudTableViewConfig;
  defaultPreviewTableMaxHeight = '200px';
  importDataButton: any = {
    key: 'importData',
    text: this.importDataConfig?.importButtonText || 'Import Data',
    icon: {
      name: this.importDataConfig?.importButtonIcon || 'fa-sharp fa-regular fa-upload',
      type: IconType.FontAwesome,
    },
    type: this.importDataConfig?.importButtonType || ButtonType.Default
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private templatingService: TemplatingService
  ) { }

  /* get data and set view mode on init */
  ngOnInit(): void {
    this.getPathParameters();
    this.getCardDataForCardMode();

    if (this.allowDataImport) {
      // Add import data button to the title bar
      this.titleBarActionButtons.push(this.importDataButton);

      const validationColumn = {
        title: 'Validation',
        fieldName: '_isValid',
        type: CrudViewColumnType.Boolean,
        width: '100px'
      };

      // Set the preview table max height
      this.listGridConfigForImportData = {
        ...this.listGridConfig,
        columns: [validationColumn, ...(this.listGridConfig?.columns ?? [])],
        scroll: { yAxis: this.importDataConfig?.previewTableMaxHeight || this.defaultPreviewTableMaxHeight },
        itemActions: [],
        listActions: [],
      };
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getCardDataForCardMode();
  }

  /* get path parameters for view mode and editing item id */
  getPathParameters() {
    /* active item id is read from the path in order to show data to edit, e.g. /projects/edit/{id} */
    this.activeItemId = this.route.snapshot?.params?.['itemId'];
  }

  getCardDataForCardMode() {
    if (
      this.cardListSearchText && this.cardListSearchText.trim() &&
      this.data?.length &&
      this.listGridConfig
    ) {
      let filteredData;
      if (this.listGridConfig.multipleSearchFields && this.listGridConfig.multipleSearchFields.length > 0) {
        filteredData = this.data.filter(item =>
          this.listGridConfig.multipleSearchFields.some(field => item[field]?.toLowerCase().includes(this.cardListSearchText.trim().toLowerCase()))
        );
      } else if (this.listGridConfig.defaultSearchField) {
        filteredData = this.data.filter(item =>
          item[this.listGridConfig.defaultSearchField]?.toLowerCase().includes(this.cardListSearchText.trim().toLowerCase())
        );
      }
      this.filteredDataForCardMode = filteredData?.map(item => ({
        ...item,
        image: this.getCardImage(item).image,
        subtitles: this.getCardSubtitles(item)
      })) || [];
    }
    this.filteredDataForCardMode = this.data?.map(item => ({
      ...item,
      image: this.getCardImage(item).image,
      subtitles: this.getCardSubtitles(item)
    })) || [];
  }

  onSearchValueChange(searchText: string) {
    this.getCardDataForCardMode();
  }

  getCardImage(item: any) {
    const imageField = this.listGridConfig?.columns?.find(column => column.type === 'image');
    return {
      image: {
        source: item[imageField?.fieldName],
        customSizeSettings: {
          width: '100%',
          height: '8rem'
        },
      },
    };
  }

  /* on delete */
  onItemDeleted(deletedItemAction: { action: Action; data: Record<string, unknown> }) {
    if (deletedItemAction?.data?.['id']) {
      this.itemDeleted.emit(deletedItemAction?.data);
    }
  }

  onListGridListActionDropdownItemClick(item: any) {
    this.listGridListActionDropdownItemClick.emit(item);
  }

  onListGridColumnActionClick(actionData: { action: Action; data: any }): void {
    if (actionData.action?.behavior === ActionBehavior.Route) {
      this.redirectToUrlByAction(actionData.action, actionData.data);
    }
    if (actionData.action?.name === ItemActions.Delete) {
      this.itemDeleted.emit(actionData);
    }
    this.listGridColumnActionClick.emit(actionData);
  }

  onTitleBarRadioButtonClick(selectedValue: string) {
    if (selectedValue === 'card-view') {
      this.listMode = ListMode.Card;
    } else {
      this.listMode = ListMode.Grid;
    }
  }

  onTitleBarActionButtonClick(action) {
    // Actions that are controlled by this component
    if (action?.key === ComponentActions.ImportData) {
      console.log('Import Data');
      this.isImportDataModalVisible = true;
    } else if (action?.behavior === ActionBehavior.Route) {
      this.router.navigateByUrl(action.redirectUrl);
    } else if (action?.behavior === ActionBehavior.Emit) {
      this.titleBarActionButtonClicked.emit(action);
    }
  }

  getCardSubtitles(cardData: any): HeadingComponentConfig[] {
    if (this.cardListConfig?.getSubTitlesFunction) {
      return this.cardListConfig?.getSubTitlesFunction(cardData);
    } else if (this.cardListConfig?.subtitleFieldNames?.length) {
      return this.cardListConfig?.subtitleFieldNames?.map(subtitleFieldName => <HeadingComponentConfig>{
        content: cardData[subtitleFieldName],
        type: HeadingType.H6
      }) || [];
    }
    return [];
  }

  onCardViewActionClick(action: any, cardData: any) {
    const buttonAction = action?.button || action;
    if (buttonAction?.behavior === ActionBehavior.Route) {
      this.redirectToUrlByAction(buttonAction, cardData);
    } else if (buttonAction?.behavior === ActionBehavior.Emit) {
      if (buttonAction?.name === ItemActions.Delete) {
        this.itemDeleted.emit({ action: buttonAction, data: cardData });
      } else {
        this.cardListItemActionClicked.emit({ action: buttonAction, data: cardData });
      }
    }
  }

  onListActionClick(listAction) {
    this.listActionClick.emit(listAction);
  }

  redirectToUrlByAction(action: Action, data?: any) {
    if (action?.redirectUrlMode === RedirectUrlMode.Navigate) {
      /* navigate */
      let url = action?.redirectUrl;
      if (url) {
        if (data) {
          url = this.templatingService.execTemplate(url, data);
        }
        this.router.navigateByUrl(url);
      }
    }
  }

  onCardViewItemSelected(item: any) {
    console.log(item);
    if (this.cardListConfig?.cardItemClickBehavior === ActionBehavior.Route) {
      this.redirectToUrlByAction(
        {
          behavior: ActionBehavior.Route, redirectUrlMode: RedirectUrlMode.Navigate,
          redirectUrl: this.cardListConfig?.cardItemRouterLink || ''
        },
        item
      );
    } else {
      this.cardListItemSelected.emit(item);
    }
  }


  // #region Import Data
  onImportDataCancelled() {
    this.isImportDataModalVisible = false;
    this.resetImportData();
  }

  onImportDataSubmitted() {
    this.isImportDataModalVisible = false;
    this.processImportedDataWithState();
    this.resetImportData();
  }

  resetImportData() {
    this.importedFileList = [];
    this.importedEntities = [];
  }

  /**
   * For each row with _isValid : true, trigger an NGRX action after transforming the data with provided JSONata
   *
   * @memberof RappiderListWrapperComponent
   */
  processImportedDataWithState() {

    const validEntities = this.importedEntities?.filter((entity) => !!entity._isValid) || [];

    //  Transform the data with JSONata if provided
    validEntities.forEach((entity: any) => {
      // blacklisted fields, e.g. _isValid field
      const blacklistedFields = ['_isValid'];
      blacklistedFields.forEach((field) => delete entity[field]);

      // Emit each valid entity to the parent component
      this.createValidEntity.emit(entity);
    });

    // Emit the valid entities
    this.dataImported.emit(this.importedEntities);
  }

  downloadCSVTemplate(): void {
    if (this.listGridConfig?.columns?.length) {
      // Extract the column titles from the config
      const headers = this.listGridConfig?.columns?.map(column => column.title);

      // Convert the headers into a single CSV row
      const csvContent = [headers.join(',')].join('\n');

      // Create a Blob from the CSV content
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

      // Create a link element to download the Blob as a file
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'import-template.csv');

      // Append the link to the document, trigger a click, and remove the link
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the URL object
      URL.revokeObjectURL(url);
    } else {
      console.error('No columns found in the list grid config');
    }
  }

  /**
   * Process the uploaded file and import entities from it
   *
   * @param {NzUploadFile} file
   * @memberof RappiderListWrapperComponent
   */
  beforeUpload = (file: NzUploadFile): boolean => {
    this.importedFileList = [file];
    this.replaceHeadersAndImportEntities(file);
    return false;
  };

  /**
   * Replace headers with field names and import entities from the uploaded file
   *
   * @param {NzUploadFile} file
   * @memberof RappiderListWrapperComponent
   */
  replaceHeadersAndImportEntities(file: NzUploadFile) {
    if (this.listGridConfig.columns.length) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        const fileContent = event.target.result;

        // Map titles to field names
        const headerMapping = this.listGridConfig.columns?.reduce((map, col) => {
          map[col.title] = col.fieldName;
          return map;
        }, {} as Record<string, string>);

        // Split file content into lines
        const rows = fileContent.split('\n');
        const originalHeaders = rows[0].split(',');

        // Replace titles with corresponding field names
        const updatedHeaders = originalHeaders.map((header) => headerMapping[header] || header);
        rows[0] = updatedHeaders.join(',');

        // Rejoin rows into a single CSV string
        const updatedCSV = rows.join('\n');

        // Parse the updated CSV
        Papa.parse(updatedCSV, {
          header: true,
          dynamicTyping: true,
          complete: (parsedCSV: any) => {
            const validatedEntities = parsedCSV?.data?.map((item: any) => ({
              ...item,
              _isValid: this.importDataConfig?.validationFunction ? this.importDataConfig?.validationFunction(item) : !!item,
            }));

            console.log(validatedEntities);
            this.importedEntities = validatedEntities || [];
          },
          error: (error: any, file: any) => {
            console.log(error, file);
          }
        });
      };

      reader.onerror = (error: any) => {
        console.error('Error reading file:', error);
      };

      reader.readAsText(file as unknown as Blob);
    }
  }

  // #endregion

}
