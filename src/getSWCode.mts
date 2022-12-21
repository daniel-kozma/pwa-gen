import { readFile } from "fs/promises"
import { join } from "path"
import { swTemplates } from "./templates.mjs"
import { CompiledData } from "./types.mjs"

const getSWCode = async (inputData: CompiledData, publicDir: string): Promise<string> => {
  if(typeof inputData.sw_data.custom === "string")
    return await readFile(
      join(publicDir, inputData.sw_data.custom),
      "utf-8"
    )
  return swTemplates[inputData.sw_data.strat || "staleWhileRevalidate"]
}

export default getSWCode