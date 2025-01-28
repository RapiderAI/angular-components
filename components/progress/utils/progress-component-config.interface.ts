import { ProgressStatus, ProgressType, ProgressSize } from '@rapider/angular-components/core/progress';
import { ColorConfig, SizeConfig, SpacingConfig } from '@rapider/angular-components/core/style';

export interface ProgressComponentConfig {
  percent: number;
  status: ProgressStatus;
  type: ProgressType;
  showInfo?: boolean;
  size?: ProgressSize;
  successPercent?: number;
  width?: number;
  strokeWidth?: number;
  isSuccessPercentVisible?: boolean;
  customSizeSettings?: SizeConfig;
  customColorSettings?: ColorConfig;
  paddingSettings?: SpacingConfig;
  marginSettings?: SpacingConfig;
}