import unittest
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.meta = []
        self.text = []

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag == "a" and attributes.get("href"):
            self.links.append(attributes["href"])
        if tag == "meta":
            self.meta.append(attributes)

    def handle_data(self, data):
        text = " ".join(data.split())
        if text:
            self.text.append(text)


def parse_page(relative_path):
    parser = PageParser()
    parser.feed((ROOT / relative_path).read_text(encoding="utf-8"))
    return parser, " ".join(parser.text)


class HermesCalendarPagesTest(unittest.TestCase):
    def test_public_pages_exist(self):
        self.assertTrue((ROOT / "hermes-calendar/index.html").is_file())
        self.assertTrue((ROOT / "hermes-calendar/privacy/index.html").is_file())

    def test_homepage_identifies_the_private_calendar_integration(self):
        parser, text = parse_page("hermes-calendar/index.html")

        self.assertIn("Jonah’s Hermes Calendar", text)
        self.assertIn("private personal integration", text.lower())
        self.assertIn("Google Calendar", text)
        self.assertIn("privacy/", parser.links)

    def test_privacy_page_describes_data_use_and_user_controls(self):
        parser, text = parse_page("hermes-calendar/privacy/index.html")
        lower_text = text.lower()

        self.assertIn("calendar events", lower_text)
        self.assertIn("calendar list", lower_text)
        self.assertIn("create or update events", lower_text)
        self.assertIn("self-hosted Hermes instance", text)
        self.assertIn("not sold", lower_text)
        self.assertIn("not shared", lower_text)
        self.assertIn("https://myaccount.google.com/permissions", parser.links)
        self.assertIn("mailto:jonah@ludicacid.com", parser.links)
        self.assertIn("../", parser.links)

    def test_google_can_index_and_read_both_pages(self):
        for relative_path in (
            "hermes-calendar/index.html",
            "hermes-calendar/privacy/index.html",
        ):
            parser, _ = parse_page(relative_path)
            robots = [
                meta.get("content", "").lower()
                for meta in parser.meta
                if meta.get("name", "").lower() == "robots"
            ]
            self.assertNotIn("noindex", robots)


if __name__ == "__main__":
    unittest.main()
