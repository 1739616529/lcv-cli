
import inquirer, { QuestionCollection, Answers } from "inquirer";
import {Command} from "commander"


const command_list = {
    create: {
        command: "create",
        description: "创建electron项目. (create electron project)",
        run() {
            import("./module/create").then(module => module.default.run())
        }
    },
    origin: {
        command: "origin",
        description: "修改 npm/pnpm/yarn 镜像源. (change npm/yarn/pnpm registry)",
        run() {
            import("./module/registry").then(module => module.default.run())
        }
    },
}




function run_command() {
    const program = new Command()
    Object.values(command_list).forEach(v => {
        program.command(v.command).description(v.description).action(v.run)
    })

    program.parse(process.argv)
}

function interaction() {
    inquirer.prompt([
        {
            name: "order",
            type: "list",
            message: "请选择要运行的命令",
            choices: [...Object.keys(command_list), "version"],
        }
    ]).then(res => {
        if (res.order === "version") import("../package.json").then(r => {
            console.log(`v${r.version}`)
        })
        else (command_list as any)[res.order].run()
    })
}



function run () {
    const argv_len = process.argv.length


    if (argv_len <= 2) {
        interaction()
        return 
    }

    run_command()
}

run()