import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const [distDirArg, websiteDirArg, parLangDirArg, parRepository] = process.argv.slice(2);

if (!distDirArg || !websiteDirArg || !parLangDirArg || !parRepository) {
  console.error(
    "Usage: node scripts/write-build-metadata.mjs <dist> <website-dir> <par-lang-dir> <par-repository>",
  );
  process.exit(1);
}

function git(args, cwd) {
  return execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

function commit(cwd) {
  try {
    return git(["rev-parse", "HEAD"], cwd);
  } catch {
    return null;
  }
}

const distDir = resolve(distDirArg);
const websiteDir = resolve(websiteDirArg);
const parLangDir = resolve(parLangDirArg);

const metadata = {
  built_at: new Date().toISOString(),
  website: {
    repository: "par-team/par-website",
    commit: commit(websiteDir),
  },
  par_lang: {
    repository: parRepository,
    commit: commit(parLangDir),
  },
};

mkdirSync(distDir, { recursive: true });
writeFileSync(join(distDir, "build.json"), `${JSON.stringify(metadata, null, 2)}\n`);
