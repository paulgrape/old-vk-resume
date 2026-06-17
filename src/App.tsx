import vkLogo from './assets/logo-vk.png'
import { SectionHeader } from './components/SectionHeader'
// import vkLogo from './assets/logo2006.svg'
// import vkLogo from './assets/vk-logo-2012.png'

function App() {
  return (
    // Outer wrapper — always light bg regardless of OS theme
    <div className='flex flex-col min-h-screen bg-white w-full mx-auto '>
      {/* ===== Top navbar ===== */}
      <header className='bg-vk-header rounded-b-[10px] w-full max-w-[791px] mx-auto'>
        <div className='w-full flex items-center gap-3 px-2 py-1.5'>
          <img
            src={vkLogo}
            alt='ВКонтакте'
            className='h-7 shrink-0'
          />

          <input
            type='text'
            placeholder='Поиск'
            className='w-[190px] px-2 h-5 text-[12px] rounded-xs bg-white text-black placeholder-vk-placeholder border-0 focus:outline-none'
          />

          <nav className='flex items-center gap-5 flex-1 justify-end flex-wrap'>
            {['люди', 'сообщества', 'игры', 'музыка', 'помощь', 'выйти'].map(
              link => (
                <a
                  key={link}
                  href='#'
                  className='text-white font-bold text-[11px] no-underline hover:underline'
                >
                  {link}
                </a>
              ),
            )}
          </nav>
        </div>
      </header>

      {/* ===== Page wrapper: sidebar + content ===== */}
      <div className='max-w-[791px] mx-auto'>
        <div className='flex flex-1 items-start max-w-[775px] mr-auto'>
          {/* ===== Left sidebar ===== */}
          <aside className='w-[146px] shrink-0 self-stretch bg-white scheme-light'>
            {/* Navigation menu */}
            <ul className='list-none self-start items-start m-0 p-0 pt-1 px-1'>
              {[
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
              ].map(item => (
                <li
                  key={item}
                  className='text-left'
                >
                  <a
                    href='#'
                    className='text-[12px] text-vk-link no-underline hover:underline mr-auto'
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <div className='border-t border-vk-border mx-2 my-2' />

            {/* Apps section with badges */}
            <ul className='list-none m-0 p-0 px-1'>
              {[
                { label: 'Приложения', badge: '+35' },
                { label: 'Объявления', badge: null },
                { label: 'Поддержка', badge: '+1' },
              ].map(({ label, badge }) => (
                <li
                  key={label}
                  className='flex items-center justify-between py-[2px]'
                >
                  <a
                    href='#'
                    className='text-[13px] text-vk-link no-underline hover:underline'
                  >
                    {label}
                  </a>
                  {badge && (
                    <span className='text-[11px] text-vk-badge-text bg-vk-badge-bg px-1 rounded-sm'>
                      {badge}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <div className='border-t border-vk-border mx-2 my-2' />
          </aside>

          {/* ===== Right side: titlebar + two-col layout ===== */}
          <div className='flex-1 min-w-0 flex flex-col border-x border-vk-border shadow-xs'>
            {/* Titlebar right part */}
            <div className='flex items-center justify-between px-3 py-[7px] border-b border-vk-border h-[30px] bg-vk-titlebar'>
              <span className='text-[12px] font-bold text-black'>
                Павел Виноградов{' '}
                <span className='text-vk-muted'> (это Я)</span>
              </span>
              <span className='text-[12px] text-vk-muted'>online</span>
            </div>

            {/* Content area: photo col + info col */}
            <div className='flex flex-1 items-start bg-white scheme-light'>
              {/* ===== Photo / actions column ===== */}
              <div className='w-[195px] shrink-0 border-r border-vk-border px-3 pt-3 pb-4'>
                {/* Avatar */}
                <div className='w-full aspect-square bg-gradient-to-br from-vk-avatar-from to-vk-avatar-to mb-2' />

                {/* Subscribe note */}
                {/* <div
                  className='text-[12px] text-vk-text-subtle text-center py-1.5 mb-2 border border-vk-border rounded-sm bg-vk-section-bg'
                >
                  Вы подписаны на Павла
                </div> */}

                {/* Stats rows */}
                {[
                  { label: 'Фотографии с Павлом', count: '324' },
                  { label: 'Видеозаписи с Павлом', count: '123' },
                  { label: 'Подписчики Павла', count: '123456' },
                ].map(({ label, count: c }) => (
                  <div
                    key={label}
                    className='flex items-center justify-between py-[3px] border-b border-vk-border-light last:border-b-0'
                  >
                    <a
                      href='#'
                      className='text-[12px] text-vk-link no-underline hover:underline'
                    >
                      {label}
                    </a>
                    <span className='text-[12px] text-vk-muted ml-1 shrink-0'>
                      {c}
                    </span>
                  </div>
                ))}

                <div className='border-t border-vk-border my-2' />

                {/* Send gift */}
                <a
                  href='#'
                  className='flex items-center gap-1.5 text-[12px] text-vk-link no-underline hover:underline'
                >
                  Отправить подарок
                </a>

                <div className='border-t border-vk-border my-2' />

                {/* Friends block */}
                <SectionHeader
                  title='Друзья'
                  count='N друзей'
                  linkText='новости'
                />

                <div className='grid grid-cols-3 gap-1.5 mb-1'>
                  {[
                    'Тест тест1',
                    'Тест тест2',
                    'Тест тест3',
                    'Тест тест4',
                    'Тест тест5',
                    'Тест тест6',
                  ].map(name => (
                    <div
                      key={name}
                      className='flex flex-col items-center gap-0.5 text-center'
                    >
                      <div className='w-full aspect-square bg-gradient-to-br from-vk-friend-avatar-from to-vk-friend-avatar-to' />
                      <span
                        className='text-[10px] text-vk-link leading-tight w-full overflow-hidden'
                        style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {name}
                      </span>
                    </div>
                  ))}
                </div>

                <div className='border-t border-vk-border mt-2 mb-1' />
                <div className='text-[13px] font-bold text-vk-heading-dark mb-0.5'>
                  Друзья онлайн
                </div>
              </div>

              {/* ===== Main info + wall column ===== */}
              <div className='flex-1 min-w-0'>
                {/* Profile info */}
                <div className='px-3 pt-3 pb-2 border-b border-vk-border'>
                  <div className='flex justify-between items-start mb-1 mr-auto'>
                    <div className='text-left'>
                      <div className='text-[13px] font-bold text-vk-heading leading-tight'>
                        Павел Виноградов
                      </div>
                      <div className='text-[13px] text-vk-text-subtle italic mb-2'>
                        ...
                      </div>
                    </div>
                    <div className='text-[12px] text-vk-link shrink-0 ml-4'>
                      СПбПУ '21
                    </div>
                  </div>

                  <table className='border-collapse w-full'>
                    <tbody>
                      {[
                        {
                          label: 'День рождения:',
                          value: '13 октября 1997 г.',
                          link: false,
                        },
                        {
                          label: 'Родной город:',
                          value: 'Санкт-Петербург',
                          link: true,
                        },
                        {
                          label: 'Семейное положение:',
                          value: 'женат',
                          link: true,
                        },
                        {
                          label: 'Языки:',
                          value: 'Русский, English, Italiano',
                          link: false,
                        },
                      ].map(({ label, value, link }) => (
                        <tr key={label}>
                          <td className='text-[12px] text-vk-muted pr-2 align-top whitespace-nowrap text-left'>
                            {label}
                          </td>
                          <td
                            className={`text-[12px] align-top text-left ${link ? 'text-vk-link' : 'text-vk-text'}`}
                          >
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <a
                    href='#'
                    className='text-[12px] text-vk-link no-underline hover:underline mt-2 block'
                  >
                    Показать подробную информацию
                  </a>
                </div>

                {/* Photos section */}
                <div className='border-b border-vk-border'>
                  <SectionHeader
                    title='Фотографии'
                    count='N фотографий'
                    linkText='все'
                  />
                  <div className='grid grid-cols-4 gap-0 p-2 gap-1'>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className='aspect-square'
                        style={{
                          background: `hsl(${200 + i * 15}, 30%, ${55 + i * 5}%)`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Wall section */}
                <div>
                  <SectionHeader
                    title='Стена'
                    count='N записей'
                    linkText='к записям Павла'
                  />

                  {/* Post */}
                  <article className='flex gap-2.5 px-3 pt-2.5 pb-2 border-b border-vk-border-light'>
                    <div className='w-[45px] h-[45px] shrink-0 bg-gradient-to-br from-vk-avatar-from to-vk-avatar-to' />
                    <div className='flex-1 min-w-0'>
                      <a
                        href='#'
                        className='text-[13px] font-bold text-vk-link no-underline hover:underline block mb-1 text-left'
                      >
                        Павел Виноградов
                      </a>
                      <p className='m-0 mb-2 text-[13px] text-vk-text leading-[1.45] text-left'>
                        Тест
                      </p>

                      {/* Post photo grid */}
                      <div
                        className='grid gap-0.5 my-2'
                        style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}
                      >
                        {Array.from({ length: 10 }).map((_, i) => (
                          <div
                            key={i}
                            className='aspect-square'
                            style={{
                              background: `hsl(${195 + i * 8}, 25%, ${50 + (i % 3) * 8}%)`,
                            }}
                          />
                        ))}
                      </div>

                      <div className='flex items-center gap-4 text-[12px] text-vk-muted'>
                        <span>1 янв в 0:00</span>
                        <a
                          href='#'
                          className='text-vk-link no-underline hover:underline'
                        >
                          Ответить
                        </a>
                        <span className='ml-auto flex items-center gap-1'>
                          Мне нравится{' '}
                          <span className='text-vk-link'>100500</span>
                        </span>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Footer ===== */}
      <footer className='border-t border-vk-border px-4 py-3 text-center max-w-[791px] mx-auto w-full sticky bottom-0 bg-vk-footer'>
        <nav className='flex justify-center gap-4 flex-wrap mb-1'>
          {[
            'О сайте',
            'Помощь',
            'Реклама',
            'Разработчикам',
            'Вакансии',
            'Условия',
          ].map(link => (
            <a
              key={link}
              href='#'
              className='text-[12px] text-vk-link no-underline hover:underline'
            >
              {link}
            </a>
          ))}
        </nav>
        <p className='m-0 text-[12px] text-vk-muted'>© 2006–2026, ВКонтакте</p>
      </footer>
    </div>
  )
}

export default App
