export const camelize = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map(v => camelize(v));
    }
    if (obj !== null && obj.constructor === Object) {
        return Object.keys(obj).reduce((result: any, key) => {
            const camelKey = key.replace(/_([a-z])/g, g => g[1].toUpperCase());
            result[camelKey] = camelize(obj[key]);
            return result;
        }, {});
    }
    return obj;
};
