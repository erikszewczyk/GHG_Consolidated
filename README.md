# Global GHG Emissions — Interactive Sankey Diagram

An interactive flow diagram visualizing approximately **56 GtCO₂e** of annual global greenhouse gas emissions (2024 estimate), broken down by gas type, emitting sector, electricity generation source, and end-use activity.

---

## How to Read the Chart

The chart uses a four-level **Sankey diagram** — a flow visualization where the width of each band is proportional to the quantity it represents (in GtCO₂e).

### The Four Levels (Left to Right)

| Level | What it shows | Example nodes |
|-------|--------------|---------------|
| **L1 — Gas types** | The greenhouse gases responsible, weighted by their 100-year global warming potential (GWP₁₀₀) | CO₂, CH₄, N₂O, F-gases |
| **L2 — Sectors** | The economic sector where emissions originate | Power & Heat, Transport, Industry, Agriculture |
| **L3 — Electricity generation** | How Power & Heat emissions are split by generation source (electricity routing only) | Coal power, Gas power, Non-fossil electricity |
| **L4 — End-uses** | The specific human activities that ultimately drive demand | Road transport, Cement, Enteric fermentation, Buildings: heating |

### How to Interact

- **Click any node** (colored bar) to open a detail card with a description, key activities, gases involved, and the data source.
- **Click any flow** (the bands connecting nodes) to see the GtCO₂e value of that specific connection.
- **Close** the detail card with the × button, or click elsewhere on the chart.
- The chart resizes automatically with your browser window.

### Reading the Numbers

- **L1 and L2 percentages** are shares of the total 56.0 GtCO₂e.
- **L3 percentages** are shares of the Power & Heat sector (15.8 GtCO₂e).
- **L4 percentages** are shares of the end-use total (53.8 GtCO₂e — total minus the two terminal L3 nodes that do not route to L4).

### The Electricity Routing (L3)

Power & Heat is the only sector that passes through L3. This level shows how the sector's total emissions are distributed across generation sources using an **emission-intensity model**: each source carries its actual direct GHG emissions (emission rate × electricity generated). This is why coal — despite generating only ~30% of global electricity — carries ~62% of the Power & Heat total, while non-fossil electricity (wind, solar, hydro, nuclear) carries less than 1% despite generating ~36% of electricity.

