import { readFile } from "node:fs/promises";
import path from "node:path";

const HANDOFF_DIR = "/Users/manishbhattarai/Downloads/design_handoff";
const HOME_HERO_VIDEO_SOURCES = [
  "https://videos.pexels.com/video-files/7685406/7685406-hd_1920_1080_25fps.mp4",
  "https://videos.pexels.com/video-files/3255275/3255275-hd_1920_1080_30fps.mp4",
] as const;
const HOME_HERO_POSTER =
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&q=80";

async function readHandoffHtml(fileName: string) {
  const fullPath = path.join(HANDOFF_DIR, fileName);
  return readFile(fullPath, "utf8");
}

type HandoffFrameProps = {
  fileName: string;
  title: string;
};

export async function HandoffFrame({ fileName, title }: HandoffFrameProps) {
  try {
    let html = await readHandoffHtml(fileName);
    if (fileName === "index.html") {
      html = html
        .replace(
          'poster="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"',
          `poster="${HOME_HERO_POSTER}"`,
        )
        .replace(
          '<source src="https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4" type="video/mp4">',
          `<source src="${HOME_HERO_VIDEO_SOURCES[0]}" type="video/mp4">`,
        )
        .replace(
          '<source src="https://videos.pexels.com/video-files/856910/856910-hd_1920_1080_25fps.mp4" type="video/mp4">',
          `<source src="${HOME_HERO_VIDEO_SOURCES[1]}" type="video/mp4">`,
        );
    }
    return (
      <iframe
        title={title}
        srcDoc={html}
        className="h-[calc(100vh-24px)] w-full border-0"
      />
    );
  } catch {
    return (
      <section className="mx-auto max-w-3xl px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-zinc-900">Design handoff file missing</h1>
        <p className="mt-2 text-zinc-600">
          Could not load <code>{fileName}</code> from your Downloads handoff folder.
        </p>
      </section>
    );
  }
}
