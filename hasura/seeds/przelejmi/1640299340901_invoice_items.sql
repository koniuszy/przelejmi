SET check_function_bodies = false;
INSERT INTO public.invoice_items (id, name, quantity, price, vat, "createdAt", "updatedAt", "invoiceId") VALUES (2, 'Services', 176, 32, 'DOES_NOT_CONCERN', '2021-11-21 14:07:22.25', '2021-11-21 14:07:22.25', 4);
INSERT INTO public.invoice_items (id, name, quantity, price, vat, "createdAt", "updatedAt", "invoiceId") VALUES (3, 'Costs related to travel', 1, 700, 'PERCENT_8', '2021-11-21 14:07:22.25', '2021-11-21 14:07:22.25', 4);
SELECT pg_catalog.setval('public."InvoiceItem_id_seq"', 3, true);
