import { copyFileSync, unlinkSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import {
  BorderStyle,
  Document,
  ExternalHyperlink,
  HeadingLevel,
  ImageRun,
  Packer,
  Paragraph,
  Table,
  TableBorders,
  TableCell,
  TableLayoutType,
  TableRow,
  TextRun,
  VerticalAlignTable,
  WidthType,
  type FileChild,
  type IParagraphOptions,
  type ParagraphChild,
} from 'docx'
import { telHref, telegramHandle, telegramHref } from '../src/data/contacts.ts'
import type { DocxAvatar } from './pdfAvatar.ts'

type CvEducationEntry = {
  degree: string
  institution: string
  period: string
}

type CvSectionTitles = {
  summary: string
  skills: string
  experience: string
  projects: string
  stack: string
  education: string
  languages: string
}

type CvBlock = {
  title: string
  location: string
  summary: string
  languages: string[]
  education: CvEducationEntry[]
  sections: CvSectionTitles
}

type SkillGroup = {
  title: string
  items: string[]
}

type ExperienceEntry = {
  company: string
  role: string
  period: string
  summary: string
  highlights: string[]
  stack: string[]
}

type ProjectEntry = {
  title: string
  description: string
  stack: string[]
  href: string
  demoHref?: string
}

export type CvDocxResume = {
  user: { name: string }
  cv: CvBlock
  skillGroups: SkillGroup[]
  experience: ExperienceEntry[]
  projects: ProjectEntry[]
}

export type CvDocxSite = {
  email?: string
  phone?: string
  telegram?: string
  github?: string
  linkedin?: string
}

const FONT = 'Calibri'
const BODY_SIZE = 22
const META_SIZE = 21
const TITLE_SIZE = 26
const NAME_SIZE = 44
const SECTION_SIZE = 24
const PHOTO_PX = 107
const PHOTO_CELL_DXA = 1800
const CONTENT_WIDTH_DXA = 10386

function bareUrl(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/+$/, '')
}

function run(
  text: string,
  options: { bold?: boolean; size?: number; color?: string } = {},
): TextRun {
  return new TextRun({
    text,
    font: FONT,
    size: options.size ?? BODY_SIZE,
    bold: options.bold,
    color: options.color,
  })
}

function hyperlink(
  text: string,
  url: string,
  size = BODY_SIZE,
): ExternalHyperlink {
  return new ExternalHyperlink({
    link: url,
    children: [
      new TextRun({
        text,
        font: FONT,
        size,
        style: 'Hyperlink',
        color: '0563C1',
      }),
    ],
  })
}

function joinChildren(parts: ParagraphChild[]): ParagraphChild[] {
  return parts.flatMap((part, index) =>
    index === 0 ? [part] : [run('  |  ', { size: META_SIZE }), part],
  )
}

function paragraph(
  children: ParagraphChild[],
  extra: Omit<IParagraphOptions, 'children' | 'text'> = {},
): Paragraph {
  return new Paragraph({
    spacing: { after: 80, line: 276 },
    ...extra,
    children,
  })
}

function sectionTitle(title: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 280, after: 80 },
    border: {
      bottom: {
        color: '999999',
        space: 1,
        style: BorderStyle.SINGLE,
        size: 6,
      },
    },
    children: [
      run(title.toUpperCase(), {
        bold: true,
        size: SECTION_SIZE,
        color: '111111',
      }),
    ],
  })
}

function bullet(text: string): Paragraph {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 40, line: 276 },
    children: [run(text)],
  })
}

function contactChildren(
  resume: CvDocxResume,
  site: CvDocxSite,
): ParagraphChild[] {
  const { cv } = resume
  const parts: (ParagraphChild | null)[] = [
    run(cv.location, { size: META_SIZE }),
    site.phone ? hyperlink(site.phone, telHref(site.phone), META_SIZE) : null,
    site.email
      ? hyperlink(site.email, `mailto:${site.email}`, META_SIZE)
      : null,
    site.telegram
      ? hyperlink(
          telegramHandle(site.telegram),
          telegramHref(site.telegram),
          META_SIZE,
        )
      : null,
  ]

  return joinChildren(parts.filter(part => part != null))
}

function profileLinks(site: CvDocxSite): ParagraphChild[] {
  const parts: (ParagraphChild | null)[] = [
    site.github
      ? hyperlink(bareUrl(site.github), site.github, META_SIZE)
      : null,
    site.linkedin
      ? hyperlink(bareUrl(site.linkedin), site.linkedin, META_SIZE)
      : null,
  ]

  return joinChildren(parts.filter(part => part != null))
}

function identityBlocks(resume: CvDocxResume, site: CvDocxSite): Paragraph[] {
  const blocks = [
    paragraph([run(resume.user.name, { bold: true, size: NAME_SIZE })], {
      heading: HeadingLevel.TITLE,
      spacing: { after: 60, line: 276 },
    }),
    paragraph([run(resume.cv.title, { size: TITLE_SIZE })]),
    paragraph(contactChildren(resume, site)),
  ]

  const links = profileLinks(site)

  if (links.length > 0) {
    blocks.push(paragraph(links))
  }

  return blocks
}