The L3 emissions then flow to L4 end-uses in proportion to how electricity is consumed across sectors (e.g., industry takes ~32% of grid electricity, so it receives ~32% of each generation source's attributed emissions).

**Oil & other thermal** and **District heat** are "terminal" nodes at L3: their emissions are absorbed there and do not flow to L4 end-uses (they serve localized or distributed uses not readily allocated to a specific end-use category).

---

## Project Intent

This visualization was built to help **frame global greenhouse gas emissions in a way that is accessible, directionally accurate, and useful for public understanding and policy discussion**.

Energy and climate data is often presented in ways that obscure the relative scale of different emission sources. The goal here is to answer intuitive questions like:

- *Which gases matter most?*
- *Is the power sector really the biggest problem?*
- *How do food systems compare to transportation?*
- *Where does my electricity end up going?*

The chart is **not a policy prescription**. It is an educational tool that reflects the best available data, clearly noted methodologies, and explicitly documented limitations. Numbers are rounded and extrapolated; they should be treated as directional estimates, not audit-grade figures.

---

## Data Sources

All values are **2024 estimates** derived from the most recent available inventory data, extrapolated forward where necessary. Primary sources:

| Source | Data vintage | Used for |
|--------|-------------|----------|
| **EDGAR v9** (EU Joint Research Centre) | 2022 | Primary sector and gas totals; waste, agriculture |
| **IEA World Energy Outlook 2023** | 2022–2023 | Power sector, industry, transport, buildings |
| **IEA Methane Tracker 2023** | 2022–2023 | Upstream oil & gas, coal mine methane |
| **FAO GLEAM 3.0** | 2022 | Livestock enteric fermentation, manure |
| **IMO 4th GHG Study** | 2018 (base) | Shipping; trend-adjusted to 2024 |
| **ICAO 2023 Environmental Report** | 2022–2023 | Aviation (post-COVID recovery) |
| **IPCC AR6 WG3 (2022)** | 2019 base | Sector frameworks, GWP₁₀₀ values |
| **Global N₂O Budget** (Tian et al. 2020) | 2019 | Agricultural soils, N₂O totals |
| **Global Methane Budget** (Saunois et al. 2020) | 2017 | CH₄ source attribution cross-check |

**GWP₁₀₀ values used (IPCC AR6):**

| Gas | GWP₁₀₀ (AR6) | vs. AR5 |
|-----|-------------|---------|
| CO₂ | 1 | unchanged |
| CH₄ | 29.8 | +6% (was 28) |
| N₂O | 273 | +3% (was 265) |
| HFCs | 12–14,800 | varies |
| SF₆ | 25,200 | +14% |

---

## Extrapolation Methodology

Where source data predates 2024, values were extrapolated using **sector-specific compound annual growth rates (CAGRs)** derived from recent trends. The 2022 EDGAR v9 dataset served as the primary baseline.

### Sector-Specific Growth Rates Applied

| Sector | CAGR to 2024 | Rationale |
|--------|-------------|-----------|
| Power & Heat | +1.0%/yr | Continued fossil demand despite renewable growth |
| Transport | +2.0%/yr | Strong post-COVID aviation and road recovery |
| Industry | +1.5%/yr | Driven by steel/cement demand in developing economies |
| Buildings (direct) | +0.5%/yr | Gradual electrification moderating growth |
| Fuel Supply | +1.0%/yr | Methane leakage grows with production volumes |
| Agriculture | +0.5%/yr | Slow growth from population and livestock expansion |
| Waste | +1.0%/yr | Urbanization-driven landfill and wastewater growth |

### Gas-Level Adjustments

- **CH₄**: AR6 GWP₁₀₀ = 29.8 applied (vs. 28 in AR5), raising CO₂e values by ~6% over AR5-based estimates. IEA Methane Tracker 2023 used to cross-check sectoral splits.
- **N₂O**: AR6 GWP₁₀₀ = 273 applied (vs. 265 in AR5). Tian et al. 2020 Global N₂O Budget used to validate agricultural soil estimates.
- **F-gases**: Growth moderated (~0.5%/yr) to reflect Kigali Amendment HFC phase-down effect in developed nations.

### Electricity End-Use Allocation (L3 → L4)

Power & Heat emissions are split across L3 generation sources using an **emission-intensity model**: each source carries its actual direct GHG emissions (emission rate in g CO₂e/kWh × electricity generated in TWh). This produces a GHG-accurate view where:
- Coal carries ~62% of power sector emissions despite generating only ~30% of electricity (emission rate ~820–1,050 g CO₂/kWh)
- Gas carries ~23% (emission rate ~490 g CO₂/kWh for CCGT)
- Non-fossil electricity carries ~1% — only the small direct operational emissions from hydropower reservoir decomposition and geothermal CO₂ venting; wind, solar, and nuclear have essentially zero direct operational emissions

L3 emission attribution (2024 estimates, emission-intensity basis):

| Source | % of Power & Heat GHG | Basis |
|--------|------------------------|-------|
| Coal | ~62% | ~9.8 GtCO₂e direct |
| Natural gas | ~23% | ~3.6 GtCO₂e direct |
| Oil & other thermal | ~5% (terminal) | ~0.75 GtCO₂e direct |
| District heat (fossil) | ~9% (terminal) | ~1.5 GtCO₂e direct |
| Non-fossil (wind, solar, hydro, nuclear) | ~1% | ~0.15 GtCO₂e (hydro/geothermal only) |

L3 electricity emissions are then distributed to L4 end-uses in proportion to IEA 2023 electricity consumption by sector:

| End-use | Share of grid electricity |
|---------|--------------------------|
| Buildings: heating & cooling | ~26% |
| Buildings: lighting & appliances | ~17% |
| Industry: manufacturing & process | ~32% |
| Data centers & ICT | ~6% |
| Transport: electrified (rail/EVs) | ~3% |
| Other | ~16% |

---

## Limitations

Readers should be aware of the following when interpreting this data:

### 1. Illustrative Estimates, Not Audit-Grade Figures
All values are **estimates with meaningful uncertainty**. Sector-level uncertainty is typically ±10–20%; individual sub-categories may carry ±30–50% uncertainty (especially fugitive methane from oil & gas, and agricultural soils). Treat values as directional and order-of-magnitude, not precise.

### 2. LULUCF Excluded
This analysis **excludes Land Use, Land-Use Change, and Forestry (LULUCF)**. Including LULUCF would add approximately 3–6 GtCO₂e of net emissions globally (the range varies enormously by methodology and year). LULUCF is excluded because it is highly variable, methodologically contested, and not included in the primary EDGAR dataset used here.

### 3. Electricity Attribution Is Methodology-Dependent
The L3 → L4 electricity allocation uses an **emission-intensity model**: each generation source carries its actual direct GHG emissions based on its emission rate and output. This makes coal dominant at L3 (~62% of power sector emissions) despite generating only ~30% of electricity. An alternative **consumption-share model** (allocating P&H emissions proportionally by electricity generated) would instead show non-fossil electricity as the largest L3 node, which — while useful for energy-flow visualization — misrepresents the GHG reality. The emission-intensity approach used here better serves the goal of showing where actual greenhouse gas emissions come from.

### 4. GWP Choice Sensitivity
Using AR5 GWP values (CH₄=28, N₂O=265) instead of AR6 values would reduce the total by approximately **1.5–2 GtCO₂e** and shift the sectoral balance toward more CO₂-dominated sectors. Many national inventories and international agreements still use AR4 or AR5 GWP values, so comparisons require care.

### 5. Year-to-Year Variability
Annual emissions fluctuate significantly with economic cycles, weather (hydro availability, heating degree days), and energy prices. The 2024 estimate is based on trend extrapolation and will differ from actual 2024 inventory data when published (typically 2–3 years later).

### 6. Boundary Conditions
- **International aviation and shipping** are allocated to national totals following EDGAR convention, not separated as "international bunkers."
- **Non-CO₂ aviation effects** (contrail cirrus, NOx) roughly double aviation's climate forcing but are excluded from GtCO₂e inventories and from this chart.
- **Biogenic CO₂** (e.g., from burning biomass) is not counted per IPCC guidelines and is excluded.
- **Industrial process electricity** is attributed to Power & Heat at the generation point, then routed through L3/L4; it does not appear as a direct emission from Industry.

### 7. Satellite Data Not Fully Integrated
Recent satellite-based methane measurements (TROPOMI, GHGSat, MethaneSAT) suggest that **actual methane emissions from oil & gas may be 50–100% higher** than self-reported inventory values in some regions. This analysis uses EDGAR v9 bottom-up inventories, which may understate real-world CH₄ from Fuel Supply.

---

## Files

| File | Description |
|------|-------------|
| `GHG_Consolidated.html` | Main chart — open this in a browser |
| `ghg_data.js` | All node and link data (45 nodes, 57 links) |
| `README.md` | This file |

**To use:** Open `GHG_Consolidated.html` in any modern browser. No server or installation required. An internet connection is needed to load the Apache ECharts library from CDN on first load.

---

*Data last updated: February 2026. Underlying estimates reference 2024. Contributions and corrections welcome.*
