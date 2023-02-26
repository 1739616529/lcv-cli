
import { dependencies as dependencies_cli } from "@lcv/cli/package.json"
import { dependencies as dependencies_create } from '@lcv/create/package.json'
import { dependencies as dependencies_util } from "@lcv/util/package.json"
export const build_external_list = [
    "@lcv/cli", "create-lcv", "@lcv/util"
    // ...Object.keys({...dependencies_cli, ...dependencies_create, ...dependencies_util})
]