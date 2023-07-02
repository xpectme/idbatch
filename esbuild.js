import { build } from "esbuild";

build({
  entryPoints: ["mod.ts"],
  outfile: "dest/idbatch.js",
  bundle: true,
  sourcemap: true,
  minify: true,
  format: "esm",
  target: ["ESNext"],
}).catch(() => process.exit(1));
