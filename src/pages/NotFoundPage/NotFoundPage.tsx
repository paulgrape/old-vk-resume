import { VkLink } from '@/components/atoms/VkLink/VkLink'
import { MobileTopBar } from '@/components/organisms/MobileTopBar/MobileTopBar'
import { SidebarNav } from '@/components/organisms/SidebarNav/SidebarNav'
import { SiteFooter } from '@/components/organisms/SiteFooter/SiteFooter'
import { TopNavbar } from '@/components/organisms/TopNavbar/TopNavbar'
import { VkProfileLayout } from '@/components/templates/VkProfileLayout/VkProfileLayout'
import { iconUrl, resumeByLocale, siteConfig, sitePhotos } from '@/data/content'
import { hydrateResume } from '@/data/resume'
import { resumeRouteHrefs } from '@/data/resumeRoutes'
import { useLocale } from '@/i18n/LocaleContext'

export function NotFoundPage() {
  const { locale, messages } = useLocale()
  const resume = hydrateResume(
    resumeByLocale[locale],
    siteConfig,
    sitePhotos,
    iconUrl,
  )
  const ui = messages.ui

  return (
    <VkProfileLayout
      skipLabel={ui.skipToContent}
      header={<TopNavbar links={resume.topNavLinks} />}
      mobileHeader={
        <MobileTopBar
          title={ui.notFoundTitle}
          backLabel={ui.backHome}
          showBack
        />
      }
      sidebar={
        <SidebarNav
          navItems={resume.sidebarNavItems}
          appItems={resume.appMenuItems}
        />
      }
      mainColumn={
        <div className='px-4 py-6 text-left'>
          <p className='m-0 text-[15px] font-bold text-vk-heading'>
            {ui.notFoundTitle}
          </p>
          <p className='mt-2 mb-0 text-[13px] text-vk-text'>
            {ui.notFoundBody}
          </p>
          <VkLink
            href={resumeRouteHrefs.home}
            className='mt-3 inline-block text-[13px]!'
          >
            {ui.backHome}
          </VkLink>
        </div>
      }
      footer={
        <SiteFooter
          links={resume.footerLinks}
          copyright={resume.footerCopyright}
          disclaimer={ui.footerDisclaimer}
        />
      }
    />
  )
}
