declare let process: any;

export default function isElectron(): boolean {
    return typeof process === 'object' && process.type === 'renderer';
}
