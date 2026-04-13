export type LeadFormVariant = 'main' | 'service' | 'inspection';

export type LeadRequestPayload = {
  source: 'Сайт';
  formName: string;
  pagePath: string;
  pageTitle?: string;
  referer?: string;
  utm?: Record<string, string>;
  client: {
    name: string;
    phone: string;
    email?: string;
    telegram?: string;
  };
  deal: {
    service?: string;
    city?: string;
    comment: string;
  };
};

export type LeadResponsePayload = {
  ok: boolean;
  message: string;
  leadId?: string;
};
