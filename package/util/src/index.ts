import fs, { accessSync } from "fs-extra";
import { which } from "shelljs"
export function entrySync(path: string, mode: number = fs.constants.F_OK): boolean {
    try {
        accessSync(path, mode);
        return true;
    } catch {
        return false;
    }
}

export function existOrder(order: string): boolean {
    return !!which(order)
}