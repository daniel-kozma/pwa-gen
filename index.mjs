#!/usr/bin/env node
const { log, error, warn } = console;
import { writeFile } from "fs/promises";
import generate from "./src/generate.mjs";
import { configTemplate } from "./src/templates.mjs";
const cliArgs = process.argv.slice(2);
if (cliArgs[0] !== "gen" && cliArgs[0] !== "init") {
    error(`[ERROR] First argument is not "gen" or "init"`);
    process.exit(1);
}
const args = {
    mode: cliArgs[0],
    publicDir: cliArgs[1] || "public",
    configJsonFile: cliArgs[2] || "pwa-gen.config.json",
    templateFile: cliArgs[3] || null
};
// first arg is "gen"
if (args.mode === "gen") {
    log("[INFO] Starting generation...");
    try {
        const timeOuts = [
            setTimeout(() => log("[INFO] Reading input data..."), 2000),
            setTimeout(() => log("[INFO] Reading input html..."), 4000),
            setTimeout(() => log("[INFO] Transforming data..."), 6000),
            setTimeout(() => log("[INFO] Starting icon generation..."), 8000),
            setTimeout(() => log("[INFO] Generating icons..."), 10000),
            setTimeout(() => log("[INFO] Generating output data..."), 12000),
            setTimeout(() => log("[INFO] Generating output html..."), 14000),
            setTimeout(() => log("[INFO] Generating manifest.json..."), 16000),
            setTimeout(() => log("[INFO] Generating service worker..."), 18000),
            setTimeout(() => log("[INFO] Writing output to files..."), 20000),
        ];
        await generate(args.publicDir, args.configJsonFile, args.templateFile);
        timeOuts.forEach(clearTimeout);
        log("[SUCCESS] Generation completed successfully.");
        process.exit(0);
    }
    catch (e) {
        error("[ERROR] Unknown error:");
        error(e);
        log("[HELP] Make sure the public folder, the config file, and all other files exist and are valid.");
        process.exit(1);
    }
}
// first arg is "init"
log("[INFO] Initializing...");
try {
    await writeFile(args.configJsonFile, configTemplate);
    log(`[INFO] Created file ${args.configJsonFile}.`);
    process.exit(0);
}
catch (e) {
    error("[ERROR] Unknown error:");
    error(e);
    process.exit(1);
}
