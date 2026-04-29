const DATAFORSEO_BASE_URL = "https://api.dataforseo.com/v3";

function validateBearerToken(req) {
  const authHeader = req.headers.authorization || "";
  const expectedToken = process.env.ACTION_BEARER_TOKEN;
  return Boolean(expectedToken) && authHeader === `Bearer ${expectedToken}`;
}

function getDataForSeoAuthHeader() {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;

  if (!login || !password) {
    throw new Error("DATAFORSEO_LOGIN ou DATAFORSEO_PASSWORD ausente nas variáveis de ambiente.");
  }

  const token = Buffer.from(`${login}:${password}`).toString("base64");
  return `Basic ${token}`;
}

function normalizeKeyword(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function uniqueKeywords(keywords = []) {
  const seen = new Set();
  const output = [];

  for (const keyword of keywords) {
    const clean = String(keyword || "").trim().toLowerCase();

    if (!clean) continue;
    if (clean.length > 80) continue;
    if (clean.split(/\s+/).length > 10) continue;

    const key = normalizeKeyword(clean);

    if (!seen.has(key)) {
      seen.add(key);
      output.push(clean);
    }
  }

  return output;
}

function getDifficultyLevel(value) {
  if (value === null || value === undefined || value === "") {
    return "Dados não disponíveis";
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    return "Dados não disponíveis";
  }

  if (number <= 29) return "Baixa";
  if (number <= 59) return "Média";
  return "Alta";
}

function classifyIntent(keyword) {
  const normalized = normalizeKeyword(keyword);

  if (
    normalized.includes("comprar") ||
    normalized.includes("apartamento") ||
    normalized.includes("financiado") ||
    normalized.includes("minha casa minha vida") ||
    normalized.includes("mcmv")
  ) {
    return "transacional local";
  }

  if (
    normalized.includes("construtora") ||
    normalized.includes("empreendimento") ||
    normalized.includes("lancamento") ||
    normalized.includes("imoveis")
  ) {
    return "comercial local";
  }

  return "comercial";
}

function classifyKeywordType(keyword) {
  const normalized = normalizeKeyword(keyword);
  const types = [];

  if (
    normalized.includes("comprar") ||
    normalized.includes("apartamento") ||
    normalized.includes("financiado") ||
    normalized.includes("minha casa minha vida") ||
    normalized.includes("mcmv")
  ) {
    types.push("Transacional");
  } else {
    types.push("Comercial");
  }

  if (
    normalized.includes("aracaju") ||
    normalized.includes("salvador") ||
    normalized.includes("maceio") ||
    normalized.includes("sergipe") ||
    normalized.includes("bahia") ||
    normalized.includes("alagoas")
  ) {
    types.push("Local");
  }

  if (normalized.split(" ").length >= 4) {
    types.push("Long-tail");
  }

  return [...new Set(types)].join(" + ");
}

async function dataForSeoPost(path, payload) {
  const response = await fetch(`${DATAFORSEO_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      Authorization: getDataForSeoAuthHeader(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(`DataForSEO HTTP ${response.status}: ${JSON.stringify(json)}`);
  }

  return json;
}

function getTaskResultItems(json) {
  const task = json?.tasks?.[0];

  if (!task) return [];

  const result = task.result;

  if (!Array.isArray(result)) return [];

  // Formato comum: result é array direto de keywords.
  if (result.length > 0 && result[0]?.keyword) {
    return result;
  }

  // Formato alternativo: result[0].items contém keywords.
  if (result[0]?.items && Array.isArray(result[0].items)) {
    return result[0].items;
  }

  return [];
}

function buildSearchVolumeMap(items) {
  const map = new Map();

  for (const item of items) {
    const keyword = normalizeKeyword(item.keyword);
    if (!keyword) continue;

    map.set(keyword, {
      keyword: item.keyword,
      search_volume: item.search_volume ?? null,
      cpc: item.cpc ?? null,
      paid_competition: item.competition ?? null,
      paid_competition_index: item.competition_index ?? null,
      low_top_of_page_bid: item.low_top_of_page_bid ?? null,
      high_top_of_page_bid: item.high_top_of_page_bid ?? null,
      monthly_searches: item.monthly_searches ?? null
    });
  }

  return map;
}

function buildDifficultyMap(items) {
  const map = new Map();

  for (const item of items) {
    const keyword = normalizeKeyword(item.keyword);
    if (!keyword) continue;

    map.set(keyword, {
      keyword: item.keyword,
      keyword_difficulty: item.keyword_difficulty ?? item.difficulty ?? null
    });
  }

  return map;
}

async function getKeywordSuggestions({ seedKeywords, locationCode, languageCode, limit }) {
  if (!seedKeywords.length) return [];

  const payload = [
    {
      location_code: locationCode,
      language_code: languageCode,
      keywords: seedKeywords.slice(0, 20),
      sort_by: "search_volume",
      include_adult_keywords: false,
      limit
    }
  ];

  const json = await dataForSeoPost(
    "/keywords_data/google_ads/keywords_for_keywords/live",
    payload
  );

  const items = getTaskResultItems(json);

  return items
    .map((item) => item.keyword)
    .filter(Boolean);
}

async function getSearchVolume({ keywords, locationCode, languageCode }) {
  const payload = [
    {
      location_code: locationCode,
      language_code: languageCode,
      keywords,
      search_partners: false
    }
  ];

  const json = await dataForSeoPost(
    "/keywords_data/google_ads/search_volume/live",
    payload
  );

  return buildSearchVolumeMap(getTaskResultItems(json));
}

async function getKeywordDifficulty({ keywords, locationCode, languageCode }) {
  const payload = [
    {
      location_code: locationCode,
      language_code: languageCode,
      keywords
    }
  ];

  const json = await dataForSeoPost(
    "/dataforseo_labs/google/bulk_keyword_difficulty/live",
    payload
  );

  return buildDifficultyMap(getTaskResultItems(json));
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

  try {
    const {
      keywords = [],
      seed_keywords = [],
      country = "BR",
      language = "pt-BR",
      location = "Brazil",
      location_code = 2076,
      language_code = "pt",
      include_suggestions = true,
      suggestions_limit = 30,
      max_keywords = 60
    } = req.body || {};

    const inputKeywords = uniqueKeywords([
      ...keywords,
      ...seed_keywords
    ]);

    if (!inputKeywords.length) {
      return res.status(400).json({
        error: "missing_keywords",
        message: "Envie keywords ou seed_keywords."
      });
    }

    let suggestionKeywords = [];

    if (include_suggestions) {
      suggestionKeywords = await getKeywordSuggestions({
        seedKeywords: inputKeywords.slice(0, 20),
        locationCode: location_code,
        languageCode: language_code,
        limit: suggestions_limit
      });
    }

    const finalKeywords = uniqueKeywords([
      ...inputKeywords,
      ...suggestionKeywords
    ]).slice(0, max_keywords);

    const [volumeMap, difficultyMap] = await Promise.all([
      getSearchVolume({
        keywords: finalKeywords,
        locationCode: location_code,
        languageCode: language_code
      }),
      getKeywordDifficulty({
        keywords: finalKeywords,
        locationCode: location_code,
        languageCode: language_code
      })
    ]);

    const responseKeywords = finalKeywords.map((keyword) => {
      const key = normalizeKeyword(keyword);
      const volumeData = volumeMap.get(key) || {};
      const difficultyData = difficultyMap.get(key) || {};

      const seoDifficulty = difficultyData.keyword_difficulty ?? null;
const searchVolume = volumeData.search_volume ?? null;
const cpc = volumeData.cpc ?? null;
const paidCompetitionIndex = volumeData.paid_competition_index ?? null;

let rankingDifficulty = null;
let rankingDifficultySource = "not_available";
let rankingDifficultyLabel = "N/D";

if (seoDifficulty !== null && seoDifficulty !== undefined) {
  rankingDifficulty = Number(seoDifficulty);
  rankingDifficultySource = "seo_difficulty";
  rankingDifficultyLabel = "SEO difficulty";
} else if (paidCompetitionIndex !== null && paidCompetitionIndex !== undefined) {
  rankingDifficulty = Number(paidCompetitionIndex);
  rankingDifficultySource = "estimated_from_paid_competition";
  rankingDifficultyLabel = "Estimada por competição paga";
}

const hasAnyData =
  searchVolume !== null ||
  seoDifficulty !== null ||
  cpc !== null ||
  paidCompetitionIndex !== null;

return {
  keyword,
  search_volume: searchVolume,

  seo_difficulty: seoDifficulty,
  difficulty_percent: seoDifficulty !== null ? `${seoDifficulty}%` : null,
  difficulty_level: getDifficultyLevel(seoDifficulty),

  ranking_difficulty: rankingDifficulty,
  ranking_difficulty_percent: rankingDifficulty !== null ? `${rankingDifficulty}%` : null,
  ranking_difficulty_level: getDifficultyLevel(rankingDifficulty),
  ranking_difficulty_source: rankingDifficultySource,
  ranking_difficulty_label: rankingDifficultyLabel,

  cpc,
  paid_competition: volumeData.paid_competition ?? null,
  paid_competition_index: paidCompetitionIndex,
        low_top_of_page_bid: volumeData.low_top_of_page_bid ?? null,
        high_top_of_page_bid: volumeData.high_top_of_page_bid ?? null,
        intent: classifyIntent(keyword),
        keyword_type: classifyKeywordType(keyword),
        source: "DataForSEO",
        provider: "dataforseo",
        data_status: hasAnyData ? "available" : "not_available",
        monthly_searches: volumeData.monthly_searches ?? null
      };
    });

    const availableCount = responseKeywords.filter(
      (item) => item.data_status === "available"
    ).length;

    return res.status(200).json({
      provider: "dataforseo",
      source: "DataForSEO Google Ads + DataForSEO Labs",
      country,
      language,
      location,
      location_code,
      language_code,
      include_suggestions,
      total_keywords: responseKeywords.length,
      available_keywords: availableCount,
      unavailable_keywords: responseKeywords.length - availableCount,
      updated_at: new Date().toISOString(),
      keywords: responseKeywords,
      notes: [
  "search_volume, cpc e paid_competition vêm da DataForSEO Google Ads Keywords Data.",
  "seo_difficulty vem da DataForSEO Labs Bulk Keyword Difficulty.",
  "ranking_difficulty usa seo_difficulty quando disponível.",
  "Quando seo_difficulty não está disponível, ranking_difficulty usa paid_competition_index como estimativa.",
  "ranking_difficulty_source indica se a dificuldade é oficial de SEO ou estimada por competição paga.",
  "paid_competition_index é métrica de competição paga, não dificuldade orgânica oficial."
]
    });
  } catch (error) {
    return res.status(500).json({
      error: "dataforseo_error",
      message: "Erro ao consultar DataForSEO.",
      details: error.message
    });
  }
}
