import { OverFlowCollapseFrom } from "@rapider/angular-components/core/overflow-list";

export interface OverflowListComponentConfig {
  items: string[];
  minVisibleItems?: number;
  collapseFrom?: OverFlowCollapseFrom;
  showIcons?: boolean;
  renderCurrentBreadcrumbAsInput?: boolean;
}