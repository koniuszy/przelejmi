SET check_function_bodies = false;
INSERT INTO public.invoices (id, "invoiceNumber", "issueDate", "createdAt", "updatedAt", "scenarioId") VALUES (4, '02/11/2021', '20/11/2021', '2021-11-21 14:07:22.25', '2021-11-21 18:32:19.145', 1);
SELECT pg_catalog.setval('public."Invoice_id_seq"', 4, true);
