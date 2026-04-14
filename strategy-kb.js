// ============================================================
// SHUFFLESCOPE STRATEGY KNOWLEDGE BASE
// v0.2 — All specs, full comp library, general tips
//
// TO UPDATE: edit this file, then paste the contents between
// "// STRATEGY KNOWLEDGE BASE" and "// COMBAT LOG PARSER"
// in wow-pvp-analyzer.html (or use the <script src> method).
//
// Structure:
//   SPEC_DATA        — per-spec win condition, mistakes, DR notes
//   DR_ROTATION_TIPS — optimal CC chain notes per spec
//   COMP_READS       — enemy comp identification & counter-strategy
//   GENERAL_TIPS     — universal tips: trinkets, LoS, positioning, etc.
//   StrategyKB       — exported object with lookup methods
// ============================================================

const SPEC_DATA = {

  // ══════════════════════════════════════════════════════
  // ROGUE
  // ══════════════════════════════════════════════════════

  subtlety_rogue: {
    name: 'Subtlety Rogue', role: 'melee_dps', playstyle: 'burst',
    win_condition: 'Sap healer pre-combat → Cheap Shot kill target → Symbols of Death + Shadow Dance burst window. Kill should land by 0:20–0:35. If the window closes, Vanish-reset and realign cooldowns rather than trading at full damage.',
    kill_window: { earliest: 15, ideal: 22, latest: 35 },
    key_mistakes: [
      { id: 'sub_dr_chain',      severity: 'HIGH',   title: 'Kidney Shot immediately after Cheap Shot',        tip: 'Back-to-back stuns halve Kidney Shot duration. Bridge with a partner CC (different DR category) or wait 18s for the stun DR reset before reapplying.' },
      { id: 'sub_late_cds',      severity: 'HIGH',   title: 'Symbols of Death held past 30 seconds',           tip: 'If you haven\'t pressed SoD by 30s, press it now. Waiting for a "perfect" window that never materialises is the most common Sub Rogue mistake at every rating.' },
      { id: 'sub_tunnel_def',    severity: 'HIGH',   title: 'Attacking through enemy defensive (Evasion / DS / IB)', tip: 'Swap target immediately when an immunity or major defensive activates. Every GCD on an immune target is wasted. Return when it expires.' },
      { id: 'sub_sap_wrong',     severity: 'MEDIUM', title: 'Sapping the kill target instead of the healer',   tip: 'Sap locks the healer. Cheap Shot opens the kill target. Reversing this wastes your stealth advantage entirely.' },
      { id: 'sub_no_vanish',     severity: 'MEDIUM', title: 'No Vanish reset after a failed kill window',       tip: 'If the kill window closes (target healed to full or popped a defensive), Vanish and reset. Sitting in combat trading at normal rate is losing.' },
      { id: 'sub_dance_lowcp',   severity: 'MEDIUM', title: 'Shadow Dance activated at 0 combo points',        tip: 'Enter Dance with energy and ideally 1–2 combo points already. Opening at 0cp means you burn the first 2 GCDs just generating resources, losing burst time.' },
      { id: 'sub_blind_sap_dr',  severity: 'MEDIUM', title: 'Blind cast within 18s of a Sap on same target',   tip: 'Blind and Sap share incapacitate DR. If you Sapped the healer and then Blind them within 18s, the Blind lands at 50% duration. Wait for the full reset.' },
    ]
  },

  assassination_rogue: {
    name: 'Assassination Rogue', role: 'melee_dps', playstyle: 'sustained',
    win_condition: 'Vendetta + stacked bleeds for sustained attrition. Win through healer mana drain over 60–90 second rounds. Garrote silence is your primary tool against healers — maintain it continuously.',
    kill_window: { earliest: 30, ideal: 50, latest: 90 },
    key_mistakes: [
      { id: 'assa_swap',         severity: 'HIGH',   title: 'Swapping off bleed target',                       tip: 'Every target swap resets your Rupture and Garrote ramp, costing 10–15 seconds of pressure. Commit to a target. Only swap if they use a full immunity.' },
      { id: 'assa_vendetta_imm', severity: 'HIGH',   title: 'Vendetta used on an immune target',               tip: 'Check for active defensives before pressing Vendetta. A Divine Shield or Ice Block makes Vendetta a 2-minute cooldown wasted.' },
      { id: 'assa_garrote',      severity: 'MEDIUM', title: 'Garrote silence not refreshed on healer',         tip: 'Garrote silence (talented) applies every 18s and is your best sustained pressure tool. Let it drop and the healer gets free casts.' },
      { id: 'assa_no_kidney',    severity: 'MEDIUM', title: 'Kidney Shot not used during Vendetta',            tip: 'Vendetta window is when the healer is most pressured. A Kidney Shot during Vendetta dramatically increases kill probability.' },
    ]
  },

  outlaw_rogue: {
    name: 'Outlaw Rogue', role: 'melee_dps', playstyle: 'burst',
    win_condition: 'Adrenaline Rush + Between the Eyes burst window. Roll the Bones for Ruthless Precision/Grand Melee buffs before activating. Kill window is fast and chaotic — requires healer CC.',
    kill_window: { earliest: 10, ideal: 20, latest: 40 },
    key_mistakes: [
      { id: 'outlaw_bte',        severity: 'HIGH',   title: 'Between the Eyes on a target with Evasion active', tip: 'BtE is your primary execute — don\'t waste it. Also: BtE on a stunned target is optimal; on a free target it can be Cloak-absorbed.' },
      { id: 'outlaw_rtb',        severity: 'MEDIUM', title: 'Adrenaline Rush used with bad Roll the Bones buffs', tip: 'Ideally hold AR for a Ruthless Precision or Grand Melee proc. Popping AR with only a minor buff up wastes significant damage.' },
      { id: 'outlaw_no_cc',      severity: 'HIGH',   title: 'Burst window without healer CC',                  tip: 'Outlaw has limited CC (Blind, Gouge). Coordinate with your partner to lock the healer before AR goes out.' },
    ]
  },

  // ══════════════════════════════════════════════════════
  // MAGE
  // ══════════════════════════════════════════════════════

  fire_mage: {
    name: 'Fire Mage', role: 'ranged_dps', playstyle: 'burst',
    win_condition: 'Combustion window with healer Polymorphed or Dragon\'s Breathed. The setup IS the kill — Combustion without healer lockout is almost always a wasted cooldown.',
    kill_window: { earliest: 15, ideal: 20, latest: 40 },
    key_mistakes: [
      { id: 'fire_comb_no_cc',   severity: 'HIGH',   title: 'Combustion activated without healer CC',          tip: 'Poly or Dragon\'s Breath must land before Combustion. If your healer CC failed, delay Combustion — do not just fire into a free healer.' },
      { id: 'fire_comb_def',     severity: 'HIGH',   title: 'Combustion into active target defensive',         tip: 'Learn the visuals: Divine Shield (golden bubble), Ice Block (ice cube), Turtle (shell), Blur (DH shimmer). Verify defensive is down before pressing Combustion.' },
      { id: 'fire_poly_dr',      severity: 'MEDIUM', title: 'Polymorph cast into incapacitate DR',             tip: 'Poly shares DR with Sap, Blind, Gouge, Hex, Freezing Trap. If your partner just used one of these on the healer, use Dragon\'s Breath (disorient, different DR) instead.' },
      { id: 'fire_ib_early',     severity: 'MEDIUM', title: 'Ice Block used above 40% HP',                    tip: 'Ice Block is a 4-minute CD. Save it for: (1) below 30% HP with burst incoming, or (2) to cancel an enemy major cooldown window you cannot survive otherwise.' },
      { id: 'fire_cs_filler',    severity: 'LOW',    title: 'Counterspell used on a filler spell',             tip: 'Counterspell has an 8-second school lockout on a 24-second CD. Never waste it on a filler. Save for the healer\'s primary heal or a pivotal DPS cast.' },
    ]
  },

  frost_mage: {
    name: 'Frost Mage', role: 'ranged_dps', playstyle: 'control',
    win_condition: 'Sustained control through Freeze/root cycles and Shatter combos. Win through long-game pressure with Icy Veins burst windows. Forces healers to play reactively rather than proactively.',
    kill_window: { earliest: 25, ideal: 40, latest: 70 },
    key_mistakes: [
      { id: 'frost_shatter',     severity: 'HIGH',   title: 'Not Shattering Frozen targets with Ice Lance',    tip: 'Frozen target + Ice Lance = 3× damage multiplier. Every Frost Nova or Freeze not followed immediately by Ice Lance(s) throws away your primary damage source.' },
      { id: 'frost_glacial',     severity: 'MEDIUM', title: 'Glacial Spike without a Freeze set up',           tip: 'Glacial Spike into a Frozen target via Shatter multiplier is essential for meaningful burst. Time your Water Elemental Freeze to land as Glacial Spike is in-flight.' },
      { id: 'frost_nova_damage', severity: 'MEDIUM', title: 'Frost Nova broken by your own AoE',               tip: 'Frost Nova root breaks on damage. Do not Blizzard or use AoE abilities after rooting a target you want to Shatter.' },
    ]
  },

  arcane_mage: {
    name: 'Arcane Mage', role: 'ranged_dps', playstyle: 'burst',
    win_condition: 'Arcane Surge + Touch of the Magi burst window. Build 4 Arcane Charges then detonate with Touch → Surge → Arcane Barrage. Requires healer CC like all mage specs.',
    kill_window: { earliest: 10, ideal: 20, latest: 35 },
    key_mistakes: [
      { id: 'arc_surge_no_cc',   severity: 'HIGH',   title: 'Arcane Surge without healer CC',                 tip: 'Arcane burst is entirely counteracted by 1–2 healer GCDs. Lock the healer first.' },
      { id: 'arc_charges',       severity: 'HIGH',   title: 'Arcane Surge used at fewer than 4 Arcane Charges', tip: 'Arcane Surge damage scales with Arcane Charges. Using it at 1–2 charges is a major damage loss. Always build to 4 before detonating.' },
      { id: 'arc_barrage_waste', severity: 'MEDIUM', title: 'Arcane Barrage used during Arcane Surge',        tip: 'During Arcane Surge, continue with Arcane Blast to maintain charges and maximize burst. Barrage dumps your charges and ends the window early.' },
    ]
  },

  // ══════════════════════════════════════════════════════
  // WARRIOR
  // ══════════════════════════════════════════════════════

  arms_warrior: {
    name: 'Arms Warrior', role: 'melee_dps', playstyle: 'burst',
    win_condition: 'Recklessness + Colossus Smash / Warbreaker window with healer CC\'d. Stack Mortal Strike healing reduction on the kill target at all times. Win condition is raw burst damage with a healing debuff.',
    kill_window: { earliest: 10, ideal: 20, latest: 45 },
    key_mistakes: [
      { id: 'war_bladestorm',    severity: 'HIGH',   title: 'Bladestorm while CCed or healer is free',         tip: 'Bladestorm is an offensive immunity tool, not a defensive one. Use it when you are free, healer is CC\'d, and your burst is stacked.' },
      { id: 'war_ms_gap',        severity: 'MEDIUM', title: 'Mortal Strike healing reduction allowed to lapse', tip: 'MS debuff on the kill target should never drop. Lapsing allows full heals between your strikes.' },
      { id: 'war_hamstring',     severity: 'LOW',    title: 'Kill target not Hamstrung',                       tip: 'An unslowed target can kite you. Apply Hamstring immediately on engage and refresh it. A kiting target is unkillable.' },
      { id: 'war_reck_no_cc',    severity: 'HIGH',   title: 'Recklessness used without healer CC',             tip: 'Same rule as every burst spec. Recklessness damage is trivialized by a free healer. Coordinate CC first.' },
    ]
  },

  fury_warrior: {
    name: 'Fury Warrior', role: 'melee_dps', playstyle: 'sustained',
    win_condition: 'Sustained Enrage uptime + Recklessness burst. Win through relentless damage and self-sustain via Bloodthirst. Less CC-dependent than Arms but still requires healer lockout for kills.',
    kill_window: { earliest: 15, ideal: 25, latest: 50 },
    key_mistakes: [
      { id: 'fury_enrage',       severity: 'HIGH',   title: 'Recklessness used without Enrage active',         tip: 'Recklessness should be used while Enraged for maximum damage. Maintain Enrage via Bloodthirst/Raging Blow before and during cooldown windows.' },
      { id: 'fury_rampage',      severity: 'MEDIUM', title: 'Rampage not used to maintain Enrage',             tip: 'Rampage is your primary Enrage refresher. Do not resource-cap and forget to spend — losing Enrage mid-burst is a significant damage loss.' },
    ]
  },

  protection_warrior: {
    name: 'Protection Warrior', role: 'hybrid', playstyle: 'control',
    win_condition: 'Sustained damage via Ignore Pain uptime + Spell Reflect utility. Win condition is outlasting opponents via exceptional self-sustain and disrupting enemy casters.',
    kill_window: { earliest: 30, ideal: 60, latest: 120 },
    key_mistakes: [
      { id: 'prot_spell_reflect', severity: 'MEDIUM', title: 'Spell Reflect held too long vs casters',         tip: 'Spell Reflect is a 25-second CD that neutralizes a caster\'s rotation. Use it proactively when a mage or warlock is casting at you, not reactively after taking the damage.' },
      { id: 'prot_ignore_pain',   severity: 'HIGH',   title: 'Ignore Pain not maintained during burst',        tip: 'Ignore Pain is your primary sustain. Keep it running during any enemy offensive cooldown window.' },
    ]
  },

  // ══════════════════════════════════════════════════════
  // PALADIN
  // ══════════════════════════════════════════════════════

  holy_paladin: {
    name: 'Holy Paladin', role: 'healer', playstyle: 'sustained',
    win_condition: 'Keep both teammates alive through enemy burst windows. Divine Shield is your emergency reset — use it before you die, not after. Offensive pressure via Hammer of Justice and Avenging Wrath is secondary.',
    kill_window: null,
    key_mistakes: [
      { id: 'hpal_ds_late',      severity: 'HIGH',   title: 'Died without using Divine Shield',               tip: 'Divine Shield is a 5-minute CD that makes you fully immune. If you die without using it, the round was probably lost at that moment. At below 25% HP with burst incoming: use it NOW.' },
      { id: 'hpal_loh',          severity: 'HIGH',   title: 'Lay on Hands unused when teammate died',         tip: 'LoH is a full instant heal on a 10-minute CD. A preventable teammate death while LoH was available is always a critical error.' },
      { id: 'hpal_hoj_chain',    severity: 'MEDIUM', title: 'Hammer of Justice following a teammate stun',    tip: 'HoJ into a rogue\'s Cheap Shot wastes 50% of its duration. Save HoJ to interrupt healer casts or use on a fresh DR window.' },
      { id: 'hpal_mana',         severity: 'LOW',    title: 'Flash of Light spam when not under pressure',    tip: 'FoL is mana-intensive. Use Holy Shock as your primary heal when targets are not under active threat. Conserve mana for genuine kill attempts.' },
      { id: 'hpal_bop_self',     severity: 'MEDIUM', title: 'Blessing of Protection used on self instead of ally', tip: 'BoP on yourself removes physical CC and is a strong defensive, but giving it to a melee DPS under pressure — especially one who\'s been stunned — often creates more value.' },
    ]
  },

  retribution_paladin: {
    name: 'Retribution Paladin', role: 'melee_dps', playstyle: 'burst',
    win_condition: 'Avenging Wrath + Templar\'s Verdict burst window. Stack Holy Power to 5 before Wings. Healing Reduction via Mortal Strike equivalent is critical — maintain it.',
    kill_window: { earliest: 10, ideal: 18, latest: 35 },
    key_mistakes: [
      { id: 'ret_wings_no_cc',   severity: 'HIGH',   title: 'Avenging Wrath used without healer CC',          tip: 'Wings burst is completely trivialized by a free healer. Coordinate CC before activating.' },
      { id: 'ret_ds_offensive',  severity: 'HIGH',   title: 'Divine Shield used defensively when teammate needs BoP', tip: 'Ret can give Blessing of Protection to a dying teammate. If your teammate is dying and you Divine Shield yourself, you may have made the wrong call.' },
      { id: 'ret_hp_waste',      severity: 'MEDIUM', title: 'Holy Power capped before Wings',                 tip: 'Entering Wings with fewer than 3 Holy Power delays your first Templar\'s Verdict and loses burst time. Build HP before activating.' },
      { id: 'ret_hoj_stun',      severity: 'MEDIUM', title: 'Hammer of Justice used into teammate stun',      tip: 'HoJ is a 30-second stun CD. Using it into existing stun DR wastes it. Use it as an interrupt or fresh stun during your burst window.' },
    ]
  },

  protection_paladin: {
    name: 'Protection Paladin', role: 'hybrid', playstyle: 'control',
    win_condition: 'High durability + Avenger\'s Shield interrupt cycling. Win through outlasting via strong self-sustain and disrupting casters.',
    kill_window: { earliest: 40, ideal: 70, latest: 120 },
    key_mistakes: [
      { id: 'prot_pal_shield',   severity: 'MEDIUM', title: 'Avenger\'s Shield not used on cooldown vs casters', tip: 'Avenger\'s Shield interrupts on impact and silences. Against caster-heavy comps this is your most valuable button — never hold it.' },
    ]
  },

  // ══════════════════════════════════════════════════════
  // PRIEST
  // ══════════════════════════════════════════════════════

  discipline_priest: {
    name: 'Discipline Priest', role: 'healer', playstyle: 'sustained',
    win_condition: 'Atonement blanket + Rapture shield wall. Win through proactive shielding rather than reactive healing. Anticipate burst windows and pre-shield both teammates before they happen.',
    kill_window: null,
    key_mistakes: [
      { id: 'disc_no_atonement', severity: 'HIGH',   title: 'Atonement not maintained on teammates during burst', tip: 'Disc heals through damage dealt. If Atonement is not on your teammates when burst lands, you are healing with direct heals only — a fraction of your output.' },
      { id: 'disc_pain_supp',    severity: 'HIGH',   title: 'Pain Suppression used too late (target already dead)', tip: 'Pain Suppression is a 40% DR. Use it the moment a kill attempt starts on a teammate, not after they hit 10% HP. Proactive use saves lives; reactive use doesn\'t.' },
      { id: 'disc_leap_faith',   severity: 'MEDIUM', title: 'Leap of Faith not used to peel a teammate from melee', tip: 'Leap of Faith is one of the most underused abilities in Solo Shuffle. Pulling a teammate out of a Bladestorm or away from a melee train can single-handedly save a round.' },
      { id: 'disc_psyfiend',     severity: 'LOW',    title: 'Psyfiend placed in a bad position',                tip: 'Psyfiend fears nearby enemies — place it between the enemy DPS and your team, not behind your team. Bad placement means it fears nobody.' },
    ]
  },

  holy_priest: {
    name: 'Holy Priest', role: 'healer', playstyle: 'sustained',
    win_condition: 'High raw throughput via Holy Word spells and Prayer of Mending uptime. Psychic Scream and Holy Word: Chastise provide strong CC. Win by healing through sustained pressure.',
    kill_window: null,
    key_mistakes: [
      { id: 'hpriest_scream',    severity: 'MEDIUM', title: 'Psychic Scream used without considering AoE',    tip: 'Psychic Scream is AoE disorient — it will break nearby CC on other targets. Confirm no friends are CC\'d on enemies nearby before screaming.' },
      { id: 'hpriest_guardian',  severity: 'MEDIUM', title: 'Guardian Spirit used too early',                 tip: 'Guardian Spirit prevents the next death. Use it when a teammate is actively dying, not proactively — the 10-second duration is short.' },
      { id: 'hpriest_pom',       severity: 'LOW',    title: 'Prayer of Mending not maintained',               tip: 'PoM is essentially a free HoT that bounces. Keep it up at all times — it should never be on cooldown without a reason.' },
    ]
  },

  shadow_priest: {
    name: 'Shadow Priest', role: 'ranged_dps', playstyle: 'sustained',
    win_condition: 'Void Eruption + DoT pressure during Voidform. Win through sustained damage and strong utility (Silence, Psychic Scream, Mind Control). Excellent at disrupting enemy healers.',
    kill_window: { earliest: 20, ideal: 35, latest: 70 },
    key_mistakes: [
      { id: 'spriest_dots',      severity: 'HIGH',   title: 'DoTs allowed to fall off kill target',           tip: 'SW:Pain, VT, and DP must be maintained on the kill target at all times. DoT uptime is the single largest factor in SPriest damage output.' },
      { id: 'spriest_silence',   severity: 'HIGH',   title: 'Silence used on a filler heal',                  tip: 'Silence has a 45-second CD and an 8-second lockout. Never waste it. Save for the healer\'s primary heal or a clutch defensive cast.' },
      { id: 'spriest_void_entry', severity: 'MEDIUM', title: 'Void Eruption used with less than 70 Insanity', tip: 'Entering Voidform below 70 Insanity shortens the form significantly. Build to full (or near-full) before casting Void Eruption.' },
      { id: 'spriest_dispersion', severity: 'MEDIUM', title: 'Dispersion used above 50% HP',                 tip: 'Dispersion is a 90-second CD full DR + self-heal channel. It should be saved for genuine near-death moments, not used as a comfortable panic button.' },
    ]
  },

  // ══════════════════════════════════════════════════════
  // DRUID
  // ══════════════════════════════════════════════════════

  balance_druid: {
    name: 'Balance Druid', role: 'ranged_dps', playstyle: 'sustained',
    win_condition: 'Sustained Starsurge + DoT pressure. Cyclone enemy DPS during their burst windows to nullify their cooldowns. Win through healer attrition and long rounds.',
    kill_window: { earliest: 30, ideal: 50, latest: 90 },
    key_mistakes: [
      { id: 'boomkin_ca_no_cc',  severity: 'HIGH',   title: 'Celestial Alignment without healer CC',          tip: 'Same as every burst spec — no CC on healer means no kill. Coordinate Incapacitating Roar or Mighty Bash with your CA window.' },
      { id: 'boomkin_los',       severity: 'HIGH',   title: 'Not LoS kiting melee',                           tip: 'Balance is strongest at range. Use pillars to break melee LoS and force them to chase while you maintain uptime. Standing in melee range is always wrong.' },
      { id: 'boomkin_cyclone',   severity: 'HIGH',   title: 'Not Cycloning during enemy offensive CDs',       tip: 'When an enemy activates Recklessness, Combustion, Wings, etc. — Cyclone them immediately. This directly cancels their burst window and is your most powerful defensive tool.' },
      { id: 'boomkin_dots',      severity: 'MEDIUM', title: 'Moonfire/Sunfire not maintained',                tip: 'DoT uptime is free passive damage. Moonfire and Sunfire should never fall off your primary target.' },
    ]
  },

  feral_druid: {
    name: 'Feral Druid', role: 'melee_dps', playstyle: 'sustained',
    win_condition: 'Bleed stack + Berserk burst window. Win through DoT attrition similar to Assassination Rogue. Rake silence is a key tool — maintain it on healers.',
    kill_window: { earliest: 25, ideal: 40, latest: 75 },
    key_mistakes: [
      { id: 'feral_swap',        severity: 'HIGH',   title: 'Swapping off bleed target',                      tip: 'Feral bleeds take time to stack. Swapping target resets your Rip and Rake, wasting 10–15 seconds of ramp. Commit or wait for a very specific swap window.' },
      { id: 'feral_rake_silence', severity: 'MEDIUM', title: 'Rake silence not maintained on healer',         tip: 'Rake silence (talented) prevents healer casts and refreshes. Keep it up on the healer at all times — it is a soft lockout on every refresh.' },
      { id: 'feral_berserk',     severity: 'HIGH',   title: 'Berserk used without healer CC',                 tip: 'Berserk is your primary burst window. Use it when the healer is CC\'d or you have a Cyclone covering them.' },
    ]
  },

  guardian_druid: {
    name: 'Guardian Druid', role: 'hybrid', playstyle: 'attrition',
    win_condition: 'Extreme durability via Ironfur stacking. Win by being nearly unkillable and building offensive pressure via Moonfire/Thrash DoTs. Cyclone and Incapacitating Roar provide disruption.',
    kill_window: { earliest: 60, ideal: 90, latest: 180 },
    key_mistakes: [
      { id: 'guardian_ironfur',  severity: 'HIGH',   title: 'Ironfur not maintained during heavy physical pressure', tip: 'Ironfur is your primary armor cooldown and costs only Rage. Spam it when physical melee is training you.' },
      { id: 'guardian_cyclone',  severity: 'MEDIUM', title: 'Cyclone not used on enemy DPS during burst',     tip: 'Guardian has Cyclone. This is massive utility. Use it to cancel enemy burst windows, not just when you feel pressured.' },
    ]
  },

  restoration_druid: {
    name: 'Restoration Druid', role: 'healer', playstyle: 'attrition',
    win_condition: 'HoT blanket + Cyclone cycling. Survive by Cycloning enemy DPS during their cooldown windows to nullify burst. Kite melee with Entangling Roots and Bear Form.',
    kill_window: null,
    key_mistakes: [
      { id: 'rdruid_cyclone',    severity: 'HIGH',   title: 'Not Cycloning during enemy offensive CDs',       tip: 'Combustion active? Cyclone the mage. Recklessness up? Cyclone the warrior. Your CC is your healer defense — use it offensively against burst windows.' },
      { id: 'rdruid_hardcast',   severity: 'HIGH',   title: 'Hard-casting while trained by melee',            tip: 'Hard casts will be interrupted or kicked constantly. Maintain HoTs proactively so your team is healed via instants. Never hard-cast while a melee is on you.' },
      { id: 'rdruid_roots',      severity: 'MEDIUM', title: 'Not self-peeling with Entangling Roots',         tip: 'If a melee trains you for more than 5 seconds without using Roots, you are taking free damage. Root → Bear Form → reposition.' },
      { id: 'rdruid_ironbark',   severity: 'MEDIUM', title: 'Ironbark not used during kill attempts on teammates', tip: 'Ironbark is a 20% damage reduction on a 90-second CD. Use it proactively the moment a burst window starts on a teammate, not after they are nearly dead.' },
    ]
  },

  // ══════════════════════════════════════════════════════
  // SHAMAN
  // ══════════════════════════════════════════════════════

  elemental_shaman: {
    name: 'Elemental Shaman', role: 'ranged_dps', playstyle: 'burst',
    win_condition: 'Stormkeeper + Icefury burst window. Stack Maelstrom to 100 before activating Stormkeeper. Earth Shock / Earthquake at high Maelstrom maximizes damage.',
    kill_window: { earliest: 15, ideal: 25, latest: 45 },
    key_mistakes: [
      { id: 'ele_stormkeeper',   severity: 'HIGH',   title: 'Stormkeeper used at low Maelstrom',              tip: 'Build Maelstrom to at least 80–100 before Stormkeeper. The combo of Stormkeeper Lightning Bolts + a capped Earth Shock is your kill window.' },
      { id: 'ele_wind_shear',    severity: 'HIGH',   title: 'Wind Shear used on a filler heal/cast',          tip: 'Wind Shear has an 8-second school lockout on a 12-second CD. This is one of the best interrupts in the game — save it for the healer\'s primary heal, not a filler.' },
      { id: 'ele_hex',           severity: 'MEDIUM', title: 'Hex cast when incapacitate DR is already active', tip: 'Hex shares incapacitate DR with Poly, Sap, Blind, Gouge. Check DR state before casting.' },
    ]
  },

  enhancement_shaman: {
    name: 'Enhancement Shaman', role: 'melee_dps', playstyle: 'burst',
    win_condition: 'Ascendance + Feral Spirit burst window. Win through extremely high short-duration burst — kill attempt must be coordinated with healer CC.',
    kill_window: { earliest: 10, ideal: 15, latest: 30 },
    key_mistakes: [
      { id: 'enh_ascendance',    severity: 'HIGH',   title: 'Ascendance used without healer CC',              tip: 'Ascendance burst is enormous but brief. Waste it against a free healer and you might as well not have used it.' },
      { id: 'enh_wind_shear',    severity: 'HIGH',   title: 'Wind Shear used on a non-pivotal cast',          tip: 'Enhancement\'s Wind Shear has the same short CD as Elemental. Do not waste it on fillers — the school lockout is the real value.' },
      { id: 'enh_wolves',        severity: 'MEDIUM', title: 'Feral Spirits not used alongside Ascendance',    tip: 'Feral Spirits and Ascendance stack. Always activate both simultaneously for maximum burst.' },
    ]
  },

  restoration_shaman: {
    name: 'Restoration Shaman', role: 'healer', playstyle: 'sustained',
    win_condition: 'Strong reactive healing via Healing Wave / Chain Heal + Wind Shear interrupt cycling. Spiritwalker\'s Grace lets you heal while moving. Earthen Wall Totem is a significant damage reduction cooldown.',
    kill_window: null,
    key_mistakes: [
      { id: 'rsham_wind_shear',  severity: 'HIGH',   title: 'Wind Shear on cooldown against enemy healer',    tip: 'Resto Shaman has the best interrupt in the game. Wind Shear the enemy healer\'s primary heals on every cooldown. This alone significantly increases your team\'s kill potential.' },
      { id: 'rsham_earthen_wall', severity: 'MEDIUM', title: 'Earthen Wall Totem not used during kill attempts', tip: 'EWT absorbs damage for your whole team. Drop it the moment you recognize a burst window is starting on a teammate — it buys crucial healing time.' },
      { id: 'rsham_grounding',   severity: 'MEDIUM', title: 'Grounding Totem not used against predictable CC', tip: 'Grounding absorbs the next harmful spell. Against Polymorph setups or Fear chains, pre-place Grounding Totem to intercept the CC.' },
      { id: 'rsham_hex',         severity: 'LOW',    title: 'Hex used without checking incapacitate DR',      tip: 'Hex shares incapacitate DR. Check DR state before casting, especially after a rogue has been using Sap or Blind.' },
    ]
  },

  // ══════════════════════════════════════════════════════
  // HUNTER
  // ══════════════════════════════════════════════════════

  beast_mastery_hunter: {
    name: 'Beast Mastery Hunter', role: 'ranged_dps', playstyle: 'sustained',
    win_condition: 'Bestial Wrath + pet burst sustained through Beast Cleave. Win through consistent pressure — BM is less reliant on a single kill window than other specs but still needs healer CC for kills.',
    kill_window: { earliest: 20, ideal: 35, latest: 60 },
    key_mistakes: [
      { id: 'bm_bw_no_cc',       severity: 'HIGH',   title: 'Bestial Wrath used without healer CC',           tip: 'BW is your primary damage amplifier. Even BM needs healer CC to convert burst into a kill.' },
      { id: 'bm_pet_dismissed',  severity: 'HIGH',   title: 'Pet died without being revived',                 tip: 'BM damage is heavily pet-dependent. If your pet dies, revive it immediately — your damage output drops by 40–50% without it.' },
      { id: 'bm_freezing_trap',  severity: 'MEDIUM', title: 'Freezing Trap used into incapacitate DR',        tip: 'Freezing Trap shares incapacitate DR with Poly, Sap, Blind, Hex. Check DR before trapping.' },
      { id: 'bm_disengage',      severity: 'LOW',    title: 'Disengage not used to escape melee pressure',    tip: 'Disengage is a free 20-yard leap with a short CD. Use it to peel melee, not just to cross gaps.' },
    ]
  },

  marksmanship_hunter: {
    name: 'Marksmanship Hunter', role: 'ranged_dps', playstyle: 'burst',
    win_condition: 'Trueshot burst window — Aimed Shot spam during the channel. Kill window is extremely telegraphed. Requires healer CC and target without an active defensive.',
    kill_window: { earliest: 10, ideal: 18, latest: 35 },
    key_mistakes: [
      { id: 'mm_trueshot_def',   severity: 'HIGH',   title: 'Trueshot into active target defensive',          tip: 'Aimed Shot is dodged by Evasion and absorbed by Divine Shield. Verify defensives are down before Trueshot.' },
      { id: 'mm_aimed_cancel',   severity: 'HIGH',   title: 'Aimed Shot cancelled by CC mid-cast',            tip: 'Aimed Shot has a cast time and will be interrupted by stuns. Use Trueshot with healer CC active so you\'re not getting CC\'d mid-cast.' },
      { id: 'mm_flare',          severity: 'MEDIUM', title: 'Flare not used to reveal stealth',               tip: 'MM Hunter has Flare to counter Rogue stealth. Use it proactively when you expect a Sap attempt on your healer.' },
    ]
  },

  survival_hunter: {
    name: 'Survival Hunter', role: 'melee_dps', playstyle: 'sustained',
    win_condition: 'Coordinated Trap + Wildfire Bomb burst. A melee hunter with strong DoT/Bomb damage. More flexible than BM/MM but requires careful trap coordination.',
    kill_window: { earliest: 15, ideal: 25, latest: 50 },
    key_mistakes: [
      { id: 'sv_trap_dr',        severity: 'MEDIUM', title: 'Freezing Trap into incapacitate DR',             tip: 'Same rule as BM — Freezing Trap shares DR with all incapacitates. Check before trapping.' },
      { id: 'sv_mongoose',       severity: 'MEDIUM', title: 'Mongoose Bite stacks wasted',                    tip: 'Mongoose Bite gains damage stacks on repeated use. Do not interrupt the stack chain unnecessarily during your burst window.' },
    ]
  },

  // ══════════════════════════════════════════════════════
  // WARLOCK
  // ══════════════════════════════════════════════════════

  affliction_warlock: {
    name: 'Affliction Warlock', role: 'ranged_dps', playstyle: 'attrition',
    win_condition: 'DoT stack attrition — maintain all DoTs on both enemy DPS when possible. Win through healer mana drain over long rounds. Darkglare + Malefic Rapture burst window for kill attempts.',
    kill_window: { earliest: 40, ideal: 60, latest: 120 },
    key_mistakes: [
      { id: 'aff_dots',          severity: 'HIGH',   title: 'Dots falling off kill target',                   tip: 'All five DoTs (Agony, Corruption, Unstable Affliction ×3, Siphon Life) must be maintained. DoT uptime is your entire damage model.' },
      { id: 'aff_darkglare',     severity: 'HIGH',   title: 'Darkglare used with fewer than 3 DoTs on target', tip: 'Darkglare extends ALL DoTs and deals damage per DoT active. Using it with 1–2 DoTs up wastes most of its value.' },
      { id: 'aff_fear_dr',       severity: 'MEDIUM', title: 'Fear into disorient DR',                        tip: 'Fear shares disorient DR with Psychic Scream, Intimidating Shout, Seduction, Dragon\'s Breath. Check DR before casting.' },
      { id: 'aff_coil',          severity: 'MEDIUM', title: 'Death Coil not used to peel melee off self',     tip: 'Death Coil (talented) is an instant disorient. Use it to peel melee training you — do not stand in melee range if it\'s available.' },
    ]
  },

  destruction_warlock: {
    name: 'Destruction Warlock', role: 'ranged_dps', playstyle: 'burst',
    win_condition: 'Infernal + Chaos Bolt burst window. Build 5 Soul Shards before activating. Conflagrate reset and Rain of Fire provide setup for back-to-back Chaos Bolts.',
    kill_window: { earliest: 15, ideal: 25, latest: 45 },
    key_mistakes: [
      { id: 'destro_infernal',   severity: 'HIGH',   title: 'Infernal used without healer CC',               tip: 'Infernal + Chaos Bolt burst is enormous — and entirely negated by a free healer. Lock them down first.' },
      { id: 'destro_chaos_bolt_def', severity: 'HIGH', title: 'Chaos Bolt cast into active target defensive', tip: 'Chaos Bolt can be absorbed, dodged, or blocked. Verify no defensive is active before committing to a long cast.' },
      { id: 'destro_shards',     severity: 'MEDIUM', title: 'Infernal activated at fewer than 3 Soul Shards', tip: 'Chaos Bolt costs 2 shards. Entering your burst window with only 2–3 shards means fewer bolts and a weaker window.' },
    ]
  },

  demonology_warlock: {
    name: 'Demonology Warlock', role: 'ranged_dps', playstyle: 'sustained',
    win_condition: 'Tyrant + Demonic Strength burst window. Build Demonic Core stacks and summon multiple demons before Tyrant. Win through sustained pet pressure and burst windows.',
    kill_window: { earliest: 20, ideal: 35, latest: 60 },
    key_mistakes: [
      { id: 'demo_tyrant',       severity: 'HIGH',   title: 'Tyrant summoned with fewer than 3 demons active', tip: 'Tyrant empowers all active demons. Summon Vilefiend, Felguard, and at least 1–2 Wild Imps before Tyrant for maximum value.' },
      { id: 'demo_implosion',    severity: 'MEDIUM', title: 'Implosion used with fewer than 5 imps',          tip: 'Implosion damage scales with the number of imps consumed. Never Implode at fewer than 4 imps.' },
    ]
  },

  // ══════════════════════════════════════════════════════
  // DEATH KNIGHT
  // ══════════════════════════════════════════════════════

  frost_dk: {
    name: 'Frost Death Knight', role: 'melee_dps', playstyle: 'burst',
    win_condition: 'Pillar of Frost + Empower Rune Weapon stacked burst. 12-second window of enormous single-target damage. Requires healer CC or interrupt — Death Grip on healer is key utility.',
    kill_window: { earliest: 10, ideal: 15, latest: 35 },
    key_mistakes: [
      { id: 'fdk_pillar_no_cc',  severity: 'HIGH',   title: 'Pillar of Frost without healer lockout',         tip: 'Pillar burst is negated by 1–2 healer GCDs. CC or interrupt the healer before activating.' },
      { id: 'fdk_grip_waste',    severity: 'MEDIUM', title: 'Death Grip used as a gap closer',                tip: 'Death Grip is one of your best utility tools. Save it to pull the healer away from their partner or interrupt a critical cast — not just to bridge a gap.' },
      { id: 'fdk_erw_timing',    severity: 'MEDIUM', title: 'Empower Rune Weapon not stacked with Pillar',    tip: 'ERW and Pillar of Frost should always be used together. Using them separately halves the window efficiency.' },
    ]
  },

  unholy_dk: {
    name: 'Unholy Death Knight', role: 'melee_dps', playstyle: 'sustained',
    win_condition: 'Apocalypse + Army of the Dead sustained damage. Win through pet and DoT attrition combined with strong CC (Death Coil, Asphyxiate, Gnaw). Longer kill windows than Frost.',
    kill_window: { earliest: 25, ideal: 40, latest: 70 },
    key_mistakes: [
      { id: 'unholy_apoc',       severity: 'HIGH',   title: 'Apocalypse used with fewer than 4 Festering Wounds', tip: 'Apocalypse summons ghouls equal to Festering Wounds burst. Always apply at least 4 wounds before Apocalypse.' },
      { id: 'unholy_pet_death',  severity: 'HIGH',   title: 'Abomination / Gargoyle not re-summoned after death', tip: 'Unholy pet damage is a massive portion of your total. If your pet dies, resummon immediately.' },
      { id: 'unholy_grip',       severity: 'MEDIUM', title: 'Death Grip wasted as a gap closer',               tip: 'Same as Frost — Death Grip is utility. Use it to pull the healer, interrupt, or separate enemy teammates.' },
    ]
  },

  blood_dk: {
    name: 'Blood Death Knight', role: 'hybrid', playstyle: 'attrition',
    win_condition: 'Near-unkillable via Death Strike self-healing. Win through being an immovable target while your teammates deal damage. Provide strong off-CC via Death Grip and Asphyxiate.',
    kill_window: { earliest: 60, ideal: 90, latest: 180 },
    key_mistakes: [
      { id: 'blood_ds_timing',   severity: 'HIGH',   title: 'Death Strike used when not in danger',           tip: 'Death Strike heals based on recent damage taken. Using it when topped wastes the heal. Save it for after taking a burst of damage.' },
      { id: 'blood_ibf',         severity: 'MEDIUM', title: 'Icebound Fortitude not used during burst',       tip: 'IBF is a strong damage reduction CD. Use it proactively when you see a burst window starting on you.' },
    ]
  },

  // ══════════════════════════════════════════════════════
  // DEMON HUNTER
  // ══════════════════════════════════════════════════════

  havoc_dh: {
    name: 'Havoc Demon Hunter', role: 'melee_dps', playstyle: 'burst',
    win_condition: 'Metamorphosis burst window — short but extremely high damage. Activate during healer CC. Kill attempt must complete within the Meta window.',
    kill_window: { earliest: 8, ideal: 15, latest: 30 },
    key_mistakes: [
      { id: 'dh_meta_defensive', severity: 'HIGH',   title: 'Metamorphosis used defensively',                 tip: 'Meta is your kill button. Using it to survive instead of to kill is almost always wrong. Use Blur or Darkness for defense.' },
      { id: 'dh_eyebeam_cc',     severity: 'HIGH',   title: 'Eye Beam channeled into incoming CC',            tip: 'Eye Beam is a channel and breaks on stuns. Do not cast it when an enemy has a stun available. Use Blur first if needed.' },
      { id: 'dh_rush_waste',     severity: 'MEDIUM', title: 'Both Fel Rush charges used to gap close',        tip: 'Keep one charge in reserve at all times. Two charges burned = no escape. One engage, one exit.' },
      { id: 'dh_blur',           severity: 'MEDIUM', title: 'Blur not used during enemy burst cooldowns',     tip: 'Blur is 50% dodge + 20% DR. Use it reactively when a major offensive CD activates on you. It is a 60-second CD — do not hold it.' },
    ]
  },

  vengeance_dh: {
    name: 'Vengeance Demon Hunter', role: 'hybrid', playstyle: 'attrition',
    win_condition: 'High durability via Demon Spikes + Soul Cleave self-healing. Win through sustained tanky damage and Sigil utility (Silence, Misery, Flame).',
    kill_window: { earliest: 40, ideal: 70, latest: 120 },
    key_mistakes: [
      { id: 'vdh_sigil_silence', severity: 'MEDIUM', title: 'Sigil of Silence not used against casters',     tip: 'Sigil of Silence has a 2-second delay then silences. Place it on the enemy healer proactively — pre-place during their cast rotation.' },
      { id: 'vdh_demon_spikes',  severity: 'HIGH',   title: 'Demon Spikes not maintained during heavy damage', tip: 'Demon Spikes has 2 charges and is your primary physical damage reduction. Spam it during heavy melee pressure.' },
    ]
  },

  // ══════════════════════════════════════════════════════
  // EVOKER
  // ══════════════════════════════════════════════════════

  devastation_evoker: {
    name: 'Devastation Evoker', role: 'ranged_dps', playstyle: 'burst',
    win_condition: 'Dragonrage burst window — Essence Burst procs + instant Disintegrate during the window. Extremely high short-duration burst. Hover is essential for mobility.',
    kill_window: { earliest: 12, ideal: 20, latest: 35 },
    key_mistakes: [
      { id: 'dev_dragonrage',    severity: 'HIGH',   title: 'Dragonrage without healer CC',                   tip: 'Dragonrage burst is very high but brief. A free healer cancels it completely. Coordinate CC before activating.' },
      { id: 'dev_hover',         severity: 'MEDIUM', title: 'Hover not used to avoid melee pressure',         tip: 'Hover makes you immune to movement-impairing effects. Use it proactively when a melee gap closes on you, not after you\'re already slowed.' },
      { id: 'dev_disintegrate',  severity: 'MEDIUM', title: 'Disintegrate channeled without Essence Burst',   tip: 'Disintegrate is significantly stronger during Essence Burst procs. Try to align channels with EB for maximum damage.' },
    ]
  },

  preservation_evoker: {
    name: 'Preservation Evoker', role: 'healer', playstyle: 'sustained',
    win_condition: 'Temporal Anomaly shields + Echo blanket sustained healing. Strong proactive shielding like Disc Priest. Rewind is your emergency CD.',
    kill_window: null,
    key_mistakes: [
      { id: 'pres_rewind',       severity: 'HIGH',   title: 'Rewind not used before a teammate died',         tip: 'Rewind is a 2-minute AoE heal that also revives if used immediately after death (talented). Use it the moment a kill attempt begins, not after.' },
      { id: 'pres_echo',         severity: 'HIGH',   title: 'Echo not maintained on teammates before burst',  tip: 'Echo causes your next heal on a target to apply twice. Pre-Echo both teammates before expected burst windows.' },
      { id: 'pres_hover',        severity: 'MEDIUM', title: 'Not using Hover to avoid melee while healing',   tip: 'Hover lets you cast while moving. Use it to reposition away from melee trains while maintaining your heal rotation.' },
    ]
  },

  augmentation_evoker: {
    name: 'Augmentation Evoker', role: 'hybrid', playstyle: 'sustained',
    win_condition: 'Ebon Might + Breath of Eons empowerment of teammates. Win by making your team stronger rather than dealing damage directly. Extremely strong with melee DPS partners.',
    kill_window: { earliest: 15, ideal: 25, latest: 45 },
    key_mistakes: [
      { id: 'aug_ebon_might',    severity: 'HIGH',   title: 'Ebon Might not maintained during teammate burst windows', tip: 'Ebon Might buffs your allies\' primary stat. It must be up during every teammate burst window — it is your most important button.' },
      { id: 'aug_breath',        severity: 'HIGH',   title: 'Breath of Eons not coordinated with teammate burst', tip: 'Breath of Eons deals damage based on damage your empowered allies deal. Use it when your teammates are in their cooldown windows, not randomly.' },
    ]
  },

  // ══════════════════════════════════════════════════════
  // MONK
  // ══════════════════════════════════════════════════════

  windwalker_monk: {
    name: 'Windwalker Monk', role: 'melee_dps', playstyle: 'burst',
    win_condition: 'Storm, Earth, and Fire + Touch of Death burst window. SEF requires the target not to die — coordinate kill timing. Touch of Death is a percentage-based execute at 15% HP or below.',
    kill_window: { earliest: 12, ideal: 20, latest: 40 },
    key_mistakes: [
      { id: 'ww_sef_target_dies', severity: 'HIGH',  title: 'SEF target dies before the window ends',         tip: 'When the SEF clone target dies, the spirits return and deal massive damage. Avoid the primary kill target for SEF — send them to a secondary target so they survive the window.' },
      { id: 'ww_tod_timing',     severity: 'HIGH',   title: 'Touch of Death used above 15% HP',               tip: 'Touch of Death only works below 15% HP. Using it above this threshold is wasted. Wait for the execute threshold.' },
      { id: 'ww_paralysis',      severity: 'MEDIUM', title: 'Paralysis used into incapacitate DR',            tip: 'Paralysis shares incapacitate DR with Poly, Sap, Blind, Hex, Freezing Trap. Check DR state.' },
      { id: 'ww_diffuse_magic',  severity: 'MEDIUM', title: 'Diffuse Magic not used against magic burst',     tip: 'Diffuse Magic reflects one harmful magic effect and reduces magic damage by 60%. Use it when a mage or warlock is in their burst window targeting you.' },
    ]
  },

  brewmaster_monk: {
    name: 'Brewmaster Monk', role: 'hybrid', playstyle: 'attrition',
    win_condition: 'Stagger damage absorption + self-sustain via Purifying Brew. Extremely durable via Stagger mechanic. Offensive pressure through Keg Smash and Black Ox Brew.',
    kill_window: { earliest: 50, ideal: 80, latest: 180 },
    key_mistakes: [
      { id: 'bm_monk_purify',    severity: 'HIGH',   title: 'Purifying Brew used on low Stagger',             tip: 'Purifying Brew removes your staggered damage. Only use it when Stagger is Heavy (red) — wasting it on Light/Medium Stagger is inefficient.' },
      { id: 'bm_monk_celestial', severity: 'MEDIUM', title: 'Celestial Brew not used during heavy burst',     tip: 'Celestial Brew is a large absorb shield. Use it when you see burst incoming, not after taking the damage.' },
    ]
  },

  mistweaver_monk: {
    name: 'Mistweaver Monk', role: 'healer', playstyle: 'sustained',
    win_condition: 'Renewing Mist bouncing + Revival emergency heal. Strong mobile healing via Mist-ics. Paralysis and Ring of Peace provide strong CC utility.',
    kill_window: null,
    key_mistakes: [
      { id: 'mw_revival',        severity: 'HIGH',   title: 'Revival unused when teammate died',              tip: 'Revival is a mass rez + dispel on a 3-minute CD. If a teammate died and Revival was available, that is a critical error.' },
      { id: 'mw_ring_of_peace',  severity: 'MEDIUM', title: 'Ring of Peace not used to peel melee from teammates', tip: 'Ring of Peace knocks enemies out of the ring and prevents re-entry for 5 seconds. Use it when a melee is training a teammate — it is an exceptional peel tool.' },
      { id: 'mw_paralysis',      severity: 'MEDIUM', title: 'Paralysis into incapacitate DR',                 tip: 'Paralysis shares incapacitate DR. Always check DR before casting.' },
      { id: 'mw_cocoon',         severity: 'MEDIUM', title: 'Life Cocoon not used during kill attempts',      tip: 'Life Cocoon is a large absorb + HoT amplifier on a 2-minute CD. Use it proactively when a kill attempt begins on a teammate.' },
    ]
  },

  // ══════════════════════════════════════════════════════
  // DEMON HUNTER (already done above)
  // EVOKER (already done above)
  // ══════════════════════════════════════════════════════

};

