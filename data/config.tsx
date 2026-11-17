import { Metadata } from 'next'

import { Logo } from './logo'

const siteConfig = {
  logo: Logo,
  seo: {
    title: 'HCUWA — Hybrid Compute Unified Workload Architecture',
    description:
      'HCUWA orchestrates hybrid cloud, edge mesh, and AI runtime on a single control plane.',
  } as Metadata,
  termsUrl: '#faq',
  privacyUrl: '#faq',
  header: {
    links: [
      {
        id: 'platforms',
        label: 'Platform',
      },
      {
        id: 'solutions',
        label: 'Solutions',
      },
      {
        id: 'pricing',
        label: 'Deploy',
      },
      {
        id: 'faq',
        label: 'FAQ',
      },
      {
        label: 'Docs',
        href: '#faq',
      },
      {
        label: 'Request a demo',
        href: '#pricing',
        variant: 'primary',
      },
    ],
  },
  footer: {
    copyright: (
      <>
        © {new Date().getFullYear()} HCUWA Technologies. Unified workload
        architecture for enterprise infrastructure.
      </>
    ),
    links: [
      {
        href: 'mailto:hello@hcuwa.io',
        label: 'Contact',
      },
      {
        href: '#platforms',
        label: 'Platform',
      },
      {
        href: '#faq',
        label: 'Security',
      },
    ],
  },
  signup: {
    title: 'Run HCUWA on your infrastructure',
    features: [
      {
        title: 'Unified control plane',
        description:
          'Orchestrate public cloud, private cloud, and edge from a single control layer.',
      },
      {
        title: 'AI runtime ready',
        description:
          'Schedule GPUs, inference pipelines, and quotas under enterprise policy.',
      },
      {
        title: 'Data sovereignty',
        description:
          'Residency, audit trails, and sovereign-cloud models for regulated industries.',
      },
      {
        title: 'End-to-end observability',
        description:
          'Workload telemetry, SLOs, and incident response in real time.',
      },
    ],
  },
}

export default siteConfig
