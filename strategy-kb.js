// ============================================================
// SHUFFLESCOPE STRATEGY KNOWLEDGE BASE
// v0.1 — Solo Shuffle focused, Season-agnostic framework
//
// Structure:
//   SPEC_DATA       — per-spec identity, win condition, key timings
//   DR_ROTATIONS    — optimal CC chains per spec / comp archetype
//   COOLDOWN_RULES  — when to use, when NOT to use, stack partners
//   TARGETING_RULES — who to train, when to swap, tunnel conditions
//   COMP_READS      — enemy comp identification & counter-strategy
//   COACHING_TIPS   — ranked, searchable tip library
// ============================================================

// ----------------------------------------------------------
// SPEC DEFINITIONS
// ----------------------------------------------------------
// win_condition: the primary way this spec wins a round
// kill_window:   expected kill attempt timing in seconds
// role:          'melee_dps' | 'ranged_dps' | 'healer' | 'hybrid'
// playstyle:     'burst' | 'sustained' | 'control' | 'attrition'
// key_abilities: abilities that define the spec's damage identity
// cc_kit:        CC abilities this spec can contribute
// defensives:    major personal defensives (name, duration, cd in seconds)

const SPEC_DATA = {

  // ═══════════════════════════════════════
  // ROGUES
  // ═══════════════════════════════════════

  'subtlety_rogue': {
    name: 'Subtlety Rogue',
    class: 'Rogue',
    role: 'melee_dps',
    playstyle: 'burst',
    win_condition: 'Open on healer with Sap → burst enemy DPS in Shadow Dance + Symbols of Death window. Kill should occur by 0:25–0:35 or reset and wait for cooldown alignment.',
    kill_window: { earliest: 15, ideal: 20, latest: 35 },
    urgency: 'HIGH', // must kill fast before defensives
    key_abilities: ['Symbols of Death', 'Shadow Dance', 'Shadowstrike', 'Eviscerate', 'Secret Technique'],
    cc_kit: [
      { spell: 'Sap',        category: 'incapacitate', duration: 45, notes: 'Pre-combat only. Primary healer lockout opener.' },
      { spell: 'Cheap Shot', category: 'stun',         duration: 4,  notes: 'Opener stun. Always opens burst window.' },
      { spell: 'Kidney Shot',category: 'stun',         duration: 6,  notes: 'Follow Cheap Shot after 18s DR reset, or mid-dance.' },
      { spell: 'Gouge',      category: 'incapacitate', duration: 5,  notes: 'Healer peel tool. Breaks on damage.' },
      { spell: 'Blind',      category: 'incapacitate', duration: 8,  notes: 'Secondary healer CC. Different DR from Sap.' },
    ],
    defensives: [
      { name: 'Evasion',        duration: 10, cd: 90,  notes: 'Against melee pressure. Do not save — use reactively.' },
      { name: 'Cloak of Shadows', duration: 5, cd: 90, notes: 'Peel spell-based kill attempts. Use on healer CC chains on you.' },
      { name: 'Feint',          duration: 6,  cd: 17,  notes: 'Passive damage reduction. Spam on cooldown.' },
      { name: 'Crimson Vial',   duration: 3,  cd: 30,  notes: 'Personal heal. Use at ~40% HP, not panic at 10%.' },
    ],
    kill_targets: ['healer_secondary', 'squishiest_dps'],
    avoid_tunneling: ['Warrior', 'Death Knight', 'Demon Hunter'],
    opener_sequence: [
      'Sap healer (pre-combat)',
      'Cheap Shot primary target',
      'Symbols of Death + Shadow Dance immediately',
      'Shadowstrike x2 to build combo points',
      'Secret Technique (5cp) if up',
      'Eviscerate (5cp)',
      'Kidney Shot if Cheap Shot DR has reset',
      'Continue burst — kill should land here',
    ],
    key_mistakes: [
      { id: 'sub_tunnel', title: 'Tunneling through defensives', desc: 'Continuing to attack a target with Evasion, Divine Shield, or Iceblock active. Swap immediately and return.', severity: 'HIGH' },
      { id: 'sub_late_cds', title: 'Holding Symbols of Death past 30s', desc: 'Sub Rogue has extremely high burst but needs CD alignment. Holding SoD past 30 seconds in a round almost always means the kill window was missed.', severity: 'HIGH' },
      { id: 'sub_dr_stack', title: 'Stacking stuns without reset', desc: 'Cheap Shot → Kidney Shot back-to-back halves Kidney duration. Ideal: Cheap Shot → teammate CC different category → Kidney Shot after stun DR reset.', severity: 'HIGH' },
      { id: 'sub_sap_timing', title: 'Sapping wrong target', desc: 'Sap should lock the healer, not the kill target. Sapping a DPS delays your opener but doesn\'t build kill pressure.', severity: 'MEDIUM' },
      { id: 'sub_no_reset', title: 'Not resetting after failed kill', desc: 'If the kill window closes (target healed through, popped defensive), Stealth reset. Do not continue trading against a full HP target — wait for CD realignment.', severity: 'MEDIUM' },
    ]
  },

  'assassination_rogue': {
    name: 'Assassination Rogue',
    class: 'Rogue',
    role: 'melee_dps',
    playstyle: 'sustained',
    win_condition: 'Apply Vendetta and maintain Bleeds on primary target. Win condition is sustained attrition — outlasting healer mana/resources rather than a single burst window.',
    kill_window: { earliest: 30, ideal: 45, latest: 90 },
    urgency: 'LOW',
    key_abilities: ['Vendetta', 'Garrote', 'Rupture', 'Envenom', 'Kingsbane'],
    cc_kit: [
      { spell: 'Garrote',    category: 'silence',      duration: 3,  notes: 'Silence on opener — use to interrupt healer casts. Renew every 18s.' },
      { spell: 'Cheap Shot', category: 'stun',         duration: 4,  notes: 'Opener stun as usual.' },
      { spell: 'Kidney Shot',category: 'stun',         duration: 6,  notes: 'Primary stun. Use to extend Vendetta window.' },
      { spell: 'Gouge',      category: 'incapacitate', duration: 5,  notes: 'Interrupt tool / peel.' },
      { spell: 'Blind',      category: 'incapacitate', duration: 8,  notes: 'Healer lockout. Coordinate with teammates.' },
    ],
    defensives: [
      { name: 'Evasion',         duration: 10, cd: 90, notes: 'Melee defense.' },
      { name: 'Cloak of Shadows',duration: 5,  cd: 90, notes: 'Dispel bleeds on yourself and purge magical CC.' },
      { name: 'Crimson Vial',    duration: 3,  cd: 30, notes: 'Self-heal. Pair with Feint for sustained survival.' },
    ],
    key_mistakes: [
      { id: 'assa_swap', title: 'Swapping off bleed target', desc: 'Assassination\'s damage is DoT-based. Swapping target resets your Rupture and Garrote, costing 10–15 seconds of ramp time.', severity: 'HIGH' },
      { id: 'assa_no_garrote', title: 'Not renewing Garrote silence', desc: 'Garrote silence (with talent) is every 18s. Consistently silencing the healer prevents the burst healing that counters your attrition damage.', severity: 'MEDIUM' },
      { id: 'assa_vendetta_immune', title: 'Vendetta used on immune target', desc: 'Using Vendetta while the target has an active damage immunity (Divine Shield, Ice Block) wastes the cooldown entirely.', severity: 'HIGH' },
    ]
  },

  // ═══════════════════════════════════════
  // MAGE
  // ═══════════════════════════════════════

  'fire_mage': {
    name: 'Fire Mage',
    class: 'Mage',
    role: 'ranged_dps',
    playstyle: 'burst',
    win_condition: 'Combustion window with a Polymorph or Dragon\'s Breath on the healer. Kill target must have no active defensives. Hard burst of ~3 seconds should eliminate a target.',
    kill_window: { earliest: 15, ideal: 20, latest: 40 },
    urgency: 'HIGH',
    key_abilities: ['Combustion', 'Fire Blast', 'Phoenix Flames', 'Pyroblast', 'Meteor'],
    cc_kit: [
      { spell: 'Polymorph',     category: 'incapacitate', duration: 8, notes: 'Primary healer CC. Never clip with another incap.' },
      { spell: 'Dragon\'s Breath', category: 'disorient', duration: 4, notes: 'Melee stopper / healer lockout combo.' },
      { spell: 'Frost Nova',    category: 'root',         duration: 8, notes: 'Zone control. Breaks on damage.' },
      { spell: 'Counterspell', category: 'silence',       duration: 6, notes: 'Interrupt primary. Use on healer casts, not filler.' },
    ],
    defensives: [
      { name: 'Ice Block',       duration: 10, cd: 240, notes: 'Full immunity. Use when near death or during enemy burst cooldowns.' },
      { name: 'Blazing Barrier', duration: 10, cd: 25,  notes: 'Maintain on cooldown. Does not require active use.' },
      { name: 'Shimmer',         duration: 0,  cd: 20,  notes: 'Instant blink. Peel from melee. Never hold for more than 1 charge.' },
    ],
    key_mistakes: [
      { id: 'fire_combustion_no_cc', title: 'Combustion without healer CC', desc: 'Fire Mage burst is entirely wasted if the healer is free. Polymorph or Dragon\'s Breath must land on the healer before Combustion activates.', severity: 'HIGH' },
      { id: 'fire_combustion_defensive', title: 'Combustion into target defensive', desc: 'Activating Combustion while the kill target has Divine Shield, Ice Block, or Turtle up wastes the entire window. Track enemy defensives.', severity: 'HIGH' },
      { id: 'fire_poly_dr', title: 'Polymorph into incapacitate DR', desc: 'If the healer was already CCed by a Sap, Blind, or Gouge, Polymorph hits at reduced duration. Communicate before casting.', severity: 'MEDIUM' },
      { id: 'fire_iceblock_panic', title: 'Ice Block used above 40% HP', desc: 'Ice Block is a full immunity with a 4-minute CD. Using it at 50–70% HP wastes the CD — it should be saved for near-death moments or to cancel enemy offensive cooldown windows.', severity: 'MEDIUM' },
    ]
  },

  'frost_mage': {
    name: 'Frost Mage',
    class: 'Mage',
    role: 'ranged_dps',
    playstyle: 'control',
    win_condition: 'Control game — freeze → damage cycle. Win through sustained control while your healer keeps you alive, or through Frozen Orb + Icy Veins burst window.',
    kill_window: { earliest: 25, ideal: 40, latest: 70 },
    urgency: 'MEDIUM',
    key_abilities: ['Icy Veins', 'Frozen Orb', 'Ice Lance', 'Glacial Spike', 'Shatter'],
    cc_kit: [
      { spell: 'Polymorph',  category: 'incapacitate', duration: 8, notes: 'Healer lockout. Frost Nova does NOT share DR with Poly.' },
      { spell: 'Frost Nova', category: 'root',         duration: 8, notes: 'Free Shatter combos. Reset on Ice Lance hit.' },
      { spell: 'Freeze',     category: 'root',         duration: 8, notes: 'Water Elemental. Root for Shatter combos.' },
      { spell: 'Counterspell', category: 'silence',    duration: 6, notes: 'Hard interrupt. Prioritize healer spells.' },
    ],
    key_mistakes: [
      { id: 'frost_shatter', title: 'Not shattering Frozen targets', desc: 'Ice Lance into a Frozen target hits for 3× damage. Every Frost Nova or Freeze must be followed immediately by Ice Lance(s) to exploit Shatter.', severity: 'HIGH' },
      { id: 'frost_glacial_no_freeze', title: 'Glacial Spike without Freeze setup', desc: 'Glacial Spike is most effective when the target is Frozen (Shatter multiplier). Casting it without a Freeze active significantly reduces its damage.', severity: 'MEDIUM' },
    ]
  },

  // ═══════════════════════════════════════
  // WARRIOR
  // ═══════════════════════════════════════

  'arms_warrior': {
    name: 'Arms Warrior',
    class: 'Warrior',
    role: 'melee_dps',
    playstyle: 'burst',
    win_condition: 'Bladestorm or Recklessness window with healer CC\'d. Warrior wins through raw burst — stack Mortal Strike passive healing reduction with a stacked buff window.',
    kill_window: { earliest: 10, ideal: 20, latest: 45 },
    urgency: 'HIGH',
    key_abilities: ['Recklessness', 'Bladestorm', 'Mortal Strike', 'Colossus Smash', 'Warbreaker'],
    cc_kit: [
      { spell: 'Intimidating Shout', category: 'disorient', duration: 8,  notes: 'AoE disorient. Hard to use efficiently in SS — prioritize single-target CC unless peeling.' },
      { spell: 'Hamstring',          category: 'root',       duration: 0,  notes: 'Slow only, not hard CC. Maintain for mobility control.' },
      { spell: 'Storm Bolt',         category: 'stun',       duration: 4,  notes: 'Talented. Single-target stun. Strong into casters.' },
      { spell: 'Charge',             category: 'stun',       duration: 1.5,notes: 'Short stun on charge. Good opener.' },
    ],
    defensives: [
      { name: 'Die by the Sword', duration: 8,  cd: 120, notes: '100% parry. Use when trained by melee or during enemy burst.' },
      { name: 'Spell Reflect',    duration: 5,  cd: 25,  notes: 'Reflect + magic reduction. Use vs. casters.' },
      { name: 'Rallying Cry',     duration: 10, cd: 180, notes: 'Party-wide HP buff. Save for crucial moments.' },
    ],
    key_mistakes: [
      { id: 'warrior_bladestorm_timing', title: 'Bladestorm while CC\'d or rooted', desc: 'Bladestorm has a cast time and can be interrupted. Do not activate into CC. Also: Bladestorm makes you immune to CC — popping it while the healer is free wastes the immunity.', severity: 'HIGH' },
      { id: 'warrior_mortal_strike_gap', title: 'Mortal Strike debuff lapsing', desc: 'Healing Reduction from Mortal Strike should be maintained on the kill target at all times. Lapses allow the healer to fully top the target between your strikes.', severity: 'MEDIUM' },
      { id: 'warrior_hamstring', title: 'Kill target not Hamstrung', desc: 'Hamstring should be maintained on the kill target to prevent kiting. A kiting target is an impossible target.', severity: 'LOW' },
    ]
  },

  // ═══════════════════════════════════════
  // PALADIN
  // ═══════════════════════════════════════

  'holy_paladin': {
    name: 'Holy Paladin',
    class: 'Paladin',
    role: 'healer',
    playstyle: 'sustained',
    win_condition: 'Keep both teammates alive through offensive rotations. Win condition is surviving enemy burst windows until their cooldowns expire, then recovering. Do NOT use Divine Shield preemptively — it\'s your emergency reset.',
    kill_window: null,
    urgency: 'LOW',
    key_abilities: ['Holy Shock', 'Flash of Light', 'Word of Glory', 'Avenging Wrath', 'Holy Avenger'],
    cc_kit: [
      { spell: 'Hammer of Justice', category: 'stun',   duration: 6, notes: 'Interrupt or peel tool. Best used to interrupt an enemy healer cast, not follow a teammate stun.' },
      { spell: 'Repentance',        category: 'incapacitate', duration: 8, notes: 'Humanoids only. Soft CC — breaks on damage.' },
      { spell: 'Blinding Light',    category: 'disorient',    duration: 5, notes: 'AoE disorient. Use to peel melee from teammates.' },
    ],
    defensives: [
      { name: 'Divine Shield',   duration: 8,  cd: 300, notes: 'FULL IMMUNITY. Use when below 30% and/or during enemy major offensive cooldowns. This is your panic button — do not save it until dead.' },
      { name: 'Blessing of Protection', duration: 10, cd: 300, notes: 'Give to a teammate to remove physical CC and make them immune to physical damage. Strong vs. melee cleave.' },
      { name: 'Lay on Hands',    duration: 0,  cd: 600, notes: 'Full HP instant heal on a teammate. Use the second a kill attempt starts on a teammate at low HP.' },
    ],
    key_mistakes: [
      { id: 'hpal_divine_shield_late', title: 'Divine Shield used too late (died first)', desc: 'Divine Shield is full immunity. If you die before using it, the round is likely lost. At below 25% HP with enemy offensive cooldowns active, Divine Shield now.', severity: 'HIGH' },
      { id: 'hpal_LoH_unused', title: 'Lay on Hands unused when teammate died', desc: 'Lay on Hands is a full heal on a 10-minute cooldown. If a teammate died while LoH was available, that was almost always a preventable death.', severity: 'HIGH' },
      { id: 'hpal_hammer_stun_chain', title: 'Hammer of Justice into teammate stun', desc: 'HoJ after a rogue\'s Cheap Shot wastes 50% of its duration. Save HoJ to interrupt healer casts or break on a fresh DR window.', severity: 'MEDIUM' },
      { id: 'hpal_overhealing', title: 'Flash of Light spam when target at 90%+ HP', desc: 'Flash of Light costs significant mana. Avoid topping targets who are not under pressure — conserve mana for actual kill attempts.', severity: 'LOW' },
    ]
  },

  'resto_druid': {
    name: 'Restoration Druid',
    class: 'Druid',
    role: 'healer',
    playstyle: 'attrition',
    win_condition: 'HoT blanket and Cyclone-kiting. Win condition is surviving by cycling Cyclone on enemy DPS and maintaining HoTs. Force the enemy team to chase you through movement.',
    kill_window: null,
    urgency: 'LOW',
    key_abilities: ['Regrowth', 'Rejuvenation', 'Lifebloom', 'Ironbark', 'Tranquility'],
    cc_kit: [
      { spell: 'Cyclone',           category: 'disorient', duration: 6,  notes: 'PRIMARY TOOL. Cycle between enemy DPS to reduce incoming pressure. Does not break on damage.' },
      { spell: 'Entangling Roots',  category: 'root',      duration: 8,  notes: 'Zone control. Keep melee off yourself.' },
      { spell: 'Hibernate',         category: 'incapacitate', duration: 40, notes: 'Beasts/Dragonkin only. Situational.' },
      { spell: 'Skull Bash',        category: 'silence',   duration: 4,  notes: 'Melee interrupt. Use on enemy healer if in range.' },
    ],
    key_mistakes: [
      { id: 'rdruid_no_cyclone', title: 'Not Cycloning during enemy offensive CDs', desc: 'When an enemy activates a major cooldown (Recklessness, Combustion, etc.), immediately Cyclone them. This directly counters the burst window.', severity: 'HIGH' },
      { id: 'rdruid_hardcast', title: 'Hard-casting Regrowth while trained', desc: 'Hard-casting spells while a melee is on you almost always results in interrupted or kicked casts. Maintain HoTs proactively so instant-cast heals sustain without hard-casting.', severity: 'HIGH' },
      { id: 'rdruid_roots', title: 'Not rooting melee training you', desc: 'Entangling Roots and Bear Form are your primary self-peel tools. If a melee is on you for more than 5 seconds without using these, you\'re taking unnecessary damage.', severity: 'MEDIUM' },
    ]
  },

  // ═══════════════════════════════════════
  // DEATH KNIGHT
  // ═══════════════════════════════════════

  'frost_dk': {
    name: 'Frost Death Knight',
    class: 'Death Knight',
    role: 'melee_dps',
    playstyle: 'burst',
    win_condition: 'Pillar of Frost + Empower Rune Weapon stacked burst window. Win through overwhelming single-target damage inside a 12-second window. Healer must be CC\'d or interrupted.',
    kill_window: { earliest: 10, ideal: 15, latest: 35 },
    urgency: 'HIGH',
    key_abilities: ['Pillar of Frost', 'Empower Rune Weapon', 'Obliterate', 'Frostwyrm\'s Fury', 'Remorseless Winter'],
    cc_kit: [
      { spell: 'Chains of Ice', category: 'root', duration: 8, notes: 'Soft root / slow. Maintain on kill target.' },
      { spell: 'Death Grip',    category: 'root',  duration: 0, notes: 'Pull utility. Use to drag healer away from teammate or to break LoS.' },
      { spell: 'Remorseless Winter', category: 'stun', duration: 3, notes: 'AoE stun inside the winter. Requires 3 seconds of enemies in range.' },
      { spell: 'Asphyxiate',   category: 'stun',  duration: 5, notes: 'Talented single-target stun. Use to extend kill window.' },
    ],
    key_mistakes: [
      { id: 'fdk_pillar_no_cc', title: 'Pillar of Frost without healer lockout', desc: 'Pillar of Frost burst is negated by 1–2 healer GCDs. Must have healer CC\'d or interrupted before activating.', severity: 'HIGH' },
      { id: 'fdk_death_grip_waste', title: 'Death Grip used non-strategically', desc: 'Death Grip has a 25-second cooldown and is one of your strongest utility tools. Using it as a gap closer wastes its utility as a healer pull or interrupt.', severity: 'MEDIUM' },
    ]
  },

  // ═══════════════════════════════════════
  // DEMON HUNTER
  // ═══════════════════════════════════════

  'havoc_dh': {
    name: 'Havoc Demon Hunter',
    class: 'Demon Hunter',
    role: 'melee_dps',
    playstyle: 'burst',
    win_condition: 'Meta + Momentum burst window. Extremely high single-target damage with massive mobility. Win through gap-close pressure; kill window is very short but very high damage.',
    kill_window: { earliest: 8, ideal: 15, latest: 30 },
    urgency: 'HIGH',
    key_abilities: ['Metamorphosis', 'Fel Rush', 'Eye Beam', 'Blade Dance', 'Demonic'],
    cc_kit: [
      { spell: 'Imprison',   category: 'incapacitate', duration: 6, notes: 'Hard CC on non-enemy NPCs and players. Use to stall healer.' },
      { spell: 'Chaos Nova', category: 'stun',         duration: 5, notes: 'AoE stun. Combine with Eye Beam for massive burst.' },
      { spell: 'Sigil of Silence', category: 'silence', duration: 4, notes: 'Delayed silence (2s after placement). Use predictively.' },
      { spell: 'Sigil of Misery', category: 'disorient', duration: 5, notes: 'Delayed AoE disorient. Strong zone control.' },
    ],
    key_mistakes: [
      { id: 'dh_meta_waste', title: 'Metamorphosis used defensively when not needed', desc: 'Meta is your primary offensive cooldown. Using it to survive when not under lethal threat wastes your kill window. Save for offensive burst.', severity: 'HIGH' },
      { id: 'dh_eye_beam_cc', title: 'Eye Beam interrupted by CC', desc: 'Eye Beam is channeled and breaks on CC. Cast Eye Beam only when you are not about to be stunned or CCed. Use Blur or Darkness first if needed.', severity: 'HIGH' },
      { id: 'dh_fel_rush_wasted', title: 'Fel Rush used as gap closer when Vengeful Retreat available', desc: 'Fel Rush charges are your escape and re-engage tool. Burning both charges to gap-close leaves you with no escape when you need to disengage.', severity: 'MEDIUM' },
    ]
  },

  // ═══════════════════════════════════════
  // BALANCE DRUID
  // ═══════════════════════════════════════

  'balance_druid': {
    name: 'Balance Druid',
    class: 'Druid',
    role: 'ranged_dps',
    playstyle: 'sustained',
    win_condition: 'Starsurge + Starfall DoT pressure sustained through prolonged rounds. Win through healer attrition and Incapacitating Roar + Celestial Alignment burst.',
    kill_window: { earliest: 30, ideal: 50, latest: 90 },
    urgency: 'LOW',
    key_abilities: ['Celestial Alignment', 'Starsurge', 'Starfall', 'Moonfire', 'Sunfire'],
    cc_kit: [
      { spell: 'Cyclone',              category: 'disorient',    duration: 6,  notes: 'BEST CC. Cycle enemy DPS to reduce pressure and waste their cooldowns.' },
      { spell: 'Entangling Roots',     category: 'root',         duration: 8,  notes: 'Kite tool. Root melee training you or healer.' },
      { spell: 'Incapacitating Roar',  category: 'incapacitate', duration: 3,  notes: 'Short AoE incapacitate in Bear Form.' },
      { spell: 'Mighty Bash',          category: 'stun',         duration: 5,  notes: 'Talented. Single-target stun for kill window.' },
    ],
    key_mistakes: [
      { id: 'boomkin_los', title: 'Not using line-of-sight vs melee', desc: 'Balance Druid is most effective when using pillars to break melee lines of sight, forcing them to chase while you maintain cast uptime at range.', severity: 'HIGH' },
      { id: 'boomkin_ca_no_cc', title: 'Celestial Alignment without healer CC', desc: 'Same principle as Fire Mage Combustion — your burst cooldown is wasted without healer lockout.', severity: 'HIGH' },
    ]
  },
};

