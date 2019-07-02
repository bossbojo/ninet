/**
 * Perform deep object cleaning - string trimming.
 * @param object An object
 */
export function cleanObject<T>(object: T): T {
    const json = JSON.stringify(object, (_, value) => {
        if (typeof value === 'string') {
            return value.trim();
        }

        return value;
    });

    return JSON.parse(json);
}

/**
 * Read file as Base64.
 * @param file File to read.
 * @param callback Callback to perform when file is finished reading. This callback accepts result as parameter.
 */
export function readFileAsBase64(
    file: File,
    callback: (result: string | ArrayBuffer) => void
) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => { callback(reader.result); };
}

/**
 * Chunk an array into given size.
 * @param array Array
 * @param size Each chunk's size.
 */
export function chunkArray(array: any[], size: number) {
    const results = [];

    while (array.length) {
        results.push(array.splice(0, size));
    }

    return results;
}
