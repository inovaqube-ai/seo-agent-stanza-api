function validateBearerToken(req) {
  const authHeader = req.headers.authorization || "";
  const expectedToken = process.env.ACTION_BEARER_TOKEN;

  return Boolean(expectedToken) && authHeader === `Bearer ${expectedToken}`;
}

function extractTag(html, regex) {
  const match = html.match(regex);
  return match ? cleanText(match[1]) : null;
}

function extractAll(html, regex) {
  const results = [];
  let match;

  while ((match = regex.exec(html)) !== null) {
    if (match[1]) {
      results.push(cleanText(match[1]));
    }
  }

  return [...new Set(results)].filter(Boolean);
}

function cleanText(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .trim();
}

function getAttribute(tag, attr) {
  const regex = new RegExp(`${attr}\\s*=\\s*["']([^"']*)["']`, "i");
  const match = tag.match(regex);
  return match ? match[1].trim() : "";
}

function resolveUrl(src, baseUrl) {
  try {
    return new URL(src, baseUrl).href;
  } catch {
    return src;
  }
}

function getFileNameFromUrl(url) {
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/");
    return parts[parts.length - 1] || "";
  } catch {
    return "";
  }
}

function classifyImagePosition(index) {
  if (index === 0) return "possível imagem acima da dobra / possível LCP";
  if (index <= 3) return "imagem prioritária";
  return "imagem secundária";
}

function analyzeImages(html, baseUrl) {
  const imageTags = html.match(/<img\b[^>]*>/gi) || [];

  return imageTags.slice(0, 50).map((tag, index) => {
    const src = getAttribute(tag, "src") || getAttribute(tag, "data-src") || "";
    const resolvedSrc = resolveUrl(src, baseUrl);
    const fileName = getFileNameFromUrl(resolvedSrc);

    return {
      src: resolvedSrc,
      file_name: fileName,
      alt: getAttribute(tag, "alt"),
      title: getAttribute(tag, "title"),
      width: getAttribute(tag, "width"),
      height: getAttribute(tag, "height"),
      loading: getAttribute(tag, "loading"),
      decoding: getAttribute(tag, "decoding"),
      priority_note: classifyImagePosition(index),
      seo_observations: buildImageObservations({
        index,
        fileName,
        alt: getAttribute(tag, "alt"),
        width: getAttribute(tag, "width"),
        height: getAttribute(tag, "height"),
        loading: getAttribute(tag, "loading"),
        src: resolvedSrc
      })
    };
  });
}

function buildImageObservations({ index, fileName, alt, width, height, loading, src }) {
  const observations = [];

  if (!alt) {
    observations.push("alt text ausente");
  }

  if (!width || !height) {
    observations.push("definir largura e altura para reduzir risco de CLS");
  }

  if (index === 0 && loading === "lazy") {
    observations.push("evitar lazy loading na imagem principal acima da dobra");
  }

  if (index > 3 && loading !== "lazy") {
    observations.push("considerar lazy loading se a imagem estiver abaixo da dobra");
  }

  if (fileName && /img|image|foto|banner|whatsapp|captura|screenshot/i.test(fileName)) {
    observations.push("nome de arquivo possivelmente genérico");
  }

  if (!src.match(/\.(webp|avif)(\?|$)/i)) {
    observations.push("avaliar conversão para WebP ou AVIF");
  }

  return observations;
}

function analyzeLinks(html, baseUrl) {
  const linkTags = html.match(/<a\b[^>]*href=["'][^"']*["'][^>]*>/gi) || [];

  const links = linkTags.slice(0, 100).map((tag) => {
    const href = getAttribute(tag, "href");
    const resolvedHref = resolveUrl(href, baseUrl);

    let type = "external";

    try {
      const base = new URL(baseUrl);
      const target = new URL(resolvedHref);
      type = base.hostname === target.hostname ? "internal" : "external";
    } catch {
      type = "unknown";
    }

    return {
      href: resolvedHref,
      type
    };
  });

  return {
    total: links.length,
    internal: links.filter((link) => link.type === "internal").length,
    external: links.filter((link) => link.type === "external").length,
    items: links
  };
}