// ----------------------------------------------------------
// DR ROTATION TEMPLATES
// Per spec: optimal CC chain patterns that avoid DR waste
// ----------------------------------------------------------

const DR_ROTATIONS = {

  'subtlety_rogue': {
    primary: {
      name: 'Standard Burst Opener',
      sequence: [
        { actor: 'self',    spell: 'Sap',          category: 'incapacitate', notes: 'Lock healer pre-combat' },
        { actor: 'self',    spell: 'Cheap Shot',   category: 'stun',         notes: 'Open kill target, start dance' },
        { actor: 'partner', spell: 'ANY',           category: 'disorient',   notes: 'Partner CC on healer (diff DR from Sap)' },
        { actor: 'self',    spell: 'Kidney Shot',  category: 'stun',         notes: 'After Cheap Shot DR resets (~18s), or if partner stuns first' },
        { actor: 'self',    spell: 'Blind',        category: 'incapacitate', notes: 'Re-CC healer if Sap expired' },
      ],
      warnings: [
        'Never Kidney Shot immediately after Cheap Shot — wait for DR reset or use partner CC bridge',
        'Blind on healer should not follow a Sap unless 18s have passed',
        'If partner uses a stun into your Cheap Shot, both are wasted — communicate target',
      ]
    }
  },

  'fire_mage': {
    primary: {
      name: 'Combustion Setup',
      sequence: [
        { actor: 'partner', spell: 'Sap / Cheapshot', category: 'any',         notes: 'Partner opens healer CC' },
        { actor: 'self',    spell: 'Polymorph',        category: 'incapacitate',notes: 'DIFFERENT DR from partner CC — or wait for reset' },
        { actor: 'self',    spell: 'Combustion',       category: 'cooldown',    notes: 'Activate NOW — healer is CC\'d' },
        { actor: 'self',    spell: 'Dragon\'s Breath', category: 'disorient',   notes: 'If healer breaks Poly — backup CC, different DR' },
      ],
      warnings: [
        'Poly after Sap = DR collision if less than 18s elapsed. Communicate with rogue partner.',
        'Dragon\'s Breath is disorient — different DR from Polymorph. Safe to chain.',
        'Do not activate Combustion if kill target has an active defensive',
      ]
    }
  },

  'arms_warrior': {
    primary: {
      name: 'Recklessness Window',
      sequence: [
        { actor: 'partner', spell: 'CC healer',    category: 'any',   notes: 'Healer locked before Reck' },
        { actor: 'self',    spell: 'Charge',       category: 'stun',  notes: 'Opener charge stun' },
        { actor: 'self',    spell: 'Recklessness', category: 'cooldown', notes: 'Activate after Charge stun, healer CC\'d' },
        { actor: 'self',    spell: 'Warbreaker / Colossus Smash', category: 'cooldown', notes: 'Stack with Reck immediately' },
        { actor: 'self',    spell: 'Storm Bolt',   category: 'stun',  notes: 'If talented — extend the kill window, fresh DR from Charge' },
      ],
      warnings: [
        'Storm Bolt after Charge shares stun DR — if chaining in same window, Storm Bolt will be halved',
        'Intimidating Shout is AoE and will break nearby CC — use single-target CC instead',
      ]
    }
  },
};

