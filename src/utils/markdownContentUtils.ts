import fs from "fs";
import path from "path";

import { ContentType, ContentTypeMap } from "@/models";

export function getAllMdxIds(contentType: string) {
  const mainMdxDirectory = path.join(
    process.cwd(),
    "src/content/",
    contentType
  );

  const mdxDirectories = fs.readdirSync(mainMdxDirectory);

  return mdxDirectories.flatMap((directory) => {
    const dirPath = path.join(mainMdxDirectory, directory);
    if (!fs.statSync(dirPath).isDirectory()) return [];

    const files = fs.readdirSync(dirPath);

    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => ({ id: file.replace(/\.mdx$/, "") }));
  });
}

export function getJSONById<T extends ContentType>(
  contentType: T,
  id: string
): ContentTypeMap[T] {
  const jsonDirectory = path.join(
    process.cwd(),
    "src/content/",
    contentType,
    id
  );

  const fullPath = path.join(jsonDirectory, `${id}.json`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  return JSON.parse(fileContents) as ContentTypeMap[T];
}
