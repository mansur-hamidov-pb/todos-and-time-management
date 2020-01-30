import i18next from './locales/i18n';

export function getNewRecordId (currentState: any[]): number {
    return currentState.length ? currentState[currentState.length - 1].id + 1 : 1;
}

export function t (key: string, options?: any) {
    return i18next.t(key, options);
}

