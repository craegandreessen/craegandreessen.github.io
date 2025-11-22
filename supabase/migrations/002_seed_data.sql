-- HuntFlow Seed Data
-- Initial states and species data

-- =====================================================
-- SEED US STATES
-- =====================================================

INSERT INTO public.states (code, name, country, portal_url) VALUES
  -- Western States (Primary hunting destinations)
  ('MT', 'Montana', 'US', 'https://fwp.mt.gov'),
  ('WY', 'Wyoming', 'US', 'https://wgfd.wyo.gov'),
  ('CO', 'Colorado', 'US', 'https://cpw.state.co.us'),
  ('ID', 'Idaho', 'US', 'https://idfg.idaho.gov'),
  ('UT', 'Utah', 'US', 'https://wildlife.utah.gov'),
  ('NV', 'Nevada', 'US', 'https://www.ndow.org'),
  ('AZ', 'Arizona', 'US', 'https://www.azgfd.com'),
  ('NM', 'New Mexico', 'US', 'https://www.wildlife.state.nm.us'),
  ('OR', 'Oregon', 'US', 'https://www.dfw.state.or.us'),
  ('WA', 'Washington', 'US', 'https://wdfw.wa.gov'),
  ('CA', 'California', 'US', 'https://wildlife.ca.gov'),

  -- Great Plains & Midwest
  ('ND', 'North Dakota', 'US', 'https://gf.nd.gov'),
  ('SD', 'South Dakota', 'US', 'https://gfp.sd.gov'),
  ('NE', 'Nebraska', 'US', 'https://outdoornebraska.gov'),
  ('KS', 'Kansas', 'US', 'https://ksoutdoors.com'),
  ('OK', 'Oklahoma', 'US', 'https://www.wildlifedepartment.com'),
  ('TX', 'Texas', 'US', 'https://tpwd.texas.gov'),

  -- Rocky Mountain Region
  ('WI', 'Wisconsin', 'US', 'https://dnr.wisconsin.gov'),
  ('MN', 'Minnesota', 'US', 'https://www.dnr.state.mn.us'),
  ('IA', 'Iowa', 'US', 'https://www.iowadnr.gov'),
  ('MO', 'Missouri', 'US', 'https://mdc.mo.gov'),

  -- Eastern States
  ('PA', 'Pennsylvania', 'US', 'https://www.pgc.pa.gov'),
  ('NY', 'New York', 'US', 'https://www.dec.ny.gov'),
  ('ME', 'Maine', 'US', 'https://www.maine.gov/ifw'),
  ('VT', 'Vermont', 'US', 'https://vtfishandwildlife.com'),
  ('NH', 'New Hampshire', 'US', 'https://www.wildlife.state.nh.us'),
  ('MA', 'Massachusetts', 'US', 'https://www.mass.gov/orgs/division-of-fisheries-and-wildlife'),

  -- Southern States
  ('AL', 'Alabama', 'US', 'https://www.outdooralabama.com'),
  ('AR', 'Arkansas', 'US', 'https://www.agfc.com'),
  ('FL', 'Florida', 'US', 'https://myfwc.com'),
  ('GA', 'Georgia', 'US', 'https://georgiawildlife.com'),
  ('KY', 'Kentucky', 'US', 'https://fw.ky.gov'),
  ('LA', 'Louisiana', 'US', 'https://www.wlf.louisiana.gov'),
  ('MS', 'Mississippi', 'US', 'https://www.mdwfp.com'),
  ('NC', 'North Carolina', 'US', 'https://www.ncwildlife.org'),
  ('SC', 'South Carolina', 'US', 'https://www.dnr.sc.gov'),
  ('TN', 'Tennessee', 'US', 'https://www.tn.gov/twra'),
  ('VA', 'Virginia', 'US', 'https://dwr.virginia.gov'),
  ('WV', 'West Virginia', 'US', 'https://www.wvdnr.gov'),

  -- Additional States
  ('AK', 'Alaska', 'US', 'https://www.adfg.alaska.gov'),
  ('HI', 'Hawaii', 'US', 'https://dlnr.hawaii.gov'),
  ('CT', 'Connecticut', 'US', 'https://portal.ct.gov/deep/wildlife'),
  ('DE', 'Delaware', 'US', 'https://dnrec.alpha.delaware.gov/fish-wildlife'),
  ('IL', 'Illinois', 'US', 'https://www2.illinois.gov/dnr'),
  ('IN', 'Indiana', 'US', 'https://www.in.gov/dnr'),
  ('MD', 'Maryland', 'US', 'https://dnr.maryland.gov'),
  ('MI', 'Michigan', 'US', 'https://www.michigan.gov/dnr'),
  ('NJ', 'New Jersey', 'US', 'https://www.nj.gov/dep/fgw'),
  ('OH', 'Ohio', 'US', 'https://ohiodnr.gov'),
  ('RI', 'Rhode Island', 'US', 'http://www.dem.ri.gov/programs/fish-wildlife');

