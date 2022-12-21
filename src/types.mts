export type InputData = {
  lang?: string
  title?: string
  icon_URI: string
  display_img?: string
  description?: string
  keywords?: string | string[]
  theme_color?: string
  name?: string
  short_name?: string
  author?: string
  page_url?: string
  app_type?: string
  manifest_url?: string
  html_input?: string
  background_color?: string
  display?: string
  id?: string
  orientation?: string
  scope?: string
  start_url?: string
  output_html_filename?: string
  sw?: {
    output_url?: string
    custom?: string
    strat?:
      "staleWhileRevalidate"
      | "networkOnly"
      | "cacheOnly"
      | "networkFirst"
      | "cacheFirst"
      | "fake"
    cacheClearInterval?: string

  }
}

export type CompiledData = {
  lang: string
  title: string
  webicon_url: string
  display_img?: string
  description: string
  keywords?: string
  theme_color: string
  name: string
  short_name: string
  author?: string
  page_url?: string
  app_type: string
  other_meta: string
  pag_html_output: string
  sw_url: string
  sw_data: {
    output_url?: string
    custom?: string
    strat?:
      "staleWhileRevalidate"
      | "networkOnly"
      | "cacheOnly"
      | "networkFirst"
      | "cacheFirst"
      | "fake"
    cacheClearInterval?: string

  }
  output_html_filename: string
  manifest_url: string
  html_body: string
  html_head: string
  background_color: string
  display: string
  icons: {
    src: string
    sizes: string
    type: string
    purpose: string
  }[]
  id: string
  orientation: string
  scope: string
  start_url: string
}

export type ManifestData = {
  description: string
  theme_color: string
  name: string
  short_name: string
  background_color: string
  icons: {
    src: string
    sizes: string
    type: string
    purpose: string
  }[]
  id: string
  orientation: string
  display: string
  scope: string
  start_url: string
}

export type Args = {
  mode: "gen" | "init"
  publicDir: string
  configJsonFile: string
  templateFile: string | null
}