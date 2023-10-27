import { CoupangPriceDto } from '../../dtos';
import { Item, Vendor } from '../../entities';
import { delay } from '../util/delay';

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'ko-KR,ko;q=0.9',
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  'Sec-Ch-Ua':
    '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
  'Sec-Ch-Ua-Mobile': '?0',
  'Sec-Ch-Ua-Platform': '"Windows"',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none',
  'Sec-Fetch-User': '?1',
  'Upgrade-Insecure-Requests': '1',
};

type Price = number | undefined;

type Base = {
  price?: { couponPrice?: string; salePrice?: string; originPrice?: string };
};

const minPrice = (price1?: Price, price2?: Price): Price => {
  if (price1 === undefined) return price2;
  if (price2 === undefined) return price1;
  return Math.min(price1, price2);
};

const getTargetPrice = async (target: Vendor): Promise<Price> => {
  const { product, vendor } = target;

  const url = `https://www.coupang.com/vp/products/${product}/vendoritems/${vendor}`;
  const response = await fetch(url, { headers })
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });

  const soldOut: boolean = response?.soldOut ?? true;
  if (soldOut) return undefined;

  const bases: Base[] = response?.quantityBase ?? [];
  const original: Price = bases.reduce((price: Price, base: Base): Price => {
    const pstr: string | undefined =
      base?.price?.couponPrice ??
      base?.price?.salePrice ??
      base?.price?.originPrice;
    const pval: Price = pstr ? parseInt(pstr.replace(/,/gi, '')) : undefined;
    return minPrice(price, pval);
  }, undefined);
  if (original === undefined) return undefined;

  const ccidEligible: boolean = response?.ccidEligible ?? false;
  if (!ccidEligible) return original;

  const ccidPercent: number =
    response?.ccidInfo?.highestWowOnlyCcidDiscountRate ?? 0;
  return Math.floor(original * (1 - ccidPercent / 100));
};

const comparePriceEach = async (
  promise: Promise<Price>,
  target: Vendor,
): Promise<Price> => {
  const p1 = await promise;
  await delay(Math.random() * 1000);

  const p2 = await getTargetPrice(target);
  return minPrice(p1, p2);
};

const getItemPrice = async (item: Item): Promise<CoupangPriceDto> => {
  const { type, id: itemId, vendors } = item;
  const price = await vendors.reduce(
    comparePriceEach,
    Promise.resolve(undefined),
  );
  return { type, itemId, price, date: new Date() };
};

const collectEach = async (
  promise: Promise<CoupangPriceDto[]>,
  targetItem: Item,
): Promise<CoupangPriceDto[]> => {
  const collection = await promise;

  const result = await getItemPrice(targetItem);
  console.log(result);

  return [...collection, result];
};

const collectPrice = async (
  targetItems: Item[],
): Promise<CoupangPriceDto[]> => {
  return targetItems.reduce(collectEach, Promise.resolve([]));
};

export { collectPrice };
