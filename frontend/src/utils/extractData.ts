export async function extractData(): Promise<any> {
  let data;
  await fetch("/static-b9c166329cf9/output.json")
    .then((res) => res.json())
    .then((json) => {
      data = json;
    })
    .catch((e) => console.error(e));
  return data;
}
