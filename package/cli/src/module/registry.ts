import { registry_url, registry_url_remake, pack_manage, PackManage } from "../config"
import {existOrder} from "@lcv/util";
import inquirer, { QuestionCollection, Answers } from "inquirer";
import { exec } from "shelljs";
import {Command} from "commander"

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
            choices: Object.keys(registry_url),
        },
        
    ]
    return inquirer.prompt(list)
}


const exec_pack_mgn_registry = (() => {
    const ditc_exec_order: {[key in PackManage]: (url: string) => string} = {
        [PackManage.npm]: (url: string) => `npm -g config set registry ${url}`,
        [PackManage.cnpm]: (url: string) => '',
        [PackManage.yarn]: (url: string) => `yarn config set registry ${url}`,
        [PackManage.pnpm]: (url: string) => '',
    }
    return (order: PackManage) => {
        return ditc_exec_order[order]
    }
})()

export default {
    async run(command?: Command) {
        const { packlist, origin } = await interaction() as {
            packlist: PackManage[],
            origin: keyof typeof registry_url,
        }
        const origin_url = registry_url[origin].value
        packlist.forEach((v) => {
            const url = exec_pack_mgn_registry(v)(origin_url)
            url && exec(url)
        })
    }
}