// Research: the research behind the project, set as a journal article. A masthead, the title block, the
// abstract with its keywords, numbered sections with figures and tables, a coda and an appendix,
// endnotes, works cited, the sources the work is built on, and credits. The contents in the margin follow the reading position.
// Everything here is plain JSX, figures included, so the text can be revised in place.
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import './research.css'

const SECTIONS = [
  { id: 'rs-1', n: 'I', t: 'Who decides the cuts' },
  { id: 'rs-2', n: 'II', t: 'What is lost between the statue and the qubits' },
  { id: 'rs-3', n: 'III', t: 'Why the regions are nations at war' },
  { id: 'rs-4', n: 'IV', t: 'The run of 5 October 2026' },
  { id: 'rs-5', n: 'V', t: 'Would ordinary random numbers make the same sculpture?' },
  { id: 'rs-6', n: 'VI', t: 'Each run as a latent space' },
  { id: 'rs-7', n: 'VII', t: 'What the Lab shows, and what it hides' },
  { id: 'rs-8', n: '', t: 'Coda: the two runs we did not print' },
  { id: 'rs-a', n: 'A', t: 'Appendix: the Lab' },
]
const BACK = [
  { id: 'rs-notes', t: 'Endnotes' },
  { id: 'rs-cited', t: 'Works cited' },
  { id: 'rs-sources', t: 'Sources' },
  { id: 'rs-credits', t: 'Credits' },
]
const KEYWORDS = ['quantum sculpting', 'measurement', 'authorship', 'conditions', 'latent space', 'counterfactual form', 'conceptual metaphor', 'provenance', 'quantum randomness', 'interface']

/** A reference to endnote `n`; the note links back. */
function N({ n }: { n: number }) {
  return <sup className="rs__ref"><a id={`rs-r${n}`} href={`#rs-n${n}`} onClick={jump(`rs-n${n}`)}>{n}</a></sup>
}

/** The link at the end of an endnote, back to where it is referenced. */
function Back({ n }: { n: number }) {
  return <a href={`#rs-r${n}`} onClick={jump(`rs-r${n}`)} aria-label="Back to the text">↩</a>
}

/** An identifier in the running text (a device, an engine, a repository), set in the mono. */
function C({ children }: { children: ReactNode }) {
  return <code className="rs__c">{children}</code>
}

