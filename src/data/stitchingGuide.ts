/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Lang = 'en' | 'ta';

export interface Bilingual {
  en: string;
  ta: string;
}

export type StitchIcon =
  | 'measure'
  | 'pattern'
  | 'cut'
  | 'pin'
  | 'dart'
  | 'machine'
  | 'sleeve'
  | 'hook'
  | 'hand-stitch'
  | 'iron'
  | 'zipper'
  | 'hem'
  | 'elastic'
  | 'fold'
  | 'check';

export interface StitchStep {
  id: string;
  icon: StitchIcon;
  title: Bilingual;
  detail: Bilingual;
  tip?: Bilingual;
}

export interface StitchCategory {
  id: string;
  name: Bilingual;
  tagline: Bilingual;
  difficulty: Bilingual;
  time: Bilingual;
  materials: Bilingual[];
  steps: StitchStep[];
}

export const UI_TEXT = {
  eyebrow: { en: 'Learn With Us', ta: 'எங்களுடன் கற்போம்' } satisfies Bilingual,
  title: { en: 'Stitch From Scratch', ta: 'ஆரம்பம் முதல் தையல்' } satisfies Bilingual,
  subtitle: {
    en: 'A simple, step-by-step visual guide to hand-stitching your own blouse, chudithar, and everyday dresses — designed for absolute beginners.',
    ta: 'ஆரம்பநிலையாளர்களுக்காக வடிவமைக்கப்பட்ட, படிப்படியான படங்களுடன் கூடிய எளிய தையல் வழிகாட்டி — ரவிக்கை, சூடிதார், மற்றும் அன்றாட உடைகளை நீங்களே தைக்கலாம்.',
  } satisfies Bilingual,
  chooseCategory: { en: 'Choose what to stitch', ta: 'எதை தைக்க வேண்டும் என்று தேர்வு செய்யவும்' } satisfies Bilingual,
  materialsNeeded: { en: 'Materials Needed', ta: 'தேவையான பொருட்கள்' } satisfies Bilingual,
  difficulty: { en: 'Difficulty', ta: 'கடினத்தன்மை' } satisfies Bilingual,
  time: { en: 'Time Needed', ta: 'தேவையான நேரம்' } satisfies Bilingual,
  step: { en: 'Step', ta: 'படி' } satisfies Bilingual,
  of: { en: 'of', ta: '/' } satisfies Bilingual,
  proTip: { en: 'Pro Tip', ta: 'நிபுணர் குறிப்பு' } satisfies Bilingual,
  next: { en: 'Next Step', ta: 'அடுத்த படி' } satisfies Bilingual,
  prev: { en: 'Previous', ta: 'முந்தைய படி' } satisfies Bilingual,
  restart: { en: 'Start Over', ta: 'மீண்டும் தொடங்கு' } satisfies Bilingual,
  allDone: { en: "You're Done!", ta: 'முடிந்தது!' } satisfies Bilingual,
  allDoneSub: {
    en: 'You have completed all the steps. Practice makes perfect — try it on a spare piece of cloth first!',
    ta: 'நீங்கள் அனைத்து படிகளையும் முடித்துவிட்டீர்கள். பயிற்சியே சரியான தேர்ச்சியை தரும் — முதலில் ஒரு பழைய துணியில் முயற்சி செய்யவும்!',
  } satisfies Bilingual,
  needHelp: {
    en: "Can't get it right? Our tailors can help in person.",
    ta: 'சரியாக செய்ய முடியவில்லையா? எங்கள் தையல்காரர்கள் நேரடியாக உதவுவார்கள்.',
  } satisfies Bilingual,
  bookFitting: { en: 'Book a Fitting', ta: 'பொருத்தம் பதிவு செய்யவும்' } satisfies Bilingual,
  langToggleLabel: { en: 'Language', ta: 'மொழி' } satisfies Bilingual,
};