// ══════════════════════════════════════════════════════
// DR ROTATION TIPS (per spec)
// ══════════════════════════════════════════════════════

const DR_ROTATION_TIPS = {
  subtlety_rogue: [
    'Ideal opener: Sap healer → Cheap Shot kill target → partner CC bridge (disorient/root) → Kidney Shot after 18s stun DR reset',
    'Never chain Cheap Shot → Kidney Shot — this halves Kidney Shot duration',
    'Blind shares incapacitate DR with Sap — do not cast Blind within 18s of a Sap on the same target',
    'If your partner stuns the kill target before your Cheap Shot, your Cheap Shot starts at 50% DR — communicate target assignment',
  ],
  assassination_rogue: [
    'Garrote silence does not share DR with stuns or incapacitates — freely pair with Kidney Shot',
    'Cheap Shot → Kidney Shot back-to-back still halves Kidney — same DR rules as Sub',
    'Gouge is incapacitate DR — do not Gouge then Blind the same target',
  ],
  outlaw_rogue: [
    'Blind is incapacitate DR — coordinate with partners who use Poly, Sap, Hex, Freezing Trap',
    'Gouge is incapacitate DR — same family as Blind',
  ],
  fire_mage: [
    'Polymorph is incapacitate DR — shares with Sap, Blind, Gouge, Hex, Freezing Trap',
    'Dragon\'s Breath is disorient DR — safe to chain after Polymorph, no DR collision',
    'Counterspell is silence DR — entirely separate category, always full duration',
    'If a partner used an incapacitate < 18s ago, use Dragon\'s Breath instead of Poly',
  ],
  frost_mage: [
    'Frost Nova and Freeze are both root DR — do not use back-to-back for CC purposes',
    'Polymorph is incapacitate — does not share DR with your roots',
    'Counterspell is silence — always full duration',
  ],
  arcane_mage: [
    'Polymorph is incapacitate DR — same rules as Fire',
    'Slow is a slow, not hard CC — no DR interaction',
  ],
  arms_warrior: [
    'Intimidating Shout is AoE disorient — will break nearby CC on other targets, use carefully',
    'Storm Bolt (talented) is stun DR — chains with Charge stun but at 50% duration if back-to-back',
    'Charge stun is very short (1.5s) — plan to chain immediately with Storm Bolt or partner CC',
  ],
  fury_warrior: [
    'Intimidating Shout is AoE — same warning as Arms, will break CC',
  ],
  holy_paladin: [
    'Hammer of Justice is stun DR — do not use after a rogue\'s Cheap Shot or a warrior\'s Charge',
    'Repentance is incapacitate DR — coordinate with incapacitate users on your team',
    'Blinding Light is disorient DR — safe to chain after stuns or incapacitates',
  ],
  retribution_paladin: [
    'Hammer of Justice is stun DR — save for fresh DR windows or interrupts',
    'Repentance is incapacitate DR — do not cast within 18s of another incapacitate on the same target',
  ],
  shadow_priest: [
    'Silence is silence DR — does not interact with stun or incapacitate chains',
    'Psychic Scream is disorient DR — shares with Fear, Intimidating Shout, Dragon\'s Breath',
    'Mind Control is incapacitate DR — rare use in PvP but worth noting',
  ],
  discipline_priest: [
    'Psychic Scream is disorient DR — shares with all disorients, check before casting',
  ],
  holy_priest: [
    'Psychic Scream is AoE disorient — same break risk as Arms Warrior Intimidating Shout',
    'Holy Word: Chastise is incapacitate DR — coordinate with incap users',
  ],
  balance_druid: [
    'Cyclone is disorient DR — shares with Fear, Intimidating Shout, Dragon\'s Breath, Psychic Scream',
    'Entangling Roots and Typhoon (talented) are root DR — safe to chain differently',
    'Incapacitating Roar is incapacitate DR — coordinate with Poly/Sap/Blind users',
    'Mighty Bash (talented) is stun DR — do not follow a stun with Mighty Bash',
  ],
  feral_druid: [
    'Rake silence does not share DR with stuns — pair freely with Maim or Mighty Bash',
    'Maim is stun DR — do not chain with other stuns',
    'Cyclone is disorient DR — check before casting in a disorient-heavy comp',
  ],
  restoration_druid: [
    'Cyclone is disorient DR — same rules as Balance',
    'Entangling Roots is root DR — multiple roots on same target reduce duration',
  ],
  elemental_shaman: [
    'Hex is incapacitate DR — shares with Poly, Sap, Blind, Freezing Trap',
    'Wind Shear is silence — separate DR, always full duration',
    'Thunderstorm (talented) is a knockback — no DR category, always works',
  ],
  enhancement_shaman: [
    'Hex is incapacitate DR — coordinate with partners',
    'Wind Shear is silence — best interrupt in the game, protect it',
  ],
  restoration_shaman: [
    'Hex is incapacitate DR — check before casting',
    'Capacitor Totem is stun DR — coordinate with partner stuns',
  ],
  beast_mastery_hunter: [
    'Freezing Trap is incapacitate DR — shares with all incapacitates',
    'Intimidation (pet stun) is stun DR — coordinate with other stuns',
  ],
  marksmanship_hunter: [
    'Freezing Trap is incapacitate DR — same rules as BM',
  ],
  survival_hunter: [
    'Freezing Trap is incapacitate DR',
    'Binding Shot is root DR — coordinate with other root users',
  ],
  affliction_warlock: [
    'Fear is disorient DR — shares with Cyclone, Psychic Scream, Dragon\'s Breath, Intimidating Shout',
    'Howl of Terror is also disorient DR — chaining two fears back-to-back is halved',
    'Mortal Coil (talented) is a disorient — same DR family as Fear',
  ],
  destruction_warlock: [
    'Fear variants share disorient DR — same rules as Affliction',
    'Shadowfury is stun DR — strong stun, coordinate with partner stuns',
  ],
  demonology_warlock: [
    'Fear variants are disorient DR',
    'Axe Toss (Felguard) is stun DR — coordinate with partner stuns',
  ],
  frost_dk: [
    'Asphyxiate (talented) is stun DR — do not chain after Remorseless Winter stun or partner stuns',
    'Remorseless Winter stun is stun DR — short stun, plan what follows',
    'Chains of Ice is a root/slow — no DR category, always works',
    'Death Grip is not CC — it is a pull with no DR',
  ],
  unholy_dk: [
    'Asphyxiate is stun DR',
    'Death Coil (talented disorient) is disorient DR',
    'Gnaw (Ghoul bite) is stun DR — coordinate with other stuns',
  ],
  havoc_dh: [
    'Imprison is incapacitate DR — shares with all incapacitates',
    'Chaos Nova is stun DR — coordinate with partner stuns',
    'Sigil of Silence is silence DR — different from incapacitate and stun',
    'Sigil of Misery is disorient DR — check before placing',
  ],
  vengeance_dh: [
    'Sigil of Silence is silence DR — does not interact with stuns',
    'Sigil of Misery is disorient DR',
  ],
  windwalker_monk: [
    'Paralysis is incapacitate DR — shares with Poly, Sap, Blind, Hex, Freezing Trap',
    'Leg Sweep is stun DR — do not chain after partner stuns',
    'Ring of Peace knockback has no DR',
  ],
  mistweaver_monk: [
    'Paralysis is incapacitate DR — same rules as WW',
    'Ring of Peace is a knockback — no DR, always works as a peel',
  ],
  devastation_evoker: [
    'Landslide is a root — root DR applies',
    'Oppressing Roar is disorient DR — coordinate with Fear/Cyclone users',
  ],
};

