import datetime
import json
import os
import re
import urllib.request
import xml.etree.ElementTree as ET

RSS_URLS = [
    ("palyazat.gov.hu", "https://www.palyazat.gov.hu/rss.xml"),
]

KEYWORDS = [
    "turizmus", "turisztik", "vonzerő", "kaland", "élmény",
    "sípálya", "felvonó", "kötélpálya", "bob", "szabadidő",
    "vidék", "eszközbeszerzés", "beruházás", "fejlesztés",
    "biztonság", "digitaliz", "energiahatékony", "innováci",
    "fejleszt" , "fejlesztés"
]

OUTPUT_PATH = os.path.join("data", "grants-h.json")


def fetch_xml(url: str) -> bytes:
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "Mozilla/5.0 (compatible; GrantsUpdater/1.0)"}
    )
    with urllib.request.urlopen(req, timeout=25) as resp:
        return resp.read()


def clean_text(val: str) -> str:
    txt = re.sub(r"<[^>]+>", " ", val or "")
    return re.sub(r"\s+", " ", txt).strip()


def parse_rss(source_name: str, xml_bytes: bytes) -> list[dict]:
    root = ET.fromstring(xml_bytes)
    items = []

    for elem in root.findall(".//item") + root.findall(".//{http://www.w3.org/2005/Atom}entry"):
        title_el = elem.find("title")
        if title_el is None:
            title_el = elem.find("{http://www.w3.org/2005/Atom}title")
        title = clean_text(title_el.text if title_el is not None else "")

        desc_el = elem.find("description")
        if desc_el is None:
            desc_el = elem.find("{http://www.w3.org/2005/Atom}summary")
        desc = clean_text(desc_el.text if desc_el is not None else "")

        link = ""
        link_el = elem.find("link")
        if link_el is not None and link_el.text:
            link = link_el.text.strip()
        else:
            atom_link = elem.find("{http://www.w3.org/2005/Atom}link")
            if atom_link is not None:
                link = (atom_link.attrib.get("href") or "").strip()

        pub_el = elem.find("pubDate")
        if pub_el is None:
            pub_el = elem.find("{http://www.w3.org/2005/Atom}updated")
        date_str = clean_text(pub_el.text if pub_el is not None else "")[:16]

        haystack = f"{title} {desc}".lower()
        matched_kw = [kw for kw in KEYWORDS if kw in haystack]
        if title and matched_kw:
            items.append({
                "source": source_name,
                "title": title,
                "date": date_str,
                "url": link,
                "keywords": matched_kw
            })

    return items

    root = ET.fromstring(xml_bytes)
    items = []

    # Podpora štandardného RSS (<item>) aj Atom (<entry>)
    for elem in root.findall(".//item") + root.findall(".//{http://www.w3.org/2005/Atom}entry"):
        title_el = elem.find("title")
        if title_el is None:
            title_el = elem.find("{http://www.w3.org/2005/Atom}title")
        title = clean_text(title_el.text if title_el is not None else "")

        link = ""
        link_el = elem.find("link")
        if link_el is not None and link_el.text:
            link = link_el.text.strip()
        else:
            atom_link = elem.find("{http://www.w3.org/2005/Atom}link")
            if atom_link is not None:
                link = (atom_link.attrib.get("href") or "").strip()

        pub_el = elem.find("pubDate")
        if pub_el is None:
            pub_el = elem.find("{http://www.w3.org/2005/Atom}updated")
        date_str = clean_text(pub_el.text if pub_el is not None else "")[:16]

        matched_kw = [kw for kw in KEYWORDS if kw in title.lower()]
        if title and matched_kw:
            items.append({
                "source": source_name,
                "title": title,
                "date": date_str,
                "url": link,
                "keywords": matched_kw
            })

    return items


def main() -> None:
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

    existing_portal_stats = None
    existing_extra_items = []
    if os.path.exists(OUTPUT_PATH):
        try:
            with open(OUTPUT_PATH, "r", encoding="utf-8") as f:
                old_data = json.load(f)
            existing_portal_stats = old_data.get("portal_stats")
            # Ponechaj prípadné položky z e-mailov (palyazatmenedzser.hu), ak tam už sú
            for it in old_data.get("items", []):
                if (it.get("source") or "").lower() == "palyazatmenedzser.hu":
                    existing_extra_items.append(it)
        except Exception:
            pass

    rss_items = []
    for source_name, url in RSS_URLS:
        try:
            xml_data = fetch_xml(url)
            rss_items.extend(parse_rss(source_name, xml_data))
        except Exception as exc:
            print(f"Chyba pri sťahovaní {url}: {exc}")

    # Deduplikácia podľa titulku
    seen = set()
    merged = []
    for it in rss_items + existing_extra_items:
        key = (it.get("title") or "").strip().lower()
        if key and key not in seen:
            seen.add(key)
            merged.append(it)

    now_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
    payload = {
        "updated_at": now_str,
        "items": merged
    }
    if existing_portal_stats:
        payload["portal_stats"] = existing_portal_stats

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)

    print(f"Uložených položiek: {len(merged)} ({now_str})")


if __name__ == "__main__":
    main()