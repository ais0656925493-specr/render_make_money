import { MarketingLayout } from '#components/layout'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HCUWA — Hybrid Compute Unified Workload Architecture',
  description:
    'HCUWA orchestrates hybrid cloud, edge mesh, and AI runtime on a single control plane.',
}

export default function Layout(props: { children: React.ReactNode }) {
  return <MarketingLayout>{props.children}</MarketingLayout>
}
