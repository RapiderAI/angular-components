import { TransferItemConfig } from './transfer-item-config.interface';
import { TransferDirection } from './transfer-direction.enum';

export interface TransferChangeModeConfig {
    from: TransferDirection;
    to: TransferDirection;
    list: TransferItemConfig[];
}
