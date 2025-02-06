import { NzTransferComponent } from 'ng-zorro-antd/transfer';
import { TransferItemConfig } from './transfer-item-config.interface';
import { TransferDirection } from './transfer-direction.enum';

export interface TransferMoveModeConfig extends NzTransferComponent {
    direction: TransferDirection;
    list: TransferItemConfig[];
}
