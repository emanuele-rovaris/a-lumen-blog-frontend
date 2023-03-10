export enum NOTIFICATION_STATUS {
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
}

export interface INotification {
    open: boolean;
    status: NOTIFICATION_STATUS | null;
    message: string | null;
}