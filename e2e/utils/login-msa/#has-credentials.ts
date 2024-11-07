import { mkdir, readdir } from "fs/promises";
import { join } from "path";

export const hasCredentials = async (path: string) => {
  const authPath = join(path, "auth");

  const exists = await readdir(authPath).catch(async () => {
    await mkdir(authPath);
    return [] as string[];
  });

  if (exists.length < 3) {
    return {
      status: false,
      path: authPath,
    };
  } else {
    return {
      status: true,
      path: authPath,
    };
  }
};
