import dayjs from "dayjs";

export function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
}

export const getNumericDaysBetweenBeginCurrentYearUntilNow = () : number => {

    //short way
    return dayjs().diff(dayjs(`${dayjs().year()}-01-01`), 'day');

    //more declarative
    // return dayjs().diff(dayjs().startOf('year').startOf('month').startOf('day'), 'day');

};

export const destructArrayOfObjectsAndSearchByTerm = (
    searchTerm: string,
    list: any[],
    attributesToSearch: string[]
  ) => {
    let searched = [];
    for (let obj of list) {
      let atributosStr = attributesToSearch
        .map(attribute => obj[attribute])
        .join(' ')
        .toLowerCase();
      
      if (atributosStr.includes(searchTerm.toLowerCase())) {
        searched.push(obj);
      }
    }
    return searched;
  };

export const numberToMoneyBrl = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
}).format


// receive: 5 returns +5
// receive: -3 returns -3
export const sufixNegativeOrPositiveString = (value: number | string) => {
  value = Number(value)
  return value > 0 ? `+${value}` : value;
}

// receive: 2021-01 returns Jan/2021 or Janeiro/2021
// receive: 2021 returns 2021
// monthType [short,long]
export const receiveYearMonthToNameOfMonthWithYear = (strPeriod: string | number, monthType: string = 'short'): string => {

  if(String(strPeriod).indexOf('-') === -1) {
    return String(strPeriod);
  }

  strPeriod = String(strPeriod);

  strPeriod = dayjs(strPeriod).format("YYYY-MM");

  let split = strPeriod.split("-");
  let strPtbrMonth = ""; 
  
  if(split[1]) {
    strPtbrMonth = dayjs(`${strPeriod}-01`).toDate().toLocaleDateString("pt-BR", { month: monthType as any}).replace(".", "");
    strPtbrMonth = strPtbrMonth[0].toUpperCase() + strPtbrMonth.substring(1);
  }
  const year = split[0];
  if(!strPtbrMonth) {
    return year;
  }
  return `${strPtbrMonth}/${year}`;
}


export const receiveNameOfMonthByNumberOfMonth = (value: number, monthType: string = 'long') => {
  return dayjs(`${dayjs().year()}-${String(value).padStart(2, "0")}`).toDate().toLocaleDateString("pt-BR", { month: monthType as any}).replace(".", "");
}

export const formatMilionsToAbreviation = (count: number) => {
    
  const positive = count < 0 ? (count * -1) : count;
  const COUNT_ABBRS = ['', 'Mil', ['Milhão', 'Milhões'], ['Bilhão', 'Bilhões'], ['Trilhão', 'Trilhões' ] , ['Quadrilhão', 'Quatrilhões'] , [ 'Quintrilhão', 'Quintrilhões']];
  const i = 0 === positive ? positive : Math.floor(Math.log(positive) / Math.log(1000));
  let result: any = "";
  result = parseFloat((positive / Math.pow(1000, i)).toFixed(2));
  let grenThanOne = result > 1;
  let candidate = COUNT_ABBRS[i];
  let sufix = candidate && typeof candidate != "string" ? candidate[grenThanOne ? 1 : 0] : candidate;
  if(sufix) {
    result += ` ${sufix}`;
  }
  return count >= 0 ? result : '-'+result;
}
