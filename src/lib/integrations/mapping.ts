import { buildLeadName, buildLeadNote, isKnownServiceValue, normalizePayloadBase } from './helpers';
import type { NormalizedLeadPayload, ServiceValue, SiteLeadPayload } from './types';

const SERVICE_ALIAS_MAP: Record<string, ServiceValue> = {
  'ремонт кровли': 'Ремонт кровли',
  'восстановление кровли': 'Восстановление кровли',
  'гидроизоляция кровли': 'Гидроизоляция кровли',
  'восстановление мягкой кровли': 'Мягкая кровля / Sinzatim',
  'восстановление мягкой кровли по технологии sinzatim': 'Мягкая кровля / Sinzatim',
  'мягкая кровля / sinzatim': 'Мягкая кровля / Sinzatim',
  'замена кровли': 'Замена кровли',
  'монтаж кровли': 'Монтаж кровли',
  'кровля под ключ': 'Кровля под ключ',
  'устранение протечек': 'Устранение протечки',
  'устранение протечки': 'Устранение протечки',
  'гидроизоляция балконов и террас': 'Балкон / терраса',
  'балкон / терраса': 'Балкон / терраса',
  'локальный ремонт и герметизация узлов': 'Герметизация узлов',
  'герметизация узлов': 'Герметизация узлов',
  'натяжные потолки': 'Натяжные потолки',
  'натяжные потолки под ключ': 'Натяжные потолки',
};

const PAGE_PATH_TO_SERVICE: Record<string, ServiceValue> = {
  '/krovelnye-raboty/remont-krovli/': 'Ремонт кровли',
  '/krovelnye-raboty/vosstanovlenie-krovli/': 'Восстановление кровли',
  '/krovelnye-raboty/gidroizolyatsiya-krovli/': 'Гидроизоляция кровли',
  '/krovelnye-raboty/vosstanovlenie-myagkoy-krovli/': 'Мягкая кровля / Sinzatim',
  '/krovelnye-raboty/vosstanovlenie-myagkoy-krovli-sinzatim/': 'Мягкая кровля / Sinzatim',
  '/krovelnye-raboty/zamena-krovli/': 'Замена кровли',
  '/krovelnye-raboty/montazh-krovli/': 'Монтаж кровли',
  '/krovelnye-raboty/krovlya-pod-klyuch/': 'Кровля под ключ',
  '/gidroizolyatsiya/ustranenie-protechek/': 'Устранение протечки',
  '/gidroizolyatsiya/balkony-i-terrasy/': 'Балкон / терраса',
  '/gidroizolyatsiya/lokalnyy-remont-i-germetizatsiya/': 'Герметизация узлов',
  '/natyazhnye-potolki/': 'Натяжные потолки',
  '/natyazhnye-potolki/pod-klyuch/': 'Натяжные потолки',
  '/natyazhnye-potolki/v-kvartiru/': 'Натяжные потолки',
  '/natyazhnye-potolki/v-chastnyy-dom/': 'Натяжные потолки',
};

function normalizeServiceLabel(value?: string): ServiceValue | undefined {
  if (!value) {
    return undefined;
  }

  if (isKnownServiceValue(value)) {
    return value;
  }

  return SERVICE_ALIAS_MAP[value.trim().toLowerCase()];
}

function normalizePagePath(path?: string): string | undefined {
  if (!path) {
    return undefined;
  }

  const trimmed = path.trim();
  if (!trimmed) {
    return undefined;
  }

  if (trimmed === '/') {
    return trimmed;
  }

  return trimmed.endsWith('/') ? trimmed : `${trimmed}/`;
}

export function resolveService(payload: Pick<SiteLeadPayload, 'service' | 'pagePath'>): ServiceValue | undefined {
  const direct = normalizeServiceLabel(payload.service);
  if (direct) {
    return direct;
  }

  const pagePath = normalizePagePath(payload.pagePath);
  if (!pagePath) {
    return undefined;
  }

  return PAGE_PATH_TO_SERVICE[pagePath];
}

export function mapSiteLeadPayload(payload: SiteLeadPayload): NormalizedLeadPayload {
  const base = normalizePayloadBase(payload);
  const service = resolveService(payload);

  const leadName = buildLeadName({
    service,
    city: base.city,
    name: base.name,
  });

  const noteText = buildLeadNote(payload, service);

  return {
    ...base,
    service,
    leadName,
    noteText,
  };
}

export { PAGE_PATH_TO_SERVICE, SERVICE_ALIAS_MAP };
