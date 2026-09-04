import { copyFileSync, mkdirSync, readFileSync, unlinkSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  Document,
  Font,
  Image,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
  renderToFile,
} from '@react-pdf/renderer'
import { writeCvDocx } from './buildCvDocx.ts'
import { resolveContentDir } from './contentRoot.ts'
import { cvFileName, cvOutputDir } from '../src/data/cvFiles.ts'
import type { Locale } from '../src/i18n/locales.ts'
import type { ReactNode } from 'react'
import { readDocxAvatar, readPdfAvatar, type DocxAvatar } from './pdfAvatar.ts'

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
  updated: string
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

type ResumeJson = {
  user: { name: string }
  cv: CvBlock
  skillGroups: SkillGroup[]
  experience: ExperienceEntry[]
  projects: ProjectEntry[]
}

type SiteJson = {
  email?: string
  phone?: string
  telegram?: string
  github?: string
  linkedin?: string
  photos: { avatar: string }
}

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const contentDir = resolveContentDir(rootDir)
const fontsDir = path.join(contentDir, 'fonts')
const outDir = path.join(rootDir, 'public', cvOutputDir)

function readJson<T>(fileName: string): T {
  return JSON.parse(readFileSync(path.join(contentDir, fileName), 'utf8')) as T
}

const site = readJson<SiteJson>('site.json')

const resumeByLocale: Record<Locale, ResumeJson> = {
  en: readJson<ResumeJson>('en.json'),
  ru: readJson<ResumeJson>('ru.json'),
}

Font.register({
  family: 'Roboto',
  fonts: [
    { src: path.join(fontsDir, 'Roboto-Regular.ttf'), fontWeight: 400 },
    { src: path.join(fontsDir, 'Roboto-Bold.ttf'), fontWeight: 700 },
  ],
})

// Splitting a word across lines corrupts the token when the PDF text is parsed.
Font.registerHyphenationCallback(word => [word])

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    fontSize: 9.5,
    lineHeight: 1.4,
    color: '#111111',
    paddingTop: 34,
    paddingBottom: 34,
    paddingHorizontal: 38,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    objectFit: 'cover',
    objectPosition: 'center',
    marginRight: 14,
  },
  headerText: {
    flexGrow: 1,
    flexShrink: 1,
  },
  name: {
    fontFamily: 'Roboto',
    fontSize: 19,
    fontWeight: 700,
    letterSpacing: 0.2,
    lineHeight: 1.2,
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 11.5,
    fontWeight: 400,
    marginTop: 10,
    lineHeight: 1.3,
  },
  contactLine: {
    fontFamily: 'Roboto',
    fontSize: 9,
    marginTop: 6,
    lineHeight: 1.35,
    color: '#333333',
  },
  link: {
    fontFamily: 'Roboto',
    color: '#111111',
    textDecoration: 'none',
  },
  section: {
    marginTop: 14,
  },
  sectionTitle: {
    fontFamily: 'Roboto',
    fontSize: 10.5,
    fontWeight: 700,
    letterSpacing: 0.6,
    borderBottomWidth: 0.75,
    borderBottomColor: '#999999',
    paddingBottom: 3,
    marginBottom: 5,
  },
  entry: {
    marginBottom: 8,
  },
  entryTitle: {
    fontFamily: 'Roboto',
    fontWeight: 700,
  },
  entryMeta: {
    fontFamily: 'Roboto',
    color: '#444444',
    marginBottom: 2,
  },
  bullet: {
    fontFamily: 'Roboto',
    marginTop: 1.5,
    paddingLeft: 9,
    textIndent: -9,
  },
  paragraph: {
    fontFamily: 'Roboto',
    marginTop: 1.5,
  },
})

function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

function telegramHandle(url: string): string {
  const handle = url.replace(/^https?:\/\/(t\.me|telegram\.me)\//, '')

  return handle.startsWith('@') ? handle : `@${handle}`
}

function telegramHref(raw: string): string {
  if (raw.startsWith('http://') || raw.startsWith('https://')) {
    return raw
  }

  return `https://t.me/${raw.replace(/^@/, '')}`
}

function bareUrl(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/+$/, '')
}

function joinParts(parts: ReactNode[]): ReactNode[] {
  return parts.flatMap((part, index) => {
    const node = <Text key={`part-${index}`}>{part}</Text>

    return index === 0
      ? [node]
      : [<Text key={`sep-${index}`}>{'  |  '}</Text>, node]
  })
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>
      {children}
    </View>
  )
}

function Bullet({ children }: { children: string }) {
  return <Text style={styles.bullet}>{`\u2022  ${children}`}</Text>
}

function Identity({ resume }: { resume: ResumeJson }) {
  const { cv } = resume

  return (
    <View>
      <Text style={styles.name}>{resume.user.name}</Text>
      <Text style={styles.title}>{cv.title}</Text>
      <Text style={styles.contactLine}>
        {joinParts(
          [
            cv.location,
            site.phone ? (
              <Link src={telHref(site.phone)} style={styles.link}>
                {site.phone}
              </Link>
            ) : null,
            site.email ? (
              <Link src={`mailto:${site.email}`} style={styles.link}>
                {site.email}
              </Link>
            ) : null,
            site.telegram ? (
              <Link src={telegramHref(site.telegram)} style={styles.link}>
                {telegramHandle(site.telegram)}
              </Link>
            ) : null,
          ].filter(part => part != null),
        )}
      </Text>
      {site.github || site.linkedin ? (
        <Text style={styles.contactLine}>
          {joinParts(
            [
              site.github ? (
                <Link src={site.github} style={styles.link}>
                  {bareUrl(site.github)}
                </Link>
              ) : null,
              site.linkedin ? (
                <Link src={site.linkedin} style={styles.link}>
                  {bareUrl(site.linkedin)}
                </Link>
              ) : null,
            ].filter(part => part != null),
          )}
        </Text>
      ) : null}
    </View>
  )
}

