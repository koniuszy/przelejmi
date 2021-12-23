SET check_function_bodies = false;
INSERT INTO public.scenarios (id, name, "imgUrl", notes, "dueDateDays", "paymentType", currency, "createdAt", "updatedAt", "clientId", "merchantId") VALUES (1, 'Motimate', 'https://play-lh.googleusercontent.com/DN6JNgjHvMgO_HKeFpxBsKMFHI8kdHodiv-FPP-ro5uxb26Ao1TLPZw7zEma_VgWLm0', '', 5, 'TRANSFER', 'EUR', '2021-11-20 16:50:38.524', '2021-11-20 16:50:38.524', 1, 1);
INSERT INTO public.scenarios (id, name, "imgUrl", notes, "dueDateDays", "paymentType", currency, "createdAt", "updatedAt", "clientId", "merchantId") VALUES (2, 'testwo', 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', '', 10, 'TRANSFER', 'EUR', '2021-11-21 18:30:49.538', '2021-11-21 18:30:49.538', 1, 1);
SELECT pg_catalog.setval('public."Scenario_id_seq"', 3, true);
