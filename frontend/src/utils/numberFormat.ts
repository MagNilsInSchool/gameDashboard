export const padNumbers = <T extends Record<string, number>>(obj: T) =>
    Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, String(v).padStart(2, "0")])) as {
        [K in keyof T]: string;
    };
