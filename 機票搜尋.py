from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup
import pandas as pd

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()
    page.goto("https://flight.eztravel.com.tw/", timeout=60000)

    # 停留 5 秒讓你查看
    page.wait_for_timeout(5000)

    browser.close()