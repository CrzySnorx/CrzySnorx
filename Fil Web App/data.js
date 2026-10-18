/* Lesson content. Each word: fil = Filipino, en = English, pr = pronunciation hint (CAPS = stressed syllable),
   ex = example sentence in Filipino, exEn = its English translation. */
const CATEGORIES = [
  {
    id: 'greet', name: 'Greetings', icon: '👋', color: '#2563eb',
    words: [
      { fil: 'Kumusta', en: 'Hello / How are you?', pr: 'koo-moos-TAH', ex: 'Kumusta ka?', exEn: 'How are you?' },
      { fil: 'Magandang umaga', en: 'Good morning', pr: 'mah-gan-DANG oo-MAH-gah', ex: 'Magandang umaga po!', exEn: 'Good morning (polite)!' },
      { fil: 'Magandang hapon', en: 'Good afternoon', pr: 'mah-gan-DANG hah-PON', ex: 'Magandang hapon sa inyo.', exEn: 'Good afternoon to you all.' },
      { fil: 'Magandang gabi', en: 'Good evening', pr: 'mah-gan-DANG gah-BEE', ex: 'Magandang gabi po.', exEn: 'Good evening (polite).' },
      { fil: 'Salamat', en: 'Thank you', pr: 'sah-LAH-maht', ex: 'Salamat sa tulong mo.', exEn: 'Thank you for your help.' },
      { fil: 'Walang anuman', en: "You're welcome", pr: 'WAH-lang ah-NOO-mahn', ex: 'Walang anuman, kaibigan.', exEn: "You're welcome, friend." },
      { fil: 'Paalam', en: 'Goodbye', pr: 'pah-AH-lahm', ex: 'Paalam, hanggang bukas!', exEn: 'Goodbye, until tomorrow!' },
      { fil: 'Oo', en: 'Yes', pr: 'oh-OH', ex: 'Oo, gusto ko.', exEn: 'Yes, I like it.' },
      { fil: 'Hindi', en: 'No / Not', pr: 'hin-DEE', ex: 'Hindi ako gutom.', exEn: 'I am not hungry.' },
      { fil: 'Pasensya na', en: "I'm sorry", pr: 'pah-SEN-shah nah', ex: 'Pasensya na, late ako.', exEn: "Sorry, I'm late." },
      { fil: 'Paumanhin', en: 'Excuse me / My apologies', pr: 'pah-oo-MAN-hin', ex: 'Paumanhin po, may tanong ako.', exEn: 'Excuse me, I have a question.' },
      { fil: 'Po', en: 'Polite particle (respect)', pr: 'poh', ex: 'Opo, salamat po.', exEn: 'Yes, thank you (respectfully).' }
    ]
  },
  {
    id: 'num', name: 'Numbers', icon: '🔢', color: '#ce1126',
    words: [
      { fil: 'Isa', en: 'One', pr: 'ee-SAH', ex: 'Isa lang, please.', exEn: 'Just one, please.' },
      { fil: 'Dalawa', en: 'Two', pr: 'dah-LAH-wah', ex: 'Dalawa ang kapatid ko.', exEn: 'I have two siblings.' },
      { fil: 'Tatlo', en: 'Three', pr: 'taht-LOH', ex: 'Tatlo ang aso namin.', exEn: 'We have three dogs.' },
      { fil: 'Apat', en: 'Four', pr: 'ah-PAHT', ex: 'Apat na upuan.', exEn: 'Four chairs.' },
      { fil: 'Lima', en: 'Five', pr: 'lee-MAH', ex: 'Lima ang mansanas.', exEn: 'There are five apples.' },
      { fil: 'Anim', en: 'Six', pr: 'AH-nim', ex: 'Anim na oras.', exEn: 'Six hours.' },
      { fil: 'Pito', en: 'Seven', pr: 'pee-TOH', ex: 'Pito ang araw sa isang linggo.', exEn: 'There are seven days in a week.' },
      { fil: 'Walo', en: 'Eight', pr: 'wah-LOH', ex: 'Walo kami sa bahay.', exEn: 'There are eight of us at home.' },
      { fil: 'Siyam', en: 'Nine', pr: 'shahm', ex: 'Siyam na buwan.', exEn: 'Nine months.' },
      { fil: 'Sampu', en: 'Ten', pr: 'sahm-POO', ex: 'Sampung piso.', exEn: 'Ten pesos.' }
    ]
  },
  {
    id: 'family', name: 'Family', icon: '👨‍👩‍👧', color: '#d9a400',
    words: [
      { fil: 'Nanay', en: 'Mother', pr: 'nah-NAI', ex: 'Mahal ko ang nanay ko.', exEn: 'I love my mother.' },
      { fil: 'Tatay', en: 'Father', pr: 'tah-TAI', ex: 'Nasa trabaho si tatay.', exEn: 'Father is at work.' },
      { fil: 'Kuya', en: 'Older brother', pr: 'KOO-yah', ex: 'Kasama ko si kuya.', exEn: 'I am with my older brother.' },
      { fil: 'Ate', en: 'Older sister', pr: 'AH-teh', ex: 'Magaling magluto si ate.', exEn: 'Older sister cooks well.' },
      { fil: 'Lolo', en: 'Grandfather', pr: 'LOH-loh', ex: 'Nagkukuwento si lolo.', exEn: 'Grandfather is telling stories.' },
      { fil: 'Lola', en: 'Grandmother', pr: 'LOH-lah', ex: 'Bumisita kami kay lola.', exEn: 'We visited grandmother.' },
      { fil: 'Anak', en: 'Child (son/daughter)', pr: 'ah-NAK', ex: 'May dalawa akong anak.', exEn: 'I have two children.' },
      { fil: 'Kapatid', en: 'Sibling', pr: 'kah-pah-TEED', ex: 'Ilan ang kapatid mo?', exEn: 'How many siblings do you have?' },
      { fil: 'Tito', en: 'Uncle', pr: 'TEE-toh', ex: 'Darating si tito bukas.', exEn: 'Uncle arrives tomorrow.' },
      { fil: 'Tita', en: 'Aunt', pr: 'TEE-tah', ex: 'Nagluto si tita ng adobo.', exEn: 'Auntie cooked adobo.' },
      { fil: 'Pamilya', en: 'Family', pr: 'pah-MEEL-yah', ex: 'Malaki ang pamilya namin.', exEn: 'Our family is big.' }
    ]
  },
  {
    id: 'food', name: 'Food & Drink', icon: '🍚', color: '#2e8b57',
    words: [
      { fil: 'Tubig', en: 'Water', pr: 'TOO-big', ex: 'Pahingi ng tubig.', exEn: 'May I have some water.' },
      { fil: 'Kanin', en: 'Cooked rice', pr: 'kah-NIN', ex: 'Gusto ko ng kanin.', exEn: 'I want rice.' },
      { fil: 'Manok', en: 'Chicken', pr: 'mah-NOK', ex: 'Masarap ang adobong manok.', exEn: 'Chicken adobo is delicious.' },
      { fil: 'Isda', en: 'Fish', pr: 'is-DAH', ex: 'Sariwa ang isda.', exEn: 'The fish is fresh.' },
      { fil: 'Gulay', en: 'Vegetables', pr: 'GOO-lai', ex: 'Kumakain ako ng gulay.', exEn: 'I eat vegetables.' },
      { fil: 'Prutas', en: 'Fruit', pr: 'PROO-tas', ex: 'Mangga ang paborito kong prutas.', exEn: 'Mango is my favorite fruit.' },
      { fil: 'Tinapay', en: 'Bread', pr: 'tee-nah-PAI', ex: 'Bumili ako ng tinapay.', exEn: 'I bought bread.' },
      { fil: 'Masarap', en: 'Delicious', pr: 'mah-sah-RAP', ex: 'Ang sarap ng pagkain!', exEn: 'The food is so delicious!' },
      { fil: 'Gutom', en: 'Hungry', pr: 'GOO-tom', ex: 'Gutom na ako.', exEn: "I'm hungry now." },
      { fil: 'Busog', en: 'Full (not hungry)', pr: 'boo-SOG', ex: 'Busog na ako, salamat.', exEn: "I'm full, thank you." },
      { fil: 'Kape', en: 'Coffee', pr: 'kah-PEH', ex: 'Isang kape, po.', exEn: 'One coffee, please.' },
      { fil: 'Mainit', en: 'Hot', pr: 'mah-ee-NIT', ex: 'Mainit ang sabaw.', exEn: 'The soup is hot.' }
    ]
  },
  {
    id: 'travel', name: 'Getting Around', icon: '🚌', color: '#7b3fe4',
    words: [
      { fil: 'Saan', en: 'Where', pr: 'sah-AN', ex: 'Saan ang banyo?', exEn: 'Where is the bathroom?' },
      { fil: 'Magkano', en: 'How much', pr: 'mag-KAH-noh', ex: 'Magkano ito?', exEn: 'How much is this?' },
      { fil: 'Kanan', en: 'Right', pr: 'KAH-nan', ex: 'Lumiko ka sa kanan.', exEn: 'Turn right.' },
      { fil: 'Kaliwa', en: 'Left', pr: 'kah-LEE-wah', ex: 'Sa kaliwa ang tindahan.', exEn: 'The store is on the left.' },
      { fil: 'Diretso', en: 'Straight ahead', pr: 'dee-RET-soh', ex: 'Diretso lang po.', exEn: 'Just go straight.' },
      { fil: 'Malapit', en: 'Near', pr: 'mah-LAH-pit', ex: 'Malapit ba ang istasyon?', exEn: 'Is the station near?' },
      { fil: 'Malayo', en: 'Far', pr: 'mah-LAH-yoh', ex: 'Malayo ang paliparan.', exEn: 'The airport is far.' },
      { fil: 'Tulong', en: 'Help', pr: 'TOO-long', ex: 'Tulong po!', exEn: 'Help, please!' },
      { fil: 'Paliparan', en: 'Airport', pr: 'pah-lee-PAH-ran', ex: 'Papunta ako sa paliparan.', exEn: "I'm going to the airport." },
      { fil: 'Banyo', en: 'Bathroom', pr: 'BAN-yoh', ex: 'Nasaan ang banyo?', exEn: 'Where is the bathroom?' },
      { fil: 'Para po', en: 'Stop here (to driver)', pr: 'PAH-rah poh', ex: 'Para po sa tabi.', exEn: 'Stop at the side, please.' },
      { fil: 'Bayad po', en: 'Payment, please (jeepney)', pr: 'BAH-yad poh', ex: 'Bayad po, isa lang.', exEn: 'Fare please, just one.' }
    ]
  },
  {
    id: 'phrase', name: 'Useful Phrases', icon: '💬', color: '#e0561b',
    words: [
      { fil: 'Anong pangalan mo?', en: "What's your name?", pr: 'ah-NONG pah-NGAH-lan moh', ex: 'Ako si Maria. Anong pangalan mo?', exEn: "I'm Maria. What's your name?" },
      { fil: 'Ako si…', en: 'I am… (my name is…)', pr: 'AH-koh see', ex: 'Ako si John.', exEn: 'I am John.' },
      { fil: 'Hindi ko maintindihan', en: "I don't understand", pr: 'hin-DEE koh mah-in-tin-DEE-han', ex: 'Pasensya na, hindi ko maintindihan.', exEn: "Sorry, I don't understand." },
      { fil: 'Dahan-dahan lang po', en: 'Slowly, please', pr: 'dah-han DAH-han lang poh', ex: 'Magsalita ka nang dahan-dahan.', exEn: 'Speak slowly.' },
      { fil: 'Marunong ka bang mag-Ingles?', en: 'Do you speak English?', pr: 'mah-ROO-nong kah bang mag-ing-GLES', ex: 'Marunong po ba kayong mag-Ingles?', exEn: 'Do you (polite) speak English?' },
      { fil: 'Masaya akong makilala ka', en: 'Nice to meet you', pr: 'mah-SAH-yah AH-kong mah-kee-LAH-lah kah', ex: 'Masaya akong makilala ka.', exEn: 'Nice to meet you.' },
      { fil: 'Mahal kita', en: 'I love you', pr: 'mah-HAL kee-TAH', ex: 'Mahal kita, Nanay.', exEn: 'I love you, Mom.' },
      { fil: 'Ingat ka', en: 'Take care', pr: 'ee-NGAT kah', ex: 'Ingat ka sa biyahe.', exEn: 'Take care on your trip.' },
      { fil: 'Sige', en: 'Okay / Go ahead / See you', pr: 'SEE-geh', ex: 'Sige, kita tayo bukas.', exEn: "Okay, let's meet tomorrow." },
      { fil: 'Ano ito?', en: 'What is this?', pr: 'AH-noh ee-TOH', ex: 'Ano ito sa Tagalog?', exEn: 'What is this in Tagalog?' },
      { fil: 'Walang problema', en: 'No problem', pr: 'WAH-lang proh-BLEH-mah', ex: 'Walang problema sa akin.', exEn: 'No problem with me.' },
      { fil: 'Mabuhay!', en: 'Welcome! / Long live!', pr: 'mah-BOO-hai', ex: 'Mabuhay ang mga bisita!', exEn: 'Welcome to the guests!' }
    ]
  },
  {
    id: 'color', name: 'Colors', icon: '🎨', color: '#e0267a',
    words: [
      { fil: 'Pula', en: 'Red', pr: 'poo-LAH', ex: 'Pula ang bulaklak.', exEn: 'The flower is red.' },
      { fil: 'Asul', en: 'Blue', pr: 'ah-SOOL', ex: 'Asul ang langit.', exEn: 'The sky is blue.' },
      { fil: 'Dilaw', en: 'Yellow', pr: 'dee-LOW', ex: 'Dilaw ang araw.', exEn: 'The sun is yellow.' },
      { fil: 'Berde', en: 'Green', pr: 'BEHR-deh', ex: 'Berde ang dahon.', exEn: 'The leaf is green.' },
      { fil: 'Puti', en: 'White', pr: 'poo-TEE', ex: 'Puti ang gatas.', exEn: 'Milk is white.' },
      { fil: 'Itim', en: 'Black', pr: 'ee-TIM', ex: 'Itim ang pusa.', exEn: 'The cat is black.' },
      { fil: 'Kahel', en: 'Orange', pr: 'kah-HEL', ex: 'Kahel ang kulay ng paglubog ng araw.', exEn: 'Orange is the color of the sunset.' },
      { fil: 'Rosas', en: 'Pink', pr: 'ROH-sas', ex: 'Rosas ang damit niya.', exEn: 'Her dress is pink.' },
      { fil: 'Kayumanggi', en: 'Brown', pr: 'kah-yoo-MANG-gee', ex: 'Kayumanggi ang mga mata niya.', exEn: 'Her eyes are brown.' },
      { fil: 'Lila', en: 'Purple', pr: 'LEE-lah', ex: 'Lila ang paborito kong kulay.', exEn: 'Purple is my favorite color.' },
      { fil: 'Kulay', en: 'Color', pr: 'KOO-lai', ex: 'Anong kulay ito?', exEn: 'What color is this?' }
    ]
  },
  {
    id: 'days', name: 'Days & Time', icon: '📅', color: '#0e8a9c',
    words: [
      { fil: 'Lunes', en: 'Monday', pr: 'LOO-nes', ex: 'Pumapasok ako tuwing Lunes.', exEn: 'I go to work/school every Monday.' },
      { fil: 'Martes', en: 'Tuesday', pr: 'MAR-tes', ex: 'Bukas ay Martes.', exEn: 'Tomorrow is Tuesday.' },
      { fil: 'Miyerkules', en: 'Wednesday', pr: 'mee-YER-koh-les', ex: 'May klase ako sa Miyerkules.', exEn: 'I have class on Wednesday.' },
      { fil: 'Huwebes', en: 'Thursday', pr: 'hoo-WEB-es', ex: 'Aalis kami sa Huwebes.', exEn: 'We leave on Thursday.' },
      { fil: 'Biyernes', en: 'Friday', pr: 'bee-YER-nes', ex: 'Masaya ako kapag Biyernes.', exEn: 'I am happy on Fridays.' },
      { fil: 'Sabado', en: 'Saturday', pr: 'sah-BAH-doh', ex: 'Walang pasok sa Sabado.', exEn: 'There is no work/school on Saturday.' },
      { fil: 'Linggo', en: 'Sunday', pr: 'ling-GOH', ex: 'Nagsisimba kami tuwing Linggo.', exEn: 'We go to church every Sunday.' },
      { fil: 'Ngayon', en: 'Today / Now', pr: 'NGAH-yon', ex: 'Ngayon ang kaarawan ko.', exEn: 'Today is my birthday.' },
      { fil: 'Bukas', en: 'Tomorrow', pr: 'boo-KAS', ex: 'Kita tayo bukas.', exEn: "Let's meet tomorrow." },
      { fil: 'Kahapon', en: 'Yesterday', pr: 'kah-HAH-pon', ex: 'Pumunta ako sa palengke kahapon.', exEn: 'I went to the market yesterday.' },
      { fil: 'Oras', en: 'Time / Hour', pr: 'OH-ras', ex: 'Ilang oras ang biyahe?', exEn: 'How many hours is the trip?' },
      { fil: 'Anong oras na?', en: 'What time is it?', pr: 'ah-NONG OH-ras nah', ex: 'Anong oras na po?', exEn: 'What time is it, please?' }
    ]
  },
  {
    id: 'months', name: 'Months', icon: '🗓️', color: '#6a4bd6',
    words: [
      { fil: 'Enero', en: 'January', pr: 'eh-NEH-roh', ex: 'Malamig ang Enero.', exEn: 'January is cold.' },
      { fil: 'Pebrero', en: 'February', pr: 'peb-REH-roh', ex: 'Ang kaarawan ko ay sa Pebrero.', exEn: 'My birthday is in February.' },
      { fil: 'Marso', en: 'March', pr: 'MAR-soh', ex: 'Magsisimula ang klase sa Marso.', exEn: 'Class starts in March.' },
      { fil: 'Abril', en: 'April', pr: 'ah-BREEL', ex: 'Mainit ang Abril.', exEn: 'April is hot.' },
      { fil: 'Mayo', en: 'May', pr: 'MAH-yoh', ex: 'Maraming pista tuwing Mayo.', exEn: 'There are many fiestas in May.' },
      { fil: 'Hunyo', en: 'June', pr: 'HOON-yoh', ex: 'Nagsisimula ang tag-ulan sa Hunyo.', exEn: 'The rainy season starts in June.' },
      { fil: 'Hulyo', en: 'July', pr: 'HOOL-yoh', ex: 'Maulan sa Hulyo.', exEn: 'It is rainy in July.' },
      { fil: 'Agosto', en: 'August', pr: 'ah-GOS-toh', ex: 'Bibisita ako sa Agosto.', exEn: 'I will visit in August.' },
      { fil: 'Setyembre', en: 'September', pr: 'set-YEM-breh', ex: 'Nagsisimula ang Pasko sa Setyembre.', exEn: 'Christmas season starts in September.' },
      { fil: 'Oktubre', en: 'October', pr: 'ok-TOO-breh', ex: 'Aalis ako sa Oktubre.', exEn: 'I am leaving in October.' },
      { fil: 'Nobyembre', en: 'November', pr: 'nob-YEM-breh', ex: 'Malamig na ang hangin sa Nobyembre.', exEn: 'The wind is cool in November.' },
      { fil: 'Disyembre', en: 'December', pr: 'dis-YEM-breh', ex: 'Pasko ay sa Disyembre.', exEn: 'Christmas is in December.' }
    ]
  },
  {
    id: 'body', name: 'Body Parts', icon: '🧍', color: '#c2410c',
    words: [
      { fil: 'Ulo', en: 'Head', pr: 'OO-loh', ex: 'Masakit ang ulo ko.', exEn: 'My head hurts.' },
      { fil: 'Mata', en: 'Eye', pr: 'MAH-tah', ex: 'Maganda ang mata niya.', exEn: 'Her eyes are beautiful.' },
      { fil: 'Ilong', en: 'Nose', pr: 'EE-long', ex: 'Barado ang ilong ko.', exEn: 'My nose is stuffy.' },
      { fil: 'Bibig', en: 'Mouth', pr: 'BEE-big', ex: 'Buksan mo ang bibig mo.', exEn: 'Open your mouth.' },
      { fil: 'Tainga', en: 'Ear', pr: 'tah-EE-ngah', ex: 'Masakit ang tainga ko.', exEn: 'My ear hurts.' },
      { fil: 'Kamay', en: 'Hand', pr: 'kah-MAI', ex: 'Hugasan mo ang kamay mo.', exEn: 'Wash your hands.' },
      { fil: 'Paa', en: 'Foot / Leg', pr: 'pah-AH', ex: 'Masakit ang paa ko.', exEn: 'My foot hurts.' },
      { fil: 'Braso', en: 'Arm', pr: 'BRAH-soh', ex: 'Itaas mo ang braso mo.', exEn: 'Raise your arm.' },
      { fil: 'Tiyan', en: 'Stomach', pr: 'TEE-yan', ex: 'Masakit ang tiyan ko.', exEn: 'My stomach hurts.' },
      { fil: 'Buhok', en: 'Hair', pr: 'boo-HOK', ex: 'Mahaba ang buhok niya.', exEn: 'Her hair is long.' },
      { fil: 'Puso', en: 'Heart', pr: 'POO-soh', ex: 'Malakas ang tibok ng puso ko.', exEn: 'My heart is beating hard.' },
      { fil: 'Likod', en: 'Back', pr: 'lee-KOD', ex: 'Masakit ang likod ko.', exEn: 'My back hurts.' }
    ]
  },
  {
    id: 'clothes', name: 'Clothes', icon: '👕', color: '#9333ea',
    words: [
      { fil: 'Damit', en: 'Clothes / Dress', pr: 'DAH-mit', ex: 'Maganda ang damit mo.', exEn: 'Your clothes are nice.' },
      { fil: 'Kamiseta', en: 'Shirt', pr: 'kah-mee-SEH-tah', ex: 'Puti ang kamiseta ko.', exEn: 'My shirt is white.' },
      { fil: 'Pantalon', en: 'Pants', pr: 'pan-tah-LON', ex: 'Bumili ako ng pantalon.', exEn: 'I bought pants.' },
      { fil: 'Palda', en: 'Skirt', pr: 'PAL-dah', ex: 'Asul ang palda niya.', exEn: 'Her skirt is blue.' },
      { fil: 'Sapatos', en: 'Shoes', pr: 'sah-PAH-tos', ex: 'Bago ang sapatos ko.', exEn: 'My shoes are new.' },
      { fil: 'Tsinelas', en: 'Slippers / Flip-flops', pr: 'chee-NEH-las', ex: 'Magsuot ka ng tsinelas.', exEn: 'Wear slippers.' },
      { fil: 'Medyas', en: 'Socks', pr: 'MED-yas', ex: 'Nasaan ang medyas ko?', exEn: 'Where are my socks?' },
      { fil: 'Sumbrero', en: 'Hat', pr: 'soom-BREH-roh', ex: 'Magsuot ka ng sumbrero sa araw.', exEn: 'Wear a hat in the sun.' },
      { fil: 'Payong', en: 'Umbrella', pr: 'PAH-yong', ex: 'Magdala ka ng payong.', exEn: 'Bring an umbrella.' },
      { fil: 'Barong', en: 'Barong Tagalog (formal shirt)', pr: 'bah-RONG', ex: 'Nagsuot siya ng barong sa kasal.', exEn: 'He wore a barong at the wedding.' },
      { fil: 'Salamin', en: 'Glasses / Mirror', pr: 'sah-lah-MIN', ex: 'Nawawala ang salamin ko.', exEn: 'My glasses are missing.' }
    ]
  },
  {
    id: 'market', name: 'Shopping', icon: '🛒', color: '#15803d',
    words: [
      { fil: 'Tindahan', en: 'Store', pr: 'tin-DAH-han', ex: 'Pumunta ako sa tindahan.', exEn: 'I went to the store.' },
      { fil: 'Palengke', en: 'Public market', pr: 'pah-LENG-keh', ex: 'Sariwa ang isda sa palengke.', exEn: 'The fish at the market is fresh.' },
      { fil: 'Presyo', en: 'Price', pr: 'PRES-yoh', ex: 'Ano ang presyo nito?', exEn: 'What is the price of this?' },
      { fil: 'Mura', en: 'Cheap', pr: 'MOO-rah', ex: 'Mura ang mangga ngayon.', exEn: 'Mangoes are cheap today.' },
      { fil: 'Mahal', en: 'Expensive', pr: 'mah-HAL', ex: 'Masyadong mahal ito.', exEn: 'This is too expensive.' },
      { fil: 'Tawad', en: 'Discount / Haggle', pr: 'TAH-wad', ex: 'Pwede bang tumawad?', exEn: 'Can I haggle?' },
      { fil: 'Sukli', en: 'Change (money)', pr: 'SOOK-lee', ex: 'Nasaan ang sukli ko?', exEn: 'Where is my change?' },
      { fil: 'Pera', en: 'Money', pr: 'PEH-rah', ex: 'Wala akong pera.', exEn: 'I have no money.' },
      { fil: 'Bumili', en: 'To buy (bought)', pr: 'boo-MEE-lee', ex: 'Bumili ako ng prutas.', exEn: 'I bought fruit.' },
      { fil: 'Resibo', en: 'Receipt', pr: 'reh-SEE-boh', ex: 'Pahingi po ng resibo.', exEn: 'May I have a receipt, please.' },
      { fil: 'Kaunti', en: 'A little / Few', pr: 'kah-OON-tee', ex: 'Kaunti lang po.', exEn: 'Just a little, please.' },
      { fil: 'Marami', en: 'Many / A lot', pr: 'mah-RAH-mee', ex: 'Marami ang tao sa palengke.', exEn: 'There are many people at the market.' }
    ]
  },
  {
    id: 'weather', name: 'Weather', icon: '⛅', color: '#0284c7',
    words: [
      { fil: 'Panahon', en: 'Weather / Season', pr: 'pah-nah-HON', ex: 'Maganda ang panahon ngayon.', exEn: 'The weather is nice today.' },
      { fil: 'Araw', en: 'Sun / Day', pr: 'AH-row', ex: 'Maliwanag ang araw.', exEn: 'The sun is bright.' },
      { fil: 'Ulan', en: 'Rain', pr: 'OO-lan', ex: 'Umuulan na.', exEn: 'It is raining now.' },
      { fil: 'Hangin', en: 'Wind', pr: 'HAH-ngin', ex: 'Malakas ang hangin.', exEn: 'The wind is strong.' },
      { fil: 'Ulap', en: 'Cloud', pr: 'OO-lap', ex: 'Maraming ulap sa langit.', exEn: 'There are many clouds in the sky.' },
      { fil: 'Bagyo', en: 'Typhoon / Storm', pr: 'BAG-yoh', ex: 'May bagyo bukas.', exEn: 'There is a typhoon tomorrow.' },
      { fil: 'Maaraw', en: 'Sunny', pr: 'mah-AH-row', ex: 'Maaraw ngayon.', exEn: 'It is sunny today.' },
      { fil: 'Maulan', en: 'Rainy', pr: 'mah-OO-lan', ex: 'Maulan sa Hulyo.', exEn: 'It is rainy in July.' },
      { fil: 'Malamig', en: 'Cold / Cool', pr: 'mah-LAH-mig', ex: 'Malamig ang tubig.', exEn: 'The water is cold.' },
      { fil: 'Baha', en: 'Flood', pr: 'BAH-hah', ex: 'May baha sa kalsada.', exEn: 'There is a flood on the road.' },
      { fil: 'Kidlat', en: 'Lightning', pr: 'KID-lat', ex: 'Nakakatakot ang kidlat.', exEn: 'Lightning is scary.' },
      { fil: 'Kulog', en: 'Thunder', pr: 'KOO-log', ex: 'Narinig ko ang kulog.', exEn: 'I heard the thunder.' }
    ]
  },
  {
    id: 'feel', name: 'Feelings', icon: '😊', color: '#db2777',
    words: [
      { fil: 'Masaya', en: 'Happy', pr: 'mah-SAH-yah', ex: 'Masaya ako ngayon.', exEn: 'I am happy today.' },
      { fil: 'Malungkot', en: 'Sad', pr: 'mah-loong-KOT', ex: 'Malungkot siya.', exEn: 'He/She is sad.' },
      { fil: 'Galit', en: 'Angry', pr: 'GAH-lit', ex: 'Huwag kang magalit.', exEn: "Don't be angry." },
      { fil: 'Pagod', en: 'Tired', pr: 'PAH-god', ex: 'Pagod na pagod ako.', exEn: 'I am very tired.' },
      { fil: 'Takot', en: 'Afraid', pr: 'tah-KOT', ex: 'Takot ako sa aso.', exEn: 'I am afraid of dogs.' },
      { fil: 'Inaantok', en: 'Sleepy', pr: 'ee-nah-an-TOK', ex: 'Inaantok na ako.', exEn: 'I am sleepy now.' },
      { fil: 'Kinakabahan', en: 'Nervous', pr: 'kee-nah-kah-BAH-han', ex: 'Kinakabahan ako sa pagsusulit.', exEn: 'I am nervous about the exam.' },
      { fil: 'Nagulat', en: 'Surprised', pr: 'nah-GOO-lat', ex: 'Nagulat ako sa balita.', exEn: 'I was surprised by the news.' },
      { fil: 'Nag-aalala', en: 'Worried', pr: 'nag-ah-ah-LAH-lah', ex: 'Nag-aalala ako sa iyo.', exEn: 'I am worried about you.' },
      { fil: 'Nahihiya', en: 'Shy / Embarrassed', pr: 'nah-hee-HEE-yah', ex: 'Nahihiya akong magsalita.', exEn: 'I am shy to speak.' },
      { fil: 'Mabuti', en: 'Good / Fine', pr: 'mah-BOO-tee', ex: 'Mabuti naman ako, salamat.', exEn: "I'm fine, thank you." },
      { fil: 'Ayos lang', en: "I'm okay / It's fine", pr: 'ah-YOS lang', ex: 'Ayos lang ako.', exEn: "I'm okay." }
    ]
  },
  {
    id: 'verbs', name: 'Common Verbs', icon: '🏃', color: '#b45309',
    words: [
      { fil: 'Kumain', en: 'To eat (ate)', pr: 'koo-mah-EEN', ex: 'Kumain na tayo.', exEn: "Let's eat." },
      { fil: 'Uminom', en: 'To drink (drank)', pr: 'oo-mee-NOM', ex: 'Uminom ka ng tubig.', exEn: 'Drink some water.' },
      { fil: 'Matulog', en: 'To sleep', pr: 'mah-too-LOG', ex: 'Matutulog na ako.', exEn: 'I am going to sleep now.' },
      { fil: 'Maglakad', en: 'To walk', pr: 'mag-lah-KAD', ex: 'Gusto kong maglakad.', exEn: 'I want to walk.' },
      { fil: 'Magbasa', en: 'To read', pr: 'mag-bah-SAH', ex: 'Mahilig akong magbasa.', exEn: 'I love reading.' },
      { fil: 'Magsulat', en: 'To write', pr: 'mag-soo-LAT', ex: 'Magsulat ka ng pangalan mo.', exEn: 'Write your name.' },
      { fil: 'Magsalita', en: 'To speak', pr: 'mag-sah-lee-TAH', ex: 'Gusto kong magsalita ng Tagalog.', exEn: 'I want to speak Tagalog.' },
      { fil: 'Pumunta', en: 'To go (went)', pr: 'poo-moon-TAH', ex: 'Pumunta kami sa palengke.', exEn: 'We went to the market.' },
      { fil: 'Dumating', en: 'To arrive (arrived)', pr: 'doo-mah-TING', ex: 'Dumating na siya.', exEn: 'He/She has arrived.' },
      { fil: 'Magluto', en: 'To cook', pr: 'mag-LOO-toh', ex: 'Magluluto ako ng adobo.', exEn: 'I will cook adobo.' },
      { fil: 'Mag-aral', en: 'To study', pr: 'mag-AH-ral', ex: 'Mag-aaral ako ng Filipino.', exEn: 'I will study Filipino.' },
      { fil: 'Tumulong', en: 'To help (helped)', pr: 'too-moo-LONG', ex: 'Tumulong siya sa akin.', exEn: 'He/She helped me.' }
    ]
  },
  {
    id: 'home', name: 'At Home', icon: '🏠', color: '#4d7c0f',
    words: [
      { fil: 'Bahay', en: 'House / Home', pr: 'BAH-hai', ex: 'Malaki ang bahay namin.', exEn: 'Our house is big.' },
      { fil: 'Kwarto', en: 'Bedroom / Room', pr: 'KWAR-toh', ex: 'Nasa kwarto siya.', exEn: 'He/She is in the bedroom.' },
      { fil: 'Kusina', en: 'Kitchen', pr: 'koo-SEE-nah', ex: 'Nagluluto si nanay sa kusina.', exEn: 'Mother is cooking in the kitchen.' },
      { fil: 'Sala', en: 'Living room', pr: 'SAH-lah', ex: 'Nanonood kami sa sala.', exEn: 'We are watching TV in the living room.' },
      { fil: 'Pinto', en: 'Door', pr: 'PIN-toh', ex: 'Isara mo ang pinto.', exEn: 'Close the door.' },
      { fil: 'Bintana', en: 'Window', pr: 'bin-TAH-nah', ex: 'Buksan mo ang bintana.', exEn: 'Open the window.' },
      { fil: 'Mesa', en: 'Table', pr: 'MEH-sah', ex: 'Nasa mesa ang pagkain.', exEn: 'The food is on the table.' },
      { fil: 'Upuan', en: 'Chair', pr: 'oo-poo-AN', ex: 'Umupo ka sa upuan.', exEn: 'Sit on the chair.' },
      { fil: 'Kama', en: 'Bed', pr: 'KAH-mah', ex: 'Malambot ang kama.', exEn: 'The bed is soft.' },
      { fil: 'Ilaw', en: 'Light / Lamp', pr: 'EE-low', ex: 'Buksan mo ang ilaw.', exEn: 'Turn on the light.' },
      { fil: 'Susi', en: 'Key', pr: 'SOO-see', ex: 'Nasaan ang susi?', exEn: 'Where is the key?' },
      { fil: 'Kapitbahay', en: 'Neighbor', pr: 'kap-it-BAH-hai', ex: 'Mabait ang kapitbahay namin.', exEn: 'Our neighbor is kind.' }
    ]
  }
];

/* Flattened list with ids, used across the app. */
const ALL_WORDS = CATEGORIES.flatMap(c =>
  c.words.map((w, i) => ({ ...w, id: c.id + '-' + i, cat: c.id, catName: c.name }))
);