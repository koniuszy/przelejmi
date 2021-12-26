
alter table "public"."invoices" rename column "issue_date" to "issueDate";


alter table "public"."scenarios" rename column "merchant_id" to "merchantId";

alter table "public"."scenarios" rename column "client_id" to "clientId";

alter table "public"."scenarios" rename column "updated_at" to "updatedAt";

alter table "public"."scenarios" rename column "created_at" to "createdAt";

alter table "public"."scenarios" rename column "payment_type" to "paymentType";

alter table "public"."scenarios" rename column "due_date_days" to "dueDateDays";

alter table "public"."scenarios" rename column "img_url" to "imgUrl";

alter table "public"."merchants" rename column "vat_id" to "vatId";

alter table "public"."merchants" rename column "bank_account_eur" to "bankAccountEur";

alter table "public"."merchants" rename column "bank_account_pln" to "bankAccountPln";

alter table "public"."merchants" rename column "bank_name" to "bankName";

alter table "public"."merchants" rename column "post_code" to "postCode";

alter table "public"."merchants" rename column "company_name" to "companyName";

alter table "public"."merchants" rename column "issuer_name" to "issuerName";

alter table "public"."invoices" rename column "scenario_id" to "scenarioId";

alter table "public"."invoices" rename column "updated_at" to "updatedAt";

alter table "public"."invoices" rename column "created_at" to "createdAt";

alter table "public"."invoices" rename column "invoice_number" to "invoiceNumber";

alter table "public"."invoice_items" rename column "invoice_id" to "invoiceId";

alter table "public"."invoice_items" rename column "updated_at" to "updatedAt";

alter table "public"."invoice_items" rename column "created_at" to "createdAt";

alter table "public"."clients" rename column "vat_id" to "vatId";

alter table "public"."clients" rename column "post_code" to "postCode";
