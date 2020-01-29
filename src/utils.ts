export function getNewRecordId (currentState: any[]): number {
    return currentState.length ? currentState[currentState.length - 1].id + 1 : 1;
}
