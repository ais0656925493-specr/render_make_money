export default {
  title: 'Infrastructure teams running on HCUWA',
  items: [
    {
      name: 'Mai Tran',
      description: 'Head of Platform, regional fintech',
      avatar: '/static/images/avatar.jpg',
      children: (
        <>
          “HCUWA pulled our Kubernetes clusters, payments queues, and risk
          inference onto one control plane. Incident rollback is faster, and
          audit follows the workload.”
        </>
      ),
    },
    {
      name: 'Kenji Mori',
      description: 'SRE Lead, edge network',
      avatar: '/static/images/avatar2.jpg',
      children: (
        <>
          “HCUWA edge mesh lets us push policy to the sites without splitting
          central observability. Orchestration latency is more stable than the
          toolchain we stitched together before.”
        </>
      ),
    },
    {
      name: 'Lara Nguyen',
      description: 'Director of Cloud, smart manufacturing',
      avatar: '/static/images/avatar3.jpg',
      children: (
        <>
          “We keep plant data on-prem and burst GPUs to the cloud when we need
          them. HCUWA is the layer that keeps those two worlds on the same
          policy.”
        </>
      ),
    },
  ],
}
