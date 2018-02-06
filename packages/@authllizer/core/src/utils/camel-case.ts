export default function camelCase(name: string): string {
    return name.replace(/([\:\-\_\.]+(.))/g, (_, separator, letter, offset) => {
        return offset ? letter.toUpperCase() : letter;
    });
}