export const STITCHING_CATEGORIES: StitchCategory[] = [
  {
    id: 'blouse',
    name: { en: 'Blouse Stitching', ta: 'ரவிக்கை தையல்' },
    tagline: {
      en: 'The classic fitted saree blouse, stitched from a plain piece of cloth.',
      ta: 'சாதாரண துணியில் இருந்து பொருத்தமான சேலை ரவிக்கை தைக்கும் முறை.',
    },
    difficulty: { en: 'Intermediate', ta: 'நடுத்தர நிலை' },
    time: { en: '3 - 4 hours', ta: '3 - 4 மணி நேரம்' },
    materials: [
      { en: 'Blouse fabric (0.8m)', ta: 'ரவிக்கை துணி (0.8 மீட்டர்)' },
      { en: 'Lining fabric', ta: 'உள்வைப்பு துணி (லைனிங்)' },
      { en: 'Measuring tape', ta: 'அளவுநாடா' },
      { en: 'Tailor chalk & pins', ta: 'தையல் சுண்ணாம்பு மற்றும் பின்கள்' },
      { en: 'Hooks & eyes', ta: 'குக்கிகள்' },
      { en: 'Matching thread', ta: 'பொருத்தமான நூல்' },
    ],
    steps: [
      {
        id: 'blouse-measure',
        icon: 'measure',
        title: { en: 'Take Accurate Measurements', ta: 'சரியான அளவுகளை எடுக்கவும்' },
        detail: {
          en: 'Measure the bust, waist, shoulder, sleeve length, and blouse length using a measuring tape. Write each number down before cutting anything.',
          ta: 'அளவுநாடா கொண்டு மார்பளவு, இடையளவு, தோள்பட்டை, கை நீளம், ரவிக்கை நீளம் ஆகியவற்றை அளக்கவும். துணியை வெட்டும் முன் ஒவ்வொரு அளவையும் குறித்து வையுங்கள்.',
        },
        tip: {
          en: 'Always add 0.5 inch extra for seam allowance on every side.',
          ta: 'ஒவ்வொரு பக்கத்திலும் தையலுக்கு 0.5 அங்குலம் கூடுதலாக விடவும்.',
        },
      },
      {
        id: 'blouse-pattern',
        icon: 'pattern',
        title: { en: 'Draft the Paper Pattern', ta: 'காகித மாதிரி (பேட்டர்ன்) வரையவும்' },
        detail: {
          en: 'Using the measurements, draw the front and back blouse pattern on brown paper or newspaper. This becomes your reusable master pattern.',
          ta: 'எடுத்த அளவுகளின் அடிப்படையில் ரவிக்கையின் முன்பக்கம் மற்றும் பின்பக்க மாதிரியை பழைய பேப்பரில் வரையவும். இது மீண்டும் பயன்படுத்தக்கூடிய மாதிரி ஆகும்.',
        },
      },
      {
        id: 'blouse-cut',
        icon: 'cut',
        title: { en: 'Pin Pattern & Cut Fabric', ta: 'மாதிரியை பொருத்தி துணியை வெட்டவும்' },
        detail: {
          en: 'Fold the fabric in half, pin the paper pattern on top, and cut carefully along the edges with sharp fabric scissors.',
          ta: 'துணியை இரண்டாக மடித்து, அதன் மேல் காகித மாதிரியை பின் செய்து, கூர்மையான கத்தரிக்கோல் கொண்டு விளிம்புகளில் கவனமாக வெட்டவும்.',
        },
        tip: {
          en: 'Cut on a flat table so the fabric does not shift while cutting.',
          ta: 'வெட்டும்போது துணி நகராமல் இருக்க தட்டையான மேசையில் வைத்து வெட்டவும்.',
        },
      },
      {
        id: 'blouse-dart',
        icon: 'dart',
        title: { en: 'Stitch the Bust Darts', ta: 'மார்பு டார்ட் தைக்கவும்' },
        detail: {
          en: 'Fold the marked dart lines and stitch from the wide end to a sharp point at the tip. This gives the blouse its fitted shape.',
          ta: 'குறிக்கப்பட்ட டார்ட் கோடுகளை மடித்து, அகன்ற பகுதியில் இருந்து நுனி வரை கூர்மையாக தையல் போடவும். இது ரவிக்கைக்கு பொருத்தமான வடிவத்தை தரும்.',
        },
      },
      {
        id: 'blouse-sleeve',
        icon: 'sleeve',
        title: { en: 'Attach the Sleeves', ta: 'கைகளை பொருத்தி தைக்கவும்' },
        detail: {
          en: 'Pin the sleeve piece to the armhole matching the notches, then stitch evenly around the curve at a slow, steady machine speed.',
          ta: 'கை துணியை கை துவாரத்துடன் பொருத்தி பின் செய்து, வளைவின் வழியே மெதுவான வேகத்தில் சீராக தையல் போடவும்.',
        },
      },
      {
        id: 'blouse-side',
        icon: 'machine',
        title: { en: 'Stitch Side Seams & Lining', ta: 'பக்க தையல் மற்றும் லைனிங் தைக்கவும்' },
        detail: {
          en: 'Join the front and back pieces at the side seams, then attach the lining fabric neatly on the inside for a clean, durable finish.',
          ta: 'முன் மற்றும் பின் பகுதிகளை பக்க தையல்களில் இணைக்கவும், பின்னர் உள்பகுதியில் லைனிங் துணியை நேர்த்தியாக பொருத்தி தைக்கவும்.',
        },
      },
      {
        id: 'blouse-hooks',
        icon: 'hook',
        title: { en: 'Fix Hooks & Finish Edges', ta: 'குக்கி பொருத்தி விளிம்புகளை முடிக்கவும்' },
        detail: {
          en: 'Hand-stitch hooks and eyes along the back opening, and fold-stitch the neckline and armhole edges for a neat finish.',
          ta: 'பின்பக்க திறப்பில் குக்கிகளை கை தையலால் பொருத்தவும், கழுத்து மற்றும் கை துவார விளிம்புகளை மடித்து தைக்கவும்.',
        },
      },
      {
        id: 'blouse-press',
        icon: 'iron',
        title: { en: 'Final Pressing', ta: 'இறுதி இஸ்திரி' },
        detail: {
          en: 'Press the finished blouse with a warm iron on the reverse side so every seam sits flat and the blouse looks boutique-finished.',
          ta: 'முடிந்த ரவிக்கையை தலைகீழாக வைத்து சூடான இஸ்திரி போட்டு, ஒவ்வொரு தையலும் தட்டையாக அமைந்து பூடிக் தரமான தோற்றம் பெறும்.',
        },
      },
    ],
  },
  {
    id: 'chudithar',
    name: { en: 'Chudithar Stitching', ta: 'சூடிதார் தையல்' },
    tagline: {
      en: 'A full salwar kameez set — top, bottom pants, and dupatta.',
      ta: 'மேலாடை, கீழாடை (பேண்ட்) மற்றும் துப்பட்டா அடங்கிய முழு சூடிதார் செட்.',
    },
    difficulty: { en: 'Intermediate', ta: 'நடுத்தர நிலை' },
    time: { en: '4 - 5 hours', ta: '4 - 5 மணி நேரம்' },
    materials: [
      { en: 'Top fabric (2.5m)', ta: 'மேலாடை துணி (2.5 மீட்டர்)' },
      { en: 'Bottom/pant fabric (2.5m)', ta: 'கீழாடை துணி (2.5 மீட்டர்)' },
      { en: 'Dupatta (2.25m)', ta: 'துப்பட்டா (2.25 மீட்டர்)' },
      { en: 'Elastic for waist', ta: 'இடுப்புக்கான இலாஸ்திக்' },
      { en: 'Matching thread & pins', ta: 'பொருத்தமான நூல் மற்றும் பின்கள்' },
    ],
    steps: [
      {
        id: 'chud-measure',
        icon: 'measure',
        title: { en: 'Measure Top, Bottom & Length', ta: 'மேலாடை, கீழாடை அளவுகளை எடுக்கவும்' },
        detail: {
          en: 'Take chest, waist, hip, shoulder, kameez length, and ankle-to-waist length for the pants.',
          ta: 'மார்பு, இடுப்பு, இடுப்பு அகலம், தோள்பட்டை, மேலாடை நீளம் மற்றும் கீழாடைக்கான இடுப்பு முதல் கணுக்கால் நீளம் ஆகியவற்றை அளக்கவும்.',
        },
      },
      {
        id: 'chud-cut',
        icon: 'cut',
        title: { en: 'Cut Top, Pants & Dupatta', ta: 'மேலாடை, கீழாடை, துப்பட்டா வெட்டவும்' },
        detail: {
          en: 'Fold each fabric piece and cut the kameez body, sleeves, pant legs, and dupatta according to your pattern.',
          ta: 'ஒவ்வொரு துணியையும் மடித்து, மாதிரிக்கு ஏற்ப மேலாடை உடல் பகுதி, கைகள், கீழாடை கால்கள் மற்றும் துப்பட்டாவை வெட்டவும்.',
        },
      },
      {
        id: 'chud-yoke',
        icon: 'pattern',
        title: { en: 'Stitch the Neck Yoke', ta: 'கழுத்து யோக் தைக்கவும்' },
        detail: {
          en: 'Attach the front and back yoke pieces first, then finish the neckline with a facing or a simple bias binding.',
          ta: 'முதலில் முன் மற்றும் பின் யோக் துண்டுகளை இணைத்து, பின்னர் கழுத்துப் பகுதியை பேசிங் அல்லது பயாஸ் பட்டையால் நேர்த்தியாக முடிக்கவும்.',
        },
      },
      {
        id: 'chud-slit',
        icon: 'dart',
        title: { en: 'Stitch Side Slits', ta: 'பக்க கீற்று தைக்கவும்' },
        detail: {
          en: 'Fold and stitch the side slit openings on both sides of the kameez for ease of movement and a traditional look.',
          ta: 'மேலாடையின் இரு பக்கங்களிலும் இயக்கத்திற்கு வசதியாகவும், பாரம்பரிய தோற்றத்திற்காகவும் பக்க கீற்றுகளை மடித்து தைக்கவும்.',
        },
      },
      {
        id: 'chud-sleeve',
        icon: 'sleeve',
        title: { en: 'Attach Sleeves', ta: 'கைகளை பொருத்தவும்' },
        detail: {
          en: 'Pin sleeves to the armhole and stitch evenly, then hem the sleeve edge with a simple fold-and-stitch finish.',
          ta: 'கைகளை கை துவாரத்தில் பின் செய்து சீராக தைக்கவும், பின்னர் கை விளிம்பை மடித்து தைத்து முடிக்கவும்.',
        },
      },
      {
        id: 'chud-pant',
        icon: 'elastic',
        title: { en: 'Stitch Pants & Add Elastic', ta: 'கீழாடை தைத்து இலாஸ்திக் பொருத்தவும்' },
        detail: {
          en: 'Join the inner and outer leg seams of the pants, fold the waistband over, and insert elastic for a comfortable fit.',
          ta: 'கீழாடையின் உள் மற்றும் வெளிக் கால் தையல்களை இணைத்து, இடுப்புப் பகுதியை மடித்து, வசதியான பொருத்தத்திற்காக இலாஸ்திக் செருகவும்.',
        },
      },
      {
        id: 'chud-dupatta',
        icon: 'hem',
        title: { en: 'Finish the Dupatta Edges', ta: 'துப்பட்டா விளிம்பை முடிக்கவும்' },
        detail: {
          en: 'Fold a narrow hem along all four edges of the dupatta and stitch, or send it out for a delicate lace border.',
          ta: 'துப்பட்டாவின் நான்கு விளிம்புகளையும் மெல்லிய அளவில் மடித்து தைக்கவும், அல்லது லேஸ் விளிம்பு வைக்க வெளியே கொடுக்கலாம்.',
        },
      },
      {
        id: 'chud-final',
        icon: 'check',
        title: { en: 'Try On & Adjust', ta: 'அணிந்து பார்த்து சரி செய்யவும்' },
        detail: {
          en: 'Try on the finished set, check the fit at shoulder and waist, and make any small adjustments before final pressing.',
          ta: 'முடிந்த செட்டை அணிந்து, தோள்பட்டை மற்றும் இடுப்பு பொருத்தத்தை சரிபார்த்து, இறுதி இஸ்திரிக்கு முன் தேவையான சிறு மாற்றங்களை செய்யவும்.',
        },
      },
    ],
  },
  {
    id: 'frock',
    name: { en: 'Frock / Kurti Stitching', ta: 'பிராக் / குர்த்தி தையல்' },
    tagline: {
      en: 'A simple everyday frock or kurti, perfect for beginners.',
      ta: 'ஆரம்பநிலையாளர்களுக்கு ஏற்ற எளிய அன்றாட பிராக் அல்லது குர்த்தி.',
    },
    difficulty: { en: 'Beginner Friendly', ta: 'ஆரம்பநிலைக்கு ஏற்றது' },
    time: { en: '2 - 3 hours', ta: '2 - 3 மணி நேரம்' },
    materials: [
      { en: 'Fabric (2 - 2.5m)', ta: 'துணி (2 - 2.5 மீட்டர்)' },
      { en: 'Zipper or buttons', ta: 'ஜிப் அல்லது பட்டன்கள்' },
      { en: 'Bias tape (optional)', ta: 'பயாஸ் டேப் (விருப்பம்)' },
      { en: 'Matching thread', ta: 'பொருத்தமான நூல்' },
    ],
    steps: [
      {
        id: 'frock-measure',
        icon: 'measure',
        title: { en: 'Measure Chest & Length', ta: 'மார்பு மற்றும் நீளம் அளக்கவும்' },
        detail: {
          en: 'Measure chest/bust, waist, shoulder, and the total desired frock length from shoulder to hem.',
          ta: 'மார்பளவு, இடையளவு, தோள்பட்டை மற்றும் தோள்பட்டையில் இருந்து கீழ் விளிம்பு வரை தேவையான மொத்த பிராக் நீளத்தை அளக்கவும்.',
        },
      },
      {
        id: 'frock-cut',
        icon: 'cut',
        title: { en: 'Cut the Bodice & Skirt', ta: 'மேல்பகுதி மற்றும் பாவாடையை வெட்டவும்' },
        detail: {
          en: 'Cut the upper bodice piece close-fitted, and the lower skirt piece wider for a comfortable flare.',
          ta: 'மேல் பகுதியை நெருக்கமாகவும், கீழ் பாவாடை பகுதியை வசதியான விரிவுக்காக அகலமாகவும் வெட்டவும்.',
        },
      },
      {
        id: 'frock-bodice',
        icon: 'dart',
        title: { en: 'Stitch the Bodice', ta: 'மேல்பகுதியை தைக்கவும்' },
        detail: {
          en: 'Join the front and back bodice pieces at the shoulder and side seams, keeping the stitching line even and straight.',
          ta: 'தோள்பட்டை மற்றும் பக்க தையல்களில் முன் பின் மேல் பகுதிகளை இணைத்து, தையல் கோடு நேராகவும் சீராகவும் இருக்குமாறு பார்த்துக்கொள்ளவும்.',
        },
      },
      {
        id: 'frock-skirt',
        icon: 'machine',
        title: { en: 'Attach Skirt to Bodice', ta: 'பாவாடையை மேல்பகுதியுடன் இணைக்கவும்' },
        detail: {
          en: 'Gather the top edge of the skirt slightly and stitch it evenly to the bottom edge of the bodice all the way around.',
          ta: 'பாவாடையின் மேல் விளிம்பை சிறிது கூட்டி, மேல்பகுதியின் கீழ் விளிம்புடன் முழுவதும் சீராக தைக்கவும்.',
        },
      },
      {
        id: 'frock-neck',
        icon: 'sleeve',
        title: { en: 'Finish Neck & Sleeves', ta: 'கழுத்து மற்றும் கைகளை முடிக்கவும்' },
        detail: {
          en: 'Bind the neckline with bias tape and attach short or long sleeves, or a simple sleeveless armhole finish.',
          ta: 'கழுத்துப் பகுதியை பயாஸ் டேப் கொண்டு மூடி, குட்டையான அல்லது நீண்ட கைகளை பொருத்தவும், அல்லது கை இல்லாத எளிய முடிவை செய்யவும்.',
        },
      },
      {
        id: 'frock-zip',
        icon: 'zipper',
        title: { en: 'Insert Zipper or Buttons', ta: 'ஜிப் அல்லது பட்டன் பொருத்தவும்' },
        detail: {
          en: 'Fix a back or side zipper for easy wear, or add a row of buttons with matching buttonholes.',
          ta: 'எளிதாக அணிய பின்புறம் அல்லது பக்கவாட்டில் ஜிப் பொருத்தவும், அல்லது பொருத்தமான பட்டன்ஹோல்களுடன் பட்டன்களை வைக்கவும்.',
        },
      },
      {
        id: 'frock-hem',
        icon: 'hem',
        title: { en: 'Hem the Bottom Edge', ta: 'கீழ் விளிம்பை தைத்து முடிக்கவும்' },
        detail: {
          en: 'Fold the bottom edge twice and stitch a clean, even hem all around the skirt.',
          ta: 'கீழ் விளிம்பை இரண்டு முறை மடித்து, பாவாடையின் முழுவதும் சீராகவும் நேர்த்தியாகவும் தைக்கவும்.',
        },
      },
    ],
  },
  {
    id: 'saree-fall',
    name: { en: 'Saree Fall & Pico', ta: 'சேலை ஃபால் & பிக்கோ' },
    tagline: {
      en: 'A quick finishing job every saree needs before it is worn.',
      ta: 'ஒவ்வொரு சேலையும் அணியும் முன் தேவைப்படும் விரைவான இறுதி வேலை.',
    },
    difficulty: { en: 'Easy', ta: 'எளிதானது' },
    time: { en: '30 - 45 mins', ta: '30 - 45 நிமிடங்கள்' },
    materials: [
      { en: 'Saree fall tape (petersham)', ta: 'சேலை ஃபால் டேப்' },
      { en: 'Matching thread', ta: 'பொருத்தமான நூல்' },
      { en: 'Scissors & pins', ta: 'கத்தரிக்கோல் மற்றும் பின்கள்' },
    ],
    steps: [
      {
        id: 'fall-prep',
        icon: 'fold',
        title: { en: 'Prepare the Saree Edge', ta: 'சேலை விளிம்பை தயார் செய்யவும்' },
        detail: {
          en: 'Lay the saree flat and fold the bottom edge inward slightly to create a clean, even base for the fall.',
          ta: 'சேலையை தட்டையாக விரித்து, கீழ் விளிம்பை சிறிதளவு உள்ளே மடித்து ஃபாலுக்கு நேர்த்தியான அடித்தளத்தை உருவாக்கவும்.',
        },
      },
      {
        id: 'fall-pin',
        icon: 'pin',
        title: { en: 'Pin the Fall Tape', ta: 'ஃபால் டேப்பை பின் செய்யவும்' },
        detail: {
          en: 'Place the fall tape along the inner edge, overlapping slightly, and pin it in place every few inches.',
          ta: 'ஃபால் டேப்பை உள் விளிம்பில் சிறிதளவு மேலெடுத்து வைத்து, ஒவ்வொரு சில அங்குலங்களுக்கும் பின் செய்யவும்.',
        },
      },
      {
        id: 'fall-stitch',
        icon: 'machine',
        title: { en: 'Machine Stitch the Fall', ta: 'ஃபாலை மெஷினில் தைக்கவும்' },
        detail: {
          en: 'Stitch close to the tape edge at a slow, steady speed, keeping the saree fabric flat and unwrinkled.',
          ta: 'சேலை துணி சுருக்கமின்றி தட்டையாக இருக்குமாறு பார்த்து, டேப் விளிம்பிற்கு அருகில் மெதுவாகவும் சீராகவும் தைக்கவும்.',
        },
      },
      {
        id: 'fall-pico',
        icon: 'hand-stitch',
        title: { en: 'Add Pico Edging', ta: 'பிக்கோ விளிம்பு போடவும்' },
        detail: {
          en: 'Run the saree edge through a pico machine for a neat scalloped zig-zag finish that prevents fraying.',
          ta: 'நூல் உரிதல் தடுக்க, சேலை விளிம்பை பிக்கோ மெஷின் வழியே கொண்டு சென்று அழகிய அலை வடிவ முடிவை பெறவும்.',
        },
      },
      {
        id: 'fall-press',
        icon: 'iron',
        title: { en: 'Fold & Press Neatly', ta: 'மடித்து இஸ்திரி செய்யவும்' },
        detail: {
          en: 'Press the finished fall and pico edge flat with an iron so the saree drapes perfectly when worn.',
          ta: 'சேலை அணியும் போது சரியாக விழும் வகையில், முடிந்த ஃபால் மற்றும் பிக்கோ விளிம்பை இஸ்திரி செய்யவும்.',
        },
      },
    ],
  },
];
