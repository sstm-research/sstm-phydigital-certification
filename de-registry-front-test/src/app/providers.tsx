"use client"
import { ScrollSepoliaTestnet } from "@thirdweb-dev/chains"
import { ThirdwebProvider, embeddedWallet } from "@thirdweb-dev/react"

function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThirdwebProvider
      activeChain={ScrollSepoliaTestnet}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!}
      supportedWallets={[embeddedWallet()]}
    >
      {children}
    </ThirdwebProvider>
  )
}

export default Providers
