import fs, { accessSync } from "fs-extra";
console.log("555")
export function entrySync(path: string, mode: number = fs.constants.F_OK): boolean {
    try {
        accessSync(path, mode);
        return true
    } catch {
        return false
    }
}