/** Scroll inside the page's own scroller rather than letting the hash move the app. */
function jump(id: string) {
  return (e: MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function Sec({ id, n, t, children }: { id: string; n: string; t: string; children: ReactNode }) {
  return (
    <section className="rs__sec" id={id} aria-labelledby={`${id}-h`}>
      <h2 className="rs__h" id={`${id}-h`}>{n && <span className="rs__hn">{n}.</span>}{t}</h2>
      {children}
    </section>
  )
}

function Fig({ n, kind = 'Fig.', caption, children, wide }: { n: number; kind?: string; caption: ReactNode; children: ReactNode; wide?: boolean }) {
  return (
    <figure className={'rs__fig' + (wide ? ' rs__fig--wide' : '') + (kind === 'Table' ? ' rs__fig--tbl' : '')}>
      <div className="rs__figb">{children}</div>
      <figcaption className="rs__cap"><span className="rs__capn">{kind} {n}</span><span>{caption}</span></figcaption>
    </figure>
  )
}

// ── figures ────────────────────────────────────────────────────────────
// One visual language: thin lines, square boxes, ink levels only. Words that explain are set in the
// sans; names from the app, values, ids and devices in the mono (rs__tx--m).

/** The arrowhead a figure's lines end in. Each figure defines its own, under its own id. */
function Arw({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L8 4 L0 8 z" className="rs__fill" />
      </marker>
    </defs>
  )
}

/** Fig. 1: the program, end to end. Five steps; the quantum step runs one of four engines. */
function ProgramFig() {
  const W = 112, xs = [0, 132, 264, 396, 528]
  const steps = ['Model', 'Voxelise', 'Quantum', 'Mesh', 'Compose']
  const notes: ReactNode[][] = [
    ['a built-in shape:', 'cup, sphere, cube,', 'pyramid, cylinder,', 'cone, torus; or', 'your own mesh'],
    [<>a grid, <tspan className="rs__tx--m">16³–256³</tspan></>, 'each cell holds', 'how much of it', 'the model fills'],
    [],
    ['a surface cut', 'at a level,', 'checked and', <>exported as <tspan className="rs__tx--m">STL</tspan></>],
    ['HUD pieces around', 'the object, one', 'animation clock;', 'export image,', 'video or GLB'],
  ]
  const engines: { t: string; d: ReactNode[] }[] = [
    { t: 'Gauss', d: ['a local approximation:', 'a plain blur'] },
    { t: 'Emulate', d: ['the Quantum Blur Core,', 'emulated locally'] },
    { t: 'Atlas', d: ['the Blur Core on Moth’s', 'platform: real hardware', 'or a simulator'] },
    { t: 'Evolve', d: ['nations, one qubit each,', 'turn by turn; numbers', <>from <tspan className="rs__tx--m">comet-qrng-v1</tspan></>] },
  ]
  const ex = [0, 164, 328, 492], BW = 80, bus = 134
  const cover = [0.15, 0.6, 0.6, 0.15, 0.6, 1, 1, 0.6, 0.6, 1, 1, 0.6, 0.15, 0.6, 0.6, 0.15]
  const a = 'url(#rs-arw-prog)'
  return (
    <svg viewBox="0 0 640 228" className="rs__svg" role="img" aria-label="The program in five steps, left to right. Model: a built-in shape (cup, sphere, cube, pyramid, cylinder, cone, torus) or your own mesh. Voxelise: a grid of 16 to 256 cells a side, each cell holding how much of it the model fills. Quantum. Mesh: a surface cut at a level, checked and exported as STL. Compose: pieces around the object on one animation clock, exported as image, video or GLB. The quantum step branches into four engines: Gauss, a local approximation; Emulate, the Quantum Blur Core emulated locally; Atlas, the Blur Core on Moth's platform, on real hardware or a simulator; and Evolve, highlighted, nations with one qubit each, turn by turn, with random numbers from comet-qrng-v1.">
      <Arw id="rs-arw-prog" />
      {steps.map((s, i) => (
        <g key={s}>
          <rect x={xs[i]} y={8} width={W} height={40} className="rs__box" />
          <text x={xs[i] + 44} y={32} className="rs__tx rs__tx--m rs__tx--ink">{s}</text>
          {i < steps.length - 1 && <line x1={xs[i] + W} y1={28} x2={xs[i + 1] - 1} y2={28} className="rs__ln" markerEnd={a} />}
          {notes[i].map((l, k) => <text key={k} x={xs[i]} y={66 + k * 14} className="rs__tx">{l}</text>)}
        </g>
      ))}
      {/* pictograms: the model, cells holding coverage, a qubit, contours of a field, the object in its frame */}
      <path transform={`translate(${xs[0] + 6} 13) scale(1.25)`} d="M5 6h11v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3z M16 9h1.5a2.5 2.5 0 0 1 0 5H16" className="rs__ln rs__ln--k" vectorEffect="non-scaling-stroke" />
      {cover.map((v, k) => <rect key={k} x={xs[1] + 8 + (k % 4) * 6} y={16 + Math.floor(k / 4) * 6} width={5} height={5} className="rs__cell" fillOpacity={v} />)}
      <circle cx={xs[2] + 20} cy={28} r={11} className="rs__ln" />
      <ellipse cx={xs[2] + 20} cy={28} rx={11} ry={3.5} className="rs__ln rs__ln--faint" />
      <line x1={xs[2] + 20} y1={28} x2={xs[2] + 27} y2={19} className="rs__ln rs__ln--k" />
      <circle cx={xs[2] + 27} cy={19} r={2} className="rs__dot" />
      <circle cx={xs[3] + 20} cy={28} r={5} className="rs__ln rs__ln--faint" />
      <circle cx={xs[3] + 20} cy={28} r={9} className="rs__ln rs__ln--ink" />
      <circle cx={xs[3] + 20} cy={28} r={13} className="rs__ln rs__ln--faint" />
      <rect x={xs[4] + 15} y={23} width={10} height={10} className="rs__fill" />
      {[[7, 15, 1, 1], [33, 15, -1, 1], [7, 41, 1, -1], [33, 41, -1, -1]].map(([x, y, dx, dy]) => (
        <path key={`${x}.${y}`} d={`M${xs[4] + x} ${y + dy * 5} V${y} H${xs[4] + x + dx * 5}`} className="rs__ln rs__ln--k" />
      ))}
      {/* the quantum step branches into its engines */}
      <line x1={xs[2] + W / 2} y1={48} x2={xs[2] + W / 2} y2={bus} className="rs__ln" />
      <line x1={ex[0] + BW / 2} y1={bus} x2={ex[3] + BW / 2} y2={bus} className="rs__ln" />
      {engines.map((e, i) => {
        const x = ex[i], on = e.t === 'Evolve'
        return (
          <g key={e.t}>
            <line x1={x + BW / 2} y1={bus} x2={x + BW / 2} y2={147} className="rs__ln" markerEnd={a} />
            <rect x={x} y={148} width={BW} height={24} className={on ? 'rs__box rs__box--on' : 'rs__box'} />
            <text x={x + BW / 2} y={164} textAnchor="middle" className={'rs__tx rs__tx--m ' + (on ? 'rs__tx--on' : 'rs__tx--ink')}>{e.t}</text>
            {e.d.map((l, k) => <text key={k} x={x} y={190 + k * 14} className="rs__tx">{l}</text>)}
          </g>
        )
      })}
    </svg>
  )
}

/** Fig. 3: one nation's inclinations as a direction on the Bloch sphere. */
function SphereFig() {
  const c = 110, r = 78
  return (
    <svg viewBox="0 0 560 220" className="rs__svg" role="img" aria-label="A sphere with three axes: attack, defend and explore. One direction points between them; its shadow on the asked axis, b, sets the odds of a yes. b = 1 is always yes, b = 0 a coin toss, b = −1 always no. When the individual is entangled the direction is shorter and b moves towards 0.">
      <circle cx={c} cy={c} r={r} className="rs__ln" />
      <ellipse cx={c} cy={c} rx={r} ry={r * 0.3} className="rs__ln rs__ln--faint" />
      <line x1={c} y1={c} x2={c} y2={c - r - 12} className="rs__ln" />
      <line x1={c} y1={c} x2={c + r + 14} y2={c} className="rs__ln" />
      <line x1={c} y1={c} x2={c - 52} y2={c + 44} className="rs__ln" />
      <text x={c + 6} y={c - r - 6} className="rs__tx">explore · <tspan className="rs__tx--m">Z</tspan></text>
      <text x={c + r + 4} y={c - 8} className="rs__tx">defend · <tspan className="rs__tx--m">Y</tspan></text>
      <text x={c - 92} y={c + 62} className="rs__tx">attack · <tspan className="rs__tx--m">X</tspan></text>
      <line x1={c} y1={c} x2={c + 40} y2={c - 54} className="rs__ln rs__ln--ink" />
      <circle cx={c + 40} cy={c - 54} r={3.5} className="rs__dot" />
      <line x1={c + 40} y1={c - 54} x2={c} y2={c - 54} className="rs__ln rs__ln--dash" />
      <circle cx={c} cy={c - 54} r={2.5} className="rs__dot" />
      <text x={c - 8} y={c - 50} textAnchor="end" className="rs__tx rs__tx--m rs__tx--ink">b</text>
      <g transform="translate(320 34)">
        <text className="rs__tx rs__tx--ink" y={0}>asked: explore</text>
        <text className="rs__tx" y={22}>b is the length of the direction</text>
        <text className="rs__tx" y={38}>along the asked axis</text>
        <text className="rs__tx rs__tx--m" y={66}>b = 1</text><text className="rs__tx" x={56} y={66}>always yes</text>
        <text className="rs__tx rs__tx--m" y={82}>b = 0</text><text className="rs__tx" x={56} y={82}>a coin toss</text>
        <text className="rs__tx rs__tx--m" y={98}>b = −1</text><text className="rs__tx" x={56} y={98}>always no</text>
        <text className="rs__tx" y={126}>entangled: the direction is</text>
        <text className="rs__tx" y={142}>shorter, and b moves towards 0</text>
      </g>
    </svg>
  )
}

/** Fig. 4: the loop. Only "measure" is not a written rule; the original surface runs underneath. */
function LoopFig() {
  const steps = ['prepare', 'ask', 'measure', 'act', 'update']
  const x0 = 150, w = 62, gap = 10, a = 'url(#rs-arw-loop)'
  return (
    <svg viewBox="0 0 640 196" className="rs__svg" role="img" aria-label="The process: model, divide, then a loop of prepare, ask, measure, act and update repeated sixty times, then join and print. Only measure is decided by measurement; every other step is a written rule. The original surface runs from the model to the join.">
      <Arw id="rs-arw-loop" />
      <rect x={4} y={44} width={58} height={30} className="rs__box" /><text x={33} y={63} textAnchor="middle" className="rs__tx">model</text>
      <rect x={74} y={44} width={62} height={30} className="rs__box" /><text x={105} y={63} textAnchor="middle" className="rs__tx">divide</text>
      <line x1={62} y1={59} x2={72} y2={59} className="rs__ln" markerEnd={a} />
      <line x1={136} y1={59} x2={x0 - 2} y2={59} className="rs__ln" markerEnd={a} />
      {steps.map((s, i) => {
        const x = x0 + i * (w + gap), on = s === 'measure'
        return (
          <g key={s}>
            <rect x={x} y={44} width={w} height={30} className={on ? 'rs__box rs__box--on' : 'rs__box'} />
            <text x={x + w / 2} y={63} textAnchor="middle" className={on ? 'rs__tx rs__tx--on' : 'rs__tx'}>{s}</text>
            {i < steps.length - 1 && <line x1={x + w} y1={59} x2={x + w + gap - 1} y2={59} className="rs__ln" markerEnd={a} />}
          </g>
        )
      })}
      <path d={`M${x0 + 4 * (w + gap) + w / 2} 44 V22 H${x0 + w / 2} V42`} className="rs__ln" fill="none" markerEnd={a} />
      <text x={x0 + 2 * (w + gap) + w / 2} y={16} textAnchor="middle" className="rs__tx rs__tx--m">× 60 turns</text>
      <line x1={x0 + 5 * (w + gap) - gap} y1={59} x2={512} y2={59} className="rs__ln" markerEnd={a} />
      <rect x={514} y={44} width={56} height={30} className="rs__box" /><text x={542} y={63} textAnchor="middle" className="rs__tx">join</text>
      <line x1={570} y1={59} x2={580} y2={59} className="rs__ln" markerEnd={a} />
      <rect x={582} y={44} width={54} height={30} className="rs__box" /><text x={609} y={63} textAnchor="middle" className="rs__tx">print</text>
      <path d="M33 74 V112 H542 V76" className="rs__ln rs__ln--ink" fill="none" markerEnd={a} />
      <text x={290} y={128} textAnchor="middle" className="rs__tx rs__tx--ink">the original surface, kept with its detail</text>
      <rect x={x0} y={152} width={12} height={12} className="rs__box rs__box--on" />
      <text x={x0 + 20} y={162} className="rs__tx">decided by measurement</text>
      <rect x={x0 + 200} y={152} width={12} height={12} className="rs__box" />
      <text x={x0 + 220} y={162} className="rs__tx">a written rule</text>
    </svg>
  )
}

/** Fig. 5: the push amount, the dial between the given form and the measured change. */
function DialFig() {
  const x0 = 40, x1 = 600, at = (v: number) => x0 + (v / 8) * (x1 - x0)
  return (
    <svg viewBox="0 0 640 110" className="rs__svg" role="img" aria-label="A scale from 0 to 8. At 0 the model is unchanged; at 8 the form is closest to what the qubits make alone. This piece stops at 6.">
      <line x1={x0} y1={50} x2={x1} y2={50} className="rs__ln" />
      {Array.from({ length: 9 }, (_, v) => (
        <g key={v}>
          <line x1={at(v)} y1={44} x2={at(v)} y2={56} className="rs__ln" />
          <text x={at(v)} y={74} textAnchor="middle" className="rs__tx rs__tx--m">{v}</text>
        </g>
      ))}
      <line x1={x0} y1={50} x2={at(6)} y2={50} className="rs__ln rs__ln--thick" />
      <circle cx={at(6)} cy={50} r={6} className="rs__dot" />
      <text x={at(6)} y={30} textAnchor="middle" className="rs__tx rs__tx--ink">this piece: <tspan className="rs__tx--m">6</tspan></text>
      <text x={x0} y={98} className="rs__tx">the model as given</text>
      <text x={x1} y={98} textAnchor="end" className="rs__tx">what the qubits make alone</text>
    </svg>
  )
}

/** A small seeded generator, so each schematic run draws the same form on every visit. */
function seeded(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    return s / 4294967296
  }
}

/** A schematic form on a 10 × 10 grid: a disc, or (with a seed) a disc whose edge, body and
 *  surroundings one run's numbers have changed: cells gained and lost at the edge, cracks, islands. */
function formOf(seed: number | null, n = 10, r = 4.2): boolean[] {
  const rnd = seeded(seed ?? 1), c = (n - 1) / 2, out: boolean[] = []
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < n; i++) {
      const d = Math.hypot(i - c, j - c), inside = d <= r, u = rnd()
      if (seed == null) out.push(inside)
      else if (Math.abs(d - r) < 1.3) out.push(u < (inside ? 0.62 : 0.36))
      else out.push(inside ? u > 0.07 : u < 0.035)
    }
  }
  return out
}
const GIVEN = formOf(null)
const RUNS = [
  { name: 'run1', chip: 'ibm_marrakesh', cells: formOf(7) },
  { name: 'run2', chip: 'ibm_boston', cells: formOf(19) },
  { name: 'run3', chip: 'ibm_fez', cells: formOf(41) },
]

