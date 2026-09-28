import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Aarogya-Grid National Health Resource Network',
  description: 'Data protection, patient de-identification, and telemetry governance under the Digital Personal Data Protection Act, 2023.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-[#080d19] sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-700 bg-slate-900 text-xs font-mono text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Command Center</span>
            </Link>
            <span className="text-slate-600">|</span>
            <span className="text-xs font-mono text-slate-400">MoHFW STATUTORY DISCLOSURE</span>
          </div>

          <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>DPDP ACT 2023 COMPLIANT</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-sky-400">Legal Documentation</span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Aarogya-Grid Platform Privacy Policy
          </h1>
          <p className="mt-2 text-xs font-mono text-slate-400">
            Official Gazette Ref: MoHFW/NDHM/SEC/2026/04 | Effective Date: 1 January 2026 | Last Revised: 28 September 2026
          </p>
        </div>

        <div className="p-4 rounded border border-sky-900/60 bg-sky-950/20 text-xs text-sky-200 leading-relaxed font-mono">
          IMPORTANT NOTICE: Aarogya-Grid is an official digital public infrastructure operated under the Ministry of Health and Family Welfare (MoHFW), Government of India. This platform handles telemetry data related to essential medicines, bed occupancy, and facility-level outpatient/inpatient volumes. No personally identifiable medical records (EHR) of individual citizens are stored in raw form on the redistribution grid.
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <span className="text-sky-400">1.</span> Regulatory Framework & Jurisdiction
            </h2>
            <p>
              This Privacy Policy governs the collection, processing, anonymization, and transmission of clinical operational metrics across Primary Health Centres (PHCs), Community Health Centres (CHCs), Sub-Divisional Hospitals (SDHs), and District Drug Warehouses enrolled in the Aarogya-Grid Central Reallocation Network.
            </p>
            <p>
              Processing activities comply strictly with the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>, the <strong>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong>, and the <strong>Digital Information Security in Healthcare Act (DISHA)</strong> guidelines issued by the National Health Authority (NHA).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <span className="text-sky-400">2.</span> Scope of Telemetry & Information Collected
            </h2>
            <p>
              Aarogya-Grid captures facility-level resource telemetry rather than patient-identifying data:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs font-mono text-slate-300">
              <li><strong>Pharmaceutical Inventory Metrics:</strong> Stock quantities, batch identifiers, expiry timelines, daily consumption rates, buffer thresholds, and cold-chain temperature telemetry logs.</li>
              <li><strong>Facility Operational Volumes:</strong> Aggregated daily Outpatient (OPD) and Inpatient (IPD) counts categorized by standard ICD-11 syndromic syndicates (e.g., Acute Diarrheal Disease, Viral Pyrexia, Snakebite Envenomation).</li>
              <li><strong>Infrastructure Capacity:</strong> General bed occupancy, ICU bed availability, operational oxygen concentrators, and generator diesel fuel status.</li>
              <li><strong>Medical Personnel Roster:</strong> On-duty medical officers, nursing staff, and pharmacy storekeepers for verification of digital transfer manifests.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <span className="text-sky-400">3.</span> Automated Anonymization & Cryptographic Integrity
            </h2>
            <p>
              All facility admissions feeding into the predictive epidemic surge engine undergo k-anonymity redaction ($k \ge 25$) at the district gateway node prior to ingestion into the national model. Inter-facility medicine reallocation orders are sealed using SHA-256 cryptographic digests on the National Health Ledger to ensure tamper-evident chain of custody without exposing personal patient identities.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <span className="text-sky-400">4.</span> Authorized Access & Stakeholder Entitlements
            </h2>
            <p>
              Access to inter-district supply telemetry is restricted based on Role-Based Access Control (RBAC) tiers:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs font-mono text-slate-300">
              <li><strong>Chief Medical Officers (CMO) & District Magistrates:</strong> Full authorization to approve inter-PHC transport orders within district boundaries.</li>
              <li><strong>Primary Health Centre Medical Officers:</strong> Requisition and reception of drug buffers.</li>
              <li><strong>Central Medical Stores Depot (CMSD):</strong> National buffer replenishment forecasting.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <span className="text-sky-400">5.</span> Data Retention & Server Architecture
            </h2>
            <p>
              All operational records, temperature logs, and transfer manifests are retained for seven (7) statutory years in accordance with Central Drugs Standard Control Organisation (CDSCO) guidelines. All primary and redundant server infrastructure resides exclusively within Government of India National Data Centres (NIC MeghRaj Cloud) situated within the geographical borders of India.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <span className="text-sky-400">6.</span> Grievance Redressal Officer
            </h2>
            <p>
              In compliance with Section 13 of the Digital Personal Data Protection Act, 2023, designated data protection inquiries may be addressed to:
            </p>
            <div className="p-3 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
              <div><strong>Nodal Data Protection Officer:</strong> Directorate General of Health Services (DGHS)</div>
              <div><strong>Address:</strong> Nirman Bhawan, Maulana Azad Road, New Delhi 110011</div>
              <div><strong>Official Contact:</strong> dpo-aarogya-grid@mohfw.gov.in</div>
            </div>
          </section>
        </div>

        <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
          <div>Document ID: POL-PRIV-AG-2026-V2</div>
          <Link href="/terms" className="text-sky-400 hover:text-sky-300 underline">
            View Terms and Conditions &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
