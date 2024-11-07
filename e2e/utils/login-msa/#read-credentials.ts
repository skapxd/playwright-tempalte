import { readFile } from "fs/promises";
import { join } from "path";

interface IReturn {
  email: string;
  pass: string;
}

export const readCredentials = async (path: string): Promise<IReturn> => {
  const _ = join(path, "credentials.env");

  const credentialsAsEntries = (await readFile(_, "utf-8"))
    .replaceAll(/["']/g, "")
    .split("\n")
    .map((line) => line.split("="));

  const credentials = Object.fromEntries(credentialsAsEntries);

  if ("email" in credentials === false)
    throw new Error("email not found in credentials");

  if ("pass" in credentials === false)
    throw new Error("pass not found in credentials");

  return credentials;
};
