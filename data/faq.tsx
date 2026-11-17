const faq = {
  title: 'Frequently asked questions',
  items: [
    {
      q: 'What is HCUWA?',
      a: 'HCUWA (Hybrid Compute Unified Workload Architecture) is a hybrid workload orchestration platform. It brings cloud, edge, and AI runtime onto one control plane so operations, observability, and compliance follow the same model.',
    },
    {
      q: 'How is HCUWA different from a typical cloud management layer?',
      a: 'Instead of managing clusters one by one, HCUWA standardizes the workload lifecycle: packing, policy, identity, data path, and SLOs. Operators see one fabric, not a pile of disconnected tools.',
    },
    {
      q: 'Can it run on-premises or in a sovereign cloud?',
      a: 'Yes. Enterprise and Sovereign include air-gap, regional data residency, and hybrid links to public cloud when policy allows.',
    },
    {
      q: 'Does it integrate with existing Kubernetes and GPU clusters?',
      a: 'HCUWA connects to the Kubernetes clusters, batch queues, and accelerator pools you already run. The control plane does not replace the stack; it adds orchestration and policy on top.',
    },
  ],
}

export default faq
