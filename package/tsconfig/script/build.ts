import { join } from 'path';
import { build } from "vite";
import {emptydirSync} from "fs-extra"

async function vite_build() {
    await build({
        configFile: join(__dirname, "../../viteconfig/vite.config.util.ts"),
        mode: "production",
    })
}

vite_build()