// ══════════════════════════════════════════════════════
// COMP READS
// ══════════════════════════════════════════════════════

const COMP_READS = {
  TSG: {
    name: 'TSG (Warrior + DK + Healer)', identify: ['Arms Warrior', 'Death Knight'],
    threat: 'HIGH',
    description: 'Extremely high melee burst. Both DPS have strong stuns and Death Grip disruption.',
    counter: [
      'Identify which DPS stacks burst first — that is the kill attempt. Both have offensive CDs.',
      'Healer: pre-hot the trained target and save a major defensive for the burst window.',
      'Interrupt Death Knight\'s Death Strike — it is significant self-healing during Pillar.',
      'Do not be Death Gripped away from teammates — reposition back immediately.',
      'CC the Warrior during Recklessness (Cyclone/Poly) to cancel his burst window.',
    ]
  },
  RMX: {
    name: 'RMX (Rogue + Mage + Healer)', identify: ['Rogue', 'Mage'],
    threat: 'HIGH',
    description: 'Coordinated setup cleave. Sap → Cheap Shot + Combustion is one of the highest burst combos.',
    counter: [
      'Watch for the Sap attempt on your healer — if the rogue is sneaking in, pre-position your healer behind a pillar.',
      'Interrupt the Poly cast if possible — denying the setup denies the kill.',
      'When Combustion activates: use your strongest defensive immediately.',
      'After Combustion expires (12s), their pressure drops significantly — this is your counter window.',
      'Force the mage to move constantly — Fire Mage needs to stand still to set up.',
    ]
  },
  WLS: {
    name: 'WLS (Warlock + Shaman + Healer)', identify: ['Warlock', 'Shaman'],
    threat: 'MEDIUM',
    description: 'Sustained curse/DoT pressure with strong interrupts and Hex CC.',
    counter: [
      'Dispel curses aggressively — Warlock damage multiplies with stacked debuffs.',
      'Wind Shear has an 8-second lockout on a 12-second CD — track it and protect your healer\'s casts.',
      'Kill the Shaman first if possible — squishier and their interrupts cripple the comp.',
      'Fear is disorient DR — Cyclone, Intimidating Shout, and Dragon\'s Breath are all different categories to chain after.',
    ]
  },
  Jungle: {
    name: 'Jungle (Feral Druid + Hunter + Healer)', identify: ['Feral Druid', 'Hunter'],
    threat: 'HIGH',
    description: 'High mobility sustained damage. Both specs have strong bleeds and the Hunter has Freezing Trap.',
    counter: [
      'Both specs do sustained bleed/DoT damage — dispelling Feral bleeds via Iceblock/Divine Shield is key.',
      'Freezing Trap + Rake silence creates a dangerous CC chain — track incapacitate DR.',
      'Feral is squishy — burst it during their Berserk cooldown if possible.',
      'Hunter\'s Aspect of the Turtle makes them immune for 8 seconds — do not waste burst CDs into it.',
    ]
  },
  Turbo: {
    name: 'Turbo Cleave (Warrior + Shaman + Healer)', identify: ['Arms Warrior', 'Shaman'],
    threat: 'HIGH',
    description: 'Raw melee burst + Wind Shear interrupt cycling. Extremely hard to heal against.',
    counter: [
      'Wind Shear + Kick from Warrior creates a nearly complete school lockout rotation — play instants only.',
      'Warrior + Shaman burst stacks are huge — save cooldowns for when both offensive CDs are active.',
      'Grounding Totem can absorb your CC — wait for it to expire before casting key CC.',
      'Both specs are durable — patience and counter-CC are more important than matching their burst.',
    ]
  },
  Shadowplay: {
    name: 'Shadowplay (Shadow Priest + Warlock + Healer)', identify: ['Shadow Priest', 'Warlock'],
    threat: 'MEDIUM',
    description: 'Sustained DoT/drain pressure with exceptional CC (Fear, Silence, Psychic Scream).',
    counter: [
      'Fear and Psychic Scream share disorient DR — coordinate CC to avoid wasting both.',
      'Both specs are paper — burst them fast before their DoTs stack up.',
      'Dispel all DoTs aggressively, especially Unstable Affliction (avoid self-silence on dispel).',
      'Shadow Priest Dispersion is a survival cooldown — wait for it to expire before continuing burst.',
    ]
  },
  WMP: {
    name: 'WMP (Warrior + Mage + Priest)', identify: ['Arms Warrior', 'Mage', 'Priest'],
    threat: 'HIGH',
    description: 'Coordinated setup cleave with strong interrupts and Psyfiend pressure.',
    counter: [
      'Psyfiend can Fear continuously — kill or CC it immediately when placed.',
      'Mass Dispel can remove your team\'s buffs — track and interrupt when possible.',
      'Warrior + Mage burst stacks are enormous — save hard CDs for combined windows.',
    ]
  },
  Godcomp: {
    name: 'Godcomp (SP + Mage + Healer)', identify: ['Shadow Priest', 'Mage'],
    threat: 'HIGH',
    description: 'Legendary setup comp. Silence → Poly setup into Combustion/Surge creates unavoidable kill windows.',
    counter: [
      'Silence into Poly is their setup — interrupt the Poly if the silence is on cooldown.',
      'Dispersion means the Shadow Priest can survive your burst window — focus the Mage instead.',
      'Both specs Fear/CC — track disorient DR and always have a trinket or defensive ready.',
    ]
  },
  DHunter: {
    name: 'Cupid / DH + Hunter', identify: ['Demon Hunter', 'Hunter'],
    threat: 'HIGH',
    description: 'Extreme mobility. Neither spec can be kited. Both have strong burst windows.',
    counter: [
      'Both specs excel at gap-closing — roots and snares are largely irrelevant.',
      'Focus the squishier of the two. Havoc DH is typically the kill target.',
      'Feign Death + Disengage from Hunter requires you to retarget — avoid tunnel vision.',
    ]
  },
};

