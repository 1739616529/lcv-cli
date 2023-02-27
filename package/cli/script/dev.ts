import { join } from "path";
import { build, } from "vite";
import { RollupWatcher } from "rollup";
import { execa } from "execa";
import { dependencies } from "../package.json"

process.env.NODE_ENV = "development"
async function dev_vite_watch() {
    return new Promise<void>(async resolve => {
        const watch_emitter = await build({
            configFile: join(__dirname, "../../../package/viteconfig/vite.config.cli.ts"),
            mode: process.env.NODE_ENV,
            build: {
                rollupOptions: {
                    external: Object.keys(dependencies)
                }
            }
        }) as RollupWatcher
        watch_emitter.on("event", function cb(event) {
            if (event.code !== "BUNDLE_END") return
            watch_emitter.off("event", cb)
            resolve()
        })
    })
}

async function link_cli() {
    execa("npm", ["run", "link"])
}


async function run() {
    await dev_vite_watch();
    link_cli();
}

run()