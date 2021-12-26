
alter table "public"."clients" rename column "postCode" to "post_code";

alter table "public"."clients" rename column "vatId" to "vat_id";

alter table "public"."invoice_items" rename column "createdAt" to "created_at";

alter table "public"."invoice_items" rename column "updatedAt" to "updated_at";

alter table "public"."invoice_items" rename column "invoiceId" to "invoice_id";

alter table "public"."invoices" rename column "invoiceNumber" to "invoice_number";

alter table "public"."invoices" rename column "createdAt" to "created_at";

alter table "public"."invoices" rename column "updatedAt" to "updated_at";

alter table "public"."invoices" rename column "scenarioId" to "scenario_id";

alter table "public"."merchants" rename column "issuerName" to "issuer_name";

alter table "public"."merchants" rename column "companyName" to "company_name";

alter table "public"."merchants" rename column "postCode" to "post_code";

alter table "public"."merchants" rename column "bankName" to "bank_name";

alter table "public"."merchants" rename column "bankAccountPln" to "bank_account_pln";

alter table "public"."merchants" rename column "bankAccountEur" to "bank_account_eur";

alter table "public"."merchants" rename column "vatId" to "vat_id";

alter table "public"."scenarios" rename column "imgUrl" to "img_url";

alter table "public"."scenarios" rename column "dueDateDays" to "due_date_days";

alter table "public"."scenarios" rename column "paymentType" to "payment_type";

alter table "public"."scenarios" rename column "createdAt" to "created_at";

alter table "public"."scenarios" rename column "updatedAt" to "updated_at";

alter table "public"."scenarios" rename column "clientId" to "client_id";

alter table "public"."scenarios" rename column "merchantId" to "merchant_id";
