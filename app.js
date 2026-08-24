const BOOKS = [{"id": 1, "title": "某天成為魔神", "url": "https://www.baozimh.com/comic/moutianchengweimoshen-xuankunjueduiwudijingangbupi_58hyd3"}, {"id": 2, "title": "我獨自滿級新手", "url": "https://www.baozimh.com/comic/woduzimanjixinshou-maslowwanzswingbat_89a7te"}, {"id": 3, "title": "無限升級印武林", "url": "https://www.baozimh.com/comic/wuxianshengjiinwulin-gonboongkimjinwoo"}, {"id": 4, "title": "我獨自升級", "url": "https://www.baozimh.com/comic/woduzishengji-duburedicestudio_yfelsj"}, {"id": 5, "title": "與神一同升級", "url": "https://www.baozimh.com/comic/yushenyitongshengji-ohyeonbain_fm7oue"}, {"id": 6, "title": "絕對劍士", "url": "https://www.baozimh.com/comic/jueduijiangan-xianyueyekdrmti_9p8ljs"}, {"id": 7, "title": "殺手巴德洛", "url": "https://www.baozimh.com/comic/shashoubadeluo-jinzhengxianlimlina"}, {"id": 8, "title": "拳王歸來", "url": "https://www.baozimh.com/comic/quanwangguilai-liuchenxings2donax"}, {"id": 9, "title": "現實闖關", "url": "https://www.baozimh.com/comic/xianshichuangguan-joowoonleetaicheng"}, {"id": 10, "title": "公爵家的重生暗殺者", "url": "https://www.baozimh.com/comic/gongjuejiadezhongshenganshazhe-coffeelimeswingbatswingbat"}, {"id": 11, "title": "魔道轉生記", "url": "https://www.baozimh.com/comic/modaozhuanshengji-codezeroforcestudio_63oym3"}, {"id": 12, "title": "至活今天的輪迴騎士", "url": "https://www.baozimh.com/comic/zhihuojintiandelunhuiqishi-leehyunminiankanara"}, {"id": 13, "title": "絕對回歸", "url": "https://www.baozimh.com/comic/jueduihuigui-yhjangjppozhenhuan"}, {"id": 14, "title": "輪迴天魔", "url": "https://www.baozimh.com/comic/lunhuitianmo-jpbookyoumyhjang"}, {"id": 15, "title": "天才策士", "url": "https://www.baozimh.com/comic/tiancaicexieshi-zhenglongjinzhenshi"}, {"id": 16, "title": "重生傭兵王的復仇", "url": "https://www.baozimh.com/comic/zhongshengyongbingwangdefuchou-goldhaengjjjsss"}, {"id": 17, "title": "殘命天才生存法", "url": "https://www.baozimh.com/comic/canmingtiancaishengcunfa-jpblueseesawyoonc"}, {"id": 18, "title": "裝備我最強", "url": "https://www.baozimh.com/comic/zhuangbeiwozuiqiang-teamargomonohumbugredicestudiosaenalredicestudio_vqirjn"}, {"id": 19, "title": "劍尊歸來", "url": "https://www.baozimh.com/comic/jianzunguilai-bigalico_yq6j54"}];
const STORAGE = 'mangaShelfV2_1';
let state = {};
try { state = JSON.parse(localStorage.getItem(STORAGE) || '{}') || {}; } catch(e) { state = {}; }
let filter = 'all';

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function save(){ try{localStorage.setItem(STORAGE, JSON.stringify(state));}catch(e){} }
function get(id){ return state[String(id)] || {}; }
function isFav(id){ return !!get(id).fav; }

function markRead(id){
  state[String(id)] = {...get(id), last: Date.now()};
  save();
}

function renderContinue(){
  const ids = Object.entries(state)
    .filter(([id,v]) => v && v.last && BOOKS.some(b => String(b.id) === id))
    .sort((a,b) => b[1].last - a[1].last)
    .slice(0,6);

  const box = $('#continueList');
  if(!ids.length){
    box.innerHTML = '<div class="continue-card"><h3>還沒有閱讀紀錄</h3><p>點擊漫畫的「開始閱讀」後會出現在這裡。</p></div>';
    return;
  }
  box.innerHTML = ids.map(([id]) => {
    const b = BOOKS.find(x => String(x.id) === id);
    return `<div class="continue-card">
      <h3>${esc(b.title)}</h3>
      <p>最近閱讀 · ${new Date(get(b.id).last).toLocaleString('zh-TW',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'})}</p>
      <a class="mini-read" href="${esc(b.url)}" target="_blank" rel="noopener noreferrer" data-read="${b.id}">繼續閱讀 ↗</a>
    </div>`;
  }).join('');
  document.querySelectorAll('[data-read]').forEach(a => a.addEventListener('click',()=>markRead(a.dataset.read)));
}

function render(){
  const q = $('#search').value.trim().toLowerCase();
  const list = BOOKS.filter(b =>
    (!q || b.title.toLowerCase().includes(q)) &&
    (filter === 'all' || isFav(b.id))
  );

  $('#allCount').textContent = BOOKS.length;
  $('#favCount').textContent = BOOKS.filter(b=>isFav(b.id)).length;
  $('#result').textContent = `${list.length} 部`;

  $('#grid').innerHTML = list.map(b => `
    <article class="card">
      <div class="cover">📖</div>
      <h3>${esc(b.title)}</h3>
      <div class="site">${b.url.includes('twmanga.com') ? 'TWMANGA' : 'Baozimh'}</div>
      <div class="card-actions">
        <a class="read" href="${esc(b.url)}" target="_blank" rel="noopener noreferrer" data-read="${b.id}">開始閱讀 ↗</a>
        <button class="star ${isFav(b.id)?'on':''}" type="button" data-fav="${b.id}" aria-label="收藏">${isFav(b.id)?'★':'☆'}</button>
      </div>
    </article>`).join('');

  $('#empty').classList.toggle('hidden', list.length !== 0);

  document.querySelectorAll('[data-fav]').forEach(btn => btn.addEventListener('click',()=>{
    const id=btn.dataset.fav;
    state[String(id)]={...get(id),fav:!isFav(id)};
    save(); render();
  }));
  document.querySelectorAll('[data-read]').forEach(a=>a.addEventListener('click',()=>markRead(a.dataset.read)));
  renderContinue();
}

document.querySelectorAll('.tab').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
  btn.classList.add('active');
  filter=btn.dataset.filter;
  render();
}));

$('#search').addEventListener('input',render);
$('#theme').addEventListener('click',()=>{
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('mangaThemeV21',document.documentElement.classList.contains('dark')?'dark':'light');
});
$('#clearHistory').addEventListener('click',()=>{
  Object.keys(state).forEach(id=>{ if(state[id]) delete state[id].last; });
  save(); render();
});
if(localStorage.getItem('mangaThemeV21')==='dark') document.documentElement.classList.add('dark');
render();
