import { PaginationSize } from '@rapider/angular-components/core/pagination';

export interface PaginationComponentConfig {
    pageIndex?: number;
    total?: number;
    disabled?: boolean;
    size?: PaginationSize;
    pageSize?: number;
    isSimple?: boolean;
    color?: string;
    gap?: string;
    showTotal?: string;
    showPagination?: boolean;
}
