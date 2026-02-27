export const BASE_URL = "https://gateway.scan-interfax.ru";

//рекламные банеры в карусели
export const banners = [
  {
    img: "./clock.png",
    alt: "clock",
    text: "Высокая и оперативная скорость обработки заявки",
  },
  {
    img: "./search.png",
    alt: "search",
    text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
  },
  {
    img: "./shield.png",
    alt: "shield",
    text: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству",
  },
  {
    img: "./clock.png",
    alt: "clock",
    text: "Безопасность и конфиденциальность данных",
  },
  {
    img: "./search.png",
    alt: "search",
    text: "Полная информация о компании в одном месте",
  },
];

//банеры тарифов
export const tarifBanners = [
  {
    name: "Beginner",
    icon: "./lamp.png",
    description: "Для небольшого исследования",
    currentPrice: "799",
    oldPrice: "1200",
    discountDescription: "или 150 Р/мес. при рассрочке на 24 мес.",
    included: [
      "Безлимитная история запросов",
      "Безопасная сделка",
      "Поддержка 24/7",
    ],
    color: "orange",
  },
  {
    name: "Pro",
    icon: "./arrow.png",
    description: "Для HR и фрилансеров",
    currentPrice: "1299",
    oldPrice: "2600",
    discountDescription: "или 279 ₽/мес. при рассрочке на 24 мес.",
    included: [
      "Все пункты тарифа Beginner",
      "Экспорт истории",
      "Рекомендации по приоритетам",
    ],
    color: "blue",
  },
  {
    name: "Business",
    icon: "./laptop.png",
    description: "Для корпоративных клиентов",
    currentPrice: "2379",
    oldPrice: "3700",
    discountDescription: null,
    included: [
      "Все пункты тарифа Pro",
      "Безлимитное количество запросов",
      "Приоритетная поддержка",
    ],
    color: "black",
  },
];