function CvDocument({
  resume,
  avatar,
}: {
  resume: ResumeJson
  avatar: Buffer | null
}) {
  const { cv } = resume
  const stackLabel = cv.sections.stack

  return (
    <Document
      title={`${resume.user.name} - ${cv.title}`}
      author={resume.user.name}
      subject={cv.title}
      creator={resume.user.name}
      producer={resume.user.name}
    >
      <Page size='A4' style={styles.page}>
        {avatar ? (
          <View style={styles.header} wrap={false}>
            <Image src={avatar} style={styles.avatar} />
            <View style={styles.headerText}>
              <Identity resume={resume} />
            </View>
          </View>
        ) : (
          <Identity resume={resume} />
        )}

        <Section title={cv.sections.summary}>
          <Text>{cv.summary}</Text>
        </Section>

        <Section title={cv.sections.skills}>
          {resume.skillGroups.map(group => (
            <Text key={group.title} style={styles.paragraph}>
              <Text style={styles.entryTitle}>{`${group.title}: `}</Text>
              {group.items.join(', ')}
            </Text>
          ))}
        </Section>

        <Section title={cv.sections.experience}>
          {resume.experience.map(entry => (
            <View key={`${entry.company}-${entry.period}`} style={styles.entry}>
              <Text style={styles.entryTitle}>
                {`${entry.role}, ${entry.company}`}
              </Text>
              <Text style={styles.entryMeta}>{entry.period}</Text>
              <Text>{entry.summary}</Text>
              {entry.highlights.map(highlight => (
                <Bullet key={highlight}>{highlight}</Bullet>
              ))}
              <Text style={styles.paragraph}>
                <Text style={styles.entryTitle}>{`${stackLabel}: `}</Text>
                {entry.stack.join(', ')}
              </Text>
            </View>
          ))}
        </Section>

        <Section title={cv.sections.projects}>
          {resume.projects.map(project => (
            <View key={project.title} style={styles.entry} wrap={false}>
              <Text style={styles.entryTitle}>{project.title}</Text>
              <Text style={styles.entryMeta}>
                <Link src={project.href} style={styles.link}>
                  {bareUrl(project.href)}
                </Link>
                {project.demoHref ? (
                  <>
                    {'  |  '}
                    <Link src={project.demoHref} style={styles.link}>
                      {bareUrl(project.demoHref)}
                    </Link>
                  </>
                ) : null}
              </Text>
              <Text>{project.description}</Text>
              <Text style={styles.paragraph}>
                <Text style={styles.entryTitle}>{`${stackLabel}: `}</Text>
                {project.stack.join(', ')}
              </Text>
            </View>
          ))}
        </Section>

        <Section title={cv.sections.education}>
          {cv.education.map(entry => (
            <View key={`${entry.degree}-${entry.period}`} wrap={false}>
              <Text style={styles.entryTitle}>{entry.degree}</Text>
              <Text style={styles.entryMeta}>
                {`${entry.institution}, ${entry.period}`}
              </Text>
            </View>
          ))}
        </Section>

        <Section title={cv.sections.languages}>
          {cv.languages.map(language => (
            <Bullet key={language}>{language}</Bullet>
          ))}
        </Section>
      </Page>
    </Document>
  )
}

async function writePdf(
  element: Parameters<typeof renderToFile>[0],
  outPath: string,
): Promise<void> {
  const tmpPath = `${outPath}.tmp.pdf`

  await renderToFile(element, tmpPath)

  try {
    copyFileSync(tmpPath, outPath)
    console.log(`built ${path.relative(rootDir, outPath)}`)
  } catch (error) {
    const code =
      error && typeof error === 'object' && 'code' in error
        ? String(error.code)
        : ''

    if (code === 'EBUSY' || code === 'EPERM') {
      const fallback = outPath.replace(/\.pdf$/i, '.new.pdf')
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

async function buildCv(
  locale: Locale,
  avatar: Buffer | null,
  docxAvatar: DocxAvatar | null,
): Promise<void> {
  const personName = resumeByLocale.en.user.name
  const pdfPath = path.join(outDir, cvFileName(personName, locale, 'pdf'))
  const docxPath = path.join(outDir, cvFileName(personName, locale, 'docx'))

  await writePdf(
    <CvDocument resume={resumeByLocale[locale]} avatar={avatar} />,
    pdfPath,
  )
  await writeCvDocx(resumeByLocale[locale], site, docxPath, rootDir, docxAvatar)
}

const avatar = readPdfAvatar(contentDir, site.photos.avatar)
const docxAvatar = readDocxAvatar(contentDir, site.photos.avatar)

if (!avatar) {
  console.warn(
    `CV avatar skipped: photos/${site.photos.avatar} is not jpg/jpeg/png/svg (formats react-pdf can embed).`,
  )
}

if (!docxAvatar) {
  console.warn(
    `DOCX avatar skipped: photos/${site.photos.avatar} is not jpg/jpeg/png/gif/bmp.`,
  )
}

mkdirSync(outDir, { recursive: true })

for (const locale of Object.keys(resumeByLocale) as Locale[]) {
  await buildCv(locale, avatar, docxAvatar)
}
