import { join } from 'path';
import { build } from "vite";

async function vite_build() {
    await build({
        configFile: join(__dirname, "../../viteconfig/vite.config.create.ts"),
        mode: "production"
    })
}

vite_build()