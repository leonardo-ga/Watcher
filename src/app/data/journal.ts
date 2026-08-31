export type JournalKind = 'Story' | 'Comparison';

export interface JournalEntry {
  accent: string;
  body: readonly string[];
  date: string;
  deck: string;
  featuredWatchSlug: string;
  kind: JournalKind;
  readTime: string;
  relatedWatchSlugs: readonly string[];
  slug: string;
  tags: readonly string[];
  title: string;
  verdict?: string;
}

export const journalEntries: readonly JournalEntry[] = [
  {
    accent: '#b6b3a7',
    body: [
      'The best one-watch collection is not the most versatile watch on paper. It is the one that still feels right after the occasion has changed, the weather has turned, and the rest of the box starts gathering dust.',
      'A good chronograph earns that role through proportion rather than spectacle. There is enough visual information to make it interesting, but not so much that it becomes a costume. The dial gives your eye somewhere to land; the case keeps the whole thing grounded.',
      'The lasting appeal is not nostalgia. It is the rare feeling that a complicated object has been edited down to its essential gestures.',
    ],
    date: '18 August 2026',
    deck: 'Why the everyday watch is less about versatility and more about a shape you never tire of seeing.',
    featuredWatchSlug: 'omega-speedmaster-moonwatch',
    kind: 'Story',
    readTime: '5 min read',
    relatedWatchSlugs: ['rolex-explorer', 'tudor-black-bay-58'],
    slug: 'the-one-watch-wardrobe',
    tags: ['Everyday', 'Chronograph', 'Perspective'],
    title: 'The one-watch wardrobe',
  },
  {
    accent: '#8da39e',
    body: [
      'These two divers approach the same brief from opposite directions. One is compact and quietly traditional; the other is more expressive, with texture and presence doing more of the talking.',
      'The Black Bay 58 wins on immediate ease. Its smaller dimensions make it feel settled from the first wear, and its warmer palette softens what could otherwise be a serious tool-watch shape.',
      'The Prospex has a more individual voice. It is the better choice for someone who wants the watch to carry a little more of the conversation, especially when the dial catches changing light.',
    ],
    date: '10 August 2026',
    deck: 'Two modern divers, two distinct personalities. We put their proportions, presence, and daily appeal side by side.',
    featuredWatchSlug: 'tudor-black-bay-58',
    kind: 'Comparison',
    readTime: '7 min read',
    relatedWatchSlugs: ['tudor-black-bay-58', 'seiko-prospex-spb143'],
    slug: 'black-bay-58-vs-prospex-spb143',
    tags: ['Comparison', 'Diver', 'Daily wear'],
    title: 'Black Bay 58 vs Prospex SPB143',
    verdict: 'Choose the Black Bay for a smaller, calmer daily companion. Choose the Prospex when dial character matters as much as pure versatility.',
  },
  {
    accent: '#9d9d8c',
    body: [
      'Smaller watches do not ask for attention. They make room for the wrist, the sleeve, and the rest of the day. That restraint is precisely why they can feel so self-assured.',
      'At 38 mm, a field watch sits in the sweet spot between utility and elegance. The dial stays legible, the case stays present, and the whole object avoids becoming the first thing in the room.',
      'It is a dimension that rewards repeat wear. After a week, you stop noticing the watch and start noticing how little it asks of you.',
    ],
    date: '2 August 2026',
    deck: 'A case for smaller proportions, honest dials, and watches that know when to stay quiet.',
    featuredWatchSlug: 'hamilton-khaki-field-mechanical',
    kind: 'Story',
    readTime: '4 min read',
    relatedWatchSlugs: ['rolex-explorer', 'cartier-santos-de-cartier'],
    slug: 'the-case-for-38mm',
    tags: ['Field', 'Fit', 'Everyday'],
    title: 'The case for 38 mm',
  },
  {
    accent: '#75a996',
    body: [
      'Integrated sports watches can become loud very quickly. The best examples understand that their shape is already the statement; everything else should make that shape easier to live with.',
      'The appeal lies in continuity. Bracelet, case, and dial feel drawn as a single line, giving the watch a visual rhythm even when it is doing very little.',
      'That is why this category has become an everyday favourite. It has enough edge for a weekend, enough structure for a desk, and no need to announce itself twice.',
    ],
    date: '26 July 2026',
    deck: 'How the integrated sports watch became the most relaxed way to wear a little bit of geometry.',
    featuredWatchSlug: 'tissot-prx-powermatic-80',
    kind: 'Story',
    readTime: '4 min read',
    relatedWatchSlugs: ['grand-seiko-heritage-sbgh273', 'cartier-santos-de-cartier'],
    slug: 'integrated-without-the-noise',
    tags: ['Design', 'Integrated sports', 'Style'],
    title: 'Integrated, without the noise',
  },
  {
    accent: '#c6c7c1',
    body: [
      'The Santos and Explorer are not obvious rivals, which is exactly what makes the comparison useful. Both are icons of everyday confidence, but they communicate it in entirely different languages.',
      'The Santos is architectural and expressive. Its square case gives every outfit a little more shape, and its details reward a closer look.',
      'The Explorer is almost the opposite: a round, direct, unshowy piece of design that becomes convincing precisely because it refuses to over-explain itself.',
    ],
    date: '18 July 2026',
    deck: 'One is graphic and architectural; the other is the definition of restraint. Which everyday icon belongs on your wrist?',
    featuredWatchSlug: 'cartier-santos-de-cartier',
    kind: 'Comparison',
    readTime: '6 min read',
    relatedWatchSlugs: ['cartier-santos-de-cartier', 'rolex-explorer'],
    slug: 'santos-vs-explorer',
    tags: ['Comparison', 'Icons', 'Everyday'],
    title: 'Santos vs Explorer',
    verdict: 'The Santos brings more visual character. The Explorer is the answer when you want an icon that feels like it has nothing to prove.',
  },
  {
    accent: '#8797a4',
    body: [
      'A useful GMT does not need a passport stamp to make sense. Its real value is the small shift it creates in the way a dial is read: one hand for the immediate hour, another for a place you are keeping in mind.',
      'The best examples make that complication feel settled into the design. Nothing is there simply to say that the watch can travel; every detail should make the extra information easier to live with.',
      'That is why a restrained aviation-style GMT can feel so convincing. It gives you another horizon without asking the whole watch to become a souvenir.',
    ],
    date: '9 July 2026',
    deck: 'Why a second time zone is at its best when it quietly becomes part of the daily rhythm.',
    featuredWatchSlug: 'sinn-556a-gmt',
    kind: 'Story',
    readTime: '5 min read',
    relatedWatchSlugs: ['longines-spirit-zulu-time', 'sinn-556a-gmt'],
    slug: 'when-a-gmt-earns-its-seat',
    tags: ['GMT', 'Travel', 'Function'],
    title: 'When a GMT earns its seat',
  },
  {
    accent: '#d8d0bd',
    body: [
      'A field watch is not defined by a khaki strap or a military font. Its real appeal is a kind of visual honesty: a case that does not dominate, a dial that can be understood immediately, and enough character to reward a closer look.',
      'The Club Campus leans graphic and youthful. The Khaki Field Mechanical takes the more familiar route, turning its old-school proportions into a virtue.',
      'Both are reminders that simple watches are rarely simple to design well. When there is nowhere to hide, every number and every millimetre matters.',
    ],
    date: '30 June 2026',
    deck: 'A compact, graphic newcomer meets a modern field-watch staple. Which kind of simplicity do you want?',
    featuredWatchSlug: 'nomos-club-campus',
    kind: 'Comparison',
    readTime: '6 min read',
    relatedWatchSlugs: ['nomos-club-campus', 'hamilton-khaki-field-mechanical'],
    slug: 'club-campus-vs-khaki-field',
    tags: ['Comparison', 'Field', 'Under €2k'],
    title: 'Club Campus vs Khaki Field',
    verdict: 'The Club Campus is the livelier design object. The Khaki Field is the purer tool-watch answer. Both make a compelling argument for keeping things small.',
  },
  {
    accent: '#9b6765',
    body: [
      'Colour can make a tool watch feel personal. The trick is choosing one that lives with the design rather than sitting on top of it. Burgundy works because it shifts with the light: sometimes warm, sometimes nearly black, always a little more interesting than expected.',
      'That makes it especially effective on a dive-watch shape. All of the practical visual language is already there, so the dial gets to bring the mood.',
      'A colourful everyday watch is not necessarily the loudest thing you own. It is often simply the one you notice most on an ordinary Tuesday.',
    ],
    date: '22 June 2026',
    deck: 'A case for deep red dials, quiet experimentation, and letting a familiar silhouette surprise you.',
    featuredWatchSlug: 'seiko-5-sports-srpd69',
    kind: 'Story',
    readTime: '3 min read',
    relatedWatchSlugs: ['seiko-prospex-spb143', 'tissot-prx-powermatic-80'],
    slug: 'the-case-for-colour',
    tags: ['Colour', 'Diver', 'Style'],
    title: 'The case for colour',
  },
];
