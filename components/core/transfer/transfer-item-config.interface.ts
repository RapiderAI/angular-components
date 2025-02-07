import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { TransferDirection } from './transfer-direction.enum';
import { NzTransferComponent } from 'ng-zorro-antd/transfer';

export interface TransferItemConfig {
    title: string;
    direction?: TransferDirection;
    disabled?: boolean;
    checked?: boolean;
    key: string;
    list: TransferItemConfig[];
}


