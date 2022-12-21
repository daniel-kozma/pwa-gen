import { readFile } from "fs/promises";
// import { join } from "path";
import generateIcons from "./generateIcons.mjs";
const transformAsyncData = async (inp, publicDir) => {
    const { icons, pagOutput } = await generateIcons(publicDir, inp.icon_URI);
    const html = inp.html_input == null ? null : await readFile(inp.html_input, "utf-8");
    const { head, body } = html !== null ?
        (/.*<head>(?<head>.*)<\/head>.*<body>(?<body>.*)<\/body>.*/s)
            .exec(html).groups :
        { head: "", body: "" };
    return {
        html_body: body,
        html_head: head,
        icons,
        pag_html_output: pagOutput
    };
};
const transformSyncData = (inp) => ({
    lang: inp.lang || "en",
    app_type: inp.app_type || "webapp",
    background_color: inp.background_color || "#FFFFFF",
    description: inp.description || inp.name || inp.short_name || "",
    display: inp.display || "standalone",
    id: inp.id || "/",
    scope: inp.scope || "/",
    start_url: inp.start_url || "/",
    manifest_url: inp.manifest_url || "manifest.json",
    keywords: inp.keywords == null ? undefined : typeof inp.keywords === "string" ? inp.keywords : inp.keywords.join(", "),
    name: inp.name || inp.short_name || inp.title || "Test App",
    short_name: inp.short_name || inp.name || inp.title || "Test App",
    theme_color: inp.theme_color || "#000000",
    orientation: inp.orientation || "any",
    other_meta: "",
    title: inp.title || inp.name || inp.short_name || "Test App",
    webicon_url: inp.icon_URI,
    display_img: inp.display_img,
    page_url: inp.page_url,
    sw_url: inp.sw?.output_url || "sw.js",
    sw_data: inp.sw || { strat: "staleWhileRevalidate" },
    author: inp.author,
    output_html_filename: inp.output_html_filename || "index.html"
});
const transformData = async (inp, publicDir) => ({
    ...(await transformAsyncData(inp, publicDir)),
    ...(transformSyncData(inp))
});
export default transformData;
