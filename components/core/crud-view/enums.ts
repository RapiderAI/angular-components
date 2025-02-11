/* eslint-disable no-shadow */

export enum ViewMode {
    Create = 'create',
    List = 'list',
    Update = 'update',
    Edit = 'edit', // alias for update
    Delete = 'delete',
    ViewItem = 'view-item',
    Search = 'search',
    Custom = 'custom'
}

export enum ListMode {
    Grid = 'grid',
    Card = 'card'
}


export enum ItemActions {
    Edit = 'edit-item',
    Delete = 'delete-item'
}

