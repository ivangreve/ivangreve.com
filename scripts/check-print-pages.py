#!/usr/bin/env python3
"""Guard the printed page count of the résumé.

    npm run build
    python3 scripts/check-print-pages.py

The print stylesheet is tuned to land both languages on three A4 pages, and it
sits close enough to the boundary that adding two bullets can silently push it
to four. Nothing in the browser tells you — the page just gets longer. This
prints the built site through headless Chrome and fails if the count moved.

Serves dist/ over a real HTTP server rather than pointing Chrome at file://,
because the built CSS is referenced from an absolute /_astro/ path.
"""

from __future__ import annotations

import functools
import http.server
import re
import shutil
import socket
import socketserver
import subprocess
import sys
import tempfile
import threading
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"

# language label -> (path to print, expected page count)
PAGES = {
    "en": ("/", 3),
    "es": ("/es/", 3),
}

CHROME_CANDIDATES = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    shutil.which("google-chrome") or "",
    shutil.which("chromium") or "",
]


def find_chrome() -> str:
    for path in CHROME_CANDIDATES:
        if path and Path(path).exists():
            return path
    sys.exit("no Chrome or Chromium found — install one, or skip this check")


def free_port() -> int:
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        return s.getsockname()[1]


def count_pdf_pages(pdf: Path) -> int:
    """Count /Type /Page objects, excluding /Type /Pages (the tree root)."""
    return len(re.findall(rb"/Type\s*/Page[^s]", pdf.read_bytes()))


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    """SimpleHTTPRequestHandler without the per-request logging.

    The silencing has to live on the class — assigning to a functools.partial
    sets an attribute on the partial object, which the handler never consults.
    """

    def log_message(self, *args: object) -> None:
        pass


def serve(directory: Path, port: int) -> socketserver.TCPServer:
    handler = functools.partial(QuietHandler, directory=str(directory))
    httpd = socketserver.TCPServer(("127.0.0.1", port), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd


def main() -> int:
    if not DIST.is_dir():
        sys.exit("dist/ not found — run `npm run build` first")

    chrome = find_chrome()
    port = free_port()
    httpd = serve(DIST, port)

    failures = 0
    try:
        with tempfile.TemporaryDirectory() as tmp:
            for lang, (path, expected) in PAGES.items():
                pdf = Path(tmp) / f"{lang}.pdf"
                subprocess.run(
                    [
                        chrome,
                        "--headless",
                        "--disable-gpu",
                        "--no-pdf-header-footer",
                        f"--print-to-pdf={pdf}",
                        f"http://127.0.0.1:{port}{path}",
                    ],
                    capture_output=True,
                    timeout=90,
                    check=False,
                )
                if not pdf.exists():
                    print(f"  FAIL  {lang}: Chrome produced no PDF")
                    failures += 1
                    continue

                got = count_pdf_pages(pdf)
                ok = got == expected
                failures += not ok
                verdict = "ok  " if ok else "FAIL"
                print(f"  {verdict}  {lang}: {got} page(s), expected {expected}")
    finally:
        httpd.shutdown()

    print()
    if failures:
        print("  The printed résumé changed length.")
        print("  Either trim the content, or update the expected count in this script")
        print("  if the new length is what you want.")
        return 1
    print("  print layout holds")
    return 0


if __name__ == "__main__":
    sys.exit(main())
