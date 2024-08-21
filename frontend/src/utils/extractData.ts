import { staticFile } from "remotion";

export async function extractData(): Promise<any> {
  const url = staticFile("output.json");
  let data;

  await fetch(url)
    .then((res) => res.json())
    .then((json) => {
      data = json;
    })
    .catch((e) => console.error(e));
  return data;
}

export const publicFolderPath = staticFile("audio").split("/")[1];
