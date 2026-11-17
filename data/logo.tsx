import { chakra, HTMLChakraProps, useColorModeValue } from '@chakra-ui/react'

export const Logo: React.FC<HTMLChakraProps<'div'>> = (props) => {
  const wordmark = useColorModeValue('#07131f', '#f4fbff')

  return (
    <chakra.div
      display="inline-flex"
      alignItems="center"
      gap="10px"
      {...props}
    >
      <chakra.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
        width="32px"
        height="32px"
        flexShrink={0}
        aria-hidden
      >
        <rect
          x="1"
          y="1"
          width="34"
          height="34"
          rx="9"
          fill="#071c22"
          stroke="#12d6b8"
          strokeWidth="1.4"
        />
        <circle cx="12.5" cy="13" r="2.4" fill="#12d6b8" />
        <circle cx="23.5" cy="13" r="2.4" fill="#67f0dc" />
        <circle cx="18" cy="23.5" r="2.4" fill="#d7fff7" />
        <path
          d="M12.5 13h11M12.5 13 18 23.5M23.5 13 18 23.5"
          stroke="#12d6b8"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </chakra.svg>
      <chakra.span
        color={wordmark}
        fontWeight="700"
        letterSpacing="0.2em"
        fontSize="14px"
        lineHeight="1"
      >
        HCUWA
      </chakra.span>
    </chakra.div>
  )
}
