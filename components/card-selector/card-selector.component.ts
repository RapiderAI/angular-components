import { Component, Input, forwardRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ButtonComponentConfig } from '@rapider/angular-components/button';
import { CardsConfig } from '@rapider/angular-components/core/cards';
import { ModalComponentConfig, RappiderModalComponent } from '@rapider/angular-components/modal';
import { TextComponentConfig } from '@rapider/angular-components/text';
import { CardSelector } from './utils/card-selector.interface';
import { CommonModule } from '@angular/common';
import { RappiderButtonComponent } from '@rapider/angular-components/button';
import { RappiderTextComponent } from '@rapider/angular-components/text';
import { RappiderCardsComponent } from '@rapider/angular-components/cards';

@Component({
  selector: 'rappider-card-selector',
  standalone: true,
  imports: [
    CommonModule,
    RappiderCardsComponent,
    RappiderModalComponent,
    RappiderButtonComponent,
    RappiderTextComponent
  ],
  templateUrl: './card-selector.component.html',
  styleUrls: ['./card-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      useExisting: forwardRef(() => CardSelectorComponent),
      multi: true
    }
  ]
})
export class CardSelectorComponent implements ControlValueAccessor, OnDestroy {

  /* cards inputs */
  @Input() cardsConfig: CardsConfig;
  /* modal inputs */
  @Input() modalConfig: ModalComponentConfig;
  /* button inputs */
  @Input() buttonConfig: ButtonComponentConfig;
  /* text inputs */
  @Input() textConfig: TextComponentConfig;

  @Output() changeCardSelectorValue = new EventEmitter<CardSelector>();

  _value: CardSelector;
  selectedId: string;
  visibility: boolean;

  get value() {
    return this._value;
  }

  set value(value: CardSelector) {
    this._value = value;
    this.onChange(value);
    this.onTouched();
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  ngOnDestroy(): void {
    this.value = null;
  }

  writeValue(value: CardSelector): void {
    this._value = value;
    if (this._value && this._value.cardId) {
      this.selectedId = this._value.cardId;
    } else if (!this.selectedId) {
      this.selectedId = null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onTemplateSelect(selectedTemplateId) {
    this.selectedId = selectedTemplateId;
  }

  onSelectClick() {
    this.value = {
      ...this.value,
      cardId: this.selectedId || null
    };
    this.changeCardSelectorValue.emit(this.value);
    this.onCloseModal();
  }

  closeModalAndClearSelectedTemplate() {
    this.onCloseModal();
  }

  onSelectButtonClick() {
    if (this._value) {
      this.selectedId = this._value.cardId;
    } else {
      this.selectedId = null;
    }
    this._value = null;
    this.visibility = true;
  }

  onCloseModal() {
    this.selectedId = null;
    this.visibility = false;
    this.cardsConfig.items.forEach(conf => conf.isSelected = false);
  }

  onPageIndexChange(pageIndex: number) {
    this.updateCardSelectorAndEmit({ ...this.value, pageIndex });
  }

  onSearchTextChange(searchText: string) {
    this.updateCardSelectorAndEmit({ ...this.value, searchText });
  }

  onTagFilterChange(tags: string[]) {
    this.updateCardSelectorAndEmit({ ...this.value, tags });
  }

  updateCardSelectorAndEmit(value: CardSelector): void {
    this.value = value;
    this.changeCardSelectorValue.emit(this.value);
  }

}
