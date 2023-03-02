import { join } from 'path';
import { build } from "vite";

async function vite_build() {
    await build({
        configFile: join(__dirname, "../../viteconfig/vite.config.cli.ts"),
        mode: "production"
    })
}

vite_build()