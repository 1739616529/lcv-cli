import { Command } from "commander";







export default {
    run(command?: Command) {
        import("create-lcv").then(r => r.run());
    },
};
