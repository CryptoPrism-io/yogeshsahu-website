"""
One-shot importer: reads hi-res PNGs from C:/cpio_db/portfolio/images/,
resizes to 1600px wide max (preserving aspect), exports WebP @ q=82
into public/images/projects/<project-id>/<safe-name>.webp.

Run from the repo root:
    python scripts/import-portfolio-images.py
"""
from __future__ import annotations
from pathlib import Path
from PIL import Image

SRC_ROOT = Path("C:/cpio_db/portfolio/images")
DEST_ROOT = Path(__file__).resolve().parent.parent / "public" / "images" / "projects"
MAX_WIDTH = 1600
WEBP_QUALITY = 82

# (project-slug, src-relative-path, dest-basename-without-ext)
MAPPING: list[tuple[str, str, str]] = [
    # pgg-crm
    ("pgg-crm", "pgg-crm/hires/01-pipeline-kanban.png",          "01-pipeline-kanban"),
    ("pgg-crm", "pgg-crm/hires/02-lead-detail-sales-intel.png",  "02-lead-detail-sales-intel"),
    ("pgg-crm", "pgg-crm/hires/03-quote-builder-pdf.png",        "03-quote-builder-pdf"),
    ("pgg-crm", "pgg-crm/hires/04-outreach-composer.png",        "04-outreach-composer"),
    # pgg-erp
    ("pgg-erp", "pgg-erp/hires/01-sales-dashboard.png",          "01-sales-dashboard"),
    ("pgg-erp", "pgg-erp/hires/02-new-invoice-form.png",         "02-new-invoice-form"),
    ("pgg-erp", "pgg-erp/hires/03-tax-invoice-pdf.png",          "03-tax-invoice-pdf"),
    ("pgg-erp", "pgg-erp/hires/04-receivables-ledger.png",       "04-receivables-ledger"),
    # trinetry-erp
    ("trinetry-erp", "trinetry-erp/hires/01-mission-control.png",   "01-mission-control"),
    ("trinetry-erp", "trinetry-erp/hires/02-decision-detail.png",   "02-decision-detail"),
    ("trinetry-erp", "trinetry-erp/hires/03-inventory-ai.png",      "03-inventory-ai"),
    ("trinetry-erp", "trinetry-erp/hires/04-progressive-trust.png", "04-progressive-trust"),
    # ai-bharatverse
    ("ai-bharatverse", "ai-bharatverse/hires/01-landing.png",            "01-landing"),
    ("ai-bharatverse", "ai-bharatverse/hires/02-conversation.png",       "02-conversation"),
    ("ai-bharatverse", "ai-bharatverse/hires/03-mauryan-deepdive.png",   "03-mauryan-deepdive"),
    ("ai-bharatverse", "ai-bharatverse/hires/04-factcheck-console.png",  "04-factcheck-console"),
    # timesfm-trading-bot
    ("timesfm-trading-bot", "timesfm/hires/01-tier1-wide-swing.png",  "01-tier1-wide-swing"),
    ("timesfm-trading-bot", "timesfm/hires/02-tier2-long-only.png",   "02-tier2-long-only"),
    ("timesfm-trading-bot", "timesfm/hires/03-tier3-momentum.png",    "03-tier3-momentum"),
    ("timesfm-trading-bot", "timesfm/hires/04-tier4-patience.png",    "04-tier4-patience"),
    ("timesfm-trading-bot", "timesfm/hires/05-live-pnl-apr24.png",    "05-live-pnl-apr24"),
    # kari
    ("kari", "kari/01-collect-relics.png",   "01-collect-relics"),
    ("kari", "kari/02-restore-shrines.png",  "02-restore-shrines"),
    # pratyaksha (folder is `becoming` upstream)
    ("pratyaksha", "becoming/journal chat - becoming 1.png",                  "01-journal-chat"),
    ("pratyaksha", "becoming/soul mapping - becoming 1.png",                  "02-soul-mapping"),
    ("pratyaksha", "becoming/detailed log - becoming 1.png",                  "03-detailed-log"),
    ("pratyaksha", "becoming/ChatGPT Image May 1, 2026, 04_06_43 PM 1.png",   "04-cover-art-a"),
    ("pratyaksha", "becoming/ChatGPT Image May 1, 2026, 04_06_33 PM 1.png",   "05-cover-art-b"),
    # gyanmarg (folder is `polymind` upstream)
    ("gyanmarg", "polymind/chapters.png",        "01-chapters"),
    ("gyanmarg", "polymind/library.png",         "02-library"),
    ("gyanmarg", "polymind/scroll.png",          "03-scroll"),
    ("gyanmarg", "polymind/visualizations.png",  "04-visualizations"),
    # cryptoprism-onchain (folder is `DSA (3)` upstream)
    ("cryptoprism-onchain", "DSA (3)/discover.png",                          "01-discover"),
    ("cryptoprism-onchain", "DSA (3)/on-chain.png",                          "02-onchain"),
    ("cryptoprism-onchain", "DSA (3)/cross chain intelligence - cpio 1.png", "03-cross-chain"),
    # cryptoprism-api
    ("cryptoprism-api", "DSA (3)/dashboard.png", "01-dashboard"),
    # fxsaarthi
    ("fxsaarthi", "DSA (3)/saarthi ai - cpio 1.png", "01-saarthi"),
]


def convert_one(src: Path, dest: Path) -> tuple[int, int, int]:
    with Image.open(src) as im:
        im = im.convert("RGB") if im.mode in ("P", "RGBA", "LA") else im
        # Pillow doesn't support RGBA→WebP transparency for our target use,
        # but our screenshots are opaque PNGs so RGB is fine.
        if im.mode != "RGB":
            im = im.convert("RGB")
        w, h = im.size
        if w > MAX_WIDTH:
            new_h = round(h * MAX_WIDTH / w)
            im = im.resize((MAX_WIDTH, new_h), Image.LANCZOS)
        dest.parent.mkdir(parents=True, exist_ok=True)
        im.save(dest, format="WEBP", quality=WEBP_QUALITY, method=6)
        out_size = dest.stat().st_size
        return im.size[0], im.size[1], out_size


def main() -> None:
    total_in = 0
    total_out = 0
    for slug, rel_src, base in MAPPING:
        src = SRC_ROOT / rel_src
        if not src.exists():
            print(f"  MISSING: {rel_src}")
            continue
        dest = DEST_ROOT / slug / f"{base}.webp"
        in_size = src.stat().st_size
        w, h, out_size = convert_one(src, dest)
        total_in += in_size
        total_out += out_size
        print(f"  {slug}/{base}.webp  {w}x{h}  "
              f"{in_size//1024}KB -> {out_size//1024}KB")
    if total_in:
        print(f"\nTotal: {total_in//1024}KB -> {total_out//1024}KB "
              f"({100 * total_out // total_in}%)")


if __name__ == "__main__":
    main()
