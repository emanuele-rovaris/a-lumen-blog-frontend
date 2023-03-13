import {describe, expect, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import {Notification} from "@/components";
import {INotification, NOTIFICATION_STATUS} from "@/utils";

describe('Notification component', () => {
    const alertShow: INotification = {
        open: true,
        status: NOTIFICATION_STATUS.SUCCESS,
        message: 'notification-message',
    };
    const alertHide: INotification = {
        open: false,
        status: NOTIFICATION_STATUS.SUCCESS,
        message: 'notification-message',
    };
    const alertNoStatus: INotification = {
        open: true,
        status: null,
        message: 'notification-message',
    };
    const alertNoMessage: INotification = {
        open: true,
        status: NOTIFICATION_STATUS.SUCCESS,
        message: null,
    };
    const handleClose = vi.fn();

    it('should render component', () => {
        render(<Notification notification={alertShow} onClose={handleClose}/>);
        const notification = screen.getByText('notification-message');
        expect(notification).toBeInTheDocument();
    });

    it('should not render component', () => {
        render(<Notification notification={alertHide} onClose={handleClose}/>);
        const notification = screen.queryByText('notification-message');
        expect(notification).toBeNull();
    });

    it('should not render alert with no status', () => {
        render(<Notification notification={alertNoStatus} onClose={handleClose}/>);
        const notification = screen.queryByText('notification-message');
        expect(notification).toBeNull();
    });

    it('should not render alert with no message', () => {
        render(<Notification notification={alertNoMessage} onClose={handleClose}/>);
        const notification = screen.queryByText('notification-message');
        expect(notification).toBeNull();
    });
});