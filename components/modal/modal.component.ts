import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RappiderButtonModule } from '@rapider/angular-components/button'
import { TranslateModule } from '@ngx-translate/core';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'rappider-modal',
  templateUrl: './modal.component.html',
  imports: [
    CommonModule,
    NzModalModule,
    TranslateModule,
    RappiderButtonModule
  ],
  standalone: true,
  styleUrls: ['./modal.component.scss']
})
export class RappiderModalComponent implements OnInit {
  /* title */
  @Input() title: string;
  /* visibility status */
  @Input() visible = false;
  /* ok text */
  @Input() okText = 'Save';
  /* cancel text */
  @Input() cancelText = 'Cancel';
  /* modal size */
  @Input() width: string;
  /* ok button disabled */
  @Input() okDisabled: boolean;
  /* cancel button disabled */
  @Input() cancelDisabled: boolean;
  /* footer */
  @Input() footer: unknown;
  /* ok button loading state */
  @Input() okLoading: boolean;
  /* is ok button danger */
  @Input() okDanger: boolean;
  /* Whether show mask or not */
  @Input() mask = false;
  /* Whether to close the modal dialog when the mask is clicked */
  @Input() maskClosable = false;
  @Input() className: string;
  @Input() bodyStyle: any;
  @Input() closeIconVisibility = true;
  @Input() fullScreen = false;
  /* ok click */
  @Output() okClick = new EventEmitter();
  /* cancel click */
  @Output() cancelClick = new EventEmitter();
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() afterModalOpen = new EventEmitter();

  isRightSidebarActive = false;

  ngOnInit(): void {
    this.isRightSidebarActive = document.body.classList.contains('right-sidebar-active');
    if (this.isRightSidebarActive) {
      if (this.className) {
        this.className += ' right-sidebar-active-full-modal';
      } else {
        this.className = 'right-sidebar-active-full-modal';
      }
    }
  }

  onOkClick() {
    this.okClick.emit();
  }

  onCancelClick() {
    this.cancelClick.emit();
    this.visibleChange.emit(false);
    this.visible = false;
  }

  onAfterOpen() {
    this.afterModalOpen.emit();
  }

}