// ----------------------------------------------------------
// COMP READS
// Identify enemy team archetype and suggest counter-strategy
// ----------------------------------------------------------

const COMP_READS = {

  'TSG': {
    name: 'TSG (Warrior + DK + Healer)',
    identify: ['Arms Warrior', 'Death Knight', 'Healer'],
    threat_level: 'HIGH',
    description: 'Extremely high melee burst. Both DPS have strong single-target stuns. Typically win through stacking burst on one target.',
    counter_strategy: [
      'Identify which DPS is the kill target early — usually whichever one has stacked more CDs first.',
      'Healer must pre-hot the trained target and save a major defensive for the burst window.',
      'Interrupt Death Knight\'s Death Coil / Death Strike — these are significant heals.',
      'Purge/Dispel the warrior\'s Rallying Cry and Ignore Pain if possible.',
      'Avoid being death-gripped away from your teammates — reposition back ASAP.',
    ]
  },

  'RMX': {
    name: 'RMX (Rogue + Mage + X)',
    identify: ['Rogue', 'Mage', 'Healer'],
    threat_level: 'HIGH',
    description: 'Coordinated setup cleave. Sap opener into Cheap Shot + Combustion/Arcane Surge is one of the highest burst combos in the game.',
    counter_strategy: [
      'Identify the Sap attempt early — if the rogue approaches your healer, call it.',
      'Mage\'s Polymorph into Combustion is the kill sequence — interrupt the Poly if possible.',
      'If Poly lands and Combustion activates: Paladin uses Divine Shield, Druid uses Barkskin + NS, Priest uses Pain Suppression.',
      'After the burst window closes (Combustion is 12s), their kill pressure drops significantly — this is your counterplay window.',
      'The kill target should use defensives immediately when Combustion visual appears.',
    ]
  },

  'WLS': {
    name: 'WLS (Warlock + Shaman + Healer)',
    identify: ['Warlock', 'Shaman', 'Healer'],
    threat_level: 'MEDIUM',
    description: 'Sustained curse/DoT pressure with strong CC (Fear, Hex, Capacitor Totem). Win condition is attrition and healer oom.',
    counter_strategy: [
      'Dispel curses aggressively — Warlock damage multiplies with stacked debuffs.',
      'Wind Shear has an 8-second lockout on a 12-second CD — track it carefully.',
      'Fear is disorient DR — Cyclone, Intimidating Shout, Dragon\'s Breath are all different DR categories.',
      'Kill the Shaman first if possible — they are typically squishier and losing their interrupts/totems cripples the comp.',
    ]
  },

};

