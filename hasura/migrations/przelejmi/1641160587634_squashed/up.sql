
CREATE EXTENSION pg_trgm;

CREATE INDEX clients_name_gin_idx ON public.clients
USING GIN ((name) gin_trgm_ops);

CREATE FUNCTION search_clients(search text) 
returns setof public.clients AS $$ 
SELECT   * 
FROM     public.clients 
WHERE    search <% ( NAME ) 
ORDER BY similarity(search, ( NAME )) DESC limit 5; 

$$ language sql stable;
