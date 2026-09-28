# Aarogya-Grid (आरोग्य-ग्रिड)
### National Public Health Resource & Autonomous Supply Chain Platform

> **Live Command Center Prototype** built for high-stakes hackathon presentations, featuring real-time inter-PHC predictive resource balancing, cold-chain telemetry, and automated peer-to-peer redistribution.

---

## ⚡ Key Highlights & Features

### 1. National Command Center Header & Telemetry
- **MoHFW Operational Uplink**: Live satellite telemetry status, NavIC constellation lock, SHA-256 ledger consensus verification, and real-time IST mission clock.
- **Aggregated PHC Metrics**: Real-time cross-network counters for **Total Patients Monitored**, **Bed Occupancy Rate** (with ICU allocation), **Active Shortage Warnings**, **Cold Chain Integrity (99.8%)**, and **Active Transit Fleets**.
- **Live Inter-District Telemetry Stream**: Streaming feed simulating incoming updates from District 1 (Rampur), District 2 (Sitapur), District 3 (Ganga Valley), and the Central Medical Stores Depot (CMSD), with severity filters and pause/resume controls.

### 2. Multi-PHC Network Grid
High-contrast tactical cards for:
- **PHC A (District 1 - Rampur)**: Marked as `🔴 SEVERE DEFICIT` prior to transfer.
- **PHC B (District 2 - Sitapur)**: Marked as `🟡 ELEVATED WATCH`.
- **PHC C (District 3 - Ganga Valley)**: Marked as `🟢 SURPLUS BUFFER` (certified donor node).

Each card tracks the five required operational pillars:
1. **Medicine Stock**: Current inventory units, days of reserve remaining, and critical alert counter.
2. **Patient Footfall**: OPD and IPD metrics with real-time syndromic surge indicators (+18.4% uptick).
3. **Beds Available**: Total vs. available beds, ICU status, and dynamic occupancy meters.
4. **Staff Attendance**: On-duty percentage, MDs, and RNs present.
5. **Incoming Supply**: Shipment quantity, transit delay status (48h bottleneck on NH-24), and carrier details.

### 3. Interactive Predictive Medicine Module (The Core Demo Flow)
- **Essential Medicine Formulary Breakdown** for *ORS Sachets* (and *Enoxaparin Sodium*):
  - **Current Stock**: 1,240
  - **Daily Consumption**: 185
  - **Incoming Supply**: 500
  - **Predicted Demand**: 2,100
  - **Estimated Stockout**: 5 days (`🔴 HIGH RISK`)
- **7-Day Depletion & Burn-Down Trajectory Chart**: Interactive SVG graph illustrating the rapid depletion curve hitting zero on Day 5 vs. the safe post-reallocation buffer.
- **Explainable AI Insight Box**: Directly answers *"Will this PHC run out of this medicine soon?"* with a warning correlating unseasonal gastroenteritis spikes, groundwater contamination vectors, and transit bottlenecks.
- **Autonomous Redistribution Engine**: An interactive action button triggering the 4-stage inter-PHC dispatch modal:
  1. Algorithmic Routing Matrix Verification (donor buffer evaluation)
  2. Cold-Chain & Batch Cryptographic Lock (`#ORS-2026-X88`)
  3. Autonomous Electric Logistics Dispatch via green corridor NH-27
  4. Distributed Health Ledger Consensus settlement
- **Instant Status Transition**: Transference of +900 units from PHC C extends PHC A's stock to **2,140 units**, lifting stockout buffer to **18 days** and flipping status to `🟢 STABLE`.

### 4. Interactive Simulation Extras
- **Tactical Regional Supply Corridor Map**: Dynamic SVG map visualizing node locations, highway delays, and animated autonomous EV transit.
- **National Distributed Health Resource Ledger Modal**: Immutable audit trail of reallocations with transaction hashes and temperature telemetry.
- **Repeatable Demo Controls**: "Simulate Outbreak" and "Reset Demo" buttons for pitch presentations.

---

## 🚀 Running the Prototype Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in browser
http://localhost:3000
```