// ----------------------------------------------------------
// GENERAL COACHING TIPS (searchable library)
// ----------------------------------------------------------

const COACHING_TIPS = [

  // ── FUNDAMENTALS ──
  {
    id: 'tip_dr_categories',
    category: 'DR Fundamentals',
    title: 'The 5 DR categories you must track',
    content: 'Every CC ability belongs to one of 5 categories: Stun, Incapacitate, Disorient, Silence, Root. All CCs in the same category share a timer. First application = 100% duration. Second = 50%. Third = 25%. Fourth = IMMUNE. After 18 seconds with no CC in that category, the target resets to full.',
    applies_to: 'all',
    priority: 1,
  },
  {
    id: 'tip_kill_window',
    category: 'Kill Pressure',
    title: 'What is a kill window and why it matters',
    content: 'A kill window is a brief period where your offensive cooldowns are active, the healer is CC\'d, and the target has no defensive. Outside this window, you are building toward the next one, not trying to brute-force damage through heals. In Solo Shuffle, most rounds should have 1–2 genuine kill windows. Identifying them and executing is the difference between 1800 and 2400.',
    applies_to: 'all',
    priority: 1,
  },
  {
    id: 'tip_healer_priority',
    category: 'Targeting',
    title: 'Healer CC is a shared responsibility',
    content: 'In Solo Shuffle you cannot assign roles, but the kill attempt always requires healer lockout. Someone on your side needs to CC the healer before or during the burst window. If you are the rogue, that is your Sap/Blind. If you are the mage, that is your Polymorph. If both players attack the target without CCing the healer, the healer will simply outheal the damage.',
    applies_to: 'all',
    priority: 1,
  },
  {
    id: 'tip_defensive_tracking',
    category: 'Cooldown Tracking',
    title: 'Track enemy defensives before pressing your burst',
    content: 'The most common cause of wasted burst cooldowns is attacking a target that immediately uses a personal defensive. Before activating Combustion, Recklessness, or Symbols of Death, verify your kill target has no immunity or major defensive active. Learn the visual identifiers: Divine Shield (golden bubble), Ice Block (ice cube), Turtle (turtle shell), Evasion (green swirling), etc.',
    applies_to: 'all',
    priority: 1,
  },

  // ── POSITIONING ──
  {
    id: 'tip_pillar_usage',
    category: 'Positioning',
    title: 'Line-of-sight pillars — offensive use, not just defensive',
    content: 'Pillars are usually discussed as defensive tools (break line of sight to stop casts). But they are also offensive — walking a healer behind a pillar from their partner forces them to choose between casting and staying in range of their teammate. Rogue + Mage teams are particularly effective at splitting the healer from the enemy DPS using pillar positioning.',
    applies_to: 'all',
    priority: 2,
  },

  // ── COMMUNICATION ──
  {
    id: 'tip_ss_no_comms',
    category: 'Solo Shuffle Meta',
    title: 'Playing without comms — reading the table',
    content: 'Solo Shuffle has no voice communication. You must read what your teammates are doing and react. Key signals: if a rogue approaches the healer stealthed, they are about to Sap — this is your cue to prep your CC or burst. If a mage casts Combustion, use your CC on the healer immediately even without being told. Pattern recognition replaces callouts.',
    applies_to: 'all',
    priority: 2,
  },

  // ── SPEC SPECIFIC ──
  {
    id: 'tip_rogue_dance_timing',
    category: 'Subtlety Rogue',
    title: 'Shadow Dance: how to not waste charges',
    content: 'Shadow Dance has 2 charges with a 1-minute shared recharge. Opening a dance with fewer than 5 combo points, or using it when the healer is not CC\'d, wastes the window. The sequence: Cheap Shot (generates energy) → Shadowstrike × 2 → 5cp finisher. If you entered dance at 0cp you will likely run out of energy before dealing optimal damage.',
    applies_to: 'subtlety_rogue',
    priority: 1,
  },
  {
    id: 'tip_hpal_avenging_wrath',
    category: 'Holy Paladin',
    title: 'Avenging Wrath timing as a healer',
    content: 'Healers should activate Avenging Wrath reactively, not proactively. Wait until your teammate is below 40% HP and you are receiving high pressure. The increased healing output and potential Hammer of Justice reset during Wings can turn a near-death into a full recovery.',
    applies_to: 'holy_paladin',
    priority: 2,
  },
];

