// GHG Sankey data — source of truth for GHG_Sankey_Consolidated.html
// Defines window.GHG_NODES (45 nodes) and window.GHG_LINKS (57 links).
//
// Node depth maps to chart column:  0=L1 (gas types), 1=L2 (sectors),
//                                   2=L3 (elec. generation), 3=L4 (end-uses)
//
// Data vintage: 2024 estimate extrapolated from EDGAR v9 (2022),
//   IEA World Energy Outlook 2023, FAO GLEAM 3.0, IMO 4th GHG Study 2020.
//   GWP100 values from IPCC AR6. Excludes LULUCF.
//   Total: 56.0 GtCO₂e.
//
// Percentage conventions:
//   L1 & L2  → % of total GHGs          (56.0 GtCO₂e)
//   L3       → % of Power & Heat         (15.8 GtCO₂e, emission-intensity basis)
//   L4       → % of all end-use GHGs     (~53.75 GtCO₂e)
//
// L3 uses an EMISSION-INTENSITY model: each generation source carries its actual
// direct GHG emissions (g CO₂/kWh × TWh). Coal = ~62% despite ~30% of gen;
// non-fossil = ~1% (hydro reservoir CH₄ + geothermal CO₂ only).

window.GHG_NODES = [

  // ── L1: GAS TYPES (depth 0) ────────────────────────────────────────────────

  { id:0, label:"CO\u2082", depth:0,
    fullName:"Carbon dioxide (CO\u2082)",
    description:"The dominant anthropogenic greenhouse gas, produced by fossil fuel combustion and industrial processes (cement calcination, fermentation). Atmospheric lifetime centuries to millennia. Fossil CO\u2082 alone accounts for ~69% of all GHG emissions.",
    activities:"Coal/gas/oil power plants \u2022 Gasoline & diesel combustion \u2022 Industrial furnaces \u2022 Cement kiln calcination (CaCO\u2083 \u2192 CaO + CO\u2082) \u2022 Natural gas flaring",
    gases:"CO\u2082 \u2022 GWP\u2081\u2080\u2080 = 1 (reference gas) \u2022 Atmospheric lifetime: centuries\u2013millennia",
    gtco2e:38.49, pct:68.73, pctContext:"of total GHGs",
    notes:"EDGAR v9 (2022 base) + ~1% annual growth extrapolation to 2024. Includes fossil CO\u2082 and industrial process CO\u2082. Excludes biogenic CO\u2082 and LULUCF." },

  { id:1, label:"CH\u2084", depth:0,
    fullName:"Methane (CH\u2084)",
    description:"Second-largest GHG contributor; potent short-lived climate forcer responsible for ~30% of current net warming. Atmospheric lifetime ~12 years means near-term reductions deliver fast climate benefits. AR6 revises GWP100 upward to 29.8 (vs. 28 in AR5), significantly raising the CO\u2082e accounting of methane.",
    activities:"Oil & gas leaks & venting \u2022 Coal mine degassing \u2022 Enteric fermentation in cattle \u2022 Decomposing manure \u2022 Flooded rice paddies \u2022 Landfill decomposition",
    gases:"CH\u2084 \u2022 GWP\u2081\u2080\u2080 \u2248 29.8 (IPCC AR6, up from 28 in AR5) \u2022 Atmospheric lifetime \u223c12 years",
    gtco2e:11.76, pct:21.00, pctContext:"of total GHGs",
    notes:"EDGAR v9 (2022 base) + ~0.8%/yr trend to 2024; AR6 GWP100=29.8 applied. Global Methane Budget (Saunois et al. 2020) & IEA Methane Tracker 2023 inform sectoral splits. Significantly higher than AR5-based estimates due to revised GWP." },

  { id:2, label:"N\u2082O", depth:0,
    fullName:"Nitrous oxide (N\u2082O)",
    description:"Long-lived greenhouse gas and dominant ozone-depleting substance currently emitted. Primarily from agricultural nitrogen cycling. AR6 revises GWP100 to 273 (up from 265 in AR5). EDGAR v9 and Tian et al. 2020 Global N\u2082O Budget both point to totals near 3.5\u20133.8 GtCO\u2082e.",
    activities:"Synthetic N fertilizer application \u2022 Animal manure on soils \u2022 Nitric & adipic acid manufacturing \u2022 Combustion byproduct \u2022 Wastewater treatment",
    gases:"N\u2082O \u2022 GWP\u2081\u2080\u2080 \u2248 273 (IPCC AR6, up from 265 in AR5) \u2022 Atmospheric lifetime \u223c114 years \u2022 Also dominant ozone depleter",
    gtco2e:3.75, pct:6.70, pctContext:"of total GHGs",
    notes:"EDGAR v9 (2022) + ~0.5%/yr trend to 2024; AR6 GWP100=273 applied. Tian et al. 2020 Global N\u2082O Budget; FAO fertilizer data. Substantially higher than earlier estimates due to revised GWP and improved bottom-up accounting." },

  { id:3, label:"F-gases", depth:0,
    fullName:"Fluorinated gases (F-gases)",
    description:"Synthetic, extremely high-GWP gases (HFCs, PFCs, SF\u2086, NF\u2083) used in refrigeration, electrical equipment, and manufacturing. Many persist for thousands of years. Kigali Amendment (2016) mandates an HFC phase-down expected to prevent 0.3\u20130.5\u00b0C of warming by 2100. Growth has moderated as phase-down takes effect.",
    activities:"HFC refrigerant leaks in AC & cold chains \u2022 SF\u2086 in high-voltage switchgear \u2022 PFCs from aluminum smelting \u2022 NF\u2083 in semiconductor manufacturing \u2022 HFCs as foam blowing agents",
    gases:"HFCs: GWP\u2081\u2080\u2080 12\u201314,800 \u2022 PFCs: GWP\u2081\u2080\u2080 6,630\u201317,340 \u2022 SF\u2086: GWP\u2081\u2080\u2080 25,200 \u2022 NF\u2083: GWP\u2081\u2080\u2080 17,400 (IPCC AR6)",
    gtco2e:2.00, pct:3.57, pctContext:"of total GHGs",
    notes:"EDGAR v9 (2022) + ~0.5%/yr (Kigali phase-down moderating growth). UNEP TEAP; Velders et al. 2022. Includes HFCs, PFCs, SF\u2086, NF\u2083, and minor halogenated compounds." },

  // ── L2: SECTORS (depth 1) ──────────────────────────────────────────────────

  { id:4, label:"Power & Heat", depth:1,
    fullName:"Power & Heat (sector)",
    description:"Emissions from burning fossil fuels to generate electricity and produce district heat. The single largest sector globally. Counted at the point of generation. Flows through electricity generation intermediaries (L3) before reaching end-uses. Despite renewable growth, coal remains dominant in the emission mix.",
    activities:"Coal-fired power stations \u2022 Natural gas CCGT & open-cycle plants \u2022 Oil & diesel generators \u2022 Coal & gas CHP plants \u2022 Fossil-fuel district heating boilers",
    gases:"Primarily CO\u2082 \u2022 Minor CH\u2084 (combustion) \u2022 Minor N\u2082O (combustion)",
    gtco2e:15.80, pct:28.21, pctContext:"of total GHGs",
    notes:"EDGAR v9 (2022) ~15.5 GtCO\u2082e + ~1%/yr growth to 2024. IEA World Energy Outlook 2023; IPCC AR6 WG3 Ch.6. Includes electricity generation and district heating from fossil fuels." },

  { id:5, label:"Transport", depth:1,
    fullName:"Transport (sector)",
    description:"Direct combustion emissions from road vehicles, aircraft, ships, and rail. Road transport ~72% of sector. Rebounded strongly post-COVID with aviation recovery. Electrified transport emissions are counted under Power & Heat \u2192 electricity end-uses.",
    activities:"Passenger cars & SUVs \u2022 Heavy-duty freight trucks \u2022 Commercial aviation (jet fuel) \u2022 Container ships & tankers (HFO) \u2022 Diesel locomotives \u2022 Motorcycles & three-wheelers",
    gases:"Primarily CO\u2082 \u2022 Minor CH\u2084 & N\u2082O (incomplete combustion, catalytic reactions)",
    gtco2e:9.00, pct:16.07, pctContext:"of total GHGs",
    notes:"EDGAR v9 (2022) ~8.7 GtCO\u2082e + ~2%/yr post-COVID recovery to 2024. IEA Transport Tracking 2023; ICAO; IMO. International aviation/shipping allocation follows EDGAR convention (included in national totals)." },

  { id:6, label:"Industry", depth:1,
    fullName:"Industry (sector)",
    description:"Emissions from manufacturing energy use (combustion for heat & steam) and process emissions (chemical reactions releasing GHGs independent of fuel). F-gas leakage from industrial equipment included. Hard-to-abate sub-sectors (steel, cement, chemicals) drive the bulk of emissions.",
    activities:"Iron & steel production \u2022 Chemicals & petrochemicals \u2022 Cement clinker calcination \u2022 Aluminum smelting \u2022 Pulp & paper \u2022 On-site boilers & process furnaces",
    gases:"CO\u2082 (energy & process) \u2022 N\u2082O (chemical processes) \u2022 HFCs/PFCs/SF\u2086 (F-gas sub-sector) \u2022 Minor CH\u2084",
    gtco2e:11.00, pct:19.64, pctContext:"of total GHGs",
    notes:"EDGAR v9 (2022) ~10.7 GtCO\u2082e + ~1.5%/yr to 2024. IEA Industry Tracking 2023; IPCC AR6 WG3 Ch.11. Process emissions (cement calcination, chemical reactions) are ~40% of sector total." },

  { id:7, label:"Buildings", depth:1,
    fullName:"Buildings (sector) \u2014 direct combustion",
    description:"Direct on-site fossil fuel combustion in residential & commercial buildings for heating, hot water, and cooking. Excludes electricity (routed through Power & Heat \u2192 L3 generation \u2192 electricity end-uses). Relatively flat trend as electrification offsets growth in developing-world demand.",
    activities:"Natural gas furnaces & boilers \u2022 Oil-fired heating systems \u2022 Propane/LPG cooking \u2022 Gas water heaters \u2022 Wood & biomass stoves",
    gases:"Primarily CO\u2082 \u2022 Minor CH\u2084 (gas leaks) \u2022 Minor N\u2082O",
    gtco2e:4.00, pct:7.14, pctContext:"of total GHGs",
    notes:"EDGAR v9 (2022) ~3.9 GtCO\u2082e; approximately flat trend to 2024. IEA Buildings Tracking 2023; IPCC AR6 WG3 Ch.9. Excludes electricity end-use (see L4 electricity nodes)." },

  { id:8, label:"Fuel Supply", depth:1,
    fullName:"Fuel Supply (sector) \u2014 upstream",
    description:"Fugitive and combustion emissions from extracting, processing, transporting, and refining fossil fuels before they reach end users. Includes intentional venting/flaring and accidental leaks. Methane-dominant: IEA Methane Tracker estimates ~120 Mt CH\u2084/year from oil & gas globally.",
    activities:"Oil & gas wellhead leaks \u2022 Pipeline fugitive emissions \u2022 Gas venting & flaring \u2022 Coal mine methane \u2022 LNG liquefaction energy \u2022 Refinery combustion",
    gases:"CH\u2084 dominant (fugitive leaks & venting, ~60% of sector) \u2022 CO\u2082 (combustion, flaring, ~40%) \u2022 Minor N\u2082O",
    gtco2e:5.50, pct:9.82, pctContext:"of total GHGs",
    notes:"EDGAR v9 (2022) ~5.3 GtCO\u2082e + ~1%/yr to 2024. IEA Methane Tracker 2023; EPA GHG Inventory; IPCC AR6 WG3 Ch.6. Fugitive CH\u2084 estimates carry ~\u00b130% uncertainty." },

  { id:9, label:"Agriculture", depth:1,
    fullName:"Agriculture (sector) \u2014 non-energy",
    description:"Non-CO\u2082 emissions from livestock production, manure management, rice cultivation, and nitrogen cycling in soils. Does not include agricultural energy use (counted in other sectors) or land-use change (LULUCF excluded from this analysis). Growing livestock populations and fertilizer use drive a slow upward trend.",
    activities:"Enteric fermentation in cattle & ruminants \u2022 Manure storage & land application \u2022 Flooded rice paddies \u2022 Synthetic fertilizer & manure-derived N\u2082O \u2022 Crop residue burning",
    gases:"CH\u2084 (livestock & rice, ~73%) \u2022 N\u2082O (soils & manure, ~27%) \u2022 Trace CO\u2082",
    gtco2e:8.80, pct:15.71, pctContext:"of total GHGs",
    notes:"EDGAR v9 (2022) ~8.6 GtCO\u2082e + ~0.5%/yr to 2024. FAO GLEAM 3.0; IPCC AR6 WG3 Ch.7; Tian et al. 2020. AR6 GWP100 values (CH\u2084=29.8, N\u2082O=273) applied." },

  { id:10, label:"Waste", depth:1,
    fullName:"Waste (sector)",
    description:"Emissions from decomposition of organic matter in landfills and wastewater systems, plus contributions from incineration and composting. EDGAR v9 places this sector at ~1.9 GtCO\u2082e \u2014 nearly twice older estimates that used AR5 GWP values and excluded wastewater. Rapid urbanization in developing regions drives growth.",
    activities:"Anaerobic decomposition in MSW landfills \u2022 CH\u2084 & N\u2082O from wastewater treatment \u2022 Open burning of waste \u2022 Composting \u2022 Industrial waste lagoons",
    gases:"CH\u2084 dominant (landfill & wastewater, ~90%) \u2022 N\u2082O (wastewater nitrification, ~5%) \u2022 CO\u2082 (incineration, ~5%)",
    gtco2e:1.90, pct:3.39, pctContext:"of total GHGs",
    notes:"EDGAR v9 (2022) ~1.85 GtCO\u2082e + ~1%/yr to 2024. IPCC AR6 WG3 Ch.13; IPCC 2019 Refinement Vol.5. Significantly revised upward vs. AR5-era estimates due to AR6 GWP and improved wastewater accounting." },

  // ── L3: ELECTRICITY GENERATION INTERMEDIARIES (depth 2) ───────────────────
  // Only Power & Heat flows through here.
  // Oil & other thermal and District heat are terminal sinks (no L4 outflows).
  // L3 values represent ACTUAL DIRECT EMISSIONS from each generation source
  // (emission-intensity model). Non-fossil electricity carries only its tiny
  // direct operational emissions (hydro reservoir CH₄ + geothermal CO₂).
  // Coal's high emission intensity (~820–1,050 g CO₂/kWh) makes it by far the
  // dominant source despite generating only ~30% of global electricity.

  { id:11, label:"Coal power", depth:2,
    fullName:"Coal power generation",
    description:"Electricity from burning coal (bituminous, sub-bituminous, lignite) in thermal power stations. Coal generates ~30\u201335% of global electricity but accounts for ~62% of power sector CO\u2082e due to the highest emission intensity of any generation source (~820\u20131,050 g CO\u2082/kWh). Replacing coal power is the single highest-leverage action available for decarbonizing electricity.",
    activities:"Subcritical pulverized coal (older, ~33\u201337% efficiency) \u2022 Supercritical & ultra-supercritical PC (42\u201348%) \u2022 IGCC \u2022 Coal-fired CHP plants \u2022 Lignite/brown coal stations",
    gases:"CO\u2082 dominant (~820\u20131,050 g CO\u2082/kWh) \u2022 Minor CH\u2084 & N\u2082O from combustion",
    gtco2e:9.80, pct:62.03, pctContext:"of Power & Heat",
    notes:"EDGAR v9 (2022) coal power CO\u2082 ~9.5 GtCO\u2082 + ~1%/yr to 2024; IEA Electricity 2023. Direct emission basis (g CO\u2082/kWh \u00d7 TWh generated). Coal ~30% of generation but ~62% of power sector CO\u2082e due to emission intensity." },

  { id:12, label:"Gas power", depth:2,
    fullName:"Natural gas power generation",
    description:"Electricity from burning natural gas in turbines. Emits roughly half the CO\u2082 per kWh of coal (~490 g CO\u2082e/kWh for CCGT) and generates ~23% of global electricity, accounting for ~23% of power sector CO\u2082e. Upstream methane leakage from gas supply can significantly worsen the lifecycle GHG footprint beyond these operational figures.",
    activities:"Combined-cycle gas turbines (CCGT, ~55\u201360% efficiency) \u2022 Open-cycle gas turbines (OCGT, fast-start peakers) \u2022 Gas CHP plants \u2022 Gas-fired district heating boilers \u2022 LNG-fueled plants",
    gases:"CO\u2082 (~490 g/kWh for CCGT) \u2022 CH\u2084 (upstream supply chain leakage) \u2022 N\u2082O (minor)",
    gtco2e:3.60, pct:22.78, pctContext:"of Power & Heat",
    notes:"EDGAR v9 (2022) gas power CO\u2082 ~3.5 GtCO\u2082 + ~1%/yr to 2024; IEA Electricity 2023. Direct emission basis. Lifecycle emissions vary substantially with upstream CH\u2084 leak rate (0.5\u20133%+)." },

  { id:13, label:"Oil & other thermal", depth:2,
    fullName:"Oil & other thermal generation (terminal)",
    description:"Electricity from burning fuel oil, diesel, peat, and other fossil liquids. Prevalent in island nations and remote communities; declining globally. Terminal node \u2014 emissions absorbed at generation. Emission intensity (~650\u2013900 g CO\u2082/kWh) is between coal and gas.",
    activities:"Heavy fuel oil (HFO) power plants \u2022 Diesel generators (islands, remote) \u2022 Oil-fired peaking plants \u2022 Peat-burning power stations \u2022 Captive industrial power (residual oil)",
    gases:"CO\u2082 dominant (~650\u2013900 g CO\u2082/kWh) \u2022 Minor CH\u2084 & N\u2082O",
    gtco2e:0.75, pct:4.75, pctContext:"of Power & Heat",
    notes:"EDGAR v9 + IEA Electricity 2023. Direct emission basis. Oil & other share declining (~2\u20133% of generation). Terminal node: no outflow to L4 electricity end-uses." },

  { id:14, label:"District heat", depth:2,
    fullName:"District heating networks (terminal)",
    description:"Centralized production and distribution of thermal energy to multiple buildings via insulated pipe networks. Terminal node in this model. Emission intensity varies enormously by heat source (near-zero for geothermal/waste heat to very high for coal boilers). Russia, China, and Eastern Europe dominate global district heat volumes.",
    activities:"Coal & gas boilers (dominant in Russia, China, Eastern Europe) \u2022 Gas-fired CHP waste heat \u2022 Industrial waste heat \u2022 Geothermal (Iceland) \u2022 Large-scale heat pumps \u2022 Biomass boilers",
    gases:"CO\u2082 (fossil combustion, dominant) \u2022 CH\u2084 & N\u2082O (minor) \u2022 Net emissions depend entirely on heat source fuel mix",
    gtco2e:1.50, pct:9.49, pctContext:"of Power & Heat",
    notes:"IEA District Heat Tracking 2023; EDGAR v9. Terminal node: no outflow to L4 electricity end-uses. Emission factor varies widely by country." },

  { id:15, label:"Non-fossil electricity", depth:2,
    fullName:"Non-fossil electricity (renewables + nuclear)",
    description:"Electricity from wind, solar PV, hydropower, nuclear, and geothermal. Near-zero direct operational emissions. Non-fossil sources now provide ~36\u201340% of global electricity (2024) yet contribute less than 1% of power sector GHG emissions. The small residual shown here reflects direct CH\u2084 from hydropower reservoir decomposition and CO\u2082 from geothermal venting \u2014 not manufacturing or construction emissions.",
    activities:"Onshore & offshore wind \u2022 Utility-scale & rooftop solar PV \u2022 Large hydropower & run-of-river hydro \u2022 Nuclear fission (PWR, BWR, CANDU) \u2022 Geothermal steam turbines \u2022 Concentrated solar power (CSP)",
    gases:"Direct operational: \u223c0\u201315 g CO\u2082e/kWh \u2022 Hydro reservoir CH\u2084 (tropical/subtropical, variable) \u2022 Geothermal CO\u2082 venting \u2022 Lifecycle: \u223c4\u201350 g CO\u2082e/kWh (manufacturing, construction \u2014 not counted here)",
    gtco2e:0.15, pct:0.95, pctContext:"of Power & Heat",
    notes:"IPCC AR6 WG3 Annex II; IEA Renewables 2023; Deemer et al. 2016 (hydro reservoir CH\u2084). Direct operational emissions only: dominated by tropical hydropower reservoir methane (~0.1 GtCO\u2082e) and geothermal CO\u2082 (~0.05 GtCO\u2082e). Manufacturing/construction lifecycle emissions excluded per IPCC inventory guidelines." },

  // ── L4: END-USES (depth 3) ─────────────────────────────────────────────────

  { id:16, label:"Road", depth:3,
    fullName:"Road transport",
    description:"Direct combustion emissions from all on-road vehicles. The dominant transport end-use (~72% of sector). Passenger light-duty vehicles ~55% of road CO\u2082; heavy-duty trucks ~32%; other road vehicles ~13%. Recovering strongly from COVID lows; EV penetration is still modest at global level (<5% of fleet).",
    activities:"Passenger cars & SUVs (gasoline & diesel) \u2022 Heavy-duty freight trucks & semi-trailers \u2022 Buses & coaches \u2022 Two- & three-wheelers \u2022 Delivery vans & last-mile logistics vehicles",
    gases:"CO\u2082 dominant \u2022 Minor CH\u2084 & N\u2082O (catalytic converter reactions, incomplete combustion)",
    gtco2e:6.48, pct:12.04, pctContext:"of all end-uses",
    notes:"EDGAR v9 (2022) + ~2%/yr post-COVID trend to 2024. IEA Global EV Outlook 2023; IPCC AR6 WG3 Ch.10. EVs excluded (counted under electrified transport, id:43)." },

  { id:17, label:"Aviation", depth:3,
    fullName:"Aviation",
    description:"CO\u2082 from jet fuel combustion in commercial, cargo, and business aircraft. Recovered to ~85\u201390% of 2019 levels by 2023, projected at or above pre-pandemic levels by 2024. Non-CO\u2082 effects (contrail cirrus, NOx) are estimated to roughly double effective climate forcing but are excluded from GtCO\u2082e inventories.",
    activities:"Commercial narrow-body jets (B737, A320 \u2014 domestic & short-haul) \u2022 Wide-body jets (B777, A350 \u2014 long-haul) \u2022 Air freight freighters \u2022 Business & charter aviation \u2022 Regional turboprops",
    gases:"CO\u2082 (Jet-A kerosene combustion) \u2022 Non-CO\u2082 effects (contrail cirrus, NOx) ~2\u00d7 total climate impact but not counted in GtCO\u2082e (Lee et al. 2021)",
    gtco2e:1.08, pct:2.01, pctContext:"of all end-uses",
    notes:"ICAO 2023; EDGAR v9 + post-COVID recovery extrapolation. Lee et al. 2021 (Atmospheric Environment). International/domestic allocation follows EDGAR convention." },

  { id:18, label:"Shipping", depth:3,
    fullName:"Shipping (maritime transport)",
    description:"CO\u2082 and black carbon from burning heavy fuel oil and marine gas oil in the global merchant fleet. IMO 4th GHG Study 2020 baseline; 2024 estimate reflects continued growth in seaborne trade. IMO has adopted a net-zero target by or around 2050.",
    activities:"Container ships (largest fleet by CO\u2082) \u2022 Bulk carriers (coal, grain, ore) \u2022 Oil & product tankers \u2022 LNG carriers (some dual-fuel CH\u2084 slip) \u2022 Cruise ships \u2022 Roll-on/roll-off ferries",
    gases:"CO\u2082 dominant (HFO & MGO combustion) \u2022 CH\u2084 (LNG methane slip) \u2022 Black carbon (short-lived climate forcer near Arctic routes)",
    gtco2e:0.99, pct:1.84, pctContext:"of all end-uses",
    notes:"IMO 4th GHG Study (2020 = 0.93 GtCO\u2082e) + ~3%/yr trade growth extrapolation. EDGAR v9; IEA. Black carbon not included in GtCO\u2082e total." },

  { id:19, label:"Rail & other", depth:3,
    fullName:"Rail & other transport (direct combustion)",
    description:"Emissions from diesel-powered freight and passenger rail, inland waterways, and other transport modes. Electrified rail has near-zero direct emissions \u2014 routed through the electricity path. Diesel dominates developing-world freight rail; high-speed rail in Europe/Asia mostly electrified.",
    activities:"Diesel locomotive freight trains \u2022 Diesel multiple-unit (DMU) passenger trains \u2022 Inland waterway barges & river freight \u2022 Other non-road modes",
    gases:"CO\u2082 (diesel combustion, dominant) \u2022 Minor CH\u2084 & N\u2082O \u2022 Electric rail counted under Transport: electrified end-use (id:43)",
    gtco2e:0.45, pct:0.84, pctContext:"of all end-uses",
    notes:"EDGAR v9 + ~1%/yr to 2024. IEA Transport Tracking 2023; UIC. Electrified rail emissions excluded (attributed through Power & Heat path)." },

  { id:20, label:"Iron & steel", depth:3,
    fullName:"Iron & steel production",
    description:"One of the hardest sectors to decarbonize. The dominant blast furnace/basic oxygen furnace (BF-BOF) route uses coking coal as both fuel and chemical reductant. ~70% of global steel is still BF-BOF. Global crude steel production ~1.9 Gt/yr. IEA estimates direct emissions at ~2.6\u20132.8 GtCO\u2082 for 2023.",
    activities:"Blast furnace + basic oxygen furnace (BF-BOF) \u2022 Electric arc furnace (EAF, lower emissions) \u2022 Direct reduced iron (DRI) \u2022 Coke ovens & sintering plants \u2022 Rolling mills & finishing",
    gases:"CO\u2082 dominant (process reductant + energy combustion) \u2022 Minor CH\u2084 & N\u2082O \u2022 BF-BOF: ~1.8\u20132.0 t CO\u2082/t steel; EAF: ~0.4\u20130.6 t CO\u2082/t steel",
    gtco2e:2.70, pct:5.02, pctContext:"of all end-uses",
    notes:"IEA Iron & Steel Tracking 2023; World Steel Association; EDGAR v9. 2022 actuals ~2.6 GtCO\u2082e + ~2%/yr to 2024. Prior underestimate excluded process emissions from coke ovens." },

  { id:21, label:"Chemicals", depth:3,
    fullName:"Chemicals & petrochemicals",
    description:"High energy-intensity sector covering bulk chemicals, fertilizers, and polymers. Process emissions (nitric acid N\u2082O, adipic acid N\u2082O) add to combustion emissions. Steam cracking for ethylene and Haber-Bosch for ammonia are the most energy-intensive processes.",
    activities:"Steam cracking (ethylene/propylene) \u2022 Haber-Bosch ammonia synthesis \u2022 Nitric acid (N\u2082O process) \u2022 Adipic acid for nylon (N\u2082O) \u2022 Methanol synthesis \u2022 Chlor-alkali electrolysis",
    gases:"CO\u2082 (combustion & feedstock, dominant) \u2022 N\u2082O (nitric/adipic acid processes) \u2022 CH\u2084 (fugitive, minor) \u2022 HFCs/PFCs in some sub-processes",
    gtco2e:2.30, pct:4.28, pctContext:"of all end-uses",
    notes:"IEA Chemicals Tracking 2023; EDGAR v9 + ~1.5%/yr to 2024; ICCA. Includes feedstock CO\u2082 that is later released when products (plastics, fuels) are used or incinerated." },

  { id:22, label:"Cement", depth:3,
    fullName:"Cement production",
    description:"~60% of emissions are from the unavoidable calcination reaction (CaCO\u2083 \u2192 CaO + CO\u2082), independent of fuel used. Remaining ~40% from fossil fuels for kiln temperatures of ~1,450\u00b0C. China produces ~55% of global cement (~2.5 Gt/yr). IEA and GCCA put global cement CO\u2082 at ~2.8\u20133.0 GtCO\u2082 annually.",
    activities:"Limestone calcination in rotary kilns (process CO\u2082, unavoidable without CCS) \u2022 Coal & petroleum coke combustion in kilns \u2022 Clinker cooling & grinding \u2022 Blended cements (fly ash/slag substitution reduces emissions)",
    gases:"CO\u2082 dominant: ~60% process calcination + ~40% fuel combustion \u2022 ~0.6\u20130.9 t CO\u2082 per t cement \u2022 Virtually no CH\u2084 or N\u2082O",
    gtco2e:2.80, pct:5.20, pctContext:"of all end-uses",
    notes:"IEA Cement Tracking 2023; GCCA; EDGAR v9. 2022 actuals ~2.8 GtCO\u2082e. Prior version significantly underestimated by excluding process calcination emissions." },

  { id:23, label:"Other manufacturing", depth:3,
    fullName:"Other manufacturing",
    description:"Catch-all for industrial energy and process emissions outside iron/steel, chemicals, and cement. Covers glass, ceramics, paper, food, non-ferrous metals, textiles, and more. Reduced from prior estimate to reflect reclassification of some sub-sectors.",
    activities:"Glass & ceramics (high-temp kilns) \u2022 Pulp & paper (steam, chemical recovery) \u2022 Food & beverage processing \u2022 Aluminum smelting (PFC process emissions counted in F-gases) \u2022 Non-ferrous metals \u2022 Rubber & plastics \u2022 Textile mills",
    gases:"CO\u2082 (combustion, dominant) \u2022 PFCs (aluminum electrolysis \u2014 counted in F-gases node) \u2022 N\u2082O (minor) \u2022 CH\u2084 (minor)",
    gtco2e:1.20, pct:2.23, pctContext:"of all end-uses",
    notes:"EDGAR v9 (2022) residual after reclassifying major sub-sectors; IEA Industry Tracking 2023. Smaller than prior estimate due to more granular sub-sector attribution." },

  { id:24, label:"Industrial F-gases", depth:3,
    fullName:"Industrial F-gases",
    description:"High-GWP fluorinated gases leaked or emitted during manufacturing processes and industrial equipment operation. Regulated under the Kigali Amendment (HFC phase-down under way in developed nations; developing nations following). SF\u2086 in electrical switchgear remains a concern as grid expansion continues.",
    activities:"HFC refrigerant leaks (industrial refrigeration & supermarket cold chains) \u2022 SF\u2086 in high-voltage switchgear & circuit breakers \u2022 PFCs from aluminum electrolytic smelting \u2022 NF\u2083 & HFCs in semiconductor fabs",
    gases:"HFCs: GWP\u2081\u2080\u2080 12\u201314,800 \u2022 SF\u2086: GWP\u2081\u2080\u2080 25,200 \u2022 PFCs: GWP\u2081\u2080\u2080 6,630\u201317,340 \u2022 NF\u2083: GWP\u2081\u2080\u2080 17,400 (IPCC AR6)",
    gtco2e:2.00, pct:3.72, pctContext:"of all end-uses",
    notes:"EDGAR v9; UNEP TEAP; Velders et al. 2022; Kigali Amendment. Growth moderated by HFC phase-down in Annex-I countries. SF\u2086 from grid expansion partially offsets HFC reductions." },

  { id:25, label:"Residential (direct)", depth:3,
    fullName:"Residential buildings \u2014 direct combustion",
    description:"Direct fossil fuel combustion in homes for space heating, water heating, and cooking. Excludes electricity (routed through Power & Heat \u2192 L3 generation \u2192 Buildings electricity end-uses). Heat pump adoption growing but still a small fraction globally.",
    activities:"Natural gas central heating furnaces & boilers \u2022 Oil-fired boilers \u2022 Propane/LPG cooktops & ovens \u2022 Gas water heaters \u2022 Wood & pellet stoves \u2022 Kerosene heaters (developing regions)",
    gases:"CO\u2082 dominant \u2022 Minor CH\u2084 (unburned gas, leaks) \u2022 Minor N\u2082O",
    gtco2e:2.90, pct:5.39, pctContext:"of all end-uses",
    notes:"EDGAR v9 (2022) ~2.85 GtCO\u2082e + ~0.5%/yr to 2024. IEA Buildings Tracking 2023; IPCC AR6 WG3 Ch.9. Excludes electricity." },

  { id:26, label:"Commercial (direct)", depth:3,
    fullName:"Commercial & institutional buildings \u2014 direct combustion",
    description:"Direct fossil fuel combustion in offices, retail, hotels, hospitals, and schools. Excludes electricity. Somewhat smaller than residential direct, reflecting greater electrification in commercial building new construction.",
    activities:"Natural gas & oil space heating systems \u2022 Gas-fired commercial kitchen equipment \u2022 Hospital sterilisation & laundry boilers \u2022 Hotel hot-water systems \u2022 Backup diesel generators",
    gases:"CO\u2082 dominant \u2022 Minor CH\u2084 & N\u2082O",
    gtco2e:1.10, pct:2.04, pctContext:"of all end-uses",
    notes:"EDGAR v9 (2022) + ~0.5%/yr to 2024. IEA Buildings Tracking 2023; IPCC AR6 WG3 Ch.9. Excludes electricity." },

  { id:27, label:"Oil & gas operations", depth:3,
    fullName:"Oil & gas operations \u2014 upstream",
    description:"Fugitive CH\u2084 and intentional venting/flaring across the entire oil & gas value chain. Satellite-based monitoring (TROPOMI, GHGSat) has revealed actual emissions are substantially higher than industry self-reporting in many regions.",
    activities:"Wellhead & equipment leaks \u2022 Pneumatic controllers & chemical pumps \u2022 Compressor seal leaks \u2022 Gas processing plant venting \u2022 Pipeline transmission leaks \u2022 Gas distribution network leaks \u2022 Associated gas flaring",
    gases:"CH\u2084 dominant (leaks & venting, ~60%) \u2022 CO\u2082 (flaring & on-site combustion, ~40%) \u2022 Net GHG highly sensitive to leak rate (0.5\u20133%+ of throughput)",
    gtco2e:2.90, pct:5.39, pctContext:"of all end-uses",
    notes:"IEA Methane Tracker 2023; EDGAR v9 + ~1%/yr to 2024; Alvarez et al. 2018 (Science); EDF. Satellite-based estimates suggest actual CH\u2084 emissions may be 50\u2013100% higher than self-reported." },

  { id:28, label:"Coal mining", depth:3,
    fullName:"Coal mining \u2014 methane",
    description:"CH\u2084 (coal mine methane, CMM) naturally trapped in coal seams, released during underground and surface mining. Ventilation air methane (VAM) is the largest component at low concentrations, making capture challenging. Global coal production remains near record highs.",
    activities:"Underground mine ventilation air (VAM) \u2022 Degasification boreholes (sometimes captured for power) \u2022 Surface/open-cut mine outgassing \u2022 Abandoned mine drainage \u2022 Post-mining coal handling",
    gases:"CH\u2084 dominant \u2022 Minor CO\u2082 (on-site mining equipment) \u2022 Emission factor varies by coal rank (bituminous > lignite)",
    gtco2e:1.30, pct:2.42, pctContext:"of all end-uses",
    notes:"EDGAR v9 + ~0.5%/yr to 2024; IEA Coal Mine Methane 2023; EPA CMM. Roughly stable trend as production growth offset by improved capture in some regions." },

  { id:29, label:"Refining", depth:3,
    fullName:"Petroleum refining",
    description:"CO\u2082 and CH\u2084 from energy use and process operations at crude oil refineries. On-site hydrogen production (steam methane reforming) is particularly CO\u2082-intensive. Global refinery throughput remains high despite energy transition pressures.",
    activities:"Fired heaters & furnaces (process heat) \u2022 Steam methane reforming for on-site H\u2082 (CO\u2082-intensive) \u2022 Fluid catalytic cracking (FCC) regeneration \u2022 Coking units \u2022 Flaring of process gases \u2022 Fugitive equipment leaks",
    gases:"CO\u2082 dominant (combustion & SMR process) \u2022 CH\u2084 (fugitive leaks, flaring) \u2022 Minor N\u2082O",
    gtco2e:0.90, pct:1.67, pctContext:"of all end-uses",
    notes:"EDGAR v9 (2022) ~0.87 GtCO\u2082e + ~1%/yr to 2024; IEA Oil Refining; EPA GHGRP." },

  { id:30, label:"Other energy supply", depth:3,
    fullName:"Other energy supply",
    description:"Miscellaneous upstream energy supply emissions outside oil & gas, coal mining, and refining. Covers bioenergy supply chains, charcoal production, and other fuel transformation activities.",
    activities:"Charcoal production & wood fuel supply chains \u2022 Biomass pellet processing \u2022 Peat extraction & processing \u2022 Biofuel crop processing \u2022 Non-specified fuel transformation losses",
    gases:"CO\u2082 (combustion, dominant) \u2022 CH\u2084 (biomass decomposition, incomplete combustion) \u2022 Minor N\u2082O",
    gtco2e:0.40, pct:0.74, pctContext:"of all end-uses",
    notes:"EDGAR v9 + ~1%/yr to 2024; IPCC 2019 Guidelines; IEA. Category boundaries vary by dataset." },

  { id:31, label:"Enteric fermentation", depth:3,
    fullName:"Enteric fermentation",
    description:"Microbial fermentation of feed in the digestive systems of ruminant livestock produces CH\u2084 expelled by belching. The single largest agricultural GHG source. Beef cattle account for ~65% of enteric methane. AR6 GWP100 revision (29.8 vs 28) raises CO\u2082e values by ~6%.",
    activities:"Beef cattle (~65% of enteric CH\u2084) \u2022 Dairy cattle \u2022 Buffalo \u2022 Sheep & goats \u2022 Camels & other ruminants",
    gases:"CH\u2084 (100%) \u2022 GWP\u2081\u2080\u2080 \u2248 29.8 \u2022 ~14.5% of all agricultural GHG emissions",
    gtco2e:3.26, pct:6.06, pctContext:"of all end-uses",
    notes:"FAO GLEAM 3.0 (2022); IPCC 2019 Refinement Vol.4 Ch.10; Saunois et al. 2020. Livestock population growth ~0.5%/yr; AR6 GWP applied." },

  { id:32, label:"Manure management", depth:3,
    fullName:"Manure management",
    description:"CH\u2084 and N\u2082O from storage, handling, and treatment of animal manure. Liquid slurry lagoons (high CH\u2084) are the highest-emitting management system. Manure is also a significant N\u2082O source from nitrogen transformations.",
    activities:"Liquid slurry lagoons (highest CH\u2084) \u2022 Anaerobic digesters without gas capture \u2022 Solid manure piles \u2022 Poultry litter \u2022 Daily spreading on pastures \u2022 Animal housing wash-down wastewater",
    gases:"CH\u2084 (anaerobic storage, dominant) \u2022 N\u2082O (nitrogen transformations during storage & application)",
    gtco2e:1.14, pct:2.12, pctContext:"of all end-uses",
    notes:"IPCC 2019 Refinement Vol.4 Ch.10; FAO GLEAM 3.0; EPA Inventory. AR6 GWP100 applied." },

  { id:33, label:"Rice cultivation", depth:3,
    fullName:"Rice cultivation",
    description:"CH\u2084 from methanogenic bacteria decomposing organic matter in anaerobic flooded paddy fields. Asia accounts for ~90% of global paddy methane. Intermittent flooding can reduce emissions 30\u201370% at modest yield penalty. Global rice area has grown slightly with population.",
    activities:"Continuously flooded lowland paddies (highest emissions) \u2022 Intermittently flooded systems \u2022 Organic amendments (straw incorporation raises emissions) \u2022 Rainfed upland rice (low CH\u2084) \u2022 Deep-water rice",
    gases:"CH\u2084 dominant (anaerobic fermentation) \u2022 Minor N\u2082O (from nitrogen fertilizers applied to paddies)",
    gtco2e:0.88, pct:1.64, pctContext:"of all end-uses",
    notes:"IPCC 2019 Refinement Vol.4 Ch.5; Saunois et al. 2020 Global Methane Budget; FAO 2023. AR6 GWP100 applied." },

  { id:34, label:"Agricultural soils", depth:3,
    fullName:"Agricultural soils",
    description:"N\u2082O from microbial nitrification and denitrification triggered by synthetic fertilizers, manure, and crop residues on agricultural soils. The largest single N\u2082O source globally. AR6 GWP100 revision (273 vs. 265) raises CO\u2082e accounting by ~3%.",
    activities:"Synthetic N fertilizer (urea, ammonium nitrate, DAP) \u2022 Animal manure & compost on cropland \u2022 Crop residue incorporation \u2022 Biological N fixation by legumes \u2022 Irrigation-induced denitrification",
    gases:"N\u2082O dominant (GWP\u2081\u2080\u2080 \u2248 273) \u2022 IPCC Tier 1: ~1% of applied N \u2192 N\u2082O-N \u2022 Minor CO\u2082 (liming, urea hydrolysis)",
    gtco2e:3.08, pct:5.72, pctContext:"of all end-uses",
    notes:"EDGAR v9 (2022); Tian et al. 2020 Global N\u2082O Budget; IPCC 2019 Refinement Vol.4 Ch.11. + ~0.5%/yr from growing fertilizer use to 2024. AR6 GWP100=273 applied." },

  { id:35, label:"Other agriculture", depth:3,
    fullName:"Other agriculture",
    description:"Residual agricultural sources not in enteric fermentation, manure, rice, or soils. Includes savannah & field burning, liming of acidic soils, and urea fertilizer hydrolysis.",
    activities:"Prescribed burning of savannahs & grasslands \u2022 Field burning of crop residues (straw, sugarcane) \u2022 Agricultural liming (CO\u2082 from CaCO\u2083/CaMg(CO\u2083)\u2082 dissolution) \u2022 Urea hydrolysis (CO\u2082 release)",
    gases:"CH\u2084 & N\u2082O (biomass burning) \u2022 CO\u2082 (liming, urea hydrolysis) \u2022 All three gases present",
    gtco2e:0.44, pct:0.82, pctContext:"of all end-uses",
    notes:"IPCC 2019 Refinement Vol.4; EDGAR v9; FAO 2023. Residual category after major source attribution." },

  { id:36, label:"Landfills", depth:3,
    fullName:"Landfills",
    description:"CH\u2084 from anaerobic microbial decomposition of organic matter (food waste, paper, wood) in municipal solid waste landfills. Landfill gas (LFG) is ~50% CH\u2084 and ~50% biogenic CO\u2082. Landfill gas capture for energy is economically viable but far from universal. EDGAR v9 significantly revises this upward from AR5-era estimates.",
    activities:"Municipal solid waste (MSW) landfills \u2022 Industrial solid waste sites \u2022 Controlled dumps (developing regions) \u2022 Open dumps. CH\u2084 generation depends on organic waste fraction, moisture, compaction, and landfill age.",
    gases:"CH\u2084 dominant (~50% of landfill gas by volume) \u2022 Biogenic CO\u2082 (~50% of LFG, not counted per IPCC) \u2022 Trace H\u2082S & NMOCs",
    gtco2e:1.25, pct:2.32, pctContext:"of all end-uses",
    notes:"EDGAR v9 (2022) ~1.2 GtCO\u2082e + ~1%/yr to 2024. IPCC 2019 Refinement Vol.5 Ch.3; EPA Landfill Methane Outreach Program. AR6 GWP100 revision significantly raised this vs. prior estimates." },

  { id:37, label:"Wastewater", depth:3,
    fullName:"Wastewater treatment",
    description:"CH\u2084 from anaerobic decomposition in wastewater and sludge, and N\u2082O from nitrification/denitrification. Particularly significant in lower-income regions with open sewers and septic systems. EDGAR v9 substantially revises upward from earlier estimates.",
    activities:"Centralized aerobic treatment plants (CH\u2084 from sludge digestion) \u2022 Anaerobic lagoons & ponds \u2022 Septic systems \u2022 Open sewer channels \u2022 Industrial wastewater lagoons (food, paper, breweries)",
    gases:"CH\u2084 (anaerobic decomposition) \u2022 N\u2082O (nitrification/denitrification in aerobic treatment) \u2022 Both gases significant",
    gtco2e:0.55, pct:1.02, pctContext:"of all end-uses",
    notes:"EDGAR v9 (2022) ~0.53 GtCO\u2082e + ~1.5%/yr urbanization trend to 2024. IPCC 2019 Refinement Vol.5 Ch.6; World Bank Water & Sanitation. AR6 GWP upward revision important here." },

  { id:38, label:"Other waste", depth:3,
    fullName:"Other waste treatment",
    description:"Residual waste emissions from incineration, composting, and other treatment methods not in landfills or wastewater. Incineration CO\u2082 from fossil-derived plastics is the main contributor.",
    activities:"Waste-to-energy (WtE) incineration (CO\u2082 from fossil-derived plastics & synthetics) \u2022 Open burning of MSW & agricultural waste \u2022 Composting (CH\u2084 & N\u2082O) \u2022 Clinical & hazardous waste incineration",
    gases:"CO\u2082 (incineration of fossil-derived materials \u2014 plastics counted as non-biogenic) \u2022 CH\u2084 & N\u2082O (biological treatment, open burning)",
    gtco2e:0.10, pct:0.19, pctContext:"of all end-uses",
    notes:"EDGAR v9; IPCC 2019 Refinement Vol.5 Ch.5 + ~1%/yr to 2024. Residual after landfill and wastewater attribution." },

  { id:39, label:"Buildings: heating & cooling", depth:3,
    fullName:"Buildings: heating & cooling (electricity)",
    description:"Electricity consumed by HVAC systems in residential and commercial buildings. Fastest-growing electricity end-use globally as AC adoption surges in tropical regions and heat pumps replace gas boilers. The allocated CO\u2082e reflects the global average emission intensity of the electricity grid used.",
    activities:"Heat pumps (air-source & ground-source) \u2022 Central AC & split-system air conditioners \u2022 Chilled water systems (large buildings) \u2022 Variable refrigerant flow (VRF) systems \u2022 Electric resistance heating \u2022 Ventilation fans & AHUs",
    gases:"Electricity end-use \u2022 Heat pump COP = 2\u20135\u00d7 vs. resistance heating \u2022 IEA: cooling is fastest-growing electricity end-use globally \u2022 Demand growing with warming climate",
    gtco2e:3.52, pct:6.55, pctContext:"of all end-uses",
    notes:"IEA Buildings Tracking 2023; IPCC AR6 WG3 Ch.9. Attributed from L3 generation nodes by end-use consumption share (~26% of grid electricity). Dominated by coal- and gas-fired electricity; non-fossil contribution is ~1% of this total." },

  { id:40, label:"Buildings: lighting & appliances", depth:3,
    fullName:"Buildings: lighting & appliances",
    description:"Electricity for artificial lighting, plug-in appliances, and consumer electronics. LED adoption has cut lighting intensity ~75%; rising appliance ownership in developing countries offsets efficiency gains globally. Includes residential and commercial segments.",
    activities:"LED & fluorescent lighting \u2022 Refrigerators & freezers \u2022 Washing machines & dryers \u2022 TVs & home entertainment \u2022 Computers & office equipment \u2022 Elevators & escalators \u2022 Miscellaneous plug loads & standby power",
    gases:"Electricity end-use \u2022 LED saves ~75% vs. incandescent \u2022 Appliance efficiency standards (Energy Star, EU Ecodesign) are key lever \u2022 Standby power ~1% of OECD household electricity",
    gtco2e:2.30, pct:4.28, pctContext:"of all end-uses",
    notes:"IEA Buildings Tracking 2023; Lawrence Berkeley National Laboratory. Attributed from L3 generation nodes (~17% of grid electricity). CO\u2082e will decline as grid decarbonizes; non-fossil contribution is ~1% of this total." },

  { id:41, label:"Industry: mfg & process electricity", depth:3,
    fullName:"Industry: manufacturing & process electricity",
    description:"Electricity consumed by industrial motors, drives, pumps, compressors, electrolytic processes, and manufacturing equipment. Single largest electricity end-use globally \u2014 electric motors alone ~45% of all electricity consumption.",
    activities:"Industrial electric motors & variable-speed drives (largest share) \u2022 Industrial pumps & fans \u2022 Air compressors \u2022 Electric arc furnaces (steel) \u2022 Aluminum electrolytic cells (Hall-H\u00e9roult) \u2022 Chlor-alkali electrolysis \u2022 Machine tools & CNC equipment",
    gases:"Electricity end-use \u2022 Motors: ~45% of global electricity (IEA) \u2022 Variable-speed drives reduce motor energy 20\u201350% \u2022 Industrial electrification growing",
    gtco2e:4.34, pct:8.07, pctContext:"of all end-uses",
    notes:"IEA Industry Tracking 2023; IPCC AR6 WG3 Ch.11; IEA Motor Systems Report. Attributed from L3 generation nodes (~32% of grid electricity). Largest single electricity end-use category. Non-fossil contribution is ~1% of this total." },

  { id:42, label:"Data centers & ICT", depth:3,
    fullName:"Data centers & ICT infrastructure",
    description:"Electricity for data centers (compute, storage, networking, cooling) and telecommunications networks. AI/ML workloads are rapidly increasing compute energy intensity. IEA projects data center demand may double or triple by 2030 from AI growth.",
    activities:"Server compute (CPUs, GPUs \u2014 especially AI accelerators) \u2022 Storage arrays \u2022 Network switches & routers \u2022 UPS systems \u2022 Precision cooling (CRAH, chillers, liquid cooling) \u2022 Mobile telecom towers & base stations",
    gases:"Electricity end-use \u2022 PUE (Power Usage Effectiveness) = 1.1\u20132.0 for data centers \u2022 Global data centers ~240\u2013340 TWh (2022) \u2022 AI training & inference growing rapidly",
    gtco2e:0.81, pct:1.51, pctContext:"of all end-uses",
    notes:"IEA Data Centres & Networks 2023; Lawrence Berkeley National Laboratory; Masanet et al. 2020. Attributed from L3 generation nodes (~6% of grid electricity). Fastest-growing end-use; significant uncertainty." },

  { id:43, label:"Transport: electrified (rail/EVs)", depth:3,
    fullName:"Transport: electrified \u2014 rail & EVs",
    description:"Electricity consumed by electric rail traction and battery EV charging. Rapidly growing as EV adoption accelerates globally (~18 million new EVs in 2023). Net emissions depend entirely on the grid electricity mix at point of charging.",
    activities:"Metro & subway systems \u2022 Light rail & trams \u2022 High-speed rail (TGV, Shinkansen, ICE) \u2022 Mainline electric freight & passenger rail \u2022 Battery EVs (home Level 1/2 & public DC fast charging) \u2022 Electric buses",
    gases:"Electricity end-use \u2022 Grid-average BEV already lower lifecycle emissions than ICE in ~95% of countries (IEA 2023) \u2022 Rail: 3\u201310\u00d7 more efficient per passenger-km than private car",
    gtco2e:0.41, pct:0.76, pctContext:"of all end-uses",
    notes:"IEA Global EV Outlook 2023; IEA Rail. Allocated from generation nodes (~3% of grid electricity). Share growing rapidly; 2024 estimate accounts for ~18 million new EV sales in 2023." },

  { id:44, label:"Other electricity use", depth:3,
    fullName:"Other electricity use",
    description:"Residual electricity consumption not captured in the other five end-use categories \u2014 public infrastructure, water systems, healthcare, agriculture, and miscellaneous loads.",
    activities:"Municipal street & public lighting \u2022 Water intake, treatment & distribution pumping \u2022 Hospitals & healthcare \u2022 Schools & universities \u2022 Irrigation pumps & agricultural machinery \u2022 Desalination plants \u2022 Mining operations",
    gases:"Electricity end-use \u2022 Water & wastewater pumping: ~2\u20133% of national electricity in water-scarce countries \u2022 Agriculture electrification growing rapidly (India, Pakistan)",
    gtco2e:2.17, pct:4.04, pctContext:"of all end-uses",
    notes:"IEA Electricity 2023; World Bank. Residual after other five electricity end-use categories (~16% of grid electricity). Attributed from L3 generation nodes." }

];

