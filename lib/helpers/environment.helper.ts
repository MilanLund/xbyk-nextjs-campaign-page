export function getEnvironmentOptionalValue(variableName: string): string | undefined {
    const value = process.env[variableName];

    if (!value) {
        return undefined;
    }

    return value;
}

export function getEnvironmentRequiredValue(variableName: string): string {
    const value = getEnvironmentOptionalValue(variableName);

    if (!value) {
        throw new Error(`Missing environment variable '${variableName}'`);
    }

    return value;
}
