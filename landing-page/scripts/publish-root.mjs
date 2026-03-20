import {cp, copyFile, mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const landingDir = path.resolve(scriptDir, '..');
const distDir = path.join(landingDir, 'dist');
const appRootDir = path.resolve(landingDir, '..');

await copyFile(path.join(distDir, 'index.html'), path.join(appRootDir, 'index.html'));

await mkdir(path.join(appRootDir, 'assets'), {recursive: true});
await cp(path.join(distDir, 'assets'), path.join(appRootDir, 'assets'), {
  force: true,
  recursive: true,
});
