import { meanBy, sumBy } from "lodash-es"

export const totalUnits = (p: any) => sumBy(p.rentSurveys[0]?.unitMix, (rs: any) => rs["Units"]["value"])

export const avgUnits = (p: any) => meanBy(p.rentSurveys[0]?.unitMix, (rs: any) => rs["Units"]["value"])

export const avgSF = (p: any) => new Intl.NumberFormat('en-US',
  {
    style: 'decimal',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }
).format((sumBy(p.rentSurveys[0]?.unitMix, (rs: any) => rs["SF"]["value"] * rs["Units"]["value"]) / sumBy(p.rentSurveys[0]?.unitMix, (rs: any) => rs["Units"]["value"]) || 0))

export const avgRent = (p: any) => new Intl.NumberFormat('en-US',
  {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }
).format((sumBy(p.rentSurveys[0]?.unitMix, (rs: any) => rs["Rent"]["value"] * rs["Units"]["value"]) / sumBy(p.rentSurveys[0]?.unitMix, (rs: any) => rs["Units"]["value"])) || 0)


// export const avgRentPerSF = (p: any) => new Intl.NumberFormat('en-US',
//   {
//     style: 'currency',
//     currency: 'USD',
//     maximumFractionDigits: 2,
//     minimumFractionDigits: 2,
//   }
// ).format(((sumBy(p.rentSurveys[0]?.unitMix, (rs: any) => rs["Rent"]["value"] * rs["Units"]["value"]) / sumBy(p.rentSurveys[0]?.unitMix, (rs: any) => rs["Units"]["value"])) / (sumBy(p.rentSurveys[0]?.unitMix, (rs: any) => rs["SF"]["value"] * rs["Units"]["value"]) / sumBy(p.rentSurveys[0]?.unitMix, (rs: any) => rs["Units"]["value"]))) || 0)

export const avgRentPerSF = (p: any) => new Intl.NumberFormat('en-US',
  {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }
).format(meanBy(p.rentSurveys[0]?.unitMix, (um: any) => um["Rent"]["value"] / um["SF"]["value"]))


export const avgEffRent = (p: any) => new Intl.NumberFormat('en-US',
  {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }
).format((sumBy(p.rentSurveys[0]?.unitMix, (rs: any) => rs["EffectiveRent"]["value"] * rs["Units"]["value"]) / sumBy(p.rentSurveys[0]?.unitMix, (rs: any) => rs["Units"]["value"])) || 0)

export const avgEffRentPerSF = (p: any) => new Intl.NumberFormat('en-US',
  {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }
).format(meanBy(p.rentSurveys[0]?.unitMix, (rs: any) => rs["EffectiveRent"]["value"] / rs["SF"]["value"]) || 0)

export const totalSF = (p: any) => new Intl.NumberFormat('en-US',
  {
    style: 'decimal',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }
).format((sumBy(p.rentSurveys[0]?.unitMix, (rs: any) => rs["Units"]["value"] * rs["SF"]["value"])) || 0)