// ── LINKS (57 total) ──────────────────────────────────────────────────────────
// source and target are integer indices into GHG_NODES.
//
// Data basis: EDGAR v9 (2022) extrapolated to 2024 using sector-specific
// compound annual growth rates. GWP100 from IPCC AR6.
// Total: 56.0 GtCO₂e. See README.md for full methodology.

window.GHG_LINKS = [
  // ── L1 → L2 (19 links) ──────────────────────────────────────────────────────
  // CO₂ (node 0) → sectors
  {source:0,  target:4,  value:15.48},  // CO₂ → Power & Heat
  {source:0,  target:5,  value:8.82},   // CO₂ → Transport
  {source:0,  target:6,  value:8.00},   // CO₂ → Industry (energy combustion + process)
  {source:0,  target:7,  value:3.90},   // CO₂ → Buildings
  {source:0,  target:8,  value:2.20},   // CO₂ → Fuel Supply (flaring + combustion)
  {source:0,  target:10, value:0.09},   // CO₂ → Waste (incineration)
  // CH₄ (node 1) → sectors
  {source:1,  target:4,  value:0.16},   // CH₄ → Power & Heat (combustion)
  {source:1,  target:5,  value:0.09},   // CH₄ → Transport (incomplete combustion)
  {source:1,  target:7,  value:0.08},   // CH₄ → Buildings (gas leaks)
  {source:1,  target:8,  value:3.30},   // CH₄ → Fuel Supply (fugitive leaks & venting)
  {source:1,  target:9,  value:6.42},   // CH₄ → Agriculture (enteric, manure, rice)
  {source:1,  target:10, value:1.71},   // CH₄ → Waste (landfills, wastewater)
  // N₂O (node 2) → sectors
  {source:2,  target:4,  value:0.16},   // N₂O → Power & Heat (combustion)
  {source:2,  target:5,  value:0.09},   // N₂O → Transport (catalytic reactions)
  {source:2,  target:6,  value:1.00},   // N₂O → Industry (nitric/adipic acid processes)
  {source:2,  target:7,  value:0.02},   // N₂O → Buildings (combustion, minor)
  {source:2,  target:9,  value:2.38},   // N₂O → Agriculture (soils, manure)
  {source:2,  target:10, value:0.10},   // N₂O → Waste (wastewater)
  // F-gases (node 3) → sectors
  {source:3,  target:6,  value:2.00},   // F-gases → Industry

  // ── L2 → L3 (5 links — Power & Heat only) ───────────────────────────────────
  // Split by direct emission intensity (g CO₂/kWh × TWh generated), 2024 est.
  // Coal high emission intensity makes it ~62% of power sector CO₂e despite
  // generating only ~30% of electricity. Non-fossil near-zero direct emissions.
  {source:4,  target:11, value:9.80},   // P&H → Coal power (~62% of P&H emissions)
  {source:4,  target:12, value:3.60},   // P&H → Gas power (~23% of P&H emissions)
  {source:4,  target:13, value:0.75},   // P&H → Oil & other thermal (~5%, terminal)
  {source:4,  target:14, value:1.50},   // P&H → District heat (~9%, terminal)
  {source:4,  target:15, value:0.15},   // P&H → Non-fossil electricity (~1%, hydro/geothermal only)

  // ── L2 → L4 direct (23 links) ───────────────────────────────────────────────
  // Transport sector → transport end-uses (direct combustion only)
  {source:5,  target:16, value:6.48},   // Transport → Road
  {source:5,  target:17, value:1.08},   // Transport → Aviation
  {source:5,  target:18, value:0.99},   // Transport → Shipping
  {source:5,  target:19, value:0.45},   // Transport → Rail & other (direct)
  // Industry sector → industrial end-uses
  {source:6,  target:20, value:2.70},   // Industry → Iron & steel
  {source:6,  target:21, value:2.30},   // Industry → Chemicals
  {source:6,  target:22, value:2.80},   // Industry → Cement
  {source:6,  target:23, value:1.20},   // Industry → Other manufacturing
  {source:6,  target:24, value:2.00},   // Industry → Industrial F-gases
  // Buildings sector → direct combustion end-uses
  {source:7,  target:25, value:2.90},   // Buildings → Residential (direct)
  {source:7,  target:26, value:1.10},   // Buildings → Commercial (direct)
  // Fuel Supply sector → upstream end-uses
  {source:8,  target:27, value:2.90},   // Fuel Supply → Oil & gas operations
  {source:8,  target:28, value:1.30},   // Fuel Supply → Coal mining
  {source:8,  target:29, value:0.90},   // Fuel Supply → Refining
  {source:8,  target:30, value:0.40},   // Fuel Supply → Other energy supply
  // Agriculture sector → agricultural end-uses
  {source:9,  target:31, value:3.26},   // Agriculture → Enteric fermentation
  {source:9,  target:32, value:1.14},   // Agriculture → Manure management
  {source:9,  target:33, value:0.88},   // Agriculture → Rice cultivation
  {source:9,  target:34, value:3.08},   // Agriculture → Agricultural soils
  {source:9,  target:35, value:0.44},   // Agriculture → Other agriculture
  // Waste sector → waste end-uses
  {source:10, target:36, value:1.25},   // Waste → Landfills
  {source:10, target:37, value:0.55},   // Waste → Wastewater
  {source:10, target:38, value:0.10},   // Waste → Other waste

  // ── L3 → L4 (18 links) ──────────────────────────────────────────────────────
  // Each electricity generation source distributes its attributed emissions to
  // 6 electricity end-uses proportionally to IEA 2023 end-use consumption shares:
  //   B:H&C=26%, B:L&A=17%, Industry=32%, Data centers=6%, EVs=3%, Other=16%
  // Coal and gas carry the vast majority; non-fossil carries only tiny residual.
  // Coal power → electricity end-uses
  {source:11, target:39, value:2.548}, // Coal → Buildings: heating & cooling
  {source:11, target:40, value:1.666}, // Coal → Buildings: lighting & appliances
  {source:11, target:41, value:3.136}, // Coal → Industry: mfg & process electricity
  {source:11, target:42, value:0.588}, // Coal → Data centers & ICT
  {source:11, target:43, value:0.294}, // Coal → Transport: electrified
  {source:11, target:44, value:1.568}, // Coal → Other electricity use
  // Gas power → electricity end-uses
  {source:12, target:39, value:0.936}, // Gas → Buildings: heating & cooling
  {source:12, target:40, value:0.612}, // Gas → Buildings: lighting & appliances
  {source:12, target:41, value:1.152}, // Gas → Industry: mfg & process electricity
  {source:12, target:42, value:0.216}, // Gas → Data centers & ICT
  {source:12, target:43, value:0.108}, // Gas → Transport: electrified
  {source:12, target:44, value:0.576}, // Gas → Other electricity use
  // Non-fossil electricity → electricity end-uses (near-zero direct emissions)
  {source:15, target:39, value:0.039}, // Non-fossil → Buildings: heating & cooling
  {source:15, target:40, value:0.026}, // Non-fossil → Buildings: lighting & appliances
  {source:15, target:41, value:0.048}, // Non-fossil → Industry: mfg & process electricity
  {source:15, target:42, value:0.009}, // Non-fossil → Data centers & ICT
  {source:15, target:43, value:0.004}, // Non-fossil → Transport: electrified
  {source:15, target:44, value:0.024}  // Non-fossil → Other electricity use
];