/** Fig. 7: many latent spaces. One model, several runs, a different form from each. */
function RunsFig() {
  const rows = [62, 142, 222], a = 'url(#rs-arw-runs)'
  const cells = (on: boolean[], x: number, y: number, s: number, cls: string) =>
    on.map((v, k) => v && <rect key={k} x={x + (k % 10) * s} y={y + Math.floor(k / 10) * s} width={s - 1} height={s - 1} className={cls} />)
  return (
    <svg viewBox="0 0 640 274" className="rs__svg" role="img" aria-label="One model on the left, drawn as a disc of cells, feeds three runs: run1, run2 and run3, whose random numbers were measured on ibm_marrakesh, ibm_boston and ibm_fez. Each run gives the same model a different form, with its own edges, cracks and islands against the dashed outline of the original. A faint line leads on to every other name, each another space.">
      <Arw id="rs-arw-runs" />
      <text x={10} y={12} className="rs__tx rs__tx--dim">one model</text>
      <text x={200} y={12} className="rs__tx rs__tx--dim">a run, and the chip it was measured on</text>
      <text x={470} y={12} className="rs__tx rs__tx--dim">a form for each</text>
      {cells(GIVEN, 10, 102, 8, 'rs__fill rs__fill--dim')}
      {RUNS.map((r, i) => {
        const y = rows[i]
        return (
          <g key={r.name}>
            <path d={`M96 142 C 150 142, 146 ${y}, 198 ${y}`} className="rs__ln" markerEnd={a} />
            <rect x={200} y={y - 12} width={64} height={24} className="rs__box" />
            <text x={232} y={y + 4} textAnchor="middle" className="rs__tx rs__tx--m rs__tx--ink">{r.name}</text>
            <text x={276} y={y + 4} className="rs__tx rs__tx--m">{r.chip}</text>
            <line x1={386} y1={y} x2={464} y2={y} className="rs__ln" markerEnd={a} />
            {cells(r.cells, 470, y - 35, 7, 'rs__fill')}
            <circle cx={504.5} cy={y - 0.5} r={33} className="rs__ln rs__ln--faint" />
          </g>
        )
      })}
      <path d="M96 142 C 150 142, 146 262, 198 262" className="rs__ln rs__ln--faint" />
      <text x={204} y={266} className="rs__tx rs__tx--dim">and another space for every other name</text>
    </svg>
  )
}

/** Fig. 2: discreteness lost and regained, for Evolve's individuals and for the blur's cells. */
function AbsorbFig() {
  const px = [100, 240, 380, 520], PW = 110, cy = 60, a = 'url(#rs-arw-abs)'
  const heads = ['discrete', 'superposed', 'entangled', 'measured']
  const top = ['each its own state', 'odds, not answers', 'one shared state', 'discrete, changed']
  const bottom = ['inside or outside', 'partly filled', 'mixed by the blur', 'cut at a level']
  const strips = [
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0.2, 0.9, 1, 1, 1, 0.85, 0.15, 0, 0],
    [0.05, 0.22, 0.5, 0.75, 0.85, 0.8, 0.62, 0.35, 0.12, 0.03],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  ]
  const spread = [18, 55, 92], close = [37, 55, 73]
  const after: [number, number, string][] = [[14, 52, 'yes'], [54, 66, 'no'], [94, 56, 'yes']]
  return (
    <svg viewBox="0 0 640 178" className="rs__svg" role="img" aria-label="Two rows, four stages each: discrete, superposed, entangled, measured. Top row, Evolve's individuals: three separate points, each in its own box; then each spread into a dashed circle of odds; then the circles overlapping inside one shared outline; then three separate points again, moved, answering yes, no and yes. Bottom row, a strip of ten cells: inside or outside; partly filled once the model is voxelised; mixed with their neighbours by the blur; then cut at a level into inside and outside again, one cell wider on each side than at the start.">
      <Arw id="rs-arw-abs" />
      <text x={0} y={cy - 2} className="rs__tx rs__tx--ink">individuals</text>
      <text x={0} y={cy + 12} className="rs__tx rs__tx--m rs__tx--dim">Evolve</text>
      <text x={0} y={140} className="rs__tx rs__tx--ink">cells</text>
      <text x={0} y={154} className="rs__tx rs__tx--dim">in the blur</text>
      {px.map((x, i) => (
        <g key={heads[i]}>
          <text x={x} y={14} className="rs__tx rs__tx--ink">{heads[i]}</text>
          <text x={x} y={112} className="rs__tx rs__tx--dim">{top[i]}</text>
          <text x={x} y={172} className="rs__tx rs__tx--dim">{bottom[i]}</text>
          {i < px.length - 1 && <line x1={x + PW + 4} y1={cy} x2={px[i + 1] - 6} y2={cy} className="rs__ln" markerEnd={a} />}
          {i < px.length - 1 && <line x1={x + PW + 4} y1={141} x2={px[i + 1] - 6} y2={141} className="rs__ln" markerEnd={a} />}
          {strips[i].map((v, k) => <rect key={k} x={x + k * 11} y={136} width={10} height={10} className="rs__cell" fillOpacity={v} />)}
        </g>
      ))}
      {spread.map((d) => (
        <g key={`d${d}`}>
          <rect x={px[0] + d - 9} y={cy - 9} width={18} height={18} className="rs__box" />
          <circle cx={px[0] + d} cy={cy} r={3.5} className="rs__dot" />
          <circle cx={px[1] + d} cy={cy} r={14} className="rs__ln rs__ln--dash" />
          <circle cx={px[1] + d} cy={cy} r={2} className="rs__fill rs__fill--dim" />
        </g>
      ))}
      <ellipse cx={px[2] + 55} cy={cy} rx={52} ry={26} className="rs__ln rs__ln--ink" />
      {close.map((d) => (
        <g key={`e${d}`}>
          <circle cx={px[2] + d} cy={cy} r={16} className="rs__ln rs__ln--dash" />
          <circle cx={px[2] + d} cy={cy} r={2} className="rs__fill rs__fill--dim" />
        </g>
      ))}
      {after.map(([d, y, t]) => (
        <g key={`m${d}`}>
          <rect x={px[3] + d - 9} y={y - 9} width={18} height={18} className="rs__box" />
          <circle cx={px[3] + d} cy={y} r={3.5} className="rs__dot" />
          <text x={px[3] + d} y={y + 22} textAnchor="middle" className="rs__tx rs__tx--m">{t}</text>
        </g>
      ))}
    </svg>
  )
}

/** The library's categories as Compose shows them, with their families in the app's own words. */
const LIBRARY: { t: string; side: 0 | 1; y: number; items: string[] }[] = [
  { t: 'Marks', side: 0, y: 20, items: ['frame, orbit rings, camera,', 'orbit abstracted, bounds,', 'focus, selection, callouts,', 'scan and slice'] },
  { t: 'Parameters', side: 0, y: 104, items: ['any setting as a readout'] },
  { t: 'Navigation', side: 0, y: 146, items: ['steps, run timeline, bars,', 'indexes, captures'] },
  { t: 'Controls', side: 0, y: 202, items: ['dials, number controls,', 'view camera'] },
  { t: 'Evolve', side: 1, y: 20, items: ['nations, territory, chronicle,', 'relations, record, log,', 'one nation'] },
  { t: 'Quantum glyphs', side: 1, y: 90, items: ['backend path, register,', 'rotation, shots and error,', 'processing, blur, pulse', 'schedule, Atlas usage'] },
  { t: 'Data and runtime', side: 1, y: 174, items: ['readouts, data cards, figures,', 'density, runtime, tiles,', 'signed distance, voxel values,', 'level sweep, slice card, stages'] },
]

