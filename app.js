const BOOKS = [
  {
    "id": 1,
    "title": "某天成為魔神",
    "url": "https://www.baozimh.com/comic/moutianchengweimoshen-xuankunjueduiwudijingangbupi_58hyd3",
    "favorite": false,
    "progress": ""
  },
  {
    "id": 2,
    "title": "我獨自慢慢新手",
    "url": "https://www.twmanga.com/comic/chapter/woduzimanjixinshou-maslowwanzswingbat_89a7te/0_267.html",
    "favorite": false,
    "progress": ""
  },
  {
    "id": 3,
    "title": "無限升級印武林",
    "url": "https://www.baozimh.com/comic/wuxianshengjiinwulin-gonboongkimjinwoo",
    "favorite": false,
    "progress": ""
  },
  {
    "id": 4,
    "title": "我獨自升級",
    "url": "https://www.baozimh.com/comic/woduzishengji-duburedicestudio_yfelsj",
    "favorite": false,
    "progress": ""
  },
  {
    "id": 5,
    "title": "與神一同升級",
    "url": "https://www.baozimh.com/comic/yushenyitongshengji-ohyeonbain_fm7oue",
    "favorite": false,
    "progress": ""
  },
  {
    "id": 6,
    "title": "絕對劍士",
    "url": "https://www.baozimh.com/comic/jueduijiangan-xianyueyekdrmti_9p8ljs",
    "favorite": false,
    "progress": ""
  },
  {
    "id": 7,
    "title": "殺手巴德洛",
    "url": "https://www.baozimh.com/comic/shashoubadeluo-jinzhengxianlimlina",
    "favorite": false,
    "progress": ""
  },
  {
    "id": 8,
    "title": "拳王歸來",
    "url": "https://www.baozimh.com/comic/quanwangguilai-liuchenxings2donax",
    "favorite": false,
    "progress": ""
  },
  {
    "id": 9,
    "title": "現實闖關",
    "url": "https://www.baozimh.com/comic/xianshichuangguan-joowoonleetaicheng",
    "favorite": false,
    "progress": ""
  },
  {
    "id": 10,
    "title": "公爵家的重生暗殺者",
    "url": "https://www.baozimh.com/comic/gongjuejiadezhongshenganshazhe-coffeelimeswingbatswingbat",
    "favorite": false,
    "progress": ""
  },
  {
    "id": 11,
    "title": "魔道轉生記",
    "url": "https://www.baozimh.com/comic/modaozhuanshengji-codezeroforcestudio_63oym3",
    "favorite": false,
    "progress": ""
  },
  {
    "id": 12,
    "title": "至活今天的輪迴騎士",
    "url": "https://www.baozimh.com/comic/zhihuojintiandelunhuiqishi-leehyunminiankanara",
    "favorite": false,
    "progress": ""
  },
  {
    "id": 13,
    "title": "絕對回歸",
    "url": "https://www.baozimh.com/comic/jueduihuigui-yhjangjppozhenhuan",
    "favorite": false,
    "progress": ""
  },
  {
    "id": 14,
    "title": "輪迴天魔",
    "url": "https://www.baozimh.com/comic/lunhuitianmo-jpbookyoumyhjang",
    "favorite": false,
    "progress": ""
  },
  {
    "id": 15,
    "title": "天才策士",
    "url": "https://www.baozimh.com/comic/tiancaicexieshi-zhenglongjinzhenshi",
    "favorite": false,
    "progress": ""
  },
  {
    "id": 16,
    "title": "重生傭兵王的復仇",
    "url": "https://www.baozimh.com/comic/zhongshengyongbingwangdefuchou-goldhaengjjjsss",
    "favorite": false,
    "progress": ""
  },
  {
    "id": 17,
    "title": "殘命天才生存法",
    "url": "https://www.baozimh.com/comic/canmingtiancaishengcunfa-jpblueseesawyoonc",
    "favorite": false,
    "progress": ""
  },
  {
    "id": 18,
    "title": "裝備我最強",
    "url": "https://www.baozimh.com/comic/zhuangbeiwozuiqiang-teamargomonohumbugredicestudiosaenalredicestudio_vqirjn",
    "favorite": false,
    "progress": ""
  },
  {
    "id": 19,
    "title": "劍尊歸來",
    "url": "https://www.baozimh.com/comic/jianzunguilai-bigalico_yq6j54",
    "favorite": false,
    "progress": ""
  }
];
const shelf = document.querySelector('#bookshelf');
const empty = document.querySelector('#empty');
const search = document.querySelector('#search');
const countAll = document.querySelector('#countAll');
const countFav = document.querySelector('#countFav');
const footerCount = document.querySelector('#footerCount');
let filter = 'all';

const KEY = 'my-manga-shelf-v1';
let state = JSON.parse(localStorage.getItem(KEY) || '{}');

function save() { localStorage.setItem(KEY, JSON.stringify(state)); }

function isFav(id) { return !!state[id]?.favorite; }
function progress(id) { return state[id]?.progress || ''; }

function render() {
  const q = search.value.trim().toLowerCase();
  const favCount = BOOKS.filter(b => isFav(b.id)).length;
  countAll.textContent = BOOKS.length;
  countFav.textContent = favCount;
  footerCount.textContent = BOOKS.length;

  const list = BOOKS.filter(b => {
    const matchText = b.title.toLowerCase().includes(q);
    const matchFilter = filter === 'all' || isFav(b.id);
    return matchText && matchFilter;
  });

  shelf.innerHTML = list.map((b, idx) => `
    <article class="card">
      <span class="badge">漫畫 #${b.id}</span>
      <h2>${escapeHtml(b.title)}</h2>
      <div class="meta">${b.url.includes('twmanga.com') ? 'TWMANGA' : 'Baozimh'}</div>
      <div class="progress">
        <input class="progressInput" data-id="${b.id}" value="${escapeHtml(progress(b.id))}" placeholder="閱讀進度，例如 267話">
      </div>
      <div class="actions">
        <a class="read" href="${b.url}" target="_blank" rel="noopener noreferrer">開始閱讀 ↗</a>
        <button class="fav ${isFav(b.id) ? 'on' : ''}" data-fav="${b.id}" aria-label="收藏">${isFav(b.id) ? '★' : '☆'}</button>
      </div>
    </article>
  `).join('');
  empty.classList.toggle('hidden', list.length !== 0);
  document.querySelectorAll('[data-fav]').forEach(btn => btn.addEventListener('click', () => {
    const id = btn.dataset.fav;
    state[id] = {...(state[id] || {}), favorite: !isFav(id)};
    save(); render();
  }));
  document.querySelectorAll('.progressInput').forEach(input => input.addEventListener('change', () => {
    const id = input.dataset.id;
    state[id] = {...(state[id] || {}), progress: input.value};
    save();
  }));
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

search.addEventListener('input', render);
document.querySelectorAll('.chip').forEach(chip => chip.addEventListener('click', () => {
  document.querySelectorAll('.chip').forEach(x => x.classList.remove('active'));
  chip.classList.add('active');
  filter = chip.dataset.filter;
  render();
}));

document.querySelector('#themeBtn').addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('manga-theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
});
if (localStorage.getItem('manga-theme') === 'dark') document.documentElement.classList.add('dark');

render();
