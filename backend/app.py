from core.Extractor import HTMLExtractor
from core.Agent import Agent
from core.DemoOutput import DemoOutput
from dotenv import load_dotenv
import os
import time

load_dotenv()
api_key = os.getenv("API_KEY")


def main():
    url = "https://www.purepeople.com/article/gabriel-attal-retrouve-son-ex-aux-jo-de-paris-une-celebre-chanteuse-avec-qui-il-a-garde-une-jolie-proximite-video_a525751/1"
    start_time = time.time()
    html_extractor = HTMLExtractor()
    print("-----------------------------EXTRACTING-HTML-----------------------------")
    html_content = html_extractor.get_html(url)
    print("---------------------------END-EXTRACTING-HTML---------------------------")
    agent = Agent(api_key=api_key)
    agent_res = agent.extract_content(html_content=html_content)
    DemoOutput().generate_html_page(content=agent_res)
    end_time = time.time()
    print(f"Total time: {end_time - start_time:.2f} seconds")


if __name__ == "__main__":
    main()
