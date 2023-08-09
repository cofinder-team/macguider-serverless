import { AlertTarget, Deal, Item, PriceTrade } from '../../entities';

const generateSpec = (item: Item): { main: string; detail: string } => {
  const { macbook, ipad } = item;

  if (macbook) {
    const { modelEntity, chip, cpu, gpu, ram, ssd } = macbook;
    const { name } = modelEntity;

    return {
      main: `${name} ${chip}`,
      detail: `CPU ${cpu}, GPU ${gpu}, RAM ${ram}GB, ${ssd}`,
    };
  }

  if (ipad) {
    const { modelEntity, gen, storage, cellular } = ipad;
    const { name } = modelEntity;

    return {
      main: `${name} ${gen}세대`,
      detail: `${cellular ? 'Wi-Fi + Cellular' : 'Wi-Fi'} (${storage})`,
    };
  }

  return { main: '', detail: '' };
};

type AlertPayload = {
  to: string;
  id: number;
  type: { text: string; color: string };
  source: string;
  price: { price: string; average: string; discount: string };
  uuid: { alert: string; user: string };
  spec: { main: string; detail: string };
};

const generateAlertPayload = (
  deal: Deal,
  priceTrade: PriceTrade,
  alertTarget: AlertTarget,
): AlertPayload => {
  const { id, item, unused, source, price } = deal;
  const { average } = priceTrade;
  const { uuid, user } = alertTarget;

  return {
    to: user.email,
    id,
    type: {
      text: unused ? '미개봉' : 'S급',
      color: unused ? '#3B82F6' : '#22c55e',
    },
    source,
    price: {
      price: price.toLocaleString(),
      average: average.toLocaleString(),
      discount: `${Math.floor(((average - price) / average) * 100)}%`,
    },
    uuid: {
      alert: uuid,
      user: user.uuid,
    },
    spec: generateSpec(item),
  };
};

export { generateAlertPayload, AlertPayload };
