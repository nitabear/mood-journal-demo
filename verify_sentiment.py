from playwright.sync_api import sync_playwright
import time

def verify_sentiment():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        # 1. Editor
        print("Navigating to Editor...")
        page.goto("http://localhost:3000/editor", timeout=10000)
        page.wait_for_selector('text=How are you feeling today?', timeout=5000)
        page.screenshot(path="verification_sentiment_default.png")
        print("Default screenshot taken.")

        # 2. Positive Text
        print("Typing positive text...")
        page.fill('textarea', 'I am so happy and joyful today!')
        time.sleep(2) # Wait for transition
        page.screenshot(path="verification_sentiment_positive.png")
        print("Positive screenshot taken.")

        # 3. Negative Text
        print("Typing negative text...")
        page.fill('textarea', '')
        page.fill('textarea', 'I am very sad and anxious.')
        time.sleep(2) # Wait for transition
        page.screenshot(path="verification_sentiment_negative.png")
        print("Negative screenshot taken.")

        browser.close()

if __name__ == "__main__":
    verify_sentiment()
