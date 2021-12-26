
CREATE INDEX ON scenarios (client_id);

CREATE INDEX ON scenarios (merchant_id);

CREATE INDEX ON invoice_items (invoice_id);

CREATE INDEX ON invoices (scenario_id);
