from selenium import webdriver
from bs4 import BeautifulSoup


class HTMLExtractor:
    """
    Initializes an instance of the HTMLExtractor class.
    """

    """
    Sets up the WebDriver and navigates to the specified URL.
    Parameters:
        url (str): The URL to navigate to.
    """
    """
    Extracts the HTML content from the current page.
    Returns:
        str: The cleaned HTML content.
    """
    """
    Sets up the driver, navigates to the specified URL, extracts the HTML content, and closes the browser.
    Parameters:
        url (str): The URL to navigate to.
    Returns:
        str: The cleaned HTML content.
    """

    def __init__(self):
        self.driver = None

    def setup_driver(self, url):
        """
        Sets up the WebDriver and navigates to the specified URL.

        Parameters:
        - url (str): The URL to navigate to.

        Returns:
        - None
        """

        # Initialize the WebDriver
        self.driver = webdriver.Chrome()

        # Navigate to the URL
        self.driver.get(url)

    def extract_html(self):
        """
        Extracts the HTML content from the web page and returns the cleaned HTML.
        Returns:
            str: The cleaned HTML content of the web page.
        """
        page_source = self.driver.page_source
        soup = BeautifulSoup(page_source, "html.parser")
        for tag in soup(["style", "script", "svg", "iframe"]):
            tag.decompose()
        cleaned_html = soup.prettify()

        return cleaned_html

    def get_html(self, url):
        """
        Retrieves the HTML content from the specified URL.

        Args:
            url (str): The URL to retrieve the HTML content from.

        Returns:
            str: The HTML content of the webpage.

        """
        # Set up the driver and navigate to the URL
        self.setup_driver(url)

        # Extract the HTML content
        html_content = self.extract_html()

        # Close the browser
        self.driver.quit()

        return html_content
