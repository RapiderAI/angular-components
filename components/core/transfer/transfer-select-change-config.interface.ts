import { NzTransferComponent } from 'ng-zorro-antd/transfer';
import { TransferItemConfig } from './transfer-item-config.interface';
import { TransferDirection } from './transfer-direction.enum';

export interface TransferSelectChangeModeConfig extends NzTransferComponent {
    direction: TransferDirection;
    checked: boolean;
    list: TransferItemConfig[];
    item?: TransferItemConfig;
}
