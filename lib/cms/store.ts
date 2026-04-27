import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type CmsContent = {
  services?: unknown;
  countries?: unknown;
  blogs?: unknown;
  home?: unknown;
};

const CONTENT_DIR = path.join(process.cwd(), "content");
const CONTENT_PATH = path.join(CONTENT_DIR, "cms.json");

export async function readCmsContent(): Promise<CmsContent> {
  try {
    const raw = await readFile(CONTENT_PATH, "utf8");
    return JSON.parse(raw) as CmsContent;
  } catch {
    return {};
  }
}

export async function writeCmsContent(next: CmsContent) {
  await mkdir(CONTENT_DIR, { recursive: true });
  await writeFile(CONTENT_PATH, JSON.stringify(next, null, 2), "utf8");
}

export async function updateCmsContent(partial: CmsContent) {
  const current = await readCmsContent();
  await writeCmsContent({ ...current, ...partial });
}