function headerWithPhoto(
  resume: CvDocxResume,
  site: CvDocxSite,
  avatar: DocxAvatar,
): Table {
  return new Table({
    width: { size: CONTENT_WIDTH_DXA, type: WidthType.DXA },
    columnWidths: [PHOTO_CELL_DXA, CONTENT_WIDTH_DXA - PHOTO_CELL_DXA],
    layout: TableLayoutType.FIXED,
    borders: TableBorders.NONE,
    rows: [
      new TableRow({
        cantSplit: true,
        children: [
          new TableCell({
            width: { size: PHOTO_CELL_DXA, type: WidthType.DXA },
            verticalAlign: VerticalAlignTable.CENTER,
            margins: { top: 0, bottom: 0, left: 0, right: 200 },
            children: [
              new Paragraph({
                spacing: { after: 0 },
                children: [
                  new ImageRun({
                    type: avatar.type,
                    data: avatar.data,
                    transformation: { width: PHOTO_PX, height: PHOTO_PX },
                    altText: {
                      name: resume.user.name,
                      description: resume.user.name,
                    },
                  }),
                ],
              }),
            ],
          }),
          new TableCell({
            width: {
              size: CONTENT_WIDTH_DXA - PHOTO_CELL_DXA,
              type: WidthType.DXA,
            },
            verticalAlign: VerticalAlignTable.CENTER,
            children: identityBlocks(resume, site),
          }),
        ],
      }),
    ],
  })
}

export function createCvDocument(
  resume: CvDocxResume,
  site: CvDocxSite,
  avatar: DocxAvatar | null = null,
): Document {
  const { cv } = resume
  const stackLabel = cv.sections.stack
  const children: FileChild[] = avatar
    ? [
        headerWithPhoto(resume, site, avatar),
        new Paragraph({ spacing: { after: 160 } }),
      ]
    : identityBlocks(resume, site)

  children.push(
    sectionTitle(cv.sections.summary),
    paragraph([run(cv.summary)]),
    sectionTitle(cv.sections.skills),
  )

  for (const group of resume.skillGroups) {
    children.push(
      paragraph([
        run(`${group.title}: `, { bold: true }),
        run(group.items.join(', ')),
      ]),
    )
  }

  children.push(sectionTitle(cv.sections.experience))

  for (const entry of resume.experience) {
    children.push(
      paragraph([run(`${entry.role}, ${entry.company}`, { bold: true })]),
      paragraph([run(entry.period, { color: '444444', size: META_SIZE })]),
      paragraph([run(entry.summary)]),
      ...entry.highlights.map(highlight => bullet(highlight)),
      paragraph([
        run(`${stackLabel}: `, { bold: true }),
        run(entry.stack.join(', ')),
      ]),
    )
  }

  children.push(sectionTitle(cv.sections.projects))

  for (const project of resume.projects) {
    const projectLinks: ParagraphChild[] = [
      hyperlink(bareUrl(project.href), project.href, META_SIZE),
    ]

    if (project.demoHref) {
      projectLinks.push(
        run('  |  ', { size: META_SIZE }),
        hyperlink(bareUrl(project.demoHref), project.demoHref, META_SIZE),
      )
    }

    children.push(
      paragraph([run(project.title, { bold: true })]),
      paragraph(projectLinks),
      paragraph([run(project.description)]),
      paragraph([
        run(`${stackLabel}: `, { bold: true }),
        run(project.stack.join(', ')),
      ]),
    )
  }

  children.push(sectionTitle(cv.sections.education))

  for (const entry of cv.education) {
    children.push(
      paragraph([run(entry.degree, { bold: true })]),
      paragraph([
        run(`${entry.institution}, ${entry.period}`, {
          color: '444444',
          size: META_SIZE,
        }),
      ]),
    )
  }

  children.push(
    sectionTitle(cv.sections.languages),
    ...cv.languages.map(language => bullet(language)),
  )

  return new Document({
    title: `${resume.user.name} - ${cv.title}`,
    creator: resume.user.name,
    description: cv.title,
    styles: {
      default: {
        document: {
          run: {
            font: FONT,
            size: BODY_SIZE,
            color: '111111',
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 680,
              bottom: 680,
              left: 760,
              right: 760,
            },
          },
        },
        children,
      },
    ],
  })
}

export async function writeCvDocx(
  resume: CvDocxResume,
  site: CvDocxSite,
  outPath: string,
  rootDir: string,
  avatar: DocxAvatar | null = null,
): Promise<void> {
  const buffer = await Packer.toBuffer(createCvDocument(resume, site, avatar))
  const tmpPath = `${outPath}.tmp.docx`

  writeFileSync(tmpPath, buffer)

  try {
    copyFileSync(tmpPath, outPath)
    console.log(`built ${path.relative(rootDir, outPath)}`)
  } catch (error) {
    const code =
      error && typeof error === 'object' && 'code' in error
        ? String(error.code)
        : ''

    if (code === 'EBUSY' || code === 'EPERM') {
      const fallback = outPath.replace(/\.docx$/i, '.new.docx')
      copyFileSync(tmpPath, fallback)
      console.warn(
        `could not overwrite ${path.relative(rootDir, outPath)} (file is open); wrote ${path.relative(rootDir, fallback)}`,
      )
    } else {
      throw error
    }
  } finally {
    try {
      unlinkSync(tmpPath)
    } catch {
      // ignore
    }
  }
}
