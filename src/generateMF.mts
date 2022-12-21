import { CompiledData, ManifestData } from "./types.mjs"

const generateManifest = ({ id, name, short_name, description, orientation, display, scope, start_url, theme_color, background_color, icons }: CompiledData): ManifestData => ({
  id,
  name,
  short_name,
  description,
  orientation,
  display,
  scope,
  start_url,
  theme_color,
  background_color,
  icons
})

export default generateManifest