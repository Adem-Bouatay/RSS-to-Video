export async function extractData(): Promise<any> {
  let data;
  const url = window.remotion_staticFiles[0].src;
  await fetch(url)
    .then((res) => res.json())
    .then((json) => {
      data = json;
    })
    .catch((e) => console.error(e));
  return data;
}
