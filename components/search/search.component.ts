import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteComponentConfig, RappiderAutoCompleteComponent } from '@rapider/angular-components/auto-complete';
import { ButtonComponentConfig, RappiderButtonComponent } from '@rapider/angular-components/button';
import { SearchButtonClickOutput } from '@rapider/angular-components/core/search';

@Component({
  selector: 'rappider-search',
  standalone: true,
  imports: [CommonModule, RappiderAutoCompleteComponent, RappiderButtonComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class RappiderSearchComponent {
  @Input() primarySearchBox: AutoCompleteComponentConfig;
  @Input() secondarySearchBox: AutoCompleteComponentConfig;
  @Input() searchButton: ButtonComponentConfig;

  @Output() primarySearchTextChange = new EventEmitter<string>();
  @Output() secondarySearchTextChange = new EventEmitter<string>();
  @Output() searchButtonClick = new EventEmitter<SearchButtonClickOutput>();

  primarySearchBoxSearchValue: string;
  secondarySearchBoxSearchValue: string;

  onPrimarySearchTextChange(searchText: string) {
    this.primarySearchBoxSearchValue = searchText;
    this.primarySearchTextChange.emit(searchText);
  }

  onSecondarySearchTextChange(searchText: string) {
    this.secondarySearchBoxSearchValue = searchText;
    this.secondarySearchTextChange.emit(searchText);
  }

  onSearchButtonClick() {
    const emitData = {
      primarySearchBox: {
        value: this.primarySearchBoxSearchValue
      },
      secondarySearchBox: {
        value: this.secondarySearchBoxSearchValue
      }
    };
    this.searchButtonClick.emit(emitData);
  }
}
