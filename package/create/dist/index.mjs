import { join as s } from "path";
import m from "inquirer";
import { entrySync as l } from "@lcv/util";
import u from "adm-zip";
const c = {
  git: {
    proxy_url: "https://ghproxy.com/",
    url: "https://github.com/1739616529",
    store_name: {
      React: "react-vite-electron",
      Vue: "vue-vite-electron",
      Vanilla: "vanilla-vite-electron"
    },
    breatch: {
      ts: "main",
      js: "vanilla"
    }
  },
  temp_path: `${process.env.TEMP}/lcv`
};
var f = /* @__PURE__ */ ((e) => (e.name = "name", e.frame = "frame", e.typescript = "typescript", e.proxy = "proxy", e))(f || {}), i = /* @__PURE__ */ ((e) => (e.React = "React", e.Vue = "Vue", e.Vanilla = "Vanilla", e))(i || {});
function y() {
  const e = [
    {
      type: "input",
      message: "项目名. （Project name）",
      name: "name",
      validate: function(t) {
        return t === "" ? "请输入项目名. (Please enter a project name)" : t.match(/(\\|\/|\:|\*|\?|\"|\<|\>|\|)/g) ? "请填写正确的文件夹名称. (Please fill in the correct folder name)" : l(s(process.cwd(), t)) ? "文件夹已存在. (Folder already exists)" : !0;
      }
    },
    {
      type: "list",
      message: "框架. （Frame）",
      name: "frame",
      choices: Object.keys(i)
    },
    {
      type: "confirm",
      message: "启用 Typescript. (Typescript Supper)",
      name: "typescript",
      default: !0
    },
    {
      type: "confirm",
      message: "开启代理(仓库在github.com 国内访问异常建议开启). (Typescript Supper)",
      name: "typescript",
      default: !0
    }
  ];
  return m.prompt(e).then((t) => t);
}
function _(e) {
  const { git: { store_name: t, breatch: r, url: n, proxy_url: p } } = c, a = t[e.frame], o = r[e.typescript && "ts" || "js"];
  return {
    path: `${e.proxy && `${p}/` || ""}${n}/${a}/archive/refs/heads/${o}.zip`,
    file_name: `${a}-${o}.zip`,
    store_branch_name: `${a}-${o}`
  };
}
async function h(e) {
  let { path: t, file_name: r, store_branch_name: n } = _(e);
  return { file_name: r, store_branch_name: n };
}
function g(e, t) {
  new u(e).extractAllToAsync(t, !0, !1, () => {
  });
}
async function $() {
  const e = await y(), { file_name: t, store_branch_name: r } = await h(e), { temp_path: n } = c;
  console.log(r), g(`${n}/${t}`, "E:/emo-cli/111");
}
$();
export {
  i as Frame,
  f as Order
};
