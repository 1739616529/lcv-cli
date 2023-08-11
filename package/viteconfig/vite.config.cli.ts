import { builtinModules } from "module";
import { join } from "path";
import { UserConfig, UserConfigFn } from "vite";
import { build_external_list } from "./config";
import { dependencies } from "@lcv/cli/package.json"

const out_path_build: {[key:string]:string} = {
    "development": "bin",
    "production": "dist"
}
export default <UserConfigFn>function ({mode}) {
    const user_config_json = <UserConfig>{
        
        root: join(__dirname, "../../package/cli"),
        resolve: {
            project: "./",
            src: "./src"
        },
        build: {
            outDir: "dist",
            emptyOutDir: true,
            minify: true,
            sourcemap: false,
            lib: {
                entry: "src/index",
                formats: ["cjs"],
                fileName: "index",
            },
            rollupOptions: {
                external: [...builtinModules, ...build_external_list, ...Object.keys(dependencies || {})]
            }
        },
        
        publicDir: "public"
    }

    if (mode === "development") user_config_json.build!.watch = {
        buildDelay: 100,
        exclude: "node_modules/**",
        include: "src/**",
    }
    return user_config_json
}