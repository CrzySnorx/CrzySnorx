/* Short conversations. who: 'a' = left bubble, 'b' = right bubble. */
const DIALOGUES = [
  {
    id: 'meet', title: 'Meeting Someone', icon: '🤝', color: '#2563eb', roles: ['Anna', 'Ben'],
    lines: [
      { who: 'a', fil: 'Magandang umaga po!', en: 'Good morning!' },
      { who: 'b', fil: 'Magandang umaga rin. Anong pangalan mo?', en: "Good morning too. What's your name?" },
      { who: 'a', fil: 'Ako si Anna. Ikaw?', en: "I'm Anna. And you?" },
      { who: 'b', fil: 'Ako si Ben. Masaya akong makilala ka.', en: "I'm Ben. Nice to meet you." },
      { who: 'a', fil: 'Ako rin. Taga-saan ka?', en: 'Me too. Where are you from?' },
      { who: 'b', fil: 'Taga-Maynila ako. Ikaw?', en: "I'm from Manila. You?" },
      { who: 'a', fil: 'Taga-Japan ako.', en: "I'm from Japan." }
    ]
  },
  {
    id: 'eat', title: 'At the Restaurant', icon: '🍛', color: '#e0561b', roles: ['Waiter', 'You'],
    lines: [
      { who: 'a', fil: 'Magandang hapon po! Ano po ang order ninyo?', en: "Good afternoon! What's your order?" },
      { who: 'b', fil: 'Isang adobo at kanin, po.', en: 'One adobo and rice, please.' },
      { who: 'a', fil: 'Anong inumin po?', en: 'What drink would you like?' },
      { who: 'b', fil: 'Tubig lang, salamat.', en: 'Just water, thanks.' },
      { who: 'a', fil: 'Sige po. Sandali lang.', en: 'Okay. Just a moment.' },
      { who: 'b', fil: 'Magkano po lahat?', en: 'How much is it all?' },
      { who: 'a', fil: 'Dalawang daan po.', en: 'Two hundred pesos.' },
      { who: 'b', fil: 'Heto po. Salamat!', en: 'Here you go. Thank you!' }
    ]
  },
  {
    id: 'jeep', title: 'On the Jeepney', icon: '🚌', color: '#7b3fe4', roles: ['You', 'Driver'],
    lines: [
      { who: 'a', fil: 'Manong, pupunta po ba kayo sa palengke?', en: 'Sir, are you going to the market?' },
      { who: 'b', fil: 'Oo, sakay na.', en: 'Yes, hop on.' },
      { who: 'a', fil: 'Magkano po ang pamasahe?', en: 'How much is the fare?' },
      { who: 'b', fil: 'Labintatlong piso lang.', en: 'Just thirteen pesos.' },
      { who: 'a', fil: 'Bayad po.', en: 'Payment, please.' },
      { who: 'a', fil: 'Para po!', en: 'Stop here, please!' },
      { who: 'b', fil: 'Sige. Ingat ka!', en: 'Okay. Take care!' }
    ]
  },
  {
    id: 'shop', title: 'At the Market', icon: '🥭', color: '#15803d', roles: ['Buyer', 'Seller'],
    lines: [
      { who: 'a', fil: 'Magkano po ang mangga?', en: 'How much are the mangoes?' },
      { who: 'b', fil: 'Walumpung piso po ang kilo.', en: 'Eighty pesos per kilo.' },
      { who: 'a', fil: 'Mahal naman. Pwede po bang tumawad?', en: "That's expensive. May I haggle?" },
      { who: 'b', fil: 'Sige, pitumpung piso na lang.', en: 'Okay, seventy pesos then.' },
      { who: 'a', fil: 'Dalawang kilo po.', en: 'Two kilos, please.' },
      { who: 'b', fil: 'Heto po. Salamat!', en: 'Here you go. Thank you!' }
    ]
  }
];