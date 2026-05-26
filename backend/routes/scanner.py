from fastapi import APIRouter
from pydantic import BaseModel
from urllib.parse import urlparse

router = APIRouter()

# Request Model
class URLRequest(BaseModel):
    url: str

# Suspicious Keywords
SUSPICIOUS_KEYWORDS = [
    "verify",
    "secure",
    "update",
    "wallet",
    "crypto",
    "bonus",
    "gift",
    "free-money",
    "claim",
]

# Trusted Domains
TRUSTED_DOMAINS = [
    "google.com",
    "youtube.com",
    "github.com",
    "microsoft.com",
    "apple.com",
    "udemy.com",
    "openai.com",
    "amazon.com",
    "linkedin.com",
]

# URL Scanner
@router.post("/scan-url")
async def scan_url(data: URLRequest):

    url = data.url.strip().lower()

    reasons = []

    risk_score = 0

    parsed = urlparse(url)

    domain = parsed.hostname or ""

    # HTTPS Check
    if not url.startswith("https://"):

        reasons.append(
            "URL does not use HTTPS."
        )

        risk_score += 2

    # Trusted Domain Check
    trusted = any(
        trusted_domain in domain
        for trusted_domain
        in TRUSTED_DOMAINS
    )

    # Suspicious Keyword Check
    for keyword in SUSPICIOUS_KEYWORDS:

        if keyword in url:

            reasons.append(
                f"Suspicious keyword detected: '{keyword}'"
            )

            risk_score += 1

    # Excessive Hyphens
    if domain.count("-") >= 3:

        reasons.append(
            "Domain contains excessive hyphens."
        )

        risk_score += 2

    # Very Long URL ONLY if domain is NOT trusted
    if len(url) > 120 and not trusted:

        reasons.append(
            "Unusually long URL detected."
        )

        risk_score += 1

    # IP Address URLs
    if domain.replace(".", "").isdigit():

        reasons.append(
            "URL uses direct IP address."
        )

        risk_score += 3

    # Determine Risk Level
    if risk_score >= 5:

        risk_level = "High Risk"

    elif risk_score >= 2:

        risk_level = "Suspicious"

    else:

        risk_level = "Safe"

    return {
        "url": url,
        "domain": domain,
        "trusted_domain": trusted,
        "risk_score": risk_score,
        "risk_level": risk_level,
        "issues_detected": reasons,
        "safe": risk_level == "Safe",
    }