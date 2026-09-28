import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale, FileText, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Aarogya-Grid National Health Resource Network',
  description: 'Statutory operating conditions, inter-facility medicine reallocation protocols, and officer accountability standards.',
};

export default function TermsAndConditions() {
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
            <span className="text-xs font-mono text-slate-400">MoHFW STATUTORY DIRECTIVE</span>
          </div>

          <div className="text-xs font-mono text-sky-400 flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-sky-400" />
            <span>OPERATIONAL CHARTER 2026</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-sky-400">Statutory Charter</span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Aarogya-Grid Terms of Operation & Inter-Facility Protocol
          </h1>
          <p className="mt-2 text-xs font-mono text-slate-400">
            Directive Ref: NHM/DRUG-LOGISTICS/2026/88 | Promulgated under National Health Mission Regulations
          </p>
        </div>

        <div className="p-4 rounded border border-slate-700 bg-slate-900/60 text-xs text-slate-300 leading-relaxed font-mono">
          LEGAL BINDING: The provisions of this Charter apply mandatorily to all Medical Officers in-Charge (MOIC), District Drug Storekeepers, Pharmacists, and Authorized Logistics Carriers accessing the Aarogya-Grid Central Reallocation Platform across all States and Union Territories of India.
        </div>

        <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <span className="text-sky-400">1.</span> Authorization of Inter-Facility Drug Transfers
            </h2>
            <p>
              Under the National Drug Policy (Essential Drugs List 2022 Revision), Primary Health Centres (PHCs) are legally mandated to participate in the dynamic buffer redistribution grid. An automated redistribution order issued by Aarogya-Grid constitutes an official inter-facility transfer manifest carrying the deemed concurrence of the respective District Chief Medical Officer (CMO).
            </p>
            <p>
              Designated donor facilities must not withhold designated buffer stock when the receiving facility is projected to experience a critical stockout within seventy-two (72) hours, provided the donor facility retains a minimum statutory twenty-one (21) day buffer following transfer.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <span className="text-sky-400">2.</span> Cold-Chain Verification & Temperature Integrity
            </h2>
            <p>
              For temperature-sensitive formulations, including but not limited to Enoxaparin Sodium injections, insulin preparations, and anti-rabies immunoglobulins:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs font-mono text-slate-300">
              <li>Donor storekeepers must confirm that continuous logging devices show temperature adherence between 2.0°C and 8.0°C prior to transfer dispatch.</li>
              <li>Consignments experiencing temperature excursions exceeding 8.5°C for greater than forty-five (45) minutes shall be flagged as non-conforming, quarantined immediately, and barred from clinical administration.</li>
              <li>Every carrier vehicle must transmit GPS coordinate updates and thermal sensor data at minimum three-minute intervals to the central gateway.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <span className="text-sky-400">3.</span> Ledger Settlement & Digital Signatures
            </h2>
            <p>
              All inventory balance adjustments are finalized on the tamper-evident distributed health ledger. The dispatching pharmacist must sign the transfer manifest using their registered Aadhaar-linked e-Sign or Government Digital Certificate. Receiving facilities must scan the physical QR/DataMatrix barcodes on receipt within four (4) hours of courier arrival to finalize the custody transition.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <span className="text-sky-400">4.</span> Epidemic Surge Overrides & Priority Clearances
            </h2>
            <p>
              During designated syndromic epidemics (such as acute gastroenteritis, cholera, or vector-borne disease outbreaks), the National Command Centre reserves the legal right to institute automatic priority green-corridor dispatches across district and state administrative boundaries.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <span className="text-sky-400">5.</span> Prohibitions & Penalties
            </h2>
            <p>
              Falsification of facility stock counts, unauthorized diversion of allocated pharmaceutical units to non-public commercial pharmacies, or tampering with cold-chain IoT tracking devices constitutes an offence punishable under Section 420 and Section 409 of the Indian Penal Code, alongside disciplinary proceedings under Central Civil Services (Conduct) Rules.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <span className="text-sky-400">6.</span> Amendments & Updates
            </h2>
            <p>
              The Ministry of Health and Family Welfare reserves the right to amend operational thresholds and algorithmic transfer heuristics periodically in response to updated clinical practice guidelines and seasonal disease surveillance bulletins.
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500">
          <div>Document ID: DOC-TERMS-AG-2026-V2</div>
          <Link href="/privacy" className="text-sky-400 hover:text-sky-300 underline">
            View Privacy Policy &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
