// CV language switcher: Armenian is in the HTML, RU/EN come from this map.
// Usage: ?lang=ru | ?lang=en (default hy). Text nodes are matched by exact trimmed text.
(function(){
  const T = {
    'Curriculum Vitae · 2026':['Резюме · 2026','Curriculum Vitae · 2026'],
    'Լրագրություն · TV · SMM':['Журналистика · TV · SMM','Journalism · TV · SMM'],
    'Սիլվի':['Сильви','Silvi'],
    'Սիրականյան':['Сираканян','Sirakanyan'],
    'Սիլվի Սիրականյան':['Сильви Сираканян','Silvi Sirakanyan'],
    'ՍՍ':['СС','SS'],
    'Լրագրող':['Журналист','Journalist'],
    'Հեռուստալրագրող':['Тележурналист','TV journalist'],
    'SMM մասնագետ':['SMM-специалист','SMM specialist'],
    'Մեդիա ադմինիստրատոր':['Медиаадминистратор','Media administrator'],
    'Լրագրող՝ Հայաստանի Հանրային հեռուստաընկերությունում 2021 թվականից աշխատանքային փորձով՝ Մեդիա ակադեմիայի կոորդինատորից մինչև Լրատվական ծառայության ադմինիստրատոր։ Ունեմ հեռուստալրագրության և հաղորդավարության կրթություն, SMM մասնագիտացում և խոշոր միջազգային միջոցառման կազմակերպման փորձ։ Կազմակերպված եմ, պատասխանատու և արագ եմ աշխատում ճնշման տակ։':[
      'Журналист, с 2021 года работаю в Общественной телекомпании Армении — от координатора Медиаакадемии до администратора Службы новостей. Имею образование в тележурналистике и телеведении, специализацию в SMM и опыт организации крупного международного мероприятия. Организованна, ответственна и быстро работаю в условиях дедлайнов.',
      'Journalist working at the Public Television Company of Armenia since 2021 — from Media Academy coordinator to News Service administrator. Trained in TV journalism and presenting, specialised in SMM, with hands-on experience organising a major international event. Organised, reliable and fast under deadline pressure.'],
    'Հայաստանի Հանրային հեռուստաընկերության թիմում եմ 2021 թվականից՝ Մեդիա ակադեմիայի կոորդինատորից մինչև Լրատվական ծառայության ադմինիստրատոր։ Գիտեմ լրատվական ծառայության աշխատանքը ներսից՝ պլանավորումից մինչև եթեր։ Լրագրության կրթությունը համադրում եմ SMM-ի և կազմակերպչական փորձի հետ, այդ թվում՝ Մանկական Եվրատեսիլ 2022-ի կամավորների կոորդինացում։':[
      'В команде Общественной телекомпании Армении с 2021 года — от координатора Медиаакадемии до администратора Службы новостей. Знаю работу новостной службы изнутри — от планирования до эфира. Сочетаю журналистское образование с SMM и организаторским опытом, включая координацию волонтёров Детского Евровидения 2022.',
      'Part of the Public Television Company of Armenia team since 2021 — from Media Academy coordinator to News Service administrator. I know how a newsroom works from the inside, from planning to broadcast. I combine a journalism degree with SMM and event coordination, including managing volunteers at Junior Eurovision 2022.'],
    'ՏԱՐԵԿԱՆ':['ГОДА','YEARS OLD'],
    'Հայրանուն՝ Գարիկի':['Отчество: Гариковна','Father’s name: Garik'],
    'Գարիկի · 24 տարեկան':['Гариковна · 24 года','24 years old'],
    'Տարիք':['Возраст','Age'],
    '24 տարեկան':['24 года','24 years old'],
    'Աշխատանքային փորձ':['Опыт работы','Work experience'],
    'EXPERIENCE':['EXPERIENCE',''],
    'Փորձ':['Опыт','Experience'],
    'Experience':['Experience',''],
    'Կրթություն':['Образование','Education'],
    'EDUCATION':['EDUCATION',''],
    'Education':['Education',''],
    '2024 — հիմա':['2024 — н.в.','2024 — now'],
    'ՀԻՄԱ':['СЕЙЧАС','NOW'],
    'Լրատվական ծառայության ադմինիստրատոր':['Администратор Службы новостей','News Service Administrator'],
    'Հայաստանի Հանրային հեռուստաընկերություն':['Общественная телекомпания Армении','Public Television Company of Armenia'],
    'Տնտեսական տնօրինության օգնական':['Ассистент Хозяйственной дирекции','Assistant, Economic Directorate'],
    'Կամավորների կոորդինատոր':['Координатор волонтёров','Volunteer Coordinator'],
    'Մանկական Եվրատեսիլ երգի մրցույթ · Junior Eurovision 2022, Երևան':['Детский конкурс песни «Евровидение» · Junior Eurovision 2022, Ереван','Junior Eurovision Song Contest 2022, Yerevan'],
    'Մանկական Եվրատեսիլ երգի մրցույթ · Junior Eurovision 2022':['Детский конкурс песни «Евровидение» 2022','Junior Eurovision Song Contest 2022'],
    'Մեդիա ակադեմիայի կոորդինատոր':['Координатор Медиаакадемии','Media Academy Coordinator'],
    'SMM Specialist':['SMM-специалист','SMM Specialist'],
    'Հեռուստահաղորդավարություն և հեռուստալրագրություն':['Телеведение и тележурналистика','TV Presenting and TV Journalism'],
    'Հանրային հեռուստաընկերության Մեդիա ակադեմիա':['Медиаакадемия Общественного телевидения Армении','Media Academy of the Public Television of Armenia'],
    'Լրագրություն, բակալավր':['Журналистика, бакалавриат','BA in Journalism'],
    'Երևանի պետական համալսարան, Ժուռնալիստիկայի ֆակուլտետ':['Ереванский государственный университет, факультет журналистики','Yerevan State University, Faculty of Journalism'],
    'ԵՊՀ, Ժուռնալիստիկայի ֆակուլտետ':['ЕГУ, факультет журналистики','Yerevan State University, Faculty of Journalism'],
    'Հեռուստահաղորդավարական դպրոց-ստուդիա':['Школа-студия телеведущих','TV Presenter School-Studio'],
    'Գայանե Փայտյանի «TV Ideal»':['«TV Ideal» Гаянэ Пайтян','“TV Ideal” by Gayane Paytyan'],
    'Միջնակարգ կրթություն':['Среднее образование','Secondary education'],
    'Զովունու Ռուբիկ Բաղդասարյանի անվան միջնակարգ դպրոց':['Средняя школа им. Рубика Багдасаряна, Зовуни','Rubik Baghdasaryan Secondary School, Zovuni'],
    'Զովունու Ռ. Բաղդասարյանի անվան միջնակարգ դպրոց':['Средняя школа им. Р. Багдасаряна, Зовуни','R. Baghdasaryan Secondary School, Zovuni'],
    'Կապ':['Контакты','Contact'],
    'Հեռախոս':['Телефон','Phone'],
    'Էլ. փոստ':['Эл. почта','Email'],
    'Բնակության վայր':['Место жительства','Location'],
    'Հայաստան':['Армения','Armenia'],
    'Հմտություններ':['Навыки','Skills'],
    'Լրագրություն':['Журналистика','Journalism'],
    'Հեռուստալրագրություն':['Тележурналистика','TV journalism'],
    'Հաղորդավարություն':['Телеведение','TV presenting'],
    'Տեքստերի պատրաստում':['Подготовка текстов','Copywriting'],
    'Կոնտենտ պլան':['Контент-план','Content planning'],
    'Միջոցառումների կոորդինացում':['Координация мероприятий','Event coordination'],
    'Կամավորների կառավարում':['Управление волонтёрами','Volunteer management'],
    'Ադմինիստրացիա':['Администрирование','Administration'],
    'Փաստաթղթաշրջանառություն':['Документооборот','Document management'],
    'Թիմային աշխատանք':['Работа в команде','Teamwork'],
    'Լրագրություն և տեքստեր':['Журналистика и тексты','Journalism & writing'],
    'SMM և կոնտենտ պլան':['SMM и контент-план','SMM & content planning'],
    'Կոորդինացում':['Координация','Coordination'],
    'Նաև':['Также','Also'],
    'Միջոցառումներ':['Мероприятия','Events'],
    'Կամավորներ':['Волонтёры','Volunteers'],
    'Փաստաթղթեր':['Документы','Paperwork'],
    'Լեզուներ':['Языки','Languages'],
    'Հայերեն':['Армянский','Armenian'],
    'մայրենի':['родной','native'],
    'Ռուսերեն':['Русский','Russian'],
    'ազատ':['свободно','fluent'],
    'Անգլերեն':['Английский','English'],
    'աշխատանքային':['рабочий','working'],
  };
  const lang = (new URLSearchParams(location.search).get('lang') || 'hy').toLowerCase();
  const i = {ru:0, en:1}[lang];
  if (i !== undefined) {
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = []; let n; while ((n = w.nextNode())) nodes.push(n);
    for (const node of nodes) {
      const k = node.nodeValue.trim();
      if (T[k]) node.nodeValue = node.nodeValue.replace(k, T[k][i]);
    }
    document.documentElement.lang = lang;
    document.title = (lang === 'ru' ? 'Сильви Сираканян — Резюме' : 'Silvi Sirakanyan — CV');
  }
  // on-screen switcher (hidden in print)
  const bar = document.createElement('nav');
  bar.className = 'lang-switch';
  bar.innerHTML = ['hy:ՀԱՅ','ru:RU','en:EN'].map(x => {
    const [c, l] = x.split(':');
    return `<a href="?lang=${c}"${c === lang ? ' aria-current="true"' : ''}>${l}</a>`;
  }).join('');
  document.body.appendChild(bar);
  const st = document.createElement('style');
  st.textContent = `.lang-switch{position:fixed;top:12px;right:12px;display:flex;gap:4px;z-index:9;font:600 12px/1 system-ui,sans-serif}
  .lang-switch a{padding:8px 10px;border-radius:8px;background:#fff;color:#222;text-decoration:none;box-shadow:0 2px 8px rgba(0,0,0,.15)}
  .lang-switch a[aria-current]{background:#222;color:#fff}
  @media print{.lang-switch{display:none}}`;
  document.head.appendChild(st);
})();
