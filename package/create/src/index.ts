import { join } from 'path';
import inquirer, {QuestionCollection} from "inquirer";
import { entrySync } from "@lcv/util";
import config from "./config";
import download from "download";
import AdmZip from 'adm-zip';
import {renameSync} from "fs-extra";

export const enum Order {
    name = "name",
    frame = "frame",
    typescript = "typescript",
    proxy = "proxy"
}

export enum Frame {
    React = "React",
    Vue = "Vue",
    Vanilla = "Vanilla"
}

export interface projectInfo {
    name: string
    frame: Frame
    typescript: boolean
    proxy: boolean
}

function running_prompt() {
    const prompt_lsit: QuestionCollection[] = [
        {
            type: "input",
            message: "项目名. （Project name）",
            name: Order.name,
            validate: function (val: string) {
                // 如果为空
                if (val === "") return `请输入项目名. (Please enter a project name)`;
                // 规范 文件夹名称
                if (val.match(/(\\|\/|\:|\*|\?|\"|\<|\>|\|)/g))
                    return "请填写正确的文件夹名称. (Please fill in the correct folder name)";

                // 文件夹是否已存在
                if (entrySync(join(process.cwd(), val))) return "文件夹已存在. (Folder already exists)";

                return true;
            },
        },
        {
            type: "list",
            message: "框架. （Frame）",
            name: Order.frame,
            choices: Object.keys(Frame),
        },
        {
            type: "confirm",
            message: "启用 Typescript. (Typescript Supper)",
            name: Order.typescript,
            default: true,
        },
        {
            type: "confirm",
            message: "开启代理(仓库在github.com 国内访问异常建议开启). (Typescript Supper)",
            name: Order.proxy,
            default: true,
        },
    ];

    return inquirer.prompt(prompt_lsit).then(res => {
        return res as projectInfo
    })
}

function get_store_info(info: projectInfo) {
    const {git: {store_name, breatch, url, proxy_url}} = config;
    const _store_name = store_name[info.frame]
    const _breath = breatch[info.typescript && "ts" || "js"]
    const path = `${info.proxy && `${proxy_url}/` || "" }${url}/${_store_name}/archive/refs/heads/${_breath}.zip`
    return {
        path,
        file_name: `${_store_name}-${_breath}.zip`,
        store_branch_name: `${_store_name}-${_breath}`,
    }
}

async function download_project(info: projectInfo) {
    let {path, file_name, store_branch_name} = get_store_info(info)
    const { temp_path } = config
    await download(path, temp_path, {
        filename: file_name
    })
    return {file_name, store_branch_name}
}

function unzip_file(file:string,  dest_path: string) {
    const zip = new AdmZip(file);
    zip.extractAllTo(dest_path, true, )
}

export async function run() {
    const project_info = await running_prompt();
    const {file_name, store_branch_name} = await download_project(project_info);

    
    const { temp_path } = config
    unzip_file(`${temp_path}/${file_name}`, process.cwd());
    renameSync(store_branch_name, project_info.name)
}
 
