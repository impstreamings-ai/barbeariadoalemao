/**
 * Fonte única dos dados comerciais da Barbearia do Alemão.
 * Qualquer alteração de telefone, endereço, preço ou horário deve ser feita AQUI.
 * Itens marcados "VALIDAR" dependem de confirmação do cliente (ver docs/AUDITORIA.md).
 */

// VALIDAR: domínio final de produção (herdado do JSON-LD original).
export const SITE_URL = "https://barbeariadoalemao.lovable.app";

export const NAME = "Barbearia do Alemão";
export const PHONE_E164 = "5515988030574";
export const PHONE_DISPLAY = "(15) 98803-0574";

export const ADDRESS = {
  street: "R. Maria Germani, 826",
  district: "Júlio de Mesquita Filho",
  city: "Sorocaba",
  region: "SP",
  zip: "18053-030",
} as const;

export const ADDRESS_FULL = `${ADDRESS.street} - ${ADDRESS.district}, ${ADDRESS.city} - ${ADDRESS.region}, ${ADDRESS.zip}`;

export const MAPS_SHORT_URL = "https://maps.app.goo.gl/9QmcRTjmGaU3DDd37"; // VALIDAR
export const INSTAGRAM_URL = "https://www.instagram.com/barbeariadoalemao"; // VALIDAR

const DEFAULT_MESSAGE =
  "Olá! Vim pelo site da Barbearia do Alemão e gostaria de agendar um horário.";

/** Link wa.me com mensagem pré-preenchida. */
export function whatsappUrl(message: string = DEFAULT_MESSAGE) {
  return `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(message)}`;
}

export const mapsDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS_FULL)}`;
export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_FULL)}&output=embed`;

export const nav = [
  { href: "#sobre", label: "O Alemão" },
  { href: "#resultados", label: "Resultados" },
  { href: "#servicos", label: "Serviços" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#horarios", label: "Horários" },
  { href: "#localizacao", label: "Local" },
] as const;

// VALIDAR: valores informados no projeto original.
export const servicos = [
  {
    nome: "Corte masculino",
    desc: "Do clássico ao degradê, com atenção aos detalhes.",
    preco: "R$ 35",
  },
  { nome: "Barba", desc: "Alinhamento, contorno e acabamento.", preco: "R$ 25" },
  { nome: "Corte + barba", desc: "Cabelo e barba na mesma sessão.", preco: "R$ 50" },
  { nome: "Acabamento", desc: "Manutenção rápida para manter o corte alinhado.", preco: "R$ 20" },
  { nome: "Corte infantil", desc: "Atendimento com paciência e atenção.", preco: "R$ 30" },
] as const;

// Índice = Date.getDay() (0 = domingo).
export const horarios = [
  { dia: "Domingo", horas: null },
  { dia: "Segunda-feira", horas: null },
  { dia: "Terça-feira", horas: ["09:00", "21:00"] },
  { dia: "Quarta-feira", horas: ["07:30", "20:00"] },
  { dia: "Quinta-feira", horas: ["07:30", "21:00"] },
  { dia: "Sexta-feira", horas: ["07:30", "21:00"] },
  { dia: "Sábado", horas: ["07:30", "20:00"] },
] as const;

// VALIDAR: nota, quantidade e autorização para reproduzir os depoimentos.
export const RATING = { valor: "5,0", valorSchema: "5.0", total: "134" } as const;

export const avaliacoes = [
  {
    nome: "Walter Junior",
    texto:
      "Ambiente bacana, resenha boa e agradável. Corte rápido e bem feito, barba feita nos detalhes. Horário agendado e respeitado, não te deixando esperando para ser atendido. Atendimento muito bom, indico sem medo.",
  },
  {
    nome: "Wagner Galone",
    texto:
      "Belo corte, com agilidade e muito simpatia. Gente boa demais. Fora uma bela geladeira de Heineken.",
  },
  {
    nome: "Henrique Thiago",
    texto: "Excelente profissional e o ambiente é bem agradável e leve. Foi top minha experiência.",
  },
] as const;

export function jsonLd() {
  const dias = ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return {
    "@context": "https://schema.org",
    "@type": "Barbershop",
    name: NAME,
    description:
      "Barbearia em Sorocaba/SP com corte masculino, barba, acabamento e atendimento presencial desde 2015.",
    url: SITE_URL,
    image: `${SITE_URL}/og.jpg`,
    telephone: `+${PHONE_E164}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.city,
      addressRegion: ADDRESS.region,
      postalCode: ADDRESS.zip,
      addressCountry: "BR",
    },
    openingHoursSpecification: dias.map((dayOfWeek, i) => {
      const h = horarios[i + 2].horas!;
      return { "@type": "OpeningHoursSpecification", dayOfWeek, opens: h[0], closes: h[1] };
    }),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: RATING.valorSchema,
      reviewCount: RATING.total,
    },
    sameAs: [MAPS_SHORT_URL, INSTAGRAM_URL],
  };
}