-- =====================================================
-- SEED CANADIAN PROVINCES (Bonus)
-- =====================================================

INSERT INTO public.states (code, name, country, portal_url) VALUES
  ('AB', 'Alberta', 'CA', 'https://www.alberta.ca/fish-and-wildlife'),
  ('BC', 'British Columbia', 'CA', 'https://www2.gov.bc.ca/gov/content/sports-culture/recreation/fishing-hunting'),
  ('MB', 'Manitoba', 'CA', 'https://www.gov.mb.ca/fish-wildlife'),
  ('NB', 'New Brunswick', 'CA', 'https://www2.gnb.ca/content/gnb/en/departments/erd/natural_resources/content/fish_wildlife.html'),
  ('NL', 'Newfoundland and Labrador', 'CA', 'https://www.gov.nl.ca/ffa/wildlife'),
  ('NS', 'Nova Scotia', 'CA', 'https://novascotia.ca/natr/wildlife'),
  ('ON', 'Ontario', 'CA', 'https://www.ontario.ca/page/hunting'),
  ('PE', 'Prince Edward Island', 'CA', 'https://www.princeedwardisland.ca/en/topic/fish-and-wildlife'),
  ('QC', 'Quebec', 'CA', 'https://www.quebec.ca/en/tourism-and-recreation/sporting-and-outdoor-activities/hunting'),
  ('SK', 'Saskatchewan', 'CA', 'https://www.saskatchewan.ca/residents/parks-culture-heritage-and-sport/hunting-trapping-and-angling');

-- =====================================================
-- SEED SPECIES
-- =====================================================

INSERT INTO public.species (name, slug, icon_name) VALUES
  -- Deer Family
  ('Elk', 'elk', 'Deer'),
  ('Mule Deer', 'mule-deer', 'Rabbit'),
  ('Whitetail Deer', 'whitetail-deer', 'Rabbit'),
  ('Moose', 'moose', 'Deer'),
  ('Caribou', 'caribou', 'Deer'),

  -- Antelope & Sheep
  ('Pronghorn Antelope', 'pronghorn', 'Rabbit'),
  ('Bighorn Sheep', 'bighorn-sheep', 'Squirrel'),
  ('Desert Bighorn Sheep', 'desert-bighorn', 'Squirrel'),
  ('Dall Sheep', 'dall-sheep', 'Squirrel'),
  ('Mountain Goat', 'mountain-goat', 'Squirrel'),

  -- Bears
  ('Black Bear', 'black-bear', 'Bear'),
  ('Grizzly Bear', 'grizzly-bear', 'Bear'),

  -- Big Cats & Predators
  ('Mountain Lion', 'mountain-lion', 'Cat'),
  ('Wolf', 'wolf', 'Dog'),

  -- Bison & Exotic
  ('Bison', 'bison', 'Beef'),
  ('Wild Turkey', 'wild-turkey', 'Bird'),
  ('Waterfowl', 'waterfowl', 'Bird'),
  ('Upland Birds', 'upland-birds', 'Bird');

-- =====================================================
-- SEED EXAMPLE STATE-SPECIES DATA FOR 2026 SEASON
-- (Montana Elk as example)
-- =====================================================

INSERT INTO public.state_species (state_id, species_id, season_year, application_deadline, draw_date, point_type, base_fee, nonresident_fee, notes)
SELECT
  s.id,
  sp.id,
  2026,
  '2026-03-15'::DATE,
  '2026-04-30'::DATE,
  'bonus',
  20.00,
  850.00,
  'Montana elk general and special permit draws. Nonresident combo license required.'
