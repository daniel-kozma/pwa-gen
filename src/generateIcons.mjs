import { readFile, unlink, writeFile } from "fs/promises";
import { join } from "path";
import { cmd } from "./util.mjs";
export default async function generateIcons(publicDir, favicon, iconsDir = "icons", iconsFile = "icons.json", splashscreensFile = "splashscreens.html") {
    const fullIconsFilaPath = join(publicDir, iconsFile);
    const fullSplashscreensFilePath = join(publicDir, splashscreensFile);
    await writeFile(fullIconsFilaPath, "{}");
    await writeFile(fullSplashscreensFilePath, "");
    const stdout = await cmd(`cd ${publicDir}`, 
    // "npm i -g pwa-asset-generator",
    `npx pwa-asset-generator ${favicon} ${iconsDir} -m ${iconsFile} -i ${splashscreensFile} -s false`).catch(e => console.error(`[ERROR] Error while generating icons:`, e, "\n Continuing anyways"));
    const { icons } = await readFile(fullIconsFilaPath, `utf-8`)
        .then(value => JSON.parse(value))
        .catch(e => { throw e; });
    const html = await readFile(fullSplashscreensFilePath, `utf-8`);
    const pagOutput = (/.*<head>(?<content>.*)<\/head>.*/s)
        .exec(html)
        ?.groups?.content;
    await unlink(fullIconsFilaPath);
    await unlink(fullSplashscreensFilePath);
    return { icons, pagOutput };
}