// ----------------------------------------------------------
// EXPORTS — used by the analyzer
// ----------------------------------------------------------

const StrategyKB = {
  specs: SPEC_DATA,
  drRotations: DR_ROTATIONS,
  compReads: COMP_READS,
  tips: COACHING_TIPS,

  getSpec(specName) {
    const key = specName.toLowerCase().replace(/[\s']/g, '_');
    return this.specs[key] || null;
  },

  getTipsForSpec(specName) {
    const key = specName.toLowerCase().replace(/[\s']/g, '_');
    return this.tips.filter(t => t.applies_to === 'all' || t.applies_to === key);
  },

  // Given an array of mistake objects from the analyzer, enrich them
  // with KB context (win condition alignment, known patterns)
  enrichMistakes(mistakes, specName) {
    const spec = this.getSpec(specName);
    if (!spec) return mistakes;

    return mistakes.map(m => {
      // Find matching known mistake pattern
      const known = spec.key_mistakes?.find(km =>
        m.category.toLowerCase().includes(km.category?.toLowerCase() || '') ||
        m.title.toLowerCase().includes(km.title?.toLowerCase().split(' ')[0] || '')
      );
      if (known) {
        return {
          ...m,
          kbMatch: known.id,
          enhancedTip: known.desc,
          severity: known.severity || m.severity,
        };
      }
      return m;
    });
  },

  // Return the win condition string for a spec
  getWinCondition(specName) {
    const spec = this.getSpec(specName);
    return spec?.win_condition || null;
  },

  // Given detected specs in a round, try to identify the enemy comp
  identifyComp(specList) {
    for (const [key, comp] of Object.entries(this.compReads)) {
      const matches = comp.identify.filter(s =>
        specList.some(p => p.toLowerCase().includes(s.toLowerCase()))
      );
      if (matches.length >= 2) return { key, ...comp };
    }
    return null;
  },

  // Return DR rotation advice for a spec
  getDRRotation(specName) {
    const key = specName.toLowerCase().replace(/[\s']/g, '_');
    return this.drRotations[key] || null;
  },
};

if (typeof module !== 'undefined') module.exports = StrategyKB;
