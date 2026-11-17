'use client'

import {
  Badge,
  Box,
  ButtonGroup,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import {
  FiActivity,
  FiCloud,
  FiCpu,
  FiGitMerge,
  FiGlobe,
  FiLayers,
  FiLock,
  FiServer,
  FiShield,
  FiZap,
} from 'react-icons/fi'

import * as React from 'react'

import { ButtonLink } from '#components/button-link/button-link'
import { Faq } from '#components/faq'
import { Pricing } from '#components/pricing/pricing'
import { Testimonial, Testimonials } from '#components/testimonials'
import { Em } from '#components/typography'
import faq from '#data/faq'
import pricing from '#data/pricing'
import testimonials from '#data/testimonials'

const CYAN = '#12d6b8'

const cardStyles = {
  border: '1px solid',
  borderColor: 'blackAlpha.100',
  bg: 'white',
  shadow: 'sm',
  _dark: {
    bg: 'whiteAlpha.50',
    borderColor: 'whiteAlpha.150',
    shadow: 'none',
  },
} as const

export const HcuwaMarketingLanding: NextPage = () => {
  return (
    <Box
      sx={{
        '#platforms, #solutions, #pricing, #faq': {
          scrollMarginTop: '96px',
        },
      }}
    >
      <HeroSection />
      <PlatformsSection />
      <SolutionsSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
    </Box>
  )
}

const HeroSection = () => {
  return (
    <Box id="home" position="relative" overflow="hidden" pt={{ base: 28, lg: 32 }}>
      <Box
        position="absolute"
        inset="0"
        bgImage="linear-gradient(rgba(15,179,154,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(15,179,154,0.12) 1px, transparent 1px)"
        backgroundSize="56px 56px"
        sx={{
          maskImage: 'radial-gradient(ellipse at 30% 20%, black 12%, transparent 72%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at 30% 20%, black 12%, transparent 72%)',
        }}
        pointerEvents="none"
      />
      <Box
        position="absolute"
        top="-120px"
        right="-80px"
        w="480px"
        h="480px"
        bg="cyan.400"
        filter="blur(140px)"
        opacity="0.18"
        pointerEvents="none"
      />

      <Container maxW="container.xl" pb={{ base: 16, lg: 24 }} position="relative">
        <Grid
          templateColumns={{ base: '1fr', lg: '1.05fr 0.95fr' }}
          gap={{ base: 12, lg: 16 }}
          alignItems="center"
        >
          <Box>
            <Badge
              variant="outline"
              colorScheme="cyan"
              rounded="full"
              px="3"
              py="1"
              letterSpacing="0.16em"
              fontSize="10px"
              borderColor="primary.500"
              color="primary.600"
              _dark={{ color: 'cyan.300', borderColor: 'cyan.400' }}
            >
              HCUWA TECHNOLOGY
            </Badge>

            <Heading
              as="h1"
              mt="6"
              fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
              lineHeight="1.08"
              letterSpacing="-0.04em"
              maxW="18ch"
            >
              Unified workload architecture for{' '}
              <Text as="span" color="primary.500">
                cloud, edge, and AI
              </Text>
            </Heading>

            <Text mt="6" fontSize={{ base: 'md', md: 'xl' }} color="muted" maxW="36rem">
              <Em>Hybrid Compute Unified Workload Architecture</Em> orchestrates
              hybrid infrastructure on one control plane: packing, policy,
              identity, data path, and SLOs travel together instead of splitting
              across a dozen tools.
            </Text>

            <ButtonGroup mt="8" spacing="4" flexWrap="wrap">
              <ButtonLink colorScheme="primary" size="lg" href="#platforms">
                Explore the platform
              </ButtonLink>
              <ButtonLink size="lg" variant="outline" href="#pricing">
                See deployment models
              </ButtonLink>
            </ButtonGroup>

            <SimpleGrid columns={[2, 4]} spacing="6" mt="12" maxW="lg">
              {[
                ['140+', 'connected clusters'],
                ['12', 'hybrid regions'],
                ['40ms', 'P99 orchestration'],
                ['99.99%', 'control-plane SLA'],
              ].map(([value, label]) => (
                <Box key={label}>
                  <Text fontSize="2xl" fontWeight="700" color="primary.500">
                    {value}
                  </Text>
                  <Text fontSize="sm" color="muted">
                    {label}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          <ArchitectureConsole />
        </Grid>
      </Container>
    </Box>
  )
}

const ArchitectureConsole = () => {
  return (
    <Box
      border="1px solid"
      borderColor="whiteAlpha.200"
      bg="#07131f"
      color="white"
      rounded="2xl"
      overflow="hidden"
      shadow="xl"
    >
      <Flex
        px="4"
        py="3"
        borderBottom="1px solid"
        borderColor="whiteAlpha.150"
        align="center"
        justify="space-between"
      >
        <HStack spacing="2">
          <Box w="8px" h="8px" rounded="full" bg="red.400" />
          <Box w="8px" h="8px" rounded="full" bg="yellow.400" />
          <Box w="8px" h="8px" rounded="full" bg="green.400" />
          <Text fontSize="xs" color="whiteAlpha.700" pl="2" letterSpacing="0.04em">
            hcuwa-control-mesh
          </Text>
        </HStack>
        <Badge colorScheme="cyan" variant="subtle" fontSize="10px">
          LIVE
        </Badge>
      </Flex>

      <SimpleGrid columns={{ base: 1, sm: 3 }} gap="3" p="4">
        <Lane title="Cloud Fabric" hint="multi-region" color="cyan.300" jobs={['payments-api', 'ledger-sync', 'iam-edge']} />
        <Lane title="Edge Mesh" hint="12 PoPs" color="teal.200" jobs={['vision-gate', 'plc-ingest', 'cdn-policy']} />
        <Lane title="AI Runtime" hint="GPU pool" color="green.200" jobs={['risk-infer', 'doc-llm', 'batch-train']} />
      </SimpleGrid>

      <Flex
        px="4"
        py="3"
        borderTop="1px solid"
        borderColor="whiteAlpha.150"
        justify="space-between"
        fontSize="xs"
        color="whiteAlpha.700"
      >
        <Text>1.2M tasks / min</Text>
        <Text color={CYAN}>policy pack v4.18 synced</Text>
      </Flex>
    </Box>
  )
}

const Lane = ({
  title,
  hint,
  color,
  jobs,
}: {
  title: string
  hint: string
  color: string
  jobs: string[]
}) => {
  return (
    <Box bg="whiteAlpha.100" rounded="lg" p="3" minH={{ base: 'auto', sm: '220px' }}>
      <Text fontSize="xs" fontWeight="700" color={color} letterSpacing="0.08em">
        {title}
      </Text>
      <Text fontSize="10px" color="whiteAlpha.500" mb="3">
        {hint}
      </Text>
      <Stack spacing="2">
        {jobs.map((job) => (
          <Flex
            key={job}
            bg="blackAlpha.500"
            rounded="md"
            px="2"
            py="2"
            align="center"
            justify="space-between"
            border="1px solid"
            borderColor="whiteAlpha.100"
          >
            <Text fontSize="11px">{job}</Text>
            <Box w="6px" h="6px" rounded="full" bg={color} />
          </Flex>
        ))}
      </Stack>
    </Box>
  )
}

const PlatformsSection = () => {
  const items = [
    {
      icon: FiCloud,
      title: 'Cloud Fabric',
      description:
        'Join public and private cloud into one fabric. Workloads are packed by cost, latency, and residency policy.',
    },
    {
      icon: FiGitMerge,
      title: 'Edge Mesh',
      description:
        'Push compute next to data in plants, stores, or telecom sites while keeping central observability.',
    },
    {
      icon: FiCpu,
      title: 'AI Runtime',
      description:
        'Schedule GPUs, inference pipelines, and team quotas. Burst to the cloud when on-prem hits its limit.',
    },
    {
      icon: FiShield,
      title: 'Trust Layer',
      description:
        'Zero-trust identity, per-workload audit trails, and sovereign models for regulated industries.',
    },
  ]

  return (
    <Box id="platforms" py={{ base: 16, lg: 24 }}>
      <Container maxW="container.xl">
        <Heading size="lg" letterSpacing="-0.03em" maxW="20ch">
          Four layers of the HCUWA architecture
        </Heading>
        <Text mt="3" color="muted" maxW="40rem">
          Each layer deploys independently, but they share identity, telemetry,
          and the policy pack. That is why the control plane does not fragment.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="5" mt="10">
          {items.map((item) => (
            <Box
              key={item.title}
              p="6"
              rounded="xl"
              {...cardStyles}
              _hover={{ borderColor: 'primary.400', transform: 'translateY(-4px)' }}
              transition="all 0.2s ease"
            >
              <Flex
                w="10"
                h="10"
                rounded="lg"
                align="center"
                justify="center"
                bg="primary.50"
                color="primary.600"
                mb="4"
                _dark={{ bg: 'blackAlpha.500', color: 'cyan.300' }}
              >
                <Icon as={item.icon} boxSize="5" />
              </Flex>
              <Heading as="h3" fontSize="lg" mb="2">
                {item.title}
              </Heading>
              <Text color="muted" fontSize="sm">
                {item.description}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

const SolutionsSection = () => {
  const cards = [
    {
      icon: FiLock,
      title: 'Finance',
      text: 'Payments, fraud detection, and core banking on a fabric with per-workload audit.',
    },
    {
      icon: FiServer,
      title: 'Manufacturing',
      text: 'Keep plant data on-prem, then burst quality-inspection AI to cloud GPUs when needed.',
    },
    {
      icon: FiGlobe,
      title: 'Telecom',
      text: 'Edge mesh for PoPs, network policy, and low-latency services on one control plane.',
    },
    {
      icon: FiLayers,
      title: 'Sovereign cloud',
      text: 'Air-gap, mandatory data residency, and operating contracts for the public sector.',
    },
    {
      icon: FiActivity,
      title: 'Fabric observability',
      text: 'SLOs, tracing, and incident response follow HCUWA topology instead of each cluster.',
    },
    {
      icon: FiZap,
      title: 'GitOps policy',
      text: 'Policy-as-code for identity, data path, and quotas. Changes are reviewed like source.',
    },
  ]

  return (
    <Box id="solutions" py={{ base: 8, lg: 16 }}>
      <Container maxW="container.xl">
        <Heading size="lg" letterSpacing="-0.03em">
          Industry solutions
        </Heading>
        <Text mt="3" color="muted" maxW="38rem">
          HCUWA does not lock you to one hyperscaler. The control plane attaches
          to infrastructure you already run, then standardizes the workload
          lifecycle.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="5" mt="10">
          {cards.map((card) => (
            <HStack
              key={card.title}
              align="flex-start"
              spacing="4"
              p="6"
              rounded="xl"
              {...cardStyles}
            >
              <Flex
                mt="1"
                w="9"
                h="9"
                rounded="md"
                align="center"
                justify="center"
                color="primary.600"
                bg="primary.50"
                flexShrink={0}
                _dark={{ color: 'cyan.300', bg: 'whiteAlpha.100' }}
              >
                <Icon as={card.icon} boxSize="4" />
              </Flex>
              <Box>
                <Heading as="h3" fontSize="md" mb="1">
                  {card.title}
                </Heading>
                <Text color="muted" fontSize="sm">
                  {card.text}
                </Text>
              </Box>
            </HStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

const TestimonialsSection = () => {
  const columns = React.useMemo(() => {
    return testimonials.items.reduce<Array<typeof testimonials.items>>(
      (cols, item, i) => {
        cols[i % 3].push(item)
        return cols
      },
      [[], [], []],
    )
  }, [])

  return (
    <Testimonials title={testimonials.title} columns={[1, 2, 3]} innerWidth="container.xl">
      {columns.map((column, i) => (
        <Stack key={i} spacing="8">
          {column.map((item, j) => (
            <Testimonial key={j} {...item} />
          ))}
        </Stack>
      ))}
    </Testimonials>
  )
}

const PricingSection = () => {
  return (
    <Pricing {...pricing}>
      <Text p="8" textAlign="center" color="muted">
        Every plan includes architecture onboarding and a policy-pack review
        before production is connected.
      </Text>
    </Pricing>
  )
}

const FaqSection = () => {
  return <Faq {...faq} />
}

export default HcuwaMarketingLanding