/** Fig. 8: the compose system. The object in its frame, the library around it, one run under all. */
function ComposeFig() {
  const LB = 222, RB = 418, runY = 212
  const corners = [[256, 22, 1, 1], [384, 22, -1, 1], [256, 142, 1, -1], [384, 142, -1, -1]]
  return (
    <svg viewBox="0 0 640 258" className="rs__svg" role="img" aria-label="At the centre, the object (a form of cells with a cutting plane across it) in its frame, above a box labelled one shared run: the turn and the step, the cutting plane, the clock. Around it the library's seven categories, each joined to the shared run. Left: Marks (frame, orbit rings, camera, orbit abstracted, bounds, focus, selection, callouts, scan and slice); Parameters (any setting as a readout); Navigation (steps, run timeline, bars, indexes, captures); Controls (dials, number controls, view camera). Right: Evolve (nations, territory, chronicle, relations, record, log, one nation); Quantum glyphs (backend path, register, rotation, shots and error, processing, blur, pulse schedule, Atlas usage); Data and runtime (readouts, data cards, figures, density, runtime, tiles, signed distance, voxel values, level sweep, slice card, stages).">
      <text x={320} y={12} textAnchor="middle" className="rs__tx rs__tx--dim">the object</text>
      {corners.map(([x, y, dx, dy]) => <path key={`${x}.${y}`} d={`M${x} ${y + dy * 10} V${y} H${x + dx * 10}`} className="rs__ln rs__ln--k" />)}
      {RUNS[2].cells.map((v, k) => v && <rect key={k} x={270 + (k % 10) * 10} y={32 + Math.floor(k / 10) * 10} width={9} height={9} className="rs__fill" />)}
      <line x1={262} y1={96.5} x2={378} y2={96.5} className="rs__ln rs__ln--dash" />
      <line x1={320} y1={146} x2={320} y2={172} className="rs__ln rs__ln--k" />
      <rect x={250} y={172} width={140} height={80} className="rs__box rs__box--ink" />
      <text x={320} y={192} textAnchor="middle" className="rs__tx rs__tx--h">one shared run</text>
      <text x={320} y={210} textAnchor="middle" className="rs__tx">the turn and the step</text>
      <text x={320} y={224} textAnchor="middle" className="rs__tx">the cutting plane</text>
      <text x={320} y={238} textAnchor="middle" className="rs__tx">the clock</text>
      <path d={`M${LB} 16 V${runY} H250`} className="rs__ln rs__ln--k" />
      <path d={`M${RB} 16 V${runY} H390`} className="rs__ln rs__ln--k" />
      {LIBRARY.map((c) => {
        const x = c.side ? 444 : 0, bus = c.side ? RB : LB
        return (
          <g key={c.t}>
            <text x={x} y={c.y} className="rs__tx rs__tx--h">{c.t}</text>
            {c.items.map((l, k) => <text key={l} x={x} y={c.y + 16 + k * 14} className="rs__tx">{l}</text>)}
            <line x1={c.side ? RB : 204} y1={c.y - 4} x2={c.side ? 436 : LB} y2={c.y - 4} className="rs__ln rs__ln--k" />
            <circle cx={bus} cy={c.y - 4} r={2} className="rs__dot" />
          </g>
        )
      })}
    </svg>
  )
}

/** Where the cutting plane is at t seconds, 0 (bottom) to 1 (top): eight seconds each way. */
const sweep = (t: number) => {
  const b = (t / 8) % 2
  return b > 1 ? 2 - b : b
}

/** Fig. 9: one clock. The animation's loop with the default settings, the plane, two pieces. */
function ClockFig() {
  // Model, Voxels and Mesh hold 4 s; Evolve plays 60 turns at 4 a second after it has risen; each step
  // grows up through the plane out of the one before it for its first 2.4 s (Model out of the Mesh,
  // as the loop goes round)
  const W = 2.4, T = 29.4
  const x0 = 44, x1 = 632, X = (t: number) => x0 + (t / T) * (x1 - x0)
  const segs = [{ t: 'Model', a: 0, b: 4 }, { t: 'Voxels', a: 4, b: 8 }, { t: 'Evolve', a: 8, b: 25.4 }, { t: 'Mesh', a: 25.4, b: 29.4 }]
  const top = 140, bot = 196, Y = (p: number) => bot - p * (bot - top)
  const plane = (t: number) => {
    const s = segs.find((x) => t >= x.a && t < x.a + W)
    return s ? (t - s.a) / W : sweep(t)
  }
  const pts: string[] = []
  for (let t = 0; t <= T + 1e-9; t += 0.1) pts.push(`${X(t).toFixed(1)},${Y(plane(Math.min(t, T - 1e-6))).toFixed(1)}`)
  const turn = (t: number) => Math.max(0, Math.min(60, Math.floor((t - 8 - W) * 4)))
  const lane = (t: number) => 236 - (turn(t) / 60) * 16
  let stairs = `M${X(0)} ${lane(0)}`
  for (let t = 1; t <= T; t++) stairs += ` H${X(t).toFixed(1)} V${lane(t).toFixed(1)}`
  const now = 15, a = 'url(#rs-arw-clock)'
  return (
    <svg viewBox="0 0 640 294" className="rs__svg" role="img" aria-label="A timeline of one pass of the animation with the default settings, about 29 seconds: Model 4 seconds, Voxels 4, Evolve 17.4 (it rises for 2.4 seconds, then plays sixty turns at four a second), Mesh 4, and then it loops. The first 2.4 seconds of every step are shaded: the step grows up through the cutting plane out of the one before it. Below, the cutting plane rises once from bottom to top at the start of every step, and sweeps up and down in between. Below that, two pieces: one animated, stepping up with the turns, and one holding still, a flat line. A dashed line marks one moment, which every piece reads.">
      <Arw id="rs-arw-clock" />
      <defs>
        <pattern id="rs-rise" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="5" className="rs__ln rs__ln--hatch" />
        </pattern>
      </defs>
      <path d={`M${x1 - 2} 40 V26 H${x0 + 2} V38`} className="rs__ln" fill="none" markerEnd={a} />
      <text x={X(21)} y={20} textAnchor="middle" className="rs__tx rs__tx--dim">the pass loops</text>
      {segs.map((s) => (
        <g key={s.t}>
          <rect x={X(s.a) + 1} y={40} width={X(s.b) - X(s.a) - 2} height={24} className="rs__box" />
          <rect x={X(s.a) + 1} y={40} width={X(s.a + W) - X(s.a) - 1} height={24} fill="url(#rs-rise)" className="rs__rise" />
          <text x={(X(s.a) + X(s.b)) / 2} y={56} textAnchor="middle" className="rs__tx rs__tx--m rs__tx--ink rs__tx--halo">{s.t}</text>
          {s.t !== 'Evolve' && <text x={(X(s.a) + X(s.b)) / 2} y={84} textAnchor="middle" className="rs__tx rs__tx--m rs__tx--dim">{s.b - s.a} s</text>}
        </g>
      ))}
      {Array.from({ length: 61 }, (_, k) => <line key={k} x1={X(8 + W + k / 4)} y1={64} x2={X(8 + W + k / 4)} y2={k % 10 ? 68 : 72} className="rs__ln" />)}
      <text x={X(17.9)} y={84} textAnchor="middle" className="rs__tx rs__tx--dim">60 turns at 4 a second</text>
      <line x1={x0} y1={98} x2={x1} y2={98} className="rs__ln" />
      {[0, 4, 8, 25.4, T].map((t) => (
        <g key={t}>
          <line x1={X(t)} y1={98} x2={X(t)} y2={102} className="rs__ln" />
          <text x={t === T ? X(t) + 4 : X(t)} y={114} textAnchor={t === T ? 'end' : 'middle'} className="rs__tx rs__tx--m rs__tx--dim">{t === T ? `${T} s` : t}</text>
        </g>
      ))}
      <text x={x0} y={132} className="rs__tx rs__tx--ink">the cutting plane</text>
      <line x1={x0} y1={top} x2={x1} y2={top} className="rs__ln rs__ln--faint" />
      <line x1={x0} y1={bot} x2={x1} y2={bot} className="rs__ln rs__ln--faint" />
      <text x={38} y={top + 4} textAnchor="end" className="rs__tx rs__tx--dim">top</text>
      <text x={38} y={bot + 4} textAnchor="end" className="rs__tx rs__tx--dim">bottom</text>
      <polyline points={pts.join(' ')} className="rs__ln rs__ln--ink" />
      <text x={X(8 + W) + 6} y={top - 4} className="rs__tx rs__tx--dim">each step rises through it</text>
      <text x={x0} y={214} className="rs__tx rs__tx--dim">a piece, animated: it moves with the clock</text>
      <path d="M24 223 V233 L32 228 Z" className="rs__fill" />
      <path d={stairs} className="rs__ln rs__ln--ink" />
      <text x={x0} y={254} className="rs__tx rs__tx--dim">a piece holding still: it keeps what it shows</text>
      <rect x={24.5} y={260.5} width={8} height={8} className="rs__ln rs__ln--k" />
      <line x1={x0} y1={264.5} x2={x1} y2={264.5} className="rs__ln rs__ln--ink" />
      <line x1={X(now)} y1={34} x2={X(now)} y2={272} className="rs__ln rs__ln--dash" />
      <circle cx={X(now)} cy={Y(plane(now))} r={3} className="rs__dot" />
      <circle cx={X(now)} cy={lane(now)} r={3} className="rs__dot" />
      <circle cx={X(now)} cy={264.5} r={3} className="rs__dot" />
      <text x={X(now)} y={288} textAnchor="middle" className="rs__tx rs__tx--ink">every piece reads this moment</text>
    </svg>
  )
}

// ── the page ───────────────────────────────────────────────────────────

