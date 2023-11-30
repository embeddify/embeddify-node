export function pascalToCamelCase(name: string): string {
    if (name === 'OAuth') {
        return 'oauth';
    } else {
        return name[0].toLowerCase() + name.substring(1);
    }
}

export function removeNullish<T extends Record<string, unknown>>(obj: T): T {
    if (typeof obj !== 'object') {
        throw new Error('Argument must be an object');
    }

    return Object.keys(obj).reduce<Record<string, unknown>>((result, key) => {
        if (obj[key] != null) {
            result[key] = obj[key];
        }
        return result;
    }, {}) as T;
}
