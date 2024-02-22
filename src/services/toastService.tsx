import { notifications } from '@mantine/notifications';
import { rem } from '@mantine/core';
import { IconCheck, IconX, IconAlertTriangleFilled, IconInfoCircleFilled } from '@tabler/icons-react';

const defaultOptions = {
    withCloseButton: false,
    withBorder: true,
    autoClose: true,
    title: 'Title',
    message: 'Toast message',
    color: 'green',
    icon: '',
    loading: false,
};

export const showSuccessToast:any = (message:string) => {
    const options = { ...defaultOptions, ...{ title: 'Success', message, color: 'green', icon: <IconCheck style={{ width: rem(18), height: rem(18) }} /> } };
    notifications.show(options);
};

export const showWarningToast:any = (message:string) => {
    const options = { ...defaultOptions, ...{ title: 'Warning', message, color: 'yellow', icon: <IconAlertTriangleFilled style={{ width: rem(18), height: rem(18) }} /> } };
    notifications.show(options);
};

export const showInfoToast:any = (message:string) => {
    const options = { ...defaultOptions, ...{ title: 'Info', message, color: 'custom-indigo', icon: <IconInfoCircleFilled style={{ width: rem(18), height: rem(18) }} /> } };
    notifications.show(options);
};

export const showErrorToast:any = (message:string) => {
    const options = { ...defaultOptions, ...{ title: 'Error', message, color: 'red', icon: <IconX style={{ width: rem(18), height: rem(18) }} /> } };
    notifications.show(options);
};
