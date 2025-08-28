# playwright_mops_summary.py
from playwright.sync_api import sync_playwright
import pandas as pd
from bs4 import BeautifulSoup

def fetch_summary(year="112", season="04", market="sii", stock_id="2330"):
    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=False)
        page = browser.new_page()

        # 1. 先進入首頁（取得 cookie/session）
        page.goto("https://mops.twse.com.tw/mops/web/index")
        page.wait_for_timeout(2000)

        # 2. 直接進入財報摘要頁面
        page.goto("https://mops.twse.com.tw/mops/#/web/t163sb01")
        page.wait_for_timeout(1000)

        # 3. 點選「自訂」按鈕
        page.click("text=自訂")

        # 4. 輸入公司代號、年度、季別
        page.fill("#companyId", stock_id)
        page.fill("#year", year)

        # season 可支援 "04" 或 "4"
        season_value = str(int(season))  # "04" → "4"
        page.select_option("#season", season_value)

        # 5. 點擊查詢
        page.click("#searchBtn")
        page.wait_for_timeout(3000)

        # 6. 擷取結果 HTML
        html = page.content()
        browser.close()

        # 7. 用 BeautifulSoup 解析 table -> li 條列說明
        soup = BeautifulSoup(html, "html.parser")
        tables = soup.find_all("table")
        print(f"✅ 共抓到 {len(tables)} 張表格")

        if len(tables) >= 1:
            li_tags = soup.select("table li")
            if not li_tags:
                print("⚠️ 表格內沒有 <li> 項目，可能頁面尚未正確載入")
                return None

            items = [li.get_text(strip=True) for li in li_tags]
            df = pd.DataFrame({"說明項目": items})
            return df
        else:
            print("⚠️ 查無表格，可能網頁尚未載入完成或頁面異動")
            return None

if __name__ == "__main__":
    df = fetch_summary(year="112", season="04", market="sii", stock_id="2330")
    if df is not None:
        print(df.head())
        df.to_csv("上市112Q4財報摘要.csv", index=False, encoding="utf-8-sig")
