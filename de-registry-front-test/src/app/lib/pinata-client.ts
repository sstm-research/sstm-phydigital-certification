import pinataSDK from "@pinata/sdk"

const pinata = new pinataSDK({
  pinataJWTKey: process.env.PINATA_JWT,
})

export default pinata
