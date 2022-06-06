import { resolve } from "node:path";

interface ImportFileOptions {
  filename: string;
  constructorOptions: unknown[];
}

export async function importFileFromFilename<ConstructorType>({
  filename,
  constructorOptions,
}: ImportFileOptions): Promise<ConstructorType> {
  const filePath = resolve(process.cwd(), filename);
  const File = await (await import(filePath)).default;
  const constructor = new File(...constructorOptions);
  return constructor;
}
