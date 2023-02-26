import r, { accessSync as c } from "fs-extra";
console.log("555");
function o(t, n = r.constants.F_OK) {
  try {
    return c(t, n), !0;
  } catch {
    return !1;
  }
}
export {
  o as entrySync
};
