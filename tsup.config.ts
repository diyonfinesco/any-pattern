import { defineConfig } from "tsup";

export default defineConfig([
    {
        entry: ["src/index.ts"],
        format: ["cjs", "esm"], // Build for commonJS and ESmodules
        dts: true, // Generate declaration file (.d.ts)
        splitting: false,
        sourcemap: true,
        clean: true,
    },
    {
        entry: {
            cli: "src/cli.ts",
        },
        format: ["cjs"],
        dts: false,
        splitting: false,
        sourcemap: false,
        clean: false,
        banner: {
            js: "#!/usr/bin/env node",
        },
    },
]);
