export const enum PackManage {
    npm = "npm",
    cnpm = "cnpm",
    yarn = "yarn",
    pnpm = "pnpm"
}
export const pack_manage = {
    [PackManage.npm]: {
        name: PackManage.npm,
        key: PackManage.npm,
    },
    [PackManage.cnpm]: {
        name: PackManage.cnpm,
        key: PackManage.cnpm,
    },
    [PackManage.yarn]: {
        name: PackManage.yarn,
        key: PackManage.yarn,
    },
    [PackManage.pnpm]: {
        name: PackManage.pnpm,
        key: PackManage.pnpm,
    },
}
export const registry_url = {
    npm: {
        name: "npm",
        key: "npm",
        value: "https://registry.npmjs.org/",
    },
    yarn: {
        name: "yarn",
        key: "yarn",
        value: "https://registry.yarnpkg.com/",
    },
    tencent: {
        name: "tencent",
        key: "tencent",
        value: "https://mirrors.cloud.tencent.com/npm/",
    },
    cnpm: {
        name: "cnpm",
        key: "cnpm",
        value: "https://r.cnpmjs.org/",
    },

    npmMirror: {
        name: "npmMirror (淘宝 taobao.org)",
        key: "npmMirror",
        value: "https://registry.npmmirror.com/",
    },
}

export const registry_url_remake: {[K in keyof typeof registry_url]: string} = {
    npm: "",
    yarn: "",
    tencent: "",
    cnpm: "",
    npmMirror: "",
}