export type AppMenuItem = {
  label: string
  badge: string | null
}

export type ProfileStat = {
  label: string
  count: string
}

export type ProfileField = {
  label: string
  value: string
  link: boolean
}

export type WallPost = {
  author: string
  text: string
  date: string
  likes: string
  photoCount: number
}

export const user = {
  name: 'Павел Виноградов',
  titlebarSubtitle: '(это Я)',
  status: 'online',
  profileStatus: '...',
  education: "СПбПУ '21",
} as const

export const topNavLinks = [
  'люди',
  'сообщества',
  'игры',
  'музыка',
  'помощь',
  'выйти',
] as const

export const sidebarNavItems = [
  'Моя Страница',
  'Мои Друзья',
  'Мои Фотографии',
  'Мои Видеозаписи',
  'Мои Аудиозаписи',
  'Мои Сообщения',
  'Мои Заметки',
  'Мои Группы',
  'Мои Новости',
  'Мои Закладки',
  'Мои Настройки',
] as const

export const appMenuItems: AppMenuItem[] = [
  { label: 'Приложения', badge: '+35' },
  { label: 'Объявления', badge: null },
  { label: 'Поддержка', badge: '+1' },
]

export const profileStats: ProfileStat[] = [
  { label: 'Фотографии с Павлом', count: '324' },
  { label: 'Видеозаписи с Павлом', count: '123' },
  { label: 'Подписчики Павла', count: '123456' },
]

export const friends = [
  'Тест тест1',
  'Тест тест2',
  'Тест тест3',
  'Тест тест4',
  'Тест тест5',
  'Тест тест6',
] as const

export const profileFields: ProfileField[] = [
  { label: 'День рождения:', value: '13 октября 1997 г.', link: false },
  { label: 'Родной город:', value: 'Санкт-Петербург', link: true },
  { label: 'Семейное положение:', value: 'женат', link: true },
  { label: 'Языки:', value: 'Русский, English, Italiano', link: false },
]

export const photosSection = {
  title: 'Фотографии',
  count: 'N фотографий',
  linkText: 'все',
  tileCount: 4,
} as const

export const wallSection = {
  title: 'Стена',
  count: 'N записей',
  linkText: 'к записям Павла',
} as const

export const friendsSection = {
  title: 'Друзья',
  count: 'N друзей',
  linkText: 'новости',
} as const

export const friendsOnlineSection = {
  title: 'Друзья онлайн',
  count: 'N друзей онлайн',
  linkText: 'новости',
} as const

export const wallPosts: WallPost[] = [
  {
    author: 'Павел Виноградов',
    text: 'Тест',
    date: '1 янв в 0:00',
    likes: '100500',
    photoCount: 10,
  },
]

export const footerLinks = [
  'О сайте',
  'Помощь',
  'Реклама',
  'Разработчикам',
  'Вакансии',
  'Условия',
] as const

export const footerCopyright = '© 2006–2026, ВКонтакте'
