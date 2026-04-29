const MOCK_KEYWORDS = {
  // ARACAJU — SERGIPE
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
  "apartamento econômico em aracaju": {
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
  "empreendimento econômico em sergipe": {
    search_volume: 170,
    seo_difficulty: 24,
    paid_difficulty: 12,
    cpc: 1.05,
    intent: "transacional local",
    keyword_type: "Transacional + Local + Long-tail"
  },
  "imóveis em aracaju": {
    search_volume: 1900,
    seo_difficulty: 42,
    paid_difficulty: 25,
    cpc: 1.74,
    intent: "comercial local",
    keyword_type: "Comercial + Local"
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

  // SALVADOR — BAHIA
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
  "apartamento econômico em salvador": {
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
  "empreendimento econômico em salvador": {
    search_volume: 390,
    seo_difficulty: 32,
    paid_difficulty: 19,
    cpc: 1.56,
    intent: "transacional local",
    keyword_type: "Transacional + Local + Long-tail"
  },
  "imóveis em salvador": {
    search_volume: 4400,
    seo_difficulty: 52,
    paid_difficulty: 34,
    cpc: 2.47,
    intent: "comercial local",
    keyword_type: "Comercial + Local"
  },
  "comprar apartamento em salvador": {
    search_volume: 900,
    seo_difficulty: 40,
    paid_difficulty: 24,
    cpc: 2.02,
    intent: "transacional local",
    keyword_type: "Transacional + Local + Long-tail"
  },
  "apartamento financiado em salvador": {
    search_volume: 480,
    seo_difficulty: 34,
    paid_difficulty: 20,
    cpc: 1.69,
    intent: "transacional local",
    keyword_type: "Transacional + Local + Long-tail"
  },
  "lançamento imobiliário em salvador": {
    search_volume: 420,
    seo_difficulty: 35,
    paid_difficulty: 21,
    cpc: 1.82,
    intent: "comercial local",
    keyword_type: "Comercial + Local + Long-tail"
  },

  // MACEIÓ — ALAGOAS
  "apartamento em maceió": {
    search_volume: 2900,
    seo_difficulty: 43,
    paid_difficulty: 27,
    cpc: 2.01,
    intent: "transacional local",
    keyword_type: "Transacional + Local"
  },
  "apartamento minha casa minha vida maceió": {
    search_volume: 760,
    seo_difficulty: 34,
    paid_difficulty: 20,
    cpc: 1.58,
    intent: "transacional local",
    keyword_type: "Transacional + Local + Long-tail"
  },
  "apartamento na planta em maceió": {
    search_volume: 620,
    seo_difficulty: 35,
    paid_difficulty: 21,
    cpc: 1.72,
    intent: "transacional local",
    keyword_type: "Transacional + Local + Long-tail"
  },
  "apartamento econômico em maceió": {
    search_volume: 430,
    seo_difficulty: 29,
    paid_difficulty: 17,
    cpc: 1.39,
    intent: "transacional local",
    keyword_type: "Transacional + Local + Long-tail"
  },
  "construtora em maceió": {
    search_volume: 530,
    seo_difficulty: 31,
    paid_difficulty: 18,
    cpc: 1.46,
    intent: "comercial local",
    keyword_type: "Comercial + Local"
  },
  "empreendimento econômico em maceió": {
    search_volume: 210,
    seo_difficulty: 26,
    paid_difficulty: 14,
    cpc: 1.18,
    intent: "transacional local",
    keyword_type: "Transacional + Local + Long-tail"
  },
  "imóveis em maceió": {
    search_volume: 2500,
    seo_difficulty: 45,
    paid_difficulty: 28,
    cpc: 2.08,
    intent: "comercial local",
    keyword_type: "Comercial + Local"
  },
  "comprar apartamento em maceió": {
    search_volume: 560,
    seo_difficulty: 33,
    paid_difficulty: 19,
    cpc: 1.63,
    intent: "transacional local",
    keyword_type: "Transacional + Local + Long-tail"
  },
  "apartamento financiado em maceió": {
    search_volume: 310,
    seo_difficulty: 28,
    paid_difficulty: 16,
    cpc: 1.34,
    intent: "transacional local",
    keyword_type: "Transacional + Local + Long-tail"
  },
  "lançamento imobiliário em maceió": {
    search_volume: 260,
    seo_difficulty: 30,
    paid_difficulty: 18,
    cpc: 1.49,
    intent: "comercial local",
    keyword_type: "Comercial + Local + Long-tail"
  }
};
