import minimist from "minimist";
import { cd, test } from "shelljs";
import { execa } from "execa";

const cwd = process.cwd();

function get_args() {
    const args = minimist(process.argv.slice(2))._;
    if (args.length <= 1) throw new Error("请输入需要运行的项目");
    return args
}

function running_package() {
    const [order, package_name] = get_args();
    const pack_path = `${cwd}/package/${package_name}`;
    if (test("-d", pack_path) === false) throw new Error("项目不存在")
    cd(pack_path)
    execa("npm", ["run", order]).stdout?.pipe(process.stdout);
}

running_package()