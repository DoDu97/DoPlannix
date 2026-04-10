"""
DoPlannix — Financial No Brainer
Jednostrankove PDF pro doruceni zakaznikovi po nakupu
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT

BASE        = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR     = os.path.join(BASE, "Images")
OUT_DIR     = os.path.join(BASE, "generated")
os.makedirs(OUT_DIR, exist_ok=True)

LOGO_PATH    = os.path.join(IMG_DIR, "Logo", "dp_black.png")
GALLERY_DIR  = os.path.join(IMG_DIR, "Gallery")
OUTPUT_PATH  = os.path.join(OUT_DIR, "financial-no-brainer.pdf")

# Barvy
NOIR      = colors.HexColor("#0a0a0a")
CARD      = colors.HexColor("#141414")
RAISED    = colors.HexColor("#1e1e1e")
STROKE    = colors.HexColor("#2a2a2a")
DIM       = colors.HexColor("#888888")
GOLD      = colors.HexColor("#c9a84c")
WHITE     = colors.white
GOLD_BG   = colors.HexColor("#1c1608")

# Notion template link — placeholder, vymen za skutecny
NOTION_URL = "https://notion.so/templates/doplannix-financial"

W, H = A4  # 595 x 842 pt


def para(c, text, x, y, width, size=10, font="Helvetica", color=WHITE,
         leading=15, align=TA_CENTER):
    style = ParagraphStyle("s", fontName=font, fontSize=size, textColor=color,
                           leading=leading, alignment=align)
    p = Paragraph(text, style)
    _, ph = p.wrapOn(c, width, 9999)
    p.drawOn(c, x, y - ph)
    return ph


def rounded_rect(c, x, y, w, h, r=6, fill=RAISED, stroke=STROKE, sw=0.5):
    c.setFillColor(fill)
    c.setStrokeColor(stroke)
    c.setLineWidth(sw)
    c.roundRect(x, y, w, h, r, stroke=1, fill=1)


def main():
    cv = canvas.Canvas(OUTPUT_PATH, pagesize=A4)
    cv.setTitle("Financial No Brainer — DoPlannix")

    # ── Pozadi ───────────────────────────────────────────────────────────────
    cv.setFillColor(NOIR)
    cv.rect(0, 0, W, H, stroke=0, fill=1)

    # Tenky zlatý pruh uplne nahore
    cv.setFillColor(GOLD)
    cv.rect(0, H - 2, W, 2, stroke=0, fill=1)

    cx = W / 2  # osa X stredu stranky
    MX = 28*mm  # levy/pravy okraj

    y = H - 14*mm  # kurzor odshora

    # ── Logo ─────────────────────────────────────────────────────────────────
    logo_size = 11*mm
    cv.drawImage(LOGO_PATH, cx - logo_size / 2, y - logo_size,
                 width=logo_size, height=logo_size,
                 preserveAspectRatio=True, mask="auto")
    y -= logo_size + 3*mm

    cv.setFont("Helvetica-Bold", 13)
    cv.setFillColor(WHITE)
    cv.drawCentredString(cx, y, "DoPlannix")
    y -= 12*mm

    # ── Pill badge ───────────────────────────────────────────────────────────
    pill_w, pill_h, pill_r = 160*mm, 9*mm, 4.5*mm
    pill_x = cx - pill_w / 2
    pill_y = y - pill_h
    rounded_rect(cv, pill_x, pill_y, pill_w, pill_h, r=pill_r,
                 fill=RAISED, stroke=STROKE, sw=0.6)

    # Ikona — maly kruh vlevo
    icon_r = 3.2*mm
    cv.setFillColor(GOLD)
    cv.setStrokeColor(GOLD)
    cv.circle(pill_x + 6.5*mm, pill_y + pill_h / 2, icon_r, stroke=0, fill=1)
    cv.setFont("Helvetica-Bold", 6)
    cv.setFillColor(NOIR)
    cv.drawCentredString(pill_x + 6.5*mm, pill_y + pill_h / 2 - 2, "FIN")

    cv.setFont("Helvetica-Bold", 8)
    cv.setFillColor(WHITE)
    cv.drawString(pill_x + 13*mm, pill_y + pill_h / 2 - 2.5, "JAK NAINSTALOVAT NOTION ŠABLONU")
    y = pill_y - 7*mm

    # ── Instrukce text box ───────────────────────────────────────────────────
    box_w = 148*mm
    box_x = cx - box_w / 2
    box_text = (
        "Jak duplikovat šablonu: Klikni na tlačítko <b>\"Duplicate\"</b> v pravém horním rohu "
        "stránky. Na mobilu klikni na menu se třemi tečkami a vyber možnost Duplicate. "
        "Budeš vyzván/a k přihlášení do svého Notion účtu — šablona funguje i na bezplatném Free plánu."
    )
    # odhadneme vysku
    style = ParagraphStyle("box", fontName="Helvetica", fontSize=9.5,
                           textColor=DIM, leading=14.5, alignment=TA_CENTER)
    from reportlab.platypus import Paragraph as P
    p_obj = P(box_text, style)
    _, bh = p_obj.wrapOn(cv, box_w - 10*mm, 9999)
    box_h = bh + 10*mm

    box_y = y - box_h
    rounded_rect(cv, box_x, box_y, box_w, box_h, r=7,
                 fill=RAISED, stroke=STROKE, sw=0.6)
    p_obj.drawOn(cv, box_x + 5*mm, box_y + box_h - 5*mm - bh)
    y = box_y - 7*mm

    # ── CTA tlacitko ─────────────────────────────────────────────────────────
    btn_w, btn_h = 148*mm, 11*mm
    btn_x = cx - btn_w / 2
    btn_y = y - btn_h
    rounded_rect(cv, btn_x, btn_y, btn_w, btn_h, r=5.5,
                 fill=GOLD_BG, stroke=GOLD, sw=1)

    cv.setFont("Helvetica-Bold", 9.5)
    cv.setFillColor(GOLD)
    label = "KLIKNI A SPUSŤ ŠABLONU"
    cv.drawCentredString(cx, btn_y + btn_h / 2 - 3, label)
    cv.linkURL(NOTION_URL, (btn_x, btn_y, btn_x + btn_w, btn_y + btn_h))
    y = btn_y - 9*mm

    # ── Sekce nadpis ─────────────────────────────────────────────────────────
    cv.setFont("Helvetica", 8)
    cv.setFillColor(GOLD)
    cv.drawCentredString(cx, y, "NÁHLED ŠABLONY")
    y -= 5*mm

    # ── Gallery karty 3× ─────────────────────────────────────────────────────
    # Zbyvajici prostor
    footer_h = 10*mm
    remaining = y - footer_h
    gap = 4*mm
    num_cards = 3
    card_w = (W - 2 * MX - gap * (num_cards - 1)) / num_cards
    img_ratio = 1080 / 1680
    img_h = card_w * img_ratio
    label_h = 7*mm
    card_h = img_h + label_h + 3*mm

    # Pokud se karty nevejdou, zmensi je
    if card_h > remaining:
        card_h = remaining
        img_h = card_h - label_h - 3*mm
        card_w = img_h / img_ratio

    card_y = y - card_h

    gallery_picks = [1, 2, 3]   # ktere gallery obrazky pouzit

    for i, gnum in enumerate(gallery_picks):
        cx_card = MX + i * (card_w + gap)
        img_path = os.path.join(GALLERY_DIR, f"{gnum}.jpg")

        rounded_rect(cv, cx_card, card_y, card_w, card_h,
                     r=5, fill=CARD, stroke=STROKE, sw=0.5)

        if os.path.exists(img_path):
            # Orez obrazek na zaobleny rohovy clip (jednoducha verze)
            cv.drawImage(img_path,
                         cx_card + 0.5, card_y + label_h,
                         width=card_w - 1, height=img_h,
                         preserveAspectRatio=True, mask="auto")

        # Nadpisek pod obrazkem
        labels = ["Monthly Summary", "Transactions", "Budgeting"]
        cv.setFont("Helvetica-Bold", 7.5)
        cv.setFillColor(WHITE)
        cv.drawCentredString(cx_card + card_w / 2,
                             card_y + label_h / 2 - 2.5, labels[i])

    y = card_y - 5*mm

    # ── Footer ────────────────────────────────────────────────────────────────
    cv.setStrokeColor(STROKE)
    cv.setLineWidth(0.4)
    cv.line(MX, y, W - MX, y)
    y -= 4*mm
    cv.setFont("Helvetica", 7.5)
    cv.setFillColor(DIM)
    cv.drawCentredString(cx, y, "doplannix.cz  ·  ahoj@doplannix.cz")

    cv.save()
    print(f"Hotovo -> {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
