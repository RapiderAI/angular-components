import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { RappiderButtonModule } from '@rapider/angular-components/button';


@Component({
  selector: 'rappider-modal',
  standalone: true,
  imports: [CommonModule, NzModalModule, RappiderButtonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class RappiderModalComponent implements OnInit {
  @Input() title: string;
  @Input() visible = false;
  @Input() okText: string;
  @Input() cancelText: string;
  @Input() width: string;
  @Input() okDisabled: boolean;
  @Input() cancelDisabled: boolean;
  @Input() footer: unknown;
  @Input() okLoading: boolean;
  @Input() okDanger: boolean;
  @Input() mask = false;
  @Input() maskClosable = false;
  @Input() className: string;
  @Input() bodyStyle: any;
  @Input() closeIconVisibility = true;
  @Input() fullScreen = false;

  @Output() okClick = new EventEmitter();
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