// ══════════════════════════════════════════════════════
// GENERAL TIPS LIBRARY
// Universal mistakes not tied to a specific spec
// ══════════════════════════════════════════════════════

const GENERAL_TIPS = [

  // ── TRINKETS ──
  {
    id: 'trinket_sap',
    category: 'Trinkets',
    severity: 'HIGH',
    title: 'Trinket used to break Sap',
    desc: 'Sap is a pre-combat incapacitate that breaks on any damage. Trinketing a Sap is almost always wrong — you will walk out of Sap the moment combat begins anyway via any AoE tick, or you can simply move.',
    tip: 'Save your trinket for in-combat CC that actually threatens your life: stuns during burst windows, Fear during a kill attempt on you, or Polymorph when you are the kill target. Trinketing a Sap wastes your most important defensive on a CC that was about to break anyway.',
  },
  {
    id: 'trinket_gouge',
    category: 'Trinkets',
    severity: 'MEDIUM',
    title: 'Trinket used to break Gouge',
    desc: 'Gouge breaks on damage and is a short-duration CC (5s). Unless you are the kill target in a burst window, trinketing a Gouge is usually wasteful.',
    tip: 'Only trinket Gouge if you are at low HP and in active danger. If your team is doing fine, let Gouge break naturally via the next damage tick.',
  },
  {
    id: 'trinket_during_burst',
    category: 'Trinkets',
    severity: 'HIGH',
    title: 'Trinket saved through an entire burst window',
    desc: 'If the enemy used Combustion, Recklessness, or Wings and you were CC\'d during the entire window without trinket, you had the wrong priority.',
    tip: 'Trinket is for: stuns during enemy burst cooldowns, Fear/Poly on the kill target during a burst window, or any CC that keeps you locked while lethal damage is incoming. Outside of these scenarios, hold it.',
  },
  {
    id: 'trinket_optimal',
    category: 'Trinkets',
    severity: 'LOW',
    title: 'When to use your trinket',
    desc: 'General framework for trinket usage.',
    tip: 'Trinket the CC that is paired with the most dangerous offensive cooldown. If a rogue Cheap Shots you when no enemy burst CDs are active, let it ride. If a rogue Cheap Shots you and a warrior activates Recklessness simultaneously — trinket immediately.',
  },

  // ── LINE OF SIGHT ──
  {
    id: 'los_healer_not_using',
    category: 'Line of Sight',
    severity: 'HIGH',
    title: 'Healer not breaking LoS on incoming CC',
    desc: 'A healer who stands in the open against a mage or warlock will be CCed on cooldown. Breaking LoS on key CC casts is the primary survival tool for healers.',
    tip: 'As a healer: when a mage is casting Polymorph on you, step behind a pillar. The cast will be interrupted. Break LoS on every predictable CC cast. This is not optional at high ratings — it is the primary skill that separates good healers from great ones.',
  },
  {
    id: 'los_dps_not_using',
    category: 'Line of Sight',
    severity: 'MEDIUM',
    title: 'DPS player not using pillars to avoid CC',
    desc: 'Ranged DPS can break their own CC by moving behind a pillar and forcing the enemy to reposition.',
    tip: 'When a Fear or Polymorph is incoming on you as a DPS, break LoS with the caster. This forces them to reposition, buying time and potentially wasting their CC attempt.',
  },
  {
    id: 'los_splitting_healer',
    category: 'Line of Sight',
    severity: 'HIGH',
    title: 'Team splitting from healer around pillars',
    desc: 'When DPS players run to opposite sides of a pillar from their healer, the healer loses line-of-sight and cannot heal them.',
    tip: 'Always maintain LoS with your healer. Use the same side of every pillar. If you get separated, immediately reposition to restore LoS — do not keep fighting while your healer cannot see you.',
  },
  {
    id: 'los_pillar_offensive',
    category: 'Line of Sight',
    severity: 'LOW',
    title: 'Pillar usage as an offensive tool',
    desc: 'Pillars are usually discussed defensively, but they can be used offensively to split enemy healers from their DPS.',
    tip: 'Coordinate with your partner to walk the enemy healer to the far side of a pillar from their DPS. This forces them to choose between healing their partner (no LoS) or repositioning (losing GCDs). Rogue + Mage comps do this extremely well.',
  },

  // ── DEFENSIVE USAGE ──
  {
    id: 'def_held_too_long',
    category: 'Defensives',
    severity: 'HIGH',
    title: 'Major defensive held until after death',
    desc: 'Dying while holding an unused major defensive (Divine Shield, Ice Block, Evasion, Blur, etc.) is one of the most common and costly mistakes in Solo Shuffle.',
    tip: 'Major defensives exist to prevent deaths. If you died while holding one, you used it wrong — the CD should have been pressed before you died. Learn to recognise the signals: enemy burst CDs active + you are the kill target + dropping below 40% HP = press your defensive NOW.',
  },
  {
    id: 'def_not_staggered',
    category: 'Defensives',
    severity: 'MEDIUM',
    title: 'Multiple defensives used simultaneously',
    desc: 'Using Divine Shield then immediately Lay on Hands, or Blur then immediately Darkness, stacks two CDs for one threat. If the threat continues after both expire, you have no protection.',
    tip: 'Stagger defensives. Use one, see if the threat passes. Only use the second if the first wasn\'t enough. This keeps at least one major CD available for the next burst window.',
  },
  {
    id: 'def_wrong_target',
    category: 'Defensives',
    severity: 'MEDIUM',
    title: 'Defensive used on yourself when a teammate is the kill target',
    desc: 'Some defensives can be applied to teammates (Blessing of Protection, Pain Suppression, Life Cocoon). Using them on yourself when your teammate is dying is usually wrong.',
    tip: 'When a kill attempt is active on a teammate, consider whether your defensive would be better on them. BoP, Pain Suppression, and Life Cocoon are always better on the dying player.',
  },

  // ── TARGETING ──
  {
    id: 'target_tunnel',
    category: 'Targeting',
    severity: 'HIGH',
    title: 'Tunneling a target through multiple defensives',
    desc: 'Continuing to attack a target through Evasion, Divine Shield, Ice Block, Turtle, Barkskin, etc. wastes your offensive CDs and gives the enemy free time.',
    tip: 'The moment an immunity or major defensive activates, swap targets. Return when the defensive expires. A 10-second defensive is 10 seconds of free damage on another target.',
  },
  {
    id: 'target_no_swap',
    category: 'Targeting',
    severity: 'MEDIUM',
    title: 'Not swapping to a low-HP opportunistic kill',
    desc: 'A player at 15% HP without defensives is a free kill regardless of your comp\'s normal target priority.',
    tip: 'Always be aware of all six health bars. An opportunistic kill on a player who is unexpectedly low — even if they are not your intended kill target — is almost always worth taking.',
  },
  {
    id: 'target_kill_priority',
    category: 'Targeting',
    severity: 'LOW',
    title: 'Kill target selection framework',
    desc: 'General priority for who to kill in Solo Shuffle.',
    tip: 'Priority order: (1) Anyone who is unexpectedly low HP with no defensives. (2) The healer\'s opposite role (if enemy healer is Resto Druid, kill a melee). (3) The squishiest DPS. (4) Avoid tanky specs (Blood DK, Brewmaster, Prot Warrior) unless teammates force it.',
  },

  // ── CC FUNDAMENTALS ──
  {
    id: 'cc_break_on_damage',
    category: 'CC Fundamentals',
    severity: 'HIGH',
    title: 'CC broken by your own damage',
    desc: 'Polymorph, Freezing Trap, Sap, Hex, and Blind all break on damage. Dealing any AoE or DoT while these are active on a target removes the CC.',
    tip: 'Before applying a break-on-damage CC: check for DoTs ticking on the target and remove them if possible (wait for them to expire, or avoid the AoE). The single most common cause of CC breaks in Solo Shuffle is an untracked DoT.',
  },
  {
    id: 'cc_chain_fundamentals',
    category: 'CC Fundamentals',
    severity: 'MEDIUM',
    title: 'CC chain fundamentals: the 18-second rule',
    desc: 'Every CC in the same DR category reduces in duration: 100% → 50% → 25% → IMMUNE. After 18 seconds with no CC in that category, the target resets to full duration.',
    tip: 'Track the last time you applied each DR category. Wait 18 seconds before reapplying the same category for full duration, or switch to a different DR category to extend the lockout.',
  },
  {
    id: 'cc_healer_priority',
    category: 'CC Fundamentals',
    severity: 'HIGH',
    title: 'Burst window without healer CC',
    desc: 'Almost every kill attempt in Solo Shuffle requires the enemy healer to be CC\'d. Burning offensive cooldowns without healer lockout is the single most common kill-window failure.',
    tip: 'Before pressing any major offensive cooldown: verify the healer is CC\'d, interrupted, or occupied. If they are free, delay your CD until CC lands.',
  },

  // ── POSITIONING ──
  {
    id: 'pos_healer_follow',
    category: 'Positioning',
    severity: 'MEDIUM',
    title: 'Healer not staying in range of teammates',
    desc: 'A healer who is out of range of their teammates cannot heal them. Range awareness is a fundamental positional skill.',
    tip: 'Healers should maintain approximately 20–25 yards from both teammates simultaneously. When teammates split, position at the midpoint and call for them to collapse toward you.',
  },
  {
    id: 'pos_stacking',
    category: 'Positioning',
    severity: 'MEDIUM',
    title: 'Team stacking, enabling AoE CC',
    desc: 'When all three players stack together, a single Psychic Scream, Intimidating Shout, or Dragon\'s Breath can CC the entire team simultaneously.',
    tip: 'Spread slightly from teammates — maintain 6–8 yards of separation so AoE CC cannot hit all three of you at once. This is especially important against comps with strong AoE CC (Warlock, Warrior, Mage).',
  },
  {
    id: 'pos_grounding_totem',
    category: 'Positioning',
    severity: 'LOW',
    title: 'Grounding Totem placement awareness',
    desc: 'Grounding Totem absorbs the next harmful spell that hits it. It must be positioned between you and the enemy caster.',
    tip: 'Place Grounding Totem between you and the caster, not behind you or to the side. It only absorbs spells that travel through it. Predictive placement before a Poly or Fear is key.',
  },

  // ── SOLO SHUFFLE SPECIFIC ──
  {
    id: 'ss_reading_without_comms',
    category: 'Solo Shuffle Meta',
    severity: 'LOW',
    title: 'Reading teammate actions without voice comms',
    desc: 'Solo Shuffle has no communication. You must read what your teammates are doing and react.',
    tip: 'Key signals to read: rogue approaching healer stealthed = Sap incoming, prep your CC or burst. Mage casting Combustion = CC the healer right now without being told. Warrior charging the healer = back them up with a stun or slow. Pattern recognition replaces callouts.',
  },
  {
    id: 'ss_score_pressure',
    category: 'Solo Shuffle Meta',
    severity: 'MEDIUM',
    title: 'Playing for kills vs. playing for survival',
    desc: 'Solo Shuffle awards points per round win, not per kill. Sometimes surviving a bad round is better than dying trying to kill.',
    tip: 'If your team is behind and the round looks unwinnable, switch to survival mode: save defensives, break LoS, stay alive. Dying early confirms the loss. Staying alive until the timer (if applicable) or forcing the enemy to overspend CDs preserves future round potential.',
  },
  {
    id: 'ss_reset_vs_commit',
    category: 'Solo Shuffle Meta',
    severity: 'MEDIUM',
    title: 'Knowing when to commit vs. when to reset',
    desc: 'Committing to a kill attempt that is unlikely to succeed wastes CDs and puts you in a bad position. Sometimes resetting is correct.',
    tip: 'Reset conditions: target healed to full with defensive active + your offensive CDs are spent + you have no follow-up. Commit conditions: target below 40% + healer is CC\'d or out of GCDs + your burst is still available. Do not keep pressing into a wall.',
  },

  // ── INTERRUPT USAGE ──
  {
    id: 'interrupt_filler',
    category: 'Interrupts',
    severity: 'HIGH',
    title: 'Interrupt wasted on a filler spell',
    desc: 'Counterspell, Wind Shear, Kick, Pummel, and Mind Freeze have long lockout durations. Wasting them on a filler heal or a non-pivotal cast leaves the healer free to hard-cast their important spells.',
    tip: 'Only interrupt: the healer\'s primary heal (Flash Heal, Healing Wave, Holy Light), an emergency heal during a kill attempt, or a pivotal DPS cast (Chaos Bolt, Aimed Shot, Lava Burst). Never interrupt instant casts (there is nothing to interrupt) and never interrupt a cast that would do something irrelevant.',
  },
  {
    id: 'interrupt_school',
    category: 'Interrupts',
    severity: 'MEDIUM',
    title: 'School lockout not exploited after interrupt',
    desc: 'A successful interrupt locks out the healer\'s entire spell school. This should be your cue to press your burst window — the healer cannot respond for 4–8 seconds.',
    tip: 'The moment you successfully interrupt a healer, call your burst window (or press it yourself). A school lockout is the closest thing to a guaranteed kill window in the game — do not waste it.',
  },
];

