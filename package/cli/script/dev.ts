import { join } from "path";
import { build, } from "vite";
import { RollupWatcher } from "rollup";
import { execa } from "execa";
import { dependencies } from "../package.json"

process.env.NODE_ENV = "development"

async function vite_build() {
    await build({
        configFile: join(__dirname, "../../viteconfig/vite.config.cli.ts"),
        mode: "development"
    })
}


async function link_cli() {
    execa("npm", ["run", "link"])
}


async function run() {
    await vite_build();
    link_cli();
}

run()