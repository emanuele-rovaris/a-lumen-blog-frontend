export interface INotificationState {
    open: boolean;
    status: 'success' | 'warning' | 'error' | null;
    message: string | null;
}