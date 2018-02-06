
export default function isCordova(): boolean {
    return typeof window === 'object' && typeof window.cordova !== 'undefined';
}
