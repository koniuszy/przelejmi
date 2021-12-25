SET check_function_bodies = false;
CREATE SCHEMA public;
CREATE TYPE public."Currency" AS ENUM (
    'PLN',
    'EUR',
    'USD'
);
CREATE TYPE public."Vat" AS ENUM (
    'PERCENT_0',
    'PERCENT_8',
    'PERCENT_23',
    'DOES_NOT_CONCERN',
    'FREED'
);
CREATE TYPE public.payment_type AS ENUM (
    'CASH',
    'TRANSFER'
);
CREATE TABLE public.clients (
    id integer NOT NULL,
    name text NOT NULL,
    address text NOT NULL,
    "postCode" text NOT NULL,
    city text NOT NULL,
    country text NOT NULL,
    "vatId" text
);
CREATE SEQUENCE public."Client_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."Client_id_seq" OWNED BY public.clients.id;
CREATE TABLE public.invoice_items (
    id integer NOT NULL,
    name text NOT NULL,
    quantity integer NOT NULL,
    price integer NOT NULL,
    vat public."Vat" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "invoiceId" integer NOT NULL
);
CREATE SEQUENCE public."InvoiceItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."InvoiceItem_id_seq" OWNED BY public.invoice_items.id;
CREATE TABLE public.invoices (
    id integer NOT NULL,
    "invoiceNumber" text NOT NULL,
    "issueDate" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "scenarioId" integer NOT NULL
);
CREATE SEQUENCE public."Invoice_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."Invoice_id_seq" OWNED BY public.invoices.id;
CREATE TABLE public.merchants (
    id integer NOT NULL,
    "issuerName" text NOT NULL,
    "companyName" text NOT NULL,
    address text NOT NULL,
    "postCode" text NOT NULL,
    city text NOT NULL,
    country text NOT NULL,
    email text NOT NULL,
    "bankName" text NOT NULL,
    "bankAccountPln" text NOT NULL,
    "bankAccountEur" text,
    "vatId" text NOT NULL
);
CREATE SEQUENCE public."Merchant_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."Merchant_id_seq" OWNED BY public.merchants.id;
CREATE TABLE public.scenarios (
    id integer NOT NULL,
    name text NOT NULL,
    "imgUrl" text NOT NULL,
    notes text NOT NULL,
    "dueDateDays" integer NOT NULL,
    "paymentType" public.payment_type NOT NULL,
    currency public."Currency" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "clientId" integer NOT NULL,
    "merchantId" integer NOT NULL
);
CREATE SEQUENCE public."Scenario_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public."Scenario_id_seq" OWNED BY public.scenarios.id;
ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public."Client_id_seq"'::regclass);
ALTER TABLE ONLY public.invoice_items ALTER COLUMN id SET DEFAULT nextval('public."InvoiceItem_id_seq"'::regclass);
ALTER TABLE ONLY public.invoices ALTER COLUMN id SET DEFAULT nextval('public."Invoice_id_seq"'::regclass);
ALTER TABLE ONLY public.merchants ALTER COLUMN id SET DEFAULT nextval('public."Merchant_id_seq"'::regclass);
ALTER TABLE ONLY public.scenarios ALTER COLUMN id SET DEFAULT nextval('public."Scenario_id_seq"'::regclass);
ALTER TABLE ONLY public.clients
    ADD CONSTRAINT "Client_id_key" UNIQUE (id);
ALTER TABLE ONLY public.clients
    ADD CONSTRAINT "Client_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public.invoice_items
    ADD CONSTRAINT "InvoiceItem_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT "Invoice_id_key" UNIQUE (id);
ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT "Invoice_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public.merchants
    ADD CONSTRAINT "Merchant_pkey" PRIMARY KEY (id);
ALTER TABLE ONLY public.scenarios
    ADD CONSTRAINT "Scenario_pkey" PRIMARY KEY (id);
CREATE UNIQUE INDEX "Invoice_invoiceNumber_key" ON public.invoices USING btree ("invoiceNumber");
ALTER TABLE ONLY public.invoice_items
    ADD CONSTRAINT "InvoiceItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES public.invoices(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT "Invoice_scenarioId_fkey" FOREIGN KEY ("scenarioId") REFERENCES public.scenarios(id) ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE ONLY public.scenarios
    ADD CONSTRAINT "Scenario_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES public.clients(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.scenarios
    ADD CONSTRAINT "Scenario_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES public.merchants(id) ON UPDATE CASCADE ON DELETE CASCADE;