// ══════════════════════════════════════════════════════
// EXPORTED API OBJECT
// ══════════════════════════════════════════════════════

const StrategyKB = {

  getSpec(name) {
    if (!name) return null;
    const key = name.toLowerCase().replace(/[\s'-]/g, '_');
    return SPEC_DATA[key] || null;
  },

  getWinCondition(name) {
    return this.getSpec(name)?.win_condition || null;
  },

  getMistakes(name) {
    return this.getSpec(name)?.key_mistakes || [];
  },

  getDRTips(name) {
    if (!name) return [];
    const key = name.toLowerCase().replace(/[\s'-]/g, '_');
    return DR_ROTATION_TIPS[key] || [];
  },

  // Return tips for a specific category or all general tips
  getGeneralTips(category = null) {
    if (!category) return GENERAL_TIPS;
    return GENERAL_TIPS.filter(t => t.category === category);
  },

  // Return all unique categories in the general tips library
  getTipCategories() {
    return [...new Set(GENERAL_TIPS.map(t => t.category))];
  },

  identifyComp(specList) {
    if (!specList || !specList.length) return null;
    for (const comp of Object.values(COMP_READS)) {
      const matches = comp.identify.filter(s =>
        specList.some(p => p && p.toLowerCase().includes(s.toLowerCase()))
      );
      if (matches.length >= 2) return comp;
    }
    return null;
  },

  enrichMistakes(mistakes, specName) {
    const knownMistakes = this.getMistakes(specName);
    return mistakes.map(m => {
      const known = knownMistakes.find(km =>
        m.title.toLowerCase().includes(km.title.toLowerCase().split(' ').slice(0, 3).join(' ').toLowerCase()) ||
        (km.id && m.category && m.category.toLowerCase().includes(km.id.split('_').slice(1, 2).join('')))
      );
      if (known) return { ...m, tip: known.tip || m.tip, severity: known.severity || m.severity };
      return m;
    });
  },

  // Check if a given event pattern matches any general tip condition
  // Returns an array of matching general tips
  checkGeneralTip(eventType, context = {}) {
    const matches = [];
    if (eventType === 'trinket_on_sap') matches.push(GENERAL_TIPS.find(t => t.id === 'trinket_sap'));
    if (eventType === 'defensive_unused_on_death') matches.push(GENERAL_TIPS.find(t => t.id === 'def_held_too_long'));
    if (eventType === 'burst_no_healer_cc') matches.push(GENERAL_TIPS.find(t => t.id === 'cc_healer_priority'));
    if (eventType === 'tunnel_through_defensive') matches.push(GENERAL_TIPS.find(t => t.id === 'target_tunnel'));
    if (eventType === 'interrupt_on_filler') matches.push(GENERAL_TIPS.find(t => t.id === 'interrupt_filler'));
    return matches.filter(Boolean);
  },
};

// ============================================================
// DR CATEGORY MAP
// Log spell name fragments → DR category
// Kept in KB because it IS strategy knowledge:
// knowing which spells share DR is what players need to learn.
// ============================================================

const DR_CATEGORIES = {
  stun: [
    'CHEAP_SHOT','CHEAPSHOT','KIDNEY_SHOT','HAMMER_OF_JUSTICE','STORM_BOLT',
    'CHARGE_STUN','WAR_STOMP','BASH','MIGHTY_BASH','MAIM','INTIMIDATION',
    'SHADOWFURY','REMORSELESS_WINTER','CHAOS_NOVA','LEG_SWEEP','PARALYSIS',
    'ASPHYXIATE','GNAW','AXE_TOSS','CAPACITOR_TOTEM','SHOCKWAVE',
    'IMPACT','DEEP_FREEZE','INTERCEPT','INTERCEPT_STUN',
  ],
  incapacitate: [
    'SAP','BLIND','GOUGE','POLYMORPH','HEX','FREEZING_TRAP','FREEZE',
    'REPENTANCE','IMPRISON','PARALYSIS','INCAPACITATING_ROAR',
    'TURN_EVIL','MIND_CONTROL','SEDUCTION','SLEEP','HIBERNATE',
    'HOLY_WORD_CHASTISE','DRAGON_S_BREATH',
  ],
  disorient: [
    'FEAR','HOWL_OF_TERROR','PSYCHIC_SCREAM','INTIMIDATING_SHOUT',
    'DEATH_COIL','CYCLONE','OPPRESSING_ROAR','MORTAL_COIL',
    'SIGIL_OF_MISERY','BLINDING_LIGHT',
  ],
  silence: [
    'SILENCE','COUNTERSPELL','KICK','PUMMEL','MIND_FREEZE','WIND_SHEAR',
    'SOLAR_BEAM','REBUKE','SKULL_BASH','SIGIL_OF_SILENCE','GARROTE',
    'AVENGERS_SHIELD','STRANGULATE',
  ],
  root: [
    'ENTANGLING_ROOTS','FROST_NOVA','FREEZE','EARTHBIND','CHAINS_OF_ICE',
    'FROSTBITE','BINDING_SHOT','GRASPING_VINES','THUNDERSTRUCK',
    'LANDSLIDE','RING_OF_FROST',
  ],
};

const DR_DECAY = 18000; // ms until a DR category fully resets

// ============================================================
// COOLDOWN REGISTRY
// Every trackable major cooldown.
// The parser reads this directly — add a CD here and it gets
// detected in logs and appears in analysis automatically.
// type: 'offensive' | 'defensive' | 'utility'
// duration: approximate buff duration in ms (for timeline bar width)
// specs: which spec keys this belongs to (informational)
// ============================================================

const COOLDOWN_REGISTRY = {
  // ── Rogue ──
  'SYMBOLS_OF_DEATH':       { name: 'Symbols of Death',            type: 'offensive',  duration: 45000, specs: ['subtlety_rogue'] },
  'SHADOW_DANCE':           { name: 'Shadow Dance',                 type: 'offensive',  duration:  8000, specs: ['subtlety_rogue'] },
  'VENDETTA':               { name: 'Vendetta',                     type: 'offensive',  duration: 20000, specs: ['assassination_rogue'] },
  'KINGSBANE':              { name: 'Kingsbane',                    type: 'offensive',  duration: 14000, specs: ['assassination_rogue'] },
  'ADRENALINE_RUSH':        { name: 'Adrenaline Rush',              type: 'offensive',  duration: 20000, specs: ['outlaw_rogue'] },
  'BETWEEN_THE_EYES':       { name: 'Between the Eyes',             type: 'offensive',  duration:  3000, specs: ['outlaw_rogue'] },
  'EVASION':                { name: 'Evasion',                      type: 'defensive',  duration: 10000, specs: ['subtlety_rogue','assassination_rogue','outlaw_rogue'] },
  'CLOAK_OF_SHADOWS':       { name: 'Cloak of Shadows',             type: 'defensive',  duration:  5000, specs: ['subtlety_rogue','assassination_rogue','outlaw_rogue'] },
  'VANISH':                 { name: 'Vanish',                       type: 'utility',    duration:  3000, specs: ['subtlety_rogue','assassination_rogue','outlaw_rogue'] },

  // ── Mage ──
  'COMBUSTION':             { name: 'Combustion',                   type: 'offensive',  duration: 12000, specs: ['fire_mage'] },
  'ICY_VEINS':              { name: 'Icy Veins',                    type: 'offensive',  duration: 25000, specs: ['frost_mage'] },
  'ARCANE_SURGE':           { name: 'Arcane Surge',                 type: 'offensive',  duration: 15000, specs: ['arcane_mage'] },
  'TOUCH_OF_THE_MAGI':      { name: 'Touch of the Magi',            type: 'offensive',  duration: 10000, specs: ['arcane_mage'] },
  'ICE_BLOCK':              { name: 'Ice Block',                    type: 'defensive',  duration: 10000, specs: ['fire_mage','frost_mage','arcane_mage'] },
  'COLD_SNAP':              { name: 'Cold Snap',                    type: 'defensive',  duration:     0, specs: ['frost_mage'] },
  'SHIFTING_POWER':         { name: 'Shifting Power',               type: 'utility',    duration:  4000, specs: ['fire_mage','frost_mage','arcane_mage'] },

  // ── Warrior ──
  'RECKLESSNESS':           { name: 'Recklessness',                 type: 'offensive',  duration: 12000, specs: ['arms_warrior','fury_warrior'] },
  'AVATAR':                 { name: 'Avatar',                       type: 'offensive',  duration: 20000, specs: ['arms_warrior','fury_warrior','protection_warrior'] },
  'BLADESTORM':             { name: 'Bladestorm',                   type: 'offensive',  duration:  6000, specs: ['arms_warrior'] },
  'SPEAR_OF_BASTION':       { name: 'Spear of Bastion',             type: 'offensive',  duration:  4000, specs: ['arms_warrior'] },
  'RAVAGER':                { name: 'Ravager',                      type: 'offensive',  duration:  7000, specs: ['arms_warrior','protection_warrior'] },
  'COLOSSUS_SMASH':         { name: 'Colossus Smash',               type: 'offensive',  duration:  8000, specs: ['arms_warrior'] },
  'WARBREAKER':             { name: 'Warbreaker',                   type: 'offensive',  duration:  8000, specs: ['arms_warrior'] },
  'DIE_BY_THE_SWORD':       { name: 'Die by the Sword',             type: 'defensive',  duration:  8000, specs: ['arms_warrior'] },
  'SPELL_REFLECTION':       { name: 'Spell Reflection',             type: 'defensive',  duration:  5000, specs: ['arms_warrior','fury_warrior','protection_warrior'] },
  'RALLYING_CRY':           { name: 'Rallying Cry',                 type: 'defensive',  duration: 10000, specs: ['arms_warrior','fury_warrior','protection_warrior'] },

  // ── Paladin ──
  'AVENGING_WRATH':         { name: 'Avenging Wrath',               type: 'offensive',  duration: 20000, specs: ['retribution_paladin','holy_paladin'] },
  'WINGS':                  { name: 'Avenging Wrath',               type: 'offensive',  duration: 20000, specs: ['retribution_paladin','holy_paladin'] },
  'DIVINE_TOLL':            { name: 'Divine Toll',                  type: 'offensive',  duration:     0, specs: ['retribution_paladin','holy_paladin'] },
  'EXECUTION_SENTENCE':     { name: 'Execution Sentence',           type: 'offensive',  duration:  8000, specs: ['retribution_paladin'] },
  'DIVINE_SHIELD':          { name: 'Divine Shield',                type: 'defensive',  duration:  8000, specs: ['holy_paladin','retribution_paladin','protection_paladin'] },
  'BLESSING_OF_PROTECTION': { name: 'Blessing of Protection',       type: 'defensive',  duration: 10000, specs: ['holy_paladin','retribution_paladin','protection_paladin'] },
  'LAY_ON_HANDS':           { name: 'Lay on Hands',                 type: 'defensive',  duration:     0, specs: ['holy_paladin'] },
  'AURA_MASTERY':           { name: 'Aura Mastery',                 type: 'defensive',  duration:  8000, specs: ['holy_paladin'] },

  // ── Priest ──
  'VOID_ERUPTION':          { name: 'Voidform',                     type: 'offensive',  duration: 15000, specs: ['shadow_priest'] },
  'DARK_ASCENSION':         { name: 'Dark Ascension',               type: 'offensive',  duration: 20000, specs: ['shadow_priest'] },
  'PAIN_SUPPRESSION':       { name: 'Pain Suppression',             type: 'defensive',  duration:  8000, specs: ['discipline_priest'] },
  'RAPTURE':                { name: 'Rapture',                      type: 'defensive',  duration: 10000, specs: ['discipline_priest'] },
  'POWER_WORD_BARRIER':     { name: 'Power Word: Barrier',          type: 'defensive',  duration: 10000, specs: ['discipline_priest'] },
  'DISPERSION':             { name: 'Dispersion',                   type: 'defensive',  duration:  6000, specs: ['shadow_priest'] },
  'GUARDIAN_SPIRIT':        { name: 'Guardian Spirit',              type: 'defensive',  duration: 10000, specs: ['holy_priest'] },
  'APOTHEOSIS':             { name: 'Apotheosis',                   type: 'offensive',  duration: 20000, specs: ['holy_priest'] },

  // ── Druid ──
  'CELESTIAL_ALIGNMENT':    { name: 'Celestial Alignment',          type: 'offensive',  duration: 20000, specs: ['balance_druid'] },
  'INCARNATION_CHOSEN':     { name: 'Incarnation: Chosen of Elune', type: 'offensive',  duration: 30000, specs: ['balance_druid'] },
  'BERSERK':                { name: 'Berserk',                      type: 'offensive',  duration: 20000, specs: ['feral_druid','guardian_druid'] },
  'INCARNATION_KING':       { name: 'Incarnation: King of the Jungle', type: 'offensive', duration: 30000, specs: ['feral_druid'] },
  'TRANQUILITY':            { name: 'Tranquility',                  type: 'defensive',  duration:  8000, specs: ['restoration_druid'] },
  'IRONBARK':               { name: 'Ironbark',                     type: 'defensive',  duration: 12000, specs: ['restoration_druid','feral_druid','balance_druid'] },
  'BARKSKIN':               { name: 'Barkskin',                     type: 'defensive',  duration: 12000, specs: ['balance_druid','feral_druid','guardian_druid','restoration_druid'] },
  'CONVOKE_THE_SPIRITS':    { name: 'Convoke the Spirits',          type: 'offensive',  duration:  4000, specs: ['balance_druid','feral_druid','restoration_druid'] },

  // ── Shaman ──
  'ASCENDANCE_ELE':         { name: 'Ascendance',                   type: 'offensive',  duration: 15000, specs: ['elemental_shaman'] },
  'ASCENDANCE_ENH':         { name: 'Ascendance',                   type: 'offensive',  duration: 15000, specs: ['enhancement_shaman'] },
  'STORMKEEPER':            { name: 'Stormkeeper',                  type: 'offensive',  duration: 15000, specs: ['elemental_shaman'] },
  'FERAL_SPIRIT':           { name: 'Feral Spirit',                 type: 'offensive',  duration: 15000, specs: ['enhancement_shaman'] },
  'PRIMORDIAL_WAVE':        { name: 'Primordial Wave',              type: 'offensive',  duration:     0, specs: ['enhancement_shaman','restoration_shaman'] },
  'SPIRIT_LINK_TOTEM':      { name: 'Spirit Link Totem',            type: 'defensive',  duration:  6000, specs: ['restoration_shaman'] },
  'EARTHEN_WALL_TOTEM':     { name: 'Earthen Wall Totem',           type: 'defensive',  duration: 15000, specs: ['restoration_shaman'] },
  'ANCESTRAL_GUIDANCE':     { name: 'Ancestral Guidance',           type: 'defensive',  duration: 10000, specs: ['restoration_shaman','elemental_shaman'] },

  // ── Hunter ──
  'BESTIAL_WRATH':          { name: 'Bestial Wrath',                type: 'offensive',  duration: 15000, specs: ['beast_mastery_hunter'] },
  'TRUESHOT':               { name: 'Trueshot',                     type: 'offensive',  duration: 15000, specs: ['marksmanship_hunter'] },
  'COORDINATED_ASSAULT':    { name: 'Coordinated Assault',          type: 'offensive',  duration: 20000, specs: ['survival_hunter'] },
  'ASPECT_OF_THE_TURTLE':   { name: 'Aspect of the Turtle',         type: 'defensive',  duration:  8000, specs: ['beast_mastery_hunter','marksmanship_hunter','survival_hunter'] },
  'EXHILARATION':           { name: 'Exhilaration',                 type: 'defensive',  duration:     0, specs: ['beast_mastery_hunter','marksmanship_hunter','survival_hunter'] },

  // ── Warlock ──
  'SUMMON_INFERNAL':        { name: 'Summon Infernal',              type: 'offensive',  duration: 30000, specs: ['destruction_warlock'] },
  'DARK_SOUL_INSTABILITY':  { name: 'Dark Soul: Instability',       type: 'offensive',  duration: 20000, specs: ['destruction_warlock'] },
  'DARK_SOUL_MISERY':       { name: 'Dark Soul: Misery',            type: 'offensive',  duration: 20000, specs: ['affliction_warlock'] },
  'DARKGLARE':              { name: 'Summon Darkglare',             type: 'offensive',  duration: 20000, specs: ['affliction_warlock'] },
  'SUMMON_DARKGLARE':       { name: 'Summon Darkglare',             type: 'offensive',  duration: 20000, specs: ['affliction_warlock'] },
  'TYRANT':                 { name: 'Demonic Tyrant',               type: 'offensive',  duration: 15000, specs: ['demonology_warlock'] },
  'SUMMON_DEMONIC_TYRANT':  { name: 'Demonic Tyrant',               type: 'offensive',  duration: 15000, specs: ['demonology_warlock'] },
  'UNENDING_RESOLVE':       { name: 'Unending Resolve',             type: 'defensive',  duration:  8000, specs: ['affliction_warlock','destruction_warlock','demonology_warlock'] },

  // ── Death Knight ──
  'PILLAR_OF_FROST':        { name: 'Pillar of Frost',              type: 'offensive',  duration: 12000, specs: ['frost_dk'] },
  'EMPOWER_RUNE_WEAPON':    { name: 'Empower Rune Weapon',          type: 'offensive',  duration: 20000, specs: ['frost_dk'] },
  'APOCALYPSE':             { name: 'Apocalypse',                   type: 'offensive',  duration:     0, specs: ['unholy_dk'] },
  'DARK_TRANSFORMATION':    { name: 'Dark Transformation',          type: 'offensive',  duration: 20000, specs: ['unholy_dk'] },
  'ARMY_OF_THE_DEAD':       { name: 'Army of the Dead',             type: 'offensive',  duration: 40000, specs: ['unholy_dk'] },
  'ICEBOUND_FORTITUDE':     { name: 'Icebound Fortitude',           type: 'defensive',  duration:  8000, specs: ['frost_dk','unholy_dk','blood_dk'] },
  'VAMPIRIC_BLOOD':         { name: 'Vampiric Blood',               type: 'defensive',  duration: 10000, specs: ['blood_dk'] },
  'ANTI_MAGIC_SHELL':       { name: 'Anti-Magic Shell',             type: 'defensive',  duration:  5000, specs: ['frost_dk','unholy_dk','blood_dk'] },

  // ── Demon Hunter ──
  'METAMORPHOSIS':          { name: 'Metamorphosis',                type: 'offensive',  duration: 30000, specs: ['havoc_dh'] },
  'EYE_BEAM':               { name: 'Eye Beam',                     type: 'offensive',  duration:  3000, specs: ['havoc_dh'] },
  'BLUR':                   { name: 'Blur',                         type: 'defensive',  duration: 10000, specs: ['havoc_dh'] },
  'DARKNESS':               { name: 'Darkness',                     type: 'defensive',  duration:  8000, specs: ['havoc_dh','vengeance_dh'] },
  'FIERY_BRAND':            { name: 'Fiery Brand',                  type: 'defensive',  duration: 10000, specs: ['vengeance_dh'] },
  'DEMON_SPIKES':           { name: 'Demon Spikes',                 type: 'defensive',  duration:  6000, specs: ['vengeance_dh'] },

  // ── Monk ──
  'STORM_EARTH_AND_FIRE':   { name: 'Storm, Earth, and Fire',       type: 'offensive',  duration: 15000, specs: ['windwalker_monk'] },
  'SERENITY':               { name: 'Serenity',                     type: 'offensive',  duration: 12000, specs: ['windwalker_monk'] },
  'TOUCH_OF_DEATH':         { name: 'Touch of Death',               type: 'offensive',  duration:     0, specs: ['windwalker_monk'] },
  'INVOKE_XUEN':            { name: 'Invoke Xuen',                  type: 'offensive',  duration: 24000, specs: ['windwalker_monk'] },
  'LIFE_COCOON':            { name: 'Life Cocoon',                  type: 'defensive',  duration: 12000, specs: ['mistweaver_monk'] },
  'REVIVAL':                { name: 'Revival',                      type: 'defensive',  duration:     0, specs: ['mistweaver_monk'] },
  'INVOKE_YULON':           { name: 'Invoke Yu\'lon',               type: 'defensive',  duration: 25000, specs: ['mistweaver_monk'] },
  'FORTIFYING_BREW':        { name: 'Fortifying Brew',              type: 'defensive',  duration: 15000, specs: ['brewmaster_monk'] },
  'ZEN_MEDITATION':         { name: 'Zen Meditation',               type: 'defensive',  duration:  8000, specs: ['brewmaster_monk'] },

  // ── Evoker ──
  'DRAGONRAGE':             { name: 'Dragonrage',                   type: 'offensive',  duration: 18000, specs: ['devastation_evoker'] },
  'BREATH_OF_EONS':         { name: 'Breath of Eons',               type: 'offensive',  duration: 10000, specs: ['augmentation_evoker'] },
  'EBON_MIGHT':             { name: 'Ebon Might',                   type: 'offensive',  duration: 10000, specs: ['augmentation_evoker'] },
  'REWIND':                 { name: 'Rewind',                       type: 'defensive',  duration:     0, specs: ['preservation_evoker'] },
  'OBSIDIAN_SCALES':        { name: 'Obsidian Scales',              type: 'defensive',  duration: 12000, specs: ['devastation_evoker','augmentation_evoker'] },
  'TIME_SPIRAL':            { name: 'Time Spiral',                  type: 'utility',    duration:     0, specs: ['preservation_evoker'] },

  // ── Racials ──
  'BERSERKING':             { name: 'Berserking',                   type: 'offensive',  duration: 12000, specs: [] },
  'BLOOD_FURY':             { name: 'Blood Fury',                   type: 'offensive',  duration: 15000, specs: [] },
  'ARCANE_TORRENT':         { name: 'Arcane Torrent',               type: 'utility',    duration:     0, specs: [] },
};

// Fast lookup set used by the parser hot path
const CD_SPELL_NAMES = new Set(Object.keys(COOLDOWN_REGISTRY));

if (typeof module !== 'undefined') module.exports = { StrategyKB, DR_CATEGORIES, DR_DECAY, COOLDOWN_REGISTRY, CD_SPELL_NAMES };
