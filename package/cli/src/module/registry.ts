import { registry_url, registry_url_remake, pack_manage, PackManage } from "../config"
import {existOrder} from "@lcv/util";
import inquirer, { QuestionCollection, Answers } from "inquirer";
import { exec } from "shelljs";
import {Command} from "commander"

export type RegistryAction = "delete"|"set"
function interaction() {
    const have_pack_mgn_list = Object.keys(pack_manage).filter(existOrder)
    const list: QuestionCollection<Answers> = [
        {
            type: "checkbox",
            name: "packlist",
            message: "选择要替换的包管理. (Please select package manage)",
            default: have_pack_mgn_list,
            choices: have_pack_mgn_list,
        },
        {
            type: "list",
            name: "origin",
            message: "请选择要替换的源. (Select the source you want to replace)",
            choices: Object.keys(registry_url).map(v => ({name: v, value: v})).concat([{name: "恢复默认(inital)", value: "init"}]),
        },
        
    ]
    return inquirer.prompt(list)
}


const exec_pack_mgn_registry = (order: PackManage, url: string, type: RegistryAction = "set"): string => {
    return `${order} config ${type} registry ${url}`
}

export default {
    async run(command?: Command) {
        const { packlist, origin } = await interaction() as {
            packlist: PackManage[],
            origin: keyof typeof registry_url | "init",
        }

        let origin_url = ""
        let type: RegistryAction = "set"
        if (origin === "init") {
            type = "delete"
        } else {
            origin_url = registry_url[origin].value
        }
        packlist.forEach((v) => {
            const url = exec_pack_mgn_registry(v, origin_url, type)
            console.log(url)
            url && exec(url)
        })
    }
}