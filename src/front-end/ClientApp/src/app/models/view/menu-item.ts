export class MenuItem {
    title: string;
    url?: string;
    action?: () => {};
    visible: boolean;
    right: boolean;
    icon?: string;
    forceShowText?: boolean;
}