function detectPageType(url, h1, title, html) {
  const text = `${url} ${h1 || ""} ${title || ""} ${html.slice(0, 3000)}`.toLowerCase();

  if (text.includes("minha casa minha vida")) return "Página Minha Casa Minha Vida";
  if (text.includes("empreendimento") || text.includes("apartamento")) return "Empreendimento";
  if (text.includes("blog") || text.includes("notícia") || text.includes("artigo")) return "Blog";
  if (text.includes("contato") || text.includes("fale conosco")) return "Contato";
  if (text.includes("sobre") || text.includes("institucional")) return "Institucional";

  try {
    const parsed = new URL(url);
    if (parsed.pathname === "/" || parsed.pathname === "") return "Home";
  } catch {}

  return "Outra";
}

function buildCoreWebVitalsHints(images, scriptsCount) {
  const hints = {
    lcp: [],
    inp: [],
    cls: []
  };

  const firstImage = images[0];

  if (firstImage) {
    hints.lcp.push("Avaliar se a primeira imagem é o elemento LCP da página.");
  }

  if (firstImage && firstImage.loading === "lazy") {
    hints.lcp.push("Remover lazy loading da imagem principal acima da dobra.");
  }

  if (firstImage && !firstImage.src.match(/\.(webp|avif)(\?|$)/i)) {
    hints.lcp.push("Converter imagem principal para WebP ou AVIF e comprimir.");
  }

  if (scriptsCount > 20) {
    hints.inp.push("Há muitos scripts na página; revisar JavaScript não usado e scripts de terceiros.");
  } else {
    hints.inp.push("Revisar scripts de formulário, CTA, WhatsApp, menus e carrosséis.");
  }

  const imagesWithoutSize = images.filter((image) => !image.width || !image.height).length;

  if (imagesWithoutSize > 0) {
    hints.cls.push(`${imagesWithoutSize} imagem(ns) sem largura/altura detectadas; definir dimensões para reduzir CLS.`);
  } else {
    hints.cls.push("Imagens analisadas possuem atributos de dimensão ou não foi possível detectar ausência crítica.");
  }

  return hints;
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

  const { url } = req.body || {};

  if (!url) {
    return res.status(400).json({
      error: "missing_url",
      message: "Envie a URL da página no campo url."
    });
  }

  let parsedUrl;

  try {
    parsedUrl = new URL(url);
  } catch {
    return res.status(400).json({
      error: "invalid_url",
      message: "URL inválida."
    });
  }

  try {
    const response = await fetch(parsedUrl.href, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 SEO-Agent-Stanza-Crawler/1.0",
        "Accept": "text/html,application/xhtml+xml"
      }
    });

    const html = await response.text();

    const title = extractTag(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
    const metaDescription = extractTag(
      html,
      /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i
    ) || extractTag(
      html,
      /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i
    );

    const canonical = extractTag(
      html,
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["'][^>]*>/i
    );

    const h1 = extractTag(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const h2 = extractAll(html, /<h2[^>]*>([\s\S]*?)<\/h2>/gi);
    const h3 = extractAll(html, /<h3[^>]*>([\s\S]*?)<\/h3>/gi);

    const images = analyzeImages(html, parsedUrl.href);
    const links = analyzeLinks(html, parsedUrl.href);
    const scriptsCount = (html.match(/<script\b/gi) || []).length;
    const stylesheetsCount = (html.match(/rel=["']stylesheet["']/gi) || []).length;

    const pageType = detectPageType(parsedUrl.href, h1, title, html);
    const coreWebVitalsHints = buildCoreWebVitalsHints(images, scriptsCount);

    return res.status(200).json({
      url: parsedUrl.href,
      status_code: response.status,
      content_type: response.headers.get("content-type"),
      page_type_detected: pageType,
      title,
      meta_description: metaDescription,
      canonical,
      headings: {
        h1,
        h2,
        h3
      },
      counts: {
        images: images.length,
        scripts: scriptsCount,
        stylesheets: stylesheetsCount,
        links_total: links.total,
        internal_links: links.internal,
        external_links: links.external
      },
      images,
      links: links.items.slice(0, 30),
      core_web_vitals_hints: coreWebVitalsHints,
      crawler_notes: [
        "Este endpoint faz uma análise HTML básica da página.",
        "Não mede Core Web Vitals reais de campo.",
        "Para métricas reais de LCP, INP e CLS, conectar PageSpeed Insights ou CrUX em etapa futura."
      ]
    });
  } catch (error) {
    return res.status(500).json({
      error: "crawler_error",
      message: "Erro ao analisar a página.",
      details: error.message
    });
  }
}