FROM public.states s
CROSS JOIN public.species sp
WHERE s.code = 'MT' AND sp.slug = 'elk';

-- Wyoming Elk
INSERT INTO public.state_species (state_id, species_id, season_year, application_deadline, draw_date, point_type, base_fee, nonresident_fee, notes)
SELECT
  s.id,
  sp.id,
  2026,
  '2026-01-31'::DATE,
  '2026-03-31'::DATE,
  'preference',
  15.00,
  700.00,
  'Wyoming elk regular and special draws. Preference point system.'
FROM public.states s
CROSS JOIN public.species sp
WHERE s.code = 'WY' AND sp.slug = 'elk';

-- Colorado Elk
INSERT INTO public.state_species (state_id, species_id, season_year, application_deadline, draw_date, point_type, base_fee, nonresident_fee, notes)
SELECT
  s.id,
  sp.id,
  2026,
  '2026-04-02'::DATE,
  '2026-05-31'::DATE,
  'preference',
  10.00,
  650.00,
  'Colorado elk limited draw. Weighted preference point system.'
FROM public.states s
CROSS JOIN public.species sp
WHERE s.code = 'CO' AND sp.slug = 'elk';

-- Idaho Elk
INSERT INTO public.state_species (state_id, species_id, season_year, application_deadline, draw_date, point_type, base_fee, nonresident_fee, notes)
SELECT
  s.id,
  sp.id,
  2026,
  '2026-05-05'::DATE,
  '2026-06-15'::DATE,
  'bonus',
  15.50,
  586.00,
  'Idaho controlled hunt elk tags.'
FROM public.states s
CROSS JOIN public.species sp
WHERE s.code = 'ID' AND sp.slug = 'elk';

-- Utah Elk
INSERT INTO public.state_species (state_id, species_id, season_year, application_deadline, draw_date, point_type, base_fee, nonresident_fee, notes)
SELECT
  s.id,
  sp.id,
  2026,
  '2026-02-12'::DATE,
  '2026-05-27'::DATE,
  'bonus',
  10.00,
  365.00,
  'Utah limited entry and general season elk.'
FROM public.states s
CROSS JOIN public.species sp
WHERE s.code = 'UT' AND sp.slug = 'elk';

-- Arizona Elk
INSERT INTO public.state_species (state_id, species_id, season_year, application_deadline, draw_date, point_type, base_fee, nonresident_fee, notes)
SELECT
  s.id,
  sp.id,
  2026,
  '2026-06-11'::DATE,
  '2026-07-15'::DATE,
  'bonus',
  15.00,
  360.00,
  'Arizona elk bonus point system. Apply by unit.'
FROM public.states s
CROSS JOIN public.species sp
WHERE s.code = 'AZ' AND sp.slug = 'elk';

-- New Mexico Elk
INSERT INTO public.state_species (state_id, species_id, season_year, application_deadline, draw_date, point_type, base_fee, nonresident_fee, notes)
SELECT
  s.id,
  sp.id,
  2026,
  '2026-03-19'::DATE,
  '2026-04-15'::DATE,
  'none',
  70.00,
  652.00,
  'New Mexico elk draw. Pure random draw, no point system.'
FROM public.states s
CROSS JOIN public.species sp
WHERE s.code = 'NM' AND sp.slug = 'elk';

-- Nevada Elk
INSERT INTO public.state_species (state_id, species_id, season_year, application_deadline, draw_date, point_type, base_fee, nonresident_fee, notes)
SELECT
  s.id,
  sp.id,
  2026,
  '2026-03-10'::DATE,
  '2026-06-30'::DATE,
  'bonus',
  10.00,
  1200.00,
  'Nevada elk tags. Squared bonus point system.'
FROM public.states s
CROSS JOIN public.species sp
WHERE s.code = 'NV' AND sp.slug = 'elk';

COMMENT ON TABLE public.states IS 'Seeded with all 50 US states + 10 Canadian provinces';
COMMENT ON TABLE public.species IS 'Seeded with common North American big game species';
COMMENT ON TABLE public.state_species IS 'Example 2026 elk draw data for major western states';
