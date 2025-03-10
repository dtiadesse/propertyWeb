function cellIndexFinder(column: any) {
  const base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let i, j, result = 0;

  for (i = 0, j = column.length - 1; i < column.length; i += 1, j -= 1) {
    result += Math.pow(base.length, j) * (base.indexOf(column[i]));
  }

  return result;
};

export function excelMapping(system: any, columns: any, cellMapping: any) {
  const result: any = {};
  const indexResult: any = {};
  for (const cell in cellMapping[system]) {
    const index = cellIndexFinder(cellMapping[system][cell])
    result[cell] = columns[index]
    indexResult[cell] = index;
  }

  return { result, indexResult };
}

export function processExcelData(excelData: any, sourceSystem: any, mappedColumnIndex: any,) {
  const excelResult: any = [];
  const regexCostar = new RegExp(`^All|Totals\\b`);
  const regexAxio = new RegExp(`^Total|Average\\b`);
  let index = -1;

  const numberMap: any = {
    "One": 1,
    "Two": 2,
    "Three": 3,
    "Four": 4,
    "Five": 5
  };


  for (const element of excelData) {
    // excelData.forEach((element: any, index: number) => {
    index++;
    if (index === 0 || element.length === 0 || !element) continue;

    if ((sourceSystem === 'Axiometrics' && index <= 7) || !element) continue;
    if ((sourceSystem === 'RedIQ' && index <= 5) || !element) continue;
    if ((sourceSystem === 'Property Financials' && index <= 5) || !element) continue;

    let bedsValue = element[mappedColumnIndex["Beds"]]
    let bathsValue = element[mappedColumnIndex["Bathrooms"]]
    let rent = +parseFloat((element[mappedColumnIndex["Rent"]] + "").replace(/[$,]/g, '')).toFixed(2);
    if (isNaN(rent)) {
      rent = 0
    }
    let SF = +parseFloat(element[mappedColumnIndex["SF"]]).toFixed(2);
    if (isNaN(SF)) {
      SF = 0;
    }
    const concession = 0;
    const effectiveRent = rent - concession;
    const adjustment = 0;

    if (sourceSystem === 'CoStar' && regexCostar.test(bedsValue)) continue

    if ((sourceSystem === 'Axiometrics') && regexAxio.test(bedsValue)) break;

    if ((sourceSystem === 'RedIQ') && !bedsValue) break;
    if ((sourceSystem === 'Property Financials') && !bedsValue) break;

    if ((sourceSystem === 'Yardi') && !bedsValue) break;

    if (sourceSystem === 'Axiometrics') {
      bedsValue = element[mappedColumnIndex["Beds"]]
      const bedBathRegex = /(\d+)BR\/(\d+)B/;
      const bedBathMatch = bedsValue.match(bedBathRegex);

      if (bedBathMatch) {
        bedsValue = parseInt(bedBathMatch[1], 10);
        bathsValue = parseInt(bedBathMatch[2], 10);
      } else {
        bedsValue = 0;
        bathsValue = 0;
      }
    }

    if (sourceSystem === 'Yardi') {
      const bedBathColValue = element[mappedColumnIndex["Beds"]]

      bedsValue = 0;
      bathsValue = 1;

      // const bedBathRegex = /(\d+)BR\/(\d+)B/;
      // const bedBathMatch = bedsValue.match(bedBathRegex);
      if (bedBathColValue) {
        let bedMatch = bedBathColValue.match(/(One|Two|Three|Four|Five) Bedroom/);
        if (bedMatch) {
          bedsValue = numberMap[bedMatch[1]] || 0;
        }

        // Match bathroom count (if available)
        let bathMatch = bedBathColValue.match(/(One|Two|Three|Four|Five) Bath/);
        if (bathMatch) {
          bathsValue = numberMap[bathMatch[1]] || 1;
        }
      }
    }

    const units = element[mappedColumnIndex["Units"]];

    if (!isNaN(units) && !isNaN(bedsValue) && !isNaN(bathsValue)) {
      excelResult.push({
        "Units": { value: +units },
        "Beds": { value: +bedsValue },
        "Bathrooms": { value: +bathsValue },
        "SF": { value: SF },
        "Rent": { value: rent },
        "Concession": { value: concession, editable: true },
        "EffectiveRent": { value: effectiveRent, editable: true },
        "Adjustment": { value: adjustment, editable: true },
        "AdjustedRent": { value: (effectiveRent - adjustment), editable: true },
        "VADRent": { value: 0, editable: true },
        "Description": { value: "", editable: true }
      })
    }
  };
  return excelResult;
}

