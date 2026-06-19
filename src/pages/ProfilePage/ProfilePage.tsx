import { PhotosSection } from '@/components/organisms/PhotosSection/PhotosSection'
import { ProfileInfoPanel } from '@/components/organisms/ProfileInfoPanel/ProfileInfoPanel'
import { ProfilePhotoPanel } from '@/components/organisms/ProfilePhotoPanel/ProfilePhotoPanel'
import { ProfileTitlebar } from '@/components/organisms/ProfileTitlebar/ProfileTitlebar'
import { SidebarNav } from '@/components/organisms/SidebarNav/SidebarNav'
import { SiteFooter } from '@/components/organisms/SiteFooter/SiteFooter'
import { TopNavbar } from '@/components/organisms/TopNavbar/TopNavbar'
import { WallSection } from '@/components/organisms/WallSection/WallSection'
import { VkProfileLayout } from '@/components/templates/VkProfileLayout/VkProfileLayout'
import {
  appMenuItems,
  footerCopyright,
  footerLinks,
  friends,
  friendsOnlineSection,
  friendsSection,
  photosSection,
  profileFields,
  profileStats,
  sidebarNavItems,
  topNavLinks,
  user,
  wallPosts,
  wallSection,
} from '@/data/profile'

export function ProfilePage() {
  return (
    <VkProfileLayout
      header={<TopNavbar links={topNavLinks} />}
      sidebar={
        <SidebarNav
          navItems={sidebarNavItems}
          appItems={appMenuItems}
        />
      }
      titlebar={
        <ProfileTitlebar
          name={user.name}
          subtitle={user.titlebarSubtitle}
          status={user.status}
        />
      }
      photoColumn={
        <ProfilePhotoPanel
          name={user.name}
          stats={profileStats}
          friends={friends}
          friendsSection={friendsSection}
          friendsOnlineSection={friendsOnlineSection}
        />
      }
      mainColumn={
        <div className='px-2'>
          <ProfileInfoPanel
            name={user.name}
            status={user.profileStatus}
            education={user.education}
            fields={profileFields}
          />
          <PhotosSection
            title={photosSection.title}
            count={photosSection.count}
            linkText={photosSection.linkText}
            tileCount={photosSection.tileCount}
          />
          <WallSection
            title={wallSection.title}
            count={wallSection.count}
            linkText={wallSection.linkText}
            posts={wallPosts}
          />
        </div>
      }
      footer={
        <SiteFooter
          links={footerLinks}
          copyright={footerCopyright}
        />
      }
    />
  )
}
