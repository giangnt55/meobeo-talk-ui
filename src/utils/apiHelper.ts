export const camelize = (obj: unknown): unknown => {
    if (Array.isArray(obj)) {
        return obj.map(v => camelize(v));
    }
    if (obj !== null && typeof obj === 'object' && !Array.isArray(obj)) {
        const record = obj as Record<string, unknown>;
        return Object.keys(record).reduce<Record<string, unknown>>((result, key) => {
            const camelKey = key.replace(/_([a-z])/g, g => g[1].toUpperCase());
            result[camelKey] = camelize(record[key]);
            return result;
        }, {});
    }
    return obj;
};
