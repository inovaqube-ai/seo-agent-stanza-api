const MOCK_KEYWORDS = {
  "apartamento em aracaju": {
    search_volume: 2400,
    seo_difficulty: 38,
    paid_difficulty: 22,
    cpc: 1.85,
    intent: "transacional local",
    keyword_type: "Transacional + Local"
  },
  "apartamento minha casa minha vida aracaju": {
    search_volume: 720,
    seo_difficulty: 31,
    paid_difficulty: 18,
    cpc: 1.42,
    intent: "transacional local",
    keyword_type: "Transacional + Local + Long-tail"
  },
  "apartamento na planta em aracaju": {
    search_volume: 590,
    seo_difficulty: 34,
    paid_difficulty: 20,
    cpc: 1.61,
    intent: "transacional local",
    keyword_type: "Transacional + Local + Long-tail"
  },
  "construtora em aracaju": {
    search_volume: 480,
    seo_difficulty: 29,
    paid_difficulty: 16,
    cpc: 1.25,
    intent: "comercial local",
    keyword_type: "Comercial + Local"
  },
  "empreendimento econômico em sergipe": {
    search_volume: null,
    seo_difficulty: null,
    paid_difficulty: null,
    cpc: null,
    intent: "transacional local",
    keyword_type: "Transacional + Local + Long-tail"
  }
};

function validateBearerToken(req) {
  const authHeader = req.headers.authorization || "";
  const expectedToken = process.env.ACTION_BEARER_TOKEN;

  return Boolean(expectedToken) && authHeader === `Bearer ${expectedToken}`;
}

function classifyFallbackKeyword(keyword) {
  const normalized = keyword.toLowerCase();

  let intent = "comercial";
  let keyword_type = "Comercial";

  if (
    normalized.includes("comprar") ||
    normalized.includes("apartamento") ||
    normalized.includes("minha casa minha vida") ||
    normalized.includes("financiamento")
  ) {
    intent = "transacional";
    keyword_type = "Transacional";
  }

  if (
    normalized.includes("aracaju") ||
    normalized.includes("sergipe") ||
    normalized.includes("bahia") ||
    normalized.includes("salvador")
  ) {
    intent = `${intent} local`;
    keyword_type = `${keyword_type} + Local`;
  }

  if (normalized.split(" ").length >= 4) {
    keyword_type = `${keyword_type} + Long-tail`;
  }

  return {
    search_volume: null,
    seo_difficulty: null,
    paid_difficulty: null,
    cpc: null,
    intent,
    keyword_type
  };
}

export default async function handler(req, res) {
  if (!validateBearerToken(req)) {
    return res.status(401).json({
      error: "unauthorized",
      message: "Token Bearer inválido ou ausente."
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "method_not_allowed",
      message: "Use POST."
    });
  }

  const {
    keywords = [],
    country = "BR",
    language = "pt-BR",
    location = ""
  } = req.body || {};

  if (!Array.isArray(keywords) || keywords.length === 0) {
    return res.status(400).json({
      error: "invalid_keywords",
      message: "Envie um array de palavras-chave no campo keywords."
    });
  }

  const responseKeywords = keywords.map((keyword) => {
    const normalizedKeyword = String(keyword).trim().toLowerCase();
    const found = MOCK_KEYWORDS[normalizedKeyword];
    const data = found || classifyFallbackKeyword(normalizedKeyword);

    return {
      keyword: String(keyword).trim(),
      search_volume: data.search_volume,
      seo_difficulty: data.seo_difficulty,
      paid_difficulty: data.paid_difficulty,
      cpc: data.cpc,
      intent: data.intent,
      keyword_type: data.keyword_type,
      source: found ? "Mock Ubersuggest" : "Classificação interna",
      data_status: found ? "available" : "not_available"
    };
  });

  return res.status(200).json({
    country,
    language,
    location,
    keywords: responseKeywords
  });
}
