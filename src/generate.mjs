import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import generateHTML from "./generateHTML.mjs";
import generateManifest from "./generateMF.mjs";
import getSWCode from "./getSWCode.mjs";
import { defaultTemplate } from "./templates.mjs";
import transformData from "./transformData.mjs";
async function generate(publicDir, compileDataJsonFile, templateFile = null) {
    // const inputJsonFilePath = join(publicDir, compileDataJsonFile)
    const inputJsonFilePath = compileDataJsonFile;
    const inputData = JSON.parse(await readFile(inputJsonFilePath, "utf-8"));
    const compiledData = await transformData(inputData, publicDir);
    const manifestData = generateManifest(compiledData);
    await writeFile(join(publicDir, compiledData.manifest_url), JSON.stringify(manifestData));
    const swCode = await getSWCode(compiledData, publicDir);
    await writeFile(join(publicDir, compiledData.sw_url), swCode);
    const newHTML = await generateHTML(compiledData, templateFile === null ? defaultTemplate : await readFile(templateFile, "utf-8"));
    await writeFile(join(compiledData.output_html_filename), newHTML);
}
export default generate;
