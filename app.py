from core.Extractor import HTMLExtractor
from core.Agent import Agent
from core.DemoOutput import DemoOutput
from dotenv import load_dotenv
import os
import time

load_dotenv()
api_key = os.getenv("API_KEY")


def main():
    url = "https://www.purepeople.com/article/en-plein-divorce-avec-luana-paul-belmondo-partage-un-beau-moment-avec-leur-fils-victor-et-l-immortalise-en-photo_a526200/1"
    start_time = time.time()
    html_extractor = HTMLExtractor()
    print("-------------------extracting HTML------------------...")
    html_content = html_extractor.get_html(url)
    print("---------------END EXTRACTING HTML-----------------------")
    agent = Agent(api_key=api_key)
    agent_res = agent.extract_content(html_content=html_content)
    DemoOutput().generate_html_page(content=agent_res)
    end_time = time.time()
    print(f"Total time: {end_time - start_time:.2f} seconds")


if __name__ == "__main__":
    main()
