import vkLogo from './assets/logo-vk.png'
// import vkLogo from './assets/logo2006.svg'
// import vkLogo from './assets/vk-logo-2012.png'

function App() {
  return (
    // Outer wrapper — always light bg regardless of OS theme
    <div className='flex flex-col min-h-screen bg-white w-full mx-auto '>
      {/* ===== Top navbar ===== */}
      <header
        style={{
          background:
            'linear-gradient(to bottom, #476d96 0%, #5d8ab8 40%, #6e9fc8 100%)',
        }}
        className='rounded-b-[10px] w-full max-w-[791px] mx-auto'
      >
        <div className='w-full flex items-center gap-3 px-2 py-1.5'>
          <img
            src={vkLogo}
            alt='ВКонтакте'
            className='h-7 shrink-0'
          />

          <input
            type='text'
            placeholder='Поиск'
            className='w-[190px] px-2 h-5 text-[12px] rounded-xs bg-white text-black placeholder-[#999] border-0 focus:outline-none'
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
          <aside
            className='w-[146px] shrink-0 self-stretch'
            style={{ background: '#ffffff', colorScheme: 'light' }}
          >
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
                    className='text-[12px] text-[#2b587a] no-underline hover:underline mr-auto'
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <div className='border-t border-[#d2d9e0] mx-2 my-2' />

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
                    className='text-[13px] text-[#2b587a] no-underline hover:underline'
                  >
                    {label}
                  </a>
                  {badge && (
                    <span className='text-[11px] text-[#507299] bg-[#d9e6f0] px-1 rounded-sm'>
                      {badge}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <div className='border-t border-[#d2d9e0] mx-2 my-2' />
          </aside>

          {/* ===== Right side: titlebar + two-col layout ===== */}
          <div className='flex-1 min-w-0 flex flex-col border-x border-[#d2d9e0] shadow-xs'>
            {/* Titlebar right part */}
            <div
              className='flex items-center justify-between px-3 py-[7px] border-b border-[#d2d9e0] h-[30px]'
              style={{ background: '#ede5b7' }}
            >
              <span className='text-[12px] font-bold text-[#000000]'>
                Павел Виноградов{' '}
                <span className='text-[#909499]'> (это Я)</span>
              </span>
              <span className='text-[12px] text-[#909499]'>online</span>
            </div>

            {/* Content area: photo col + info col */}
            <div
              className='flex flex-1 items-start'
              style={{ background: '#ffffff', colorScheme: 'light' }}
            >
              {/* ===== Photo / actions column ===== */}
              <div className='w-[195px] shrink-0 border-r border-[#d2d9e0] px-3 pt-3 pb-4'>
                {/* Avatar */}
                <div className='w-full aspect-square bg-gradient-to-br from-[#c8d5df] to-[#8fa5b5] mb-2' />

                {/* Subscribe note */}
                {/* <div
                  className='text-[12px] text-[#555] text-center py-1.5 mb-2 border border-[#d2d9e0] rounded-sm'
                  style={{ background: '#f4f6f8' }}
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
                    className='flex items-center justify-between py-[3px] border-b border-[#eef0f2] last:border-b-0'
                  >
                    <a
                      href='#'
                      className='text-[12px] text-[#2b587a] no-underline hover:underline'
                    >
                      {label}
                    </a>
                    <span className='text-[12px] text-[#909499] ml-1 shrink-0'>
                      {c}
                    </span>
                  </div>
                ))}

                <div className='border-t border-[#d2d9e0] my-2' />

                {/* Send gift */}
                <a
                  href='#'
                  className='flex items-center gap-1.5 text-[12px] text-[#2b587a] no-underline hover:underline'
                >
                  Отправить подарок
                </a>

                <div className='border-t border-[#d2d9e0] my-2' />

                {/* Friends block */}
                <div>
                  <div className='flex items-baseline justify-between px-2 bg-[#dee3ec]'>
                    <span className='text-[13px] font-bold text-[#506a8d]'>
                      Друзья
                    </span>
                    <a
                      href='#'
                      className='text-[12px] text-[#2b587a] no-underline hover:underline'
                    >
                      новости
                    </a>
                  </div>
                  <div className='text-left px-2 bg-[#f1f1f1]'>
                    <span className='m-0 text-[12px] text-[#909499] text-left'>
                      N друзей
                    </span>
                  </div>
                </div>

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
                      <div className='w-full aspect-square bg-gradient-to-br from-[#dde6ef] to-[#b0c2d0]' />
                      <span
                        className='text-[10px] text-[#2b587a] leading-tight w-full overflow-hidden'
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

                <div className='border-t border-[#d2d9e0] mt-2 mb-1' />
                <div className='text-[13px] font-bold text-[#2b3d4f] mb-0.5'>
                  Друзья онлайн
                </div>
              </div>

              {/* ===== Main info + wall column ===== */}
              <div className='flex-1 min-w-0'>
                {/* Profile info */}
                <div className='px-3 pt-3 pb-2 border-b border-[#d2d9e0]'>
                  <div className='flex justify-between items-start mb-1 mr-auto'>
                    <div className='text-left'>
                      <div className='text-[13px] font-bold text-[#506a8d] leading-tight'>
                        Павел Виноградов
                      </div>
                      <div className='text-[13px] text-[#555] italic mb-2'>
                        ...
                      </div>
                    </div>
                    <div className='text-[12px] text-[#2b587a] shrink-0 ml-4'>
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
                          <td className='text-[12px] text-[#909499] pr-2 align-top whitespace-nowrap text-left'>
                            {label}
                          </td>
                          <td
                            className={`text-[12px] align-top text-left ${link ? 'text-[#2b587a]' : 'text-[#333]'}`}
                          >
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <a
                    href='#'
                    className='text-[12px] text-[#2b587a] no-underline hover:underline mt-2 block'
                  >
                    Показать подробную информацию
                  </a>
                </div>

                {/* Photos section */}
                <div className='border-b border-[#d2d9e0]'>
                  <div
                    className='flex items-center justify-between px-3 py-1.5 border-b border-[#d2d9e0]'
                    style={{ background: '#f0f2f5' }}
                  >
                    <span className='text-[13px] font-bold text-[#2b3d4f]'>
                      N фотографий
                    </span>
                    <a
                      href='#'
                      className='text-[12px] text-[#2b587a] no-underline hover:underline'
                    >
                      все
                    </a>
                  </div>
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
                  <div
                    className='flex items-center justify-between px-3 py-1.5 border-b border-[#d2d9e0]'
                    style={{ background: '#f0f2f5' }}
                  >
                    <span className='text-[13px] font-bold text-[#2b3d4f]'>
                      N записей
                    </span>
                    <a
                      href='#'
                      className='text-[12px] text-[#2b587a] no-underline hover:underline'
                    >
                      к записям Павла
                    </a>
                  </div>

                  {/* Post */}
                  <article className='flex gap-2.5 px-3 pt-2.5 pb-2 border-b border-[#eef0f2]'>
                    <div className='w-[45px] h-[45px] shrink-0 bg-gradient-to-br from-[#c8d5df] to-[#8fa5b5]' />
                    <div className='flex-1 min-w-0'>
                      <a
                        href='#'
                        className='text-[13px] font-bold text-[#2b587a] no-underline hover:underline block mb-1 text-left'
                      >
                        Павел Виноградов
                      </a>
                      <p className='m-0 mb-2 text-[13px] text-[#333] leading-[1.45] text-left'>
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

                      <div className='flex items-center gap-4 text-[12px] text-[#909499]'>
                        <span>1 янв в 0:00</span>
                        <a
                          href='#'
                          className='text-[#2b587a] no-underline hover:underline'
                        >
                          Ответить
                        </a>
                        <span className='ml-auto flex items-center gap-1'>
                          Мне нравится{' '}
                          <span className='text-[#2b587a]'>100500</span>
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
      <footer
        className='border-t border-[#d2d9e0] px-4 py-3 text-center max-w-[791px] mx-auto w-full sticky bottom-0'
        style={{ background: '#e9ecf1' }}
      >
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
              className='text-[12px] text-[#2b587a] no-underline hover:underline'
            >
              {link}
            </a>
          ))}
        </nav>
        <p className='m-0 text-[12px] text-[#909499]'>© 2006–2026, ВКонтакте</p>
      </footer>
    </div>
  )
}

export default App
