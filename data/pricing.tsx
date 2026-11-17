export default {
  title: 'Deployment models',
  description:
    'Choose the control plane that matches your scale, automation, and compliance needs.',
  plans: [
    {
      id: 'core',
      title: 'Core',
      description: 'Standardize workloads across one or two cloud regions.',
      price: 'Consult',
      features: [
        { title: 'Single-region control plane' },
        { title: 'Kubernetes and batch jobs' },
        { title: 'Basic SLO observability' },
        { title: 'Network and identity policy' },
        { title: 'Business-hours support' },
      ],
      action: {
        href: '#pricing',
        label: 'Talk to us',
      },
    },
    {
      id: 'enterprise',
      title: 'Enterprise',
      description: 'Hybrid fabric for multi-cloud, edge, and AI runtime.',
      price: 'By scale',
      isRecommended: true,
      features: [
        { title: 'Multi-region and hybrid interconnect' },
        { title: 'GPU / accelerator scheduling' },
        { title: 'GitOps and policy-as-code' },
        { title: 'Full audit trail' },
        { title: '24/7 SRE partnership' },
        { title: 'Regional data privacy' },
      ],
      action: {
        href: '#pricing',
        label: 'Request a demo',
      },
    },
    {
      id: 'sovereign',
      title: 'Sovereign',
      description: 'Sovereign architecture for finance, telecom, and government.',
      price: 'Custom',
      features: [
        { title: 'Air-gap and disconnected mode' },
        { title: 'Mandatory data residency' },
        { title: 'Layered trust model' },
        { title: 'Dedicated SLA contracts' },
        { title: 'On-site deployment team' },
      ],
      action: {
        href: '#faq',
        label: 'Talk with specialists',
      },
    },
  ],
}
