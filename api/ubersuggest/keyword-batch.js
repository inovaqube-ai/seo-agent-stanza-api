const MOCK_KEYWORDS = {
  // ARACAJU
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
  "apartamento economico em aracaju": {
    search_volume: 390,
    seo_difficulty: 27,
    paid_difficulty: 15,
    cpc: 1.28,
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
  "empreendimento economico em sergipe": {
    search_volume: 170,
    seo_difficulty: 24,
    paid_difficulty: 12,
    cpc: 1.05,
    intent: "transacional local",
    keyword_type: "Transacional + Local + Long-tail"
  },

  // SALVADOR
  "apartamento em salvador": {
    search_volume: 5400,
    seo_difficulty: 49,
    paid_difficulty: 31,
    cpc: 2.34,
    intent: "transacional local",
    keyword_type: "Transacional + Local"
  },
  "apartamento minha casa minha vida salvador": {
    search_volume: 1300,
    seo_difficulty: 39,
    paid_difficulty: 24,
    cpc: 1.91,
    intent: "transacional local",
    keyword_type: "Transacional + Local + Long-tail"
  },
  "apartamento na planta em salvador": {
    search_volume: 1000,
    seo_difficulty: 41,
    paid_difficulty: 25,
    cpc: 2.05,
    intent: "transacional local",
    keyword_type: "Transacional + Local + Long-tail"
  },
  "apartamento economico em salvador": {
    search_volume: 720,
    seo_difficulty: 36,
    paid_difficulty: 21,
    cpc: 1.78,
    intent: "transacional local",
    keyword_type: "Transacional + Local + Long-tail"
  },
  "construtora em salvador": {
    search_volume: 880,
    seo_difficulty: 37,
    paid_difficulty: 22,
    cpc: 1.84,
    intent: "comercial local",
    keyword_type: "Comercial + Local"
  },
  "empreendimento economico em salvador": {
    search_volume: 390,
    seo_difficulty: 32,
    paid_difficulty: 19,
    cpc: 1.56,
    intent: "transacional local",
    keyword_type: "Transacional + Local + Long-tail"
  },

  // MACEIÓ
  "apartamento em maceio": {
    search_volume: 2900,
    seo_difficulty: 43,
    paid_difficulty: 27,
    cpc: 2.01,
    intent: "transacional local",
    keyword_type: "Transacional + Local"
  },
  "apartamento minha casa minha vida maceio": {
    search_volume: 760,
    seo_difficulty: 34,
    paid_difficulty: 20,
    cpc: 1.58,
    intent: "transacional local",
    keyword_type: "Transacional + Local + Long-tail"
  },
  "apartamento na planta em maceio": {
    search_volume: 620,
    seo_difficulty: 35,
    paid_difficulty: 21,
    cpc: 1.72,
    intent: "transacional local",
    keyword_type: "Transacional + Local + Long-tail"
  },
  "apartamento economico em maceio": {
    search_volume: 430,
    seo_difficulty: 29,
    paid_difficulty: 17,
    cpc: 1.39,
    intent: "transacional local",
    keyword_type: "Transacional + Local + Long-tail"
  },
  "construtora em maceio": {
    search_volume: 530,
    seo_difficulty: 31,
    paid_difficulty: 18,
    cpc: 1.46,
    intent: "comercial local",
    keyword_type: "Comercial + Local"
  },
  "empreendimento economico em maceio": {
    search_volume: 210,
    seo_difficulty: 26,
    paid_difficulty: 14,
    cpc: 1.18,
    intent: "transacional local",
    keyword_type: "Transacional + Local + Long-tail"
  },
  "comprar apartamento em aracaju": {
  search_volume: 520,
  seo_difficulty: 33,
  paid_difficulty: 19,
  cpc: 1.66,
  intent: "transacional local",
  keyword_type: "Transacional + Local + Long-tail"
},
"apartamento financiado em aracaju": {
  search_volume: 260,
  seo_difficulty: 28,
  paid_difficulty: 15,
  cpc: 1.37,
  intent: "transacional local",
  keyword_type: "Transacional + Local + Long-tail"
},
"lançamento imobiliário em aracaju": {
  search_volume: 210,
  seo_difficulty: 30,
  paid_difficulty: 17,
  cpc: 1.51,
  intent: "comercial local",
  keyword_type: "Comercial + Local + Long-tail"
},
"empreendimento em aracaju": {
  search_volume: 320,
  seo_difficulty: 28,
  paid_difficulty: 15,
  cpc: 1.22,
  intent: "comercial local",
  keyword_type: "Comercial + Local"
},
"imóveis em aracaju": {
  search_volume: 1900,
  seo_difficulty: 42,
  paid_difficulty: 25,
  cpc: 1.74,
  intent: "comercial local",
  keyword_type: "Comercial + Local"
},
"apartamento em atalaia aracaju": {
  search_volume: 260,
  seo_difficulty: 27,
  paid_difficulty: 15,
  cpc: 1.32,
  intent: "transacional local",
  keyword_type: "Transacional + Local + Long-tail"
},
"apartamento na aruana aracaju": {
  search_volume: 210,
  seo_difficulty: 25,
  paid_difficulty: 14,
  cpc: 1.21,
  intent: "transacional local",
  keyword_type: "Transacional + Local + Long-tail"
},
"apartamento em aruana aracaju": {
  search_volume: 210,
  seo_difficulty: 25,
  paid_difficulty: 14,
  cpc: 1.21,
  intent: "transacional local",
  keyword_type: "Transacional + Local + Long-tail"
},
"apartamento perto do aeroporto aracaju": {
  search_volume: 90,
  seo_difficulty: 22,
  paid_difficulty: 11,
  cpc: 1.08,
  intent: "transacional local",
  keyword_type: "Transacional + Local + Long-tail"
},
"apartamento 2 quartos em aracaju": {
  search_volume: 480,
  seo_difficulty: 32,
  paid_difficulty: 18,
  cpc: 1.44,
  intent: "transacional local",
  keyword_type: "Transacional + Local + Long-tail"
},
"apartamento 3 quartos em aracaju": {
  search_volume: 260,
  seo_difficulty: 30,
  paid_difficulty: 16,
  cpc: 1.39,
  intent: "transacional local",
  keyword_type: "Transacional + Local + Long-tail"
},
"apartamento com suíte em aracaju": {
  search_volume: 170,
  seo_difficulty: 26,
  paid_difficulty: 13,
  cpc: 1.18,
  intent: "transacional local",
  keyword_type: "Transacional + Local + Long-tail"
},
"apartamento com lazer em aracaju": {
  search_volume: 140,
  seo_difficulty: 24,
  paid_difficulty: 12,
  cpc: 1.12,
  intent: "transacional local",
  keyword_type: "Transacional + Local + Long-tail"
}
};

function normalizeKeyword(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function validateBearerToken(req) {
  const authHeader = req.headers.authorization || "";
  const expectedToken = process.env.ACTION_BEARER_TOKEN;

  return Boolean(expectedToken) && authHeader === `Bearer ${expectedToken}`;
}

function classifyFallbackKeyword(keyword) {
  const normalized = normalizeKeyword(keyword);

  let intent = "comercial";
  let keyword_type = "Comercial";

  if (
    normalized.includes("comprar") ||
    normalized.includes("apartamento") ||
    normalized.includes("minha casa minha vida") ||
    normalized.includes("financiamento") ||
    normalized.includes("imovel") ||
    normalized.includes("imoveis")
  ) {
    intent = "transacional";
    keyword_type = "Transacional";
  }

  if (
    normalized.includes("aracaju") ||
    normalized.includes("sergipe") ||
    normalized.includes("salvador") ||
    normalized.includes("bahia") ||
    normalized.includes("maceio") ||
    normalized.includes("alagoas")
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
    const originalKeyword = String(keyword).trim();
    const normalizedKeyword = normalizeKeyword(originalKeyword);

    const found = MOCK_KEYWORDS[normalizedKeyword];
    const data = found || classifyFallbackKeyword(normalizedKeyword);

    return {
      keyword: originalKeyword,
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