/** Research: the research behind Quantum Sculptor, set as an article. */
export function ResearchPage() {
  const scroller = useRef<HTMLDivElement>(null)
  const [here, setHere] = useState(SECTIONS[0].id)

  // the contents follow the section nearest the top of the reading area
  useEffect(() => {
    const root = scroller.current
    if (!root) return
    const ids = [...SECTIONS, ...BACK].map((s) => s.id)
    const pick = () => {
      const top = root.getBoundingClientRect().top + 120
      let cur = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= top) cur = id
      }
      setHere(cur)
    }
    pick()
    root.addEventListener('scroll', pick, { passive: true })
    return () => root.removeEventListener('scroll', pick)
  }, [])

  return (
    <div className="notes rs" ref={scroller}>
      <div className="rs__page">
        <header className="rs__mast">
          <span>Quantum Sculptor · Research</span>
          <span>Working paper 01 · October 2026</span>
        </header>

        <div className="rs__grid">
          <aside className="rs__margin">
            <nav className="rs__toc" aria-label="Contents">
              <span className="rs__label">Contents</span>
              <ol>
                {SECTIONS.map((s) => (
                  <li key={s.id}><a href={`#${s.id}`} onClick={jump(s.id)} className={here === s.id ? 'is-on' : ''}><span>{s.n}</span>{s.t}</a></li>
                ))}
                {BACK.map((s) => (
                  <li key={s.id}><a href={`#${s.id}`} onClick={jump(s.id)} className={here === s.id ? 'is-on' : ''}><span /> {s.t}</a></li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="rs__col">
            <header className="rs__head">
              <h1 className="rs__t">Handing the carving over to measurement</h1>
              <p className="rs__sub">Who is the author of a sculpture carved by quantum measurement?</p>
            </header>

            <figure className="rs__lead">
              <img src={`${import.meta.env.BASE_URL}research/lead.jpg`} alt="A white sculpture, a statue whose body has broken into blocks, walls and outgrowths, standing on a pale floor between the steel cabinets of a quantum computer." />
              <figcaption className="rs__leadcap">A statue carved by measurement, shown among the racks of a quantum computer. Visualisation.</figcaption>
            </figure>

            <div className="rs__abs">
              <dl className="rs__kw">
                <dt className="rs__label">Keywords</dt>
                {KEYWORDS.map((k) => <dd key={k}>{k}</dd>)}
              </dl>
              <div>
                <span className="rs__label">Abstract</span>
                <p className="rs__p rs__p--abs">
                  Quantum Sculptor is software that reshapes an existing 3D model using the results of quantum
                  measurements. We take a digital scan of a statue, divide it into twelve regions that we call
                  nations, and give each nation a qubit, the basic unit of a quantum computer. On each of sixty turns,
                  every nation is asked one question, and the measured answer decides whether it adds material to the
                  statue or carves some away. We argue that measurement does not remove the author. It moves the
                  author’s work earlier, into five decisions made before any measurement: the model, how it is
                  divided, the metaphor of nations at war, the rules, and the turn at which to stop. Each run is
                  therefore a space of possible histories, far too large to see in full, and each print records one
                  history that never happened to the statue but could have. We take up the strongest objection, that
                  an ordinary computer’s random numbers would make sculptures nobody could tell apart from ours, and
                  close with a caution about our own software, which makes these spaces look easier to see as a whole
                  than they are.
                </p>
              </div>
            </div>

            <Sec {...SECTIONS[0]}>
              <p className="rs__p">
                We argue that measurement moves authorship from the carving to the conditions. A few terms are
                needed to say what that means. A <b>3D model</b> describes an object’s surface as many small flat
                triangles; ours began as a scan of a statue. A <b>voxel</b> is a tiny cube, the 3D equivalent of a
                pixel: filling the space the statue occupies with a grid of voxels turns it into a block of cubes that
                a program can count and change. A <b>qubit</b> is the basic unit of a quantum computer. An ordinary
                bit is either 0 or 1; a qubit, until it is <b>measured</b>, holds odds of each, and measuring it
                gives one definite answer, picked by chance according to those odds.
              </p>
              <p className="rs__p">
                Quantum Sculptor turns a 3D model into voxels, divides the voxels into regions called nations, and
                lets measurement decide what each nation does on every turn: where material is added and where it is
                carved away. No person makes those decisions. By <b>the conditions</b> we mean the five things we set
                before any measurement: the model, how it is divided, the metaphor of nations at war, the rules, and
                the turn at which to stop. The AI researcher Kate Crawford calls such settings “the parameters of the
                possible” (Crawford, cited in Somaini, 2026). Measurement chooses only within them.
              </p>
              <p className="rs__p">
                Each run is therefore a space of possible histories. We can run any named history, but we can never
                look at all the possible ones. The print is one of those histories made solid, which makes it a{' '}
                <b>counterfactual</b> record of the statue: an account of something that did not happen to it but
                could have, under conditions that can be stated.
              </p>
              <p className="rs__p">
                The media theorist Marshall McLuhan calls every technology an extension of the body that also numbs
                the part it replaces (McLuhan, 1964, pp. 41–42). Here it is the hand that is replaced: where and how much to
                carve is now decided by measurement. But measurement is only one of three sources of chance in this
                work. The other two are rules we wrote, and a quantum state that, for now, we simulate on our own
                computer instead of running on quantum hardware.
              </p>
            </Sec>

            <Sec {...SECTIONS[1]}>
              <p className="rs__p">
                Between the statue and the qubits, information is lost at every step. The statue is scanned; the
                scan, a surface of 500,112 triangles, is voxelised into a grid of 128 × 128 × 128, of which 39,816
                voxels are solid; regions of that grid are each given a qubit; the qubits are measured; the measured
                result reshapes the scanned surface; and the surface is printed (Fig. 1).
              </p>
              <Fig n={1} wide caption="Quantum Sculptor from start to finish. A model is voxelised, passed through one of four quantum engines, turned back into a printable surface, and composed for display. Evolve (filled) is the engine with nations.">
                <ProgramFig />
              </Fig>
              <p className="rs__p">
                The film and media theorist Antonio Somaini describes two losses that an image goes through on its way
                into a generative AI model: one when it is digitised, and another when it is compressed into the long
                lists of numbers, called vectors, that such models work with (Somaini, 2026). Both happen here. The first
                is the scan and the grid: each voxel records only how much of it the statue fills, so every detail
                smaller than a voxel is gone. The second is the step onto qubits. In Evolve, a region of about 3,300
                voxels is reduced to a single qubit, and all the program knows of that region’s character is three
                numbers.<N n={1} />
              </p>
              <h3 className="rs__h3">The third loss</h3>
              <p className="rs__p">
                Measurement is a third loss, and the only step in the chain that also gives something back. A
                nation starts as a region with voxels of its own: definite, countable, in one place. Once it is
                represented by a qubit, it holds odds instead of an answer. Its qubit is then <b>entangled</b> with
                its neighbours’, linked so that their answers are correlated and measuring one says something about
                the other. The more strongly a nation is linked, the less definite it is on its own: its answers
                drift towards a coin toss, and only the pair is definite. A quantum computer describes twelve linked
                qubits with 4,096 numbers, one for every combination of the twelve answers, and none of those numbers
                belongs to a single nation. Somaini describes the hidden spaces inside AI models as fields of
                potential forms rather than stores of finished ones (Somaini, 2026); between preparation and
                measurement, a run is such a field almost literally, a list of numbers transformed by matrices.
              </p>
              <p className="rs__p">
                Measurement keeps one answer out of those odds and discards the rest. It also makes the nation
                definite again, since a yes or a no becomes a change of whole voxels; but the nation that comes back
                has shifted its tendencies, strengthened or broken its links, and moved its border (Fig. 2). A single
                voxel goes through the same passage in our other engine, the blur. It starts inside or outside the
                model, becomes a fraction when the model is voxelised, is mixed with its neighbours, and becomes
                inside or outside again only when the surface is cut at a chosen level, not always on the side where
                it began.
              </p>
              <Fig n={2} wide caption="Losing and regaining definiteness. A nation, or a single voxel, is first definite, then held as odds, then merged into a state it shares with its neighbours. Measurement, or cutting the surface at a level, makes it definite again, but not as it was.">
                <AbsorbFig />
              </Fig>
            </Sec>

            <Sec {...SECTIONS[2]}>
              <p className="rs__p">
                The regions are nations at war because the metaphor decides what measurement can do. The linguist
                George Lakoff and the philosopher Mark Johnson show that metaphors such as ARGUMENT IS WAR shape what
                people do, not only what they say: we attack a position, defend a claim, and win or lose a point
                (Lakoff and Johnson, 1980, p. 4). Evolve takes such a metaphor literally. Following a method by the physicist James Wootton
                for generating maps with qubits (Wootton, 2020),<N n={2} /> its regions are nations, their voxels are
                territory, and the only verbs open to them are attack, defend and explore. Whatever the measurements
                decide, they choose among those verbs.
              </p>
              <h3 className="rs__h3">Three tendencies, one question</h3>
              <p className="rs__p">
                Each nation is one qubit, and the qubit stores three tendencies: to attack, to defend and to explore.
                Physicists picture a qubit’s state as an arrow from the centre of a sphere, and the three tendencies
                are how far that arrow points along three directions (Fig. 3). With only one arrow, a nation that
                leans fully towards attack has no lean left for the other two. The three questions cannot be asked
                at once, because in quantum mechanics measuring one disturbs the answers to the other two, so the
                program asks each nation one question per turn.<N n={3} /> Before the answer is measured, only the
                chance of a yes is known. It depends on how far the arrow points along the direction asked about, a
                number b between −1 and 1:
              </p>
              <div className="rs__eq">chance of yes = (1 + b) / 2</div>
              <Fig n={3} caption="One nation. Its three tendencies are the directions of one arrow inside a sphere. When the nation is asked a question, how far the arrow points along that direction (b) sets the chance of a yes.">
                <SphereFig />
              </Fig>
              <p className="rs__p">
                Neighbouring nations are entangled, and the closer two nations are, the stronger the link the program
                makes between their qubits.<N n={4} /> Looked at alone, a strongly linked nation is less sure of
                itself: its arrow shortens and its chance of a yes slides towards one half. Looked at as a pair, the
                two answers agree more often than chance would give. A nation cannot be strongly linked to all its
                neighbours at once, a limit of entanglement itself, and that limit is why each nation keeps only one
                strong tie at a time. Physics suggests the rule; our code enforces it.<N n={5} />
              </p>
              <h3 className="rs__h3">Six marks</h3>
              <p className="rs__p">
                On every turn, all nations are set up, asked, measured and moved at the same time (Fig. 4). The
                question and the answer together decide what a nation does, and each of the six possible actions
                leaves its own kind of mark on the shape (Table 1). Afterwards, tendencies and ties shift by rules we
                wrote: losing territory makes a nation more inclined to attack, gaining it makes it more inclined to
                defend, and a fight weakens a tie.
              </p>
              <Fig n={4} wide caption="One turn, repeated sixty times. Inside the loop, only the measurement is not decided in advance; every other step is one of our rules. The original surface is carried round the loop untouched and is reshaped by the result at the end.">
                <LoopFig />
              </Fig>
              <Fig n={1} kind="Table" caption="The six actions. Each question has one action for a yes and one for a no.">
                <table className="rs__tbl">
                  <thead><tr><th>Asked</th><th>Answers yes</th><th>Answers no</th></tr></thead>
                  <tbody>
                    <tr>
                      <th>Attack</th>
                      <td><b>Attack.</b> Takes over the outer layer of its least friendly neighbour where the two touch. When two nations attack each other, both front lines vanish and a crack opens between them.<N n={6} /></td>
                      <td><b>Flee.</b> Breaks contact with that neighbour and moves one voxel outward, until it becomes an island floating away from the body.</td>
                    </tr>
                    <tr>
                      <th>Defend</th>
                      <td><b>Fortify.</b> Builds up a layer on its outer surface near its borders.</td>
                      <td><b>Split.</b> Its far half breaks away and becomes a new nation.</td>
                    </tr>
                    <tr>
                      <th>Explore</th>
                      <td><b>Grow.</b> Fills the gaps inside its own body, then grows outward.</td>
                      <td><b>Wither.</b> Its outermost voxels fall away. When none are left, it has died out.</td>
                    </tr>
                  </tbody>
                </table>
              </Fig>
              <h3 className="rs__h3">We chose war</h3>
              <p className="rs__p">
                The cracks, walls, horns and islands in our print are marks of the metaphor as much as of
                measurement (Fig. 7). Under a metaphor of growth, a nation could only add material or shed it, and
                the form would swell and thin without ever cracking along a front. Under a metaphor of conversation,
                neighbours would trade voxels across their borders, blurring the borders that war breaks open. The same
                processor, the same twelve qubits and the same sixty turns would carve a different statue in each
                case. Choosing war was our decision, made before any measurement, and it is the largest single
                decision in the piece.
              </p>
            </Sec>

            <Sec {...SECTIONS[3]}>
              <p className="rs__p">
                The piece made on 5 October 2026 started from a 3D scan of a Roman statue of Aion, the god of
                unbounded time, in the Louvre, filed as <C>Aion_Louvre</C>. Table 2 lists every setting of the run,
                each one a decision of ours.
              </p>
              <Fig n={2} kind="Table" caption="The settings of the 5 October run, and what each one decides.">
                <table className="rs__tbl rs__tbl--set">
                  <thead><tr><th>Step</th><th>Setting</th><th>Value</th><th>What it decides</th></tr></thead>
                  <tbody>
                    <tr><th rowSpan={2}>Giving the form</th><td>Model</td><td className="rs__v">Aion_Louvre, 500,112 triangles</td><td>The given starting point: a scan of a statue</td></tr>
                    <tr><td>Voxel grid</td><td className="rs__v">128³, 39,816 solid voxels</td><td>The grain of the material, and the first loss</td></tr>
                    <tr><th rowSpan={4}>Evolving</th><td>Nations</td><td className="rs__v">12</td><td>12 qubits, one per region</td></tr>
                    <tr><td>Turns</td><td className="rs__v">60</td><td>60 rounds of measurement, and where the history stops</td></tr>
                    <tr><td>Reach</td><td className="rs__v">4% of the grid</td><td>How far walls and horns may stand out from the original surface</td></tr>
                    <tr><td>Random numbers</td><td className="rs__v">ibm_fez, 5 s</td><td>A real IBM quantum processor and the time used on it: the source of every random choice</td></tr>
                    <tr><th rowSpan={6}>Joining</th><td>Surface</td><td className="rs__v">quantum field</td><td>Keep the original surface, then let the result push it</td></tr>
                    <tr><td>Push amount</td><td className="rs__v">6 (range 0–8)</td><td>How far the result moves the original surface</td></tr>
                    <tr><td>Threshold</td><td className="rs__v">0.18</td><td>Where the surface is cut; lower swells the form, higher erodes it</td></tr>
                    <tr><td>Refinement</td><td className="rs__v">×2, 256³</td><td>How much of the scan’s fine detail survives the first loss</td></tr>
                    <tr><td>Finishing</td><td className="rs__v">close 1.5, smooth ×19</td><td>Making the form printable: small gaps closed, the surface smoothed, all large pieces kept</td></tr>
                    <tr><td>Print height</td><td className="rs__v">90 mm</td><td>The size of the object</td></tr>
                  </tbody>
                </table>
              </Fig>
              <p className="rs__p">
                Over the sixty turns, the twelve nations became sixteen through four splits, and all sixteen
                survived. Twice two nations attacked each other at once, opening cracks; one nation fled off the
                body; none was absorbed by a neighbour or died out. The number of solid voxels went from 39,816 to
                53,196: 22,784 were added and 9,404 carved away.
              </p>
              <p className="rs__p">
                The evolved grid is too coarse to print on its own and knows nothing of the scan’s fine surface. We
                therefore kept that surface, rebuilt it on a finer grid of 256 × 256 × 256 voxels, and let the
                evolved result push it: outward where nations grew, inward where material was carved away. How far
                it moves is the push amount (Fig. 5). At 0 the scan comes back unchanged; at 8 the form is as close
                as possible to what the nations made on their own. We chose 6, at which the statue is still
                recognisable while its body breaks into sections, walls rise along the borders, horns grow from the
                surface and islands drift away from it (Figs 6 and 7).
              </p>
              <Fig n={5} wide caption="The push amount, from 0 to 8. At 0 the scan is unchanged; the higher it goes, the closer the form comes to what the nations made on their own. This piece uses 6.">
                <DialFig />
              </Fig>
              <Fig n={6} caption="The carved form (left) beside the statue it started from (right). Visualisation.">
                <img className="rs__img" src={`${import.meta.env.BASE_URL}research/piece.jpg`} alt="Two figures side by side on black: on the right, a classical statue of a lion-headed winged man wrapped by a snake; on the left, a white form of the same height whose body has broken into blocky walls, cracks and outgrowths." />
              </Fig>
              <Fig n={7} caption="Detail of the carved surface: walls where nations met, cracks where two attacked each other, and the stepped edges of the voxel grid. Visualisation.">
                <img className="rs__img" src={`${import.meta.env.BASE_URL}research/detail.jpg`} alt="Close-up of a white carved surface made of stepped blocks, ridges and grooves, lit from the side against black." />
              </Fig>
              <h3 className="rs__h3">Where we stop</h3>
              <p className="rs__p">
                A history has no natural end. Under an earlier version of the rules we let one run go on for 400
                turns, and at the end about a hundred voxels were still changing hands on every turn. Sixty turns is
                the Lab’s default, and we kept it; any other number would have given a different object from the same
                measurements, since a shorter run is exactly the beginning of a longer one. Stopping is
                as much a decision as the model or the metaphor, made before the first measurement.
              </p>
            </Sec>

            <Sec {...SECTIONS[4]}>
              <p className="rs__p">
                A sceptical reader will say that this is a random-number generator with a quantum label. Ordinary
                computers make random numbers with a formula, a <b>pseudo-random generator</b>, whose output looks
                random but is fixed entirely by a starting value. Seed one with a number we typed, run the same rules,
                and the sculptures would be indistinguishable from ours. Our own figures partly agree. Under an
                earlier version of the rules, nations linked as allies acted together 60% of the time, against 54%
                when each tossed its own coin;<N n={7} /> the quantum correlations leave a trace in the shape, and
                the rules leave most of it. Table 3 sets out which parts of a run are measured on quantum hardware,
                which are simulated on our computer, and which are written by us.
              </p>
              <Fig n={3} kind="Table" caption="What the run of 5 October 2026 is made of.">
                <table className="rs__tbl">
                  <thead><tr><th>Part of the run</th><th>Where it comes from</th></tr></thead>
                  <tbody>
                    <tr><th>Random numbers</th><td><b>Measured</b> on the IBM processor <C>ibm_fez</C>, using 5 s of its time, through Moth’s random-number engine <C>comet-qrng-v1</C> on its Atlas platform<N n={8} /></td></tr>
                    <tr><th>Division into nations</th><td><b>Measured</b>: voxels grouped by position, starting from those numbers</td></tr>
                    <tr><th>Question for each nation</th><td><b>Measured</b>: drawn with those numbers, weighted by each nation’s tendencies</td></tr>
                    <tr><th>Quantum state</th><td><b>Simulated</b> on our computer, one qubit per nation, sixteen at most</td></tr>
                    <tr><th>Each answer</th><td><b>Both</b>: the odds come from the simulated state, the choice from a measured number</td></tr>
                    <tr><th>Actions, updates, ties</th><td><b>Written</b>: our rules, Section III</td></tr>
                    <tr><th>The circuit on a quantum chip</th><td><b>Not yet run</b>: the route exists, as <C>graph-v1</C> on Atlas<N n={9} /></td></tr>
                    <tr><th>Trace of the correlations</th><td>Allies acting together 60% of the time against 54%, under earlier rules; not yet repeated</td></tr>
                  </tbody>
                </table>
              </Fig>
              <p className="rs__p">
                On what the form looks like, then, the objection is right. McLuhan’s claim that “the medium is the
                message” (McLuhan, 1964, p. 7), that the means by which something arrives matters more than what it
                carries, points to where the difference lies: in what kind of object the form is. Every decision in
                our print traces back to a named quantum processor, a measured amount of time on it, and a count of
                the random bytes that arrived and the bytes that were used. All of it is written into the{' '}
                <b>provenance</b> record, the documented history of the object, saved beside the printable file.
              </p>
              <p className="rs__p">
                A pseudo-random version would trace back to a number we typed, and its record would say so. Ours
                traces back to <C>ibm_fez</C>, five seconds of processor time and a count of the bytes used. The
                record also states the limits: a simulated state, a small trace of correlation and a circuit not yet
                sent to a chip.
              </p>
            </Sec>

            <Sec {...SECTIONS[5]}>
              <p className="rs__p">
                Each run works like the latent space of an AI model. In machine learning, a <b>latent space</b> is
                the internal space in which a model represents what it has learned: each example, an image for
                instance, is compressed into a short list of numbers and placed as a point in that space, and to
                generate something new is to move through the space and turn the point one arrives at back into an
                image. Somaini argues that images today cannot be understood without understanding these spaces (Somaini, 2026).
                A run has the same parts on a small scale. Voxelising compresses the model; giving each nation a
                qubit reduces it to a few numbers; and between preparation and measurement there are only odds,
                spread over every history the rules allow.
              </p>
              <p className="rs__p">
                That spread is far too large to look at. On each turn, twelve nations can each be asked one of three
                questions and give one of two answers: 6¹², about 2.2 billion combinations for a single turn, before
                any split adds a thirteenth nation. Over sixty turns that grows to more than 10⁵⁶⁰ possible histories
                for one run, a number with 561 digits. A run’s name fixes the starting point of its random choices,
                so the same name always leads back to the same history.<N n={10} /> We can run any named history, but
                we can never look at all the possible ones.
              </p>
              <p className="rs__p">
                The media theorist Wolfgang Ernst calls this kind of collection a “latent archive”, made of what he
                calls “algorithmic objects”: objects “that always come into being anew” instead of existing as fixed
                data (Ernst, 2013, p. 82). Our runs are kept as names
                and records; the form itself is not stored anywhere, and comes into being again whenever a name is
                run. On 5 October we made three runs, and their random numbers were measured on three IBM processors,{' '}
                <C>ibm_marrakesh</C>, <C>ibm_boston</C> and <C>ibm_fez</C> (Fig. 8).
              </p>
              <Fig n={8} wide caption="Three latent spaces from one model. Each run has its own name and its own random numbers, measured on a different processor, and gives a different form. Drawn schematically: the run names are illustrative, while the processors are the ones the runs of 5 October 2026 used.">
                <RunsFig />
              </Fig>
              <h3 className="rs__h3">A counterfactual record</h3>
              <p className="rs__p">
                Where analysis asks what happened, Somaini writes, generative models produce “what could have
                happened, given the conditions that the models have captured and encoded during training”
                (Somaini, 2026). Our print is an object of this kind. The scan records a statue that exists, and the
                sixty turns record a history that never happened to it but could have, given its shape, its division
                into twelve and the six actions open to its parts. The reshaped surface holds both in one skin: its
                fine detail comes from the scan, its walls and cracks from odds and rules, and nothing on the object
                marks where one stops and the other begins.
              </p>
              <p className="rs__p">
                The three runs could be averaged into one form. The artist Hito Steyerl argues that generative AI
                makes “mean images”, renderings of a statistical average that belong to no actual case (Steyerl, 2023).
                An average of our runs would be a form of that kind: no closer to the statue and no more correct than
                any one of the three, and the product of no history at all. We keep the runs side by side instead,
                each filed under its name.
              </p>
            </Sec>

            <Sec {...SECTIONS[6]}>
              <p className="rs__p">
                The Lab, the interactive part of Quantum Sculptor, presents runs as if they could be seen as a whole
                (see the Appendix). It is a 3D workspace in which every run of a session is filed under its name, one
                timeline scrubs back and forth through a history, and every readout around the object shows the same
                moment. The media scholar Roland Meyer calls the promise built into such tools, that a user can see and
                control a whole collection, an “operative imaginary”, made of “the ideas of overview, access, and
                control” (Meyer, 2025, p. 276). The Lab shows three runs side by side, smoothly, as if they were a fair sample of
                the space, when they are three paths out of more than 10⁵⁶⁰.
              </p>
              <p className="rs__p">
                The writer and curator Anthony Downey, discussing the artist Trevor Paglen’s AI-generated series{' '}
                <span className="rs__ti">Adversarially Evolved Hallucinations</span>, describes how such images invite
                us to take a machine’s guess for a record of the world, a projection from probabilities, made by a
                process we cannot inspect (Downey, 2024). Our forms invite the same over-reading, and the word “quantum”
                adds an authority of its own. A print is one guess under stated conditions.
              </p>
              <p className="rs__p">
                The software works against its own promise by keeping those conditions in view: the odds before every
                measurement, the engine that produced a result, the processor the random numbers came from and how
                many were used, and the word “preview” wherever a value is assumed rather than computed. The record
                saved with every export carries the same list.
              </p>
            </Sec>

            <Sec {...SECTIONS[7]}>
              <p className="rs__p">
                We made three runs on 5 October 2026 and printed the one whose random numbers were measured on{' '}
                <C>ibm_fez</C>. The runs measured on <C>ibm_marrakesh</C> and <C>ibm_boston</C> are named, so either
                could be run again, reshaped and printed. Leaving them unprinted was a decision of the same kind as
                stopping at turn sixty, and the object on the table does not show it.
              </p>
            </Sec>

            <Sec {...SECTIONS[8]}>
              <p className="rs__p">
                The Lab takes a model through the five steps of Fig. 1. <b>Voxelise</b> turns the model’s surface
                into a grid of 16 to 256 voxels on each side. The <b>quantum</b> step reduces that grid to qubits:
                the Quantum Blur Core, a method published by the quantum computing company Moth, writes each row of
                the grid into a few qubits, and Evolve gives each region a single qubit. <b>Measurement</b> samples
                the result: the blur is run many times and its answers counted, while Evolve takes a single yes or no.{' '}
                <b>Mesh</b> cuts a printable surface through the result at one chosen level, and a level sweep shows
                the same result cut at five levels so that the choice of level is visible.
              </p>
              <p className="rs__p">
                <b>Compose</b> arranges graphic elements around the object, drawn from a library in seven categories
                (Fig. 9). Every element reads the same run, so a readout of the push amount, the chronicle of a
                history and the frame around the view always agree. One clock moves through the model, the voxels,
                the sixty turns at four a second and the mesh, while a cutting plane sweeps through the object
                (Fig. 10). Each element either moves with the run or holds one measured moment still. Fig. 11 shows
                Evolve as the Lab draws it.
              </p>
              <Fig n={9} wide caption="The compose system. Elements from seven categories sit around the object, and every one of them reads the same run, so the frame, a readout and a chronicle always show the same moment.">
                <ComposeFig />
              </Fig>
              <Fig n={10} wide caption="One clock. A pass through a run with the default settings: 4 seconds each for Model, Voxels and Mesh, and sixty turns of Evolve at four a second. Each step grows up through the cutting plane out of the one before it (hatched); in between, the plane sweeps up and down. Each element is either animated or holding still.">
                <ClockFig />
              </Fig>
              <Fig n={11} caption="Evolve in the Lab, on one of the built-in Calabi-Yau shapes, after sixty turns: each nation in its own colour, with the turn-by-turn chronicle below.">
                <img className="rs__img" src={`${import.meta.env.BASE_URL}research/lab.jpg`} alt="The Quantum Sculptor Lab: a dark interface with settings on the left, a 3D view in the middle where a rounded form is divided into coloured blocks, one colour per nation, and a log of turns underneath." />
              </Fig>
            </Sec>

            <section className="rs__back" id="rs-notes" aria-labelledby="rs-notes-h">
              <h2 className="rs__h rs__h--back" id="rs-notes-h">Endnotes</h2>
              <ol className="rs__notes">
                <li id="rs-n1">The Quantum Blur Core reduces the grid differently: seven qubits hold a row of 128 voxels as 128 numbers, and each added qubit doubles the length. On Atlas a large grid is split into tiles of at most 65,536 values, each sent as its own job. <Back n={1} /></li>
                <li id="rs-n2">Wootton treats the regions of a map as nations with one qubit each. Here the map is a body, and the regions are found by grouping the solid voxels by position. <Back n={2} /></li>
                <li id="rs-n3">The three tendencies are the X, Y and Z components of one qubit’s state. Measuring along one axis leaves the other two undetermined, so a nation cannot be asked two questions in the same measurement. To ask a question, the program first turns the asked axis onto the one it measures. b is the component of the qubit’s actual state along that axis, which is shorter than the direction it was given whenever the qubit is entangled. <Back n={3} /></li>
                <li id="rs-n4">The link is a two-qubit operation, a ZZ rotation, whose angle is θ = s · π / 2, where s, the strength of the tie, runs from 0 to 1. <Back n={4} /></li>
                <li id="rs-n5">We tested the alternative. When every tie was allowed to tighten at once, the agreement within any one pair was washed out by the others, and nations acted like independent coin tosses. Only a few exclusive ties let allies act together, so we wrote that limit into the rules. <Back n={5} /></li>
                <li id="rs-n6">A defending neighbour holds against one attacker and gives way to two attacking in the same turn. A neighbour with too little left is absorbed whole. Only a nation that has grown past its starting size can split. <Back n={6} /></li>
                <li id="rs-n7">The rules have changed since that measurement, most of all in how ties are kept. The figures are an indication, not a result for this piece. <Back n={7} /></li>
                <li id="rs-n8">The random bytes that arrived and the bytes used are counted in the record saved beside the printable file. <Back n={8} /></li>
                <li id="rs-n9">The nations’ circuit, a rotation for each qubit and a ZZ rotation for each tie, can be sent to Atlas as <C>graph-v1</C> as it stands. We have not run it yet. <Back n={9} /></li>
                <li id="rs-n10">In Evolve the run name sets the starting point of the random choices: the same name gives the same history, and a shorter run is exactly the beginning of a longer one. <Back n={10} /></li>
              </ol>
            </section>

            <section className="rs__back" id="rs-cited" aria-labelledby="rs-cited-h">
              <h2 className="rs__h rs__h--back" id="rs-cited-h">Works cited</h2>
              <ul className="rs__cited">
                <li>Downey, A. (2024) ‘Uncanny returns: Trevor Paglen and the hallucinatory domain of generative AI’, <span className="rs__ti">The MIT Press Reader</span>, 23 September. Available at: <a href="https://thereader.mitpress.mit.edu/uncanny-returns-trevor-paglen-and-the-hallucinatory-domain-of-generative-ai/">https://thereader.mitpress.mit.edu/uncanny-returns-trevor-paglen-and-the-hallucinatory-domain-of-generative-ai/</a> (Accessed: 6 October 2026).</li>
                <li>Ernst, W. (2013) ‘Underway to the dual system: classical archives and digital memory’, in Parikka, J. (ed.) <span className="rs__ti">Digital memory and the archive</span>. Minneapolis: University of Minnesota Press, pp. 81–94.</li>
                <li>Lakoff, G. and Johnson, M. (1980) <span className="rs__ti">Metaphors we live by</span>. Chicago: University of Chicago Press.</li>
                <li>McLuhan, M. (1964) <span className="rs__ti">Understanding media: the extensions of man</span>. New York: McGraw-Hill.</li>
                <li>Meyer, R. (2025) ‘Operative image spaces: navigating virtual museum collections’, <span className="rs__ti">Swiss Journal of Sociology</span>, 51(2), pp. 273–289. doi:10.26034/cm.sjs.2025.6926.</li>
                <li>Somaini, A. (2026) ‘Latent spaces: AI, art, and the archive’, <span className="rs__ti">October</span>, 196, pp. 19–60. doi:10.1162/octo.a.545.</li>
                <li>Steyerl, H. (2023) ‘Mean images’, <span className="rs__ti">New Left Review</span>, 140/141, pp. 82–97. Available at: <a href="https://newleftreview.org/issues/ii140/articles/hito-steyerl-mean-images">https://newleftreview.org/issues/ii140/articles/hito-steyerl-mean-images</a> (Accessed: 6 October 2026).</li>
                <li>Wootton, J.R. (2020) ‘A quantum procedure for map generation’, in <span className="rs__ti">2020 IEEE Conference on Games (CoG)</span>. Osaka, 24–27 August. IEEE, pp. 73–80. doi:10.1109/CoG47356.2020.9231571.</li>
              </ul>
            </section>

            <section className="rs__back" id="rs-sources" aria-labelledby="rs-sources-h">
              <h2 className="rs__h rs__h--back" id="rs-sources-h">Sources</h2>
              <ul className="rs__src">
                <li>
                  <span className="rs__srcn">IBM Quantum</span>
                  Quantum processors <C>ibm_fez</C>, <C>ibm_marrakesh</C> and <C>ibm_boston</C>. The random numbers for the
                  three runs of 5 October 2026 were measured on them; the piece in Section IV used <C>ibm_fez</C>.
                </li>
                <li>
                  <span className="rs__srcn">Moth · Atlas</span>
                  Moth’s platform for quantum jobs, on real hardware or a simulator. Quantum Sculptor sends its jobs
                  through Atlas and fetches its random numbers from it.
                </li>
                <li>
                  <span className="rs__srcn">Moth · <C>comet-qrng-v1</C></span>
                  The random-number engine on Atlas: numbers measured on a quantum chip. Every random choice in an Evolve
                  history is taken from it.
                </li>
                <li>
                  <span className="rs__srcn">Moth · <C>entanglement-shader-v1</C></span>
                  The Entanglement Shader. It computed the reflectance and transmission tables, by viewing angle and film
                  phase, that the Entanglement shading reads.
                </li>
                <li>
                  <span className="rs__srcn">Moth · Quantum Blur Core</span>
                  The blur circuit: each axis of the grid written onto qubits and turned by rotations that mix
                  neighbouring cells. Gauss stands in for it with a plain blur, Emulate emulates it on the local machine,
                  and Atlas runs it as <C>blur-core-v1</C>.
                </li>
                <li>
                  <span className="rs__srcn">Source code</span>
                  The repository <C>wedgeglobal/Quantum-Sculptor</C> on GitHub.
                </li>
              </ul>
            </section>

            <section className="rs__back" id="rs-credits" aria-labelledby="rs-credits-h">
              <h2 className="rs__h rs__h--back" id="rs-credits-h">Credits</h2>
              <dl className="rs__credits">
                <dt>Concept and research</dt><dd>Wedge</dd>
                <dt>Software</dt><dd>A Python service (Flask) and a browser interface with a 3D view (three.js); on the website the service runs in the browser with Pyodide</dd>
                <dt>Quantum</dt><dd>Random numbers measured on IBM quantum chips and fetched through Moth Atlas (comet-qrng-v1); the nations’ circuit simulated locally as a state vector; the blur run by the Quantum Blur Core, emulated locally or on Atlas; Entanglement shading from entanglement-shader-v1 tables</dd>
                <dt>Geometry</dt><dd>Voxelisation, clustering by position, signed distance fields, surface extraction, STL export</dd>
                <dt>Type</dt><dd>TWK Everett and TWK Everett Mono</dd>
              </dl>
            </section>
          </article>
        </div>
      </div>
    </div>
  )
}
