import json
from core.Extractor import JSONExtractor


class DemoOutput:
    def __init__(self):
        self._output = []
        self.extract = JSONExtractor().extract

    def generate_html_page(self, content: str) -> None:
        extracted_content = self.extract(content)
        json_output = json.loads(extracted_content)

        with open("output.html", "w", encoding="utf-8") as file:
            file.write("<!DOCTYPE html>\n")
            file.write("<html lang='en'>\n")
            file.write("<head>\n")
            file.write("    <meta charset='UTF-8'>\n")
            file.write(
                "    <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n"
            )
            file.write("    <title>Extracted Content</title>\n")
            file.write("</head>\n")
            file.write("<body>\n")
            file.write(
                """<style>  body { margin-left: 300px;
                    margin-right: 300px;
                     }
                     </style>"""
            )

            # Assuming `content` is a dictionary with keys like 'pictures' and 'text'
            # Adjust this based on the actual structure of your content

            for item in json_output['article']:
                file.write(f"<p>{item['text']}</p>\n")
                file.write(
                    f"<img src='{item['image']}' alt='Extracted Image' style='max-width:100%;height:auto;'>\n"
                )

            file.write("</body>\n")
            file.write("</html>\n")
