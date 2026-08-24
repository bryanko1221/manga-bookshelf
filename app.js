const BOOKS=[{"id": 1, "title": "某天成為魔神", "url": "https://www.baozimh.com/comic/moutianchengweimoshen-xuankunjueduiwudijingangbupi_58hyd3", "category": "玄幻"}, {"id": 2, "title": "我獨自滿級新手", "url": "https://www.baozimh.com/comic/woduzimanjixinshou-maslowwanzswingbat_89a7te", "category": "熱血"}, {"id": 3, "title": "無限升級印武林", "url": "https://www.baozimh.com/comic/wuxianshengjiinwulin-gonboongkimjinwoo", "category": "武俠"}, {"id": 4, "title": "我獨自升級", "url": "https://www.baozimh.com/comic/woduzishengji-duburedicestudio_yfelsj", "category": "熱血"}, {"id": 5, "title": "與神一同升級", "url": "https://www.baozimh.com/comic/yushenyitongshengji-ohyeonbain_fm7oue", "category": "玄幻"}, {"id": 6, "title": "絕對劍士", "url": "https://www.baozimh.com/comic/jueduijiangan-xianyueyekdrmti_9p8ljs", "category": "武俠"}, {"id": 7, "title": "殺手巴德洛", "url": "https://www.baozimh.com/comic/shashoubadeluo-jinzhengxianlimlina", "category": "熱血"}, {"id": 8, "title": "拳王歸來", "url": "https://www.baozimh.com/comic/quanwangguilai-liuchenxings2donax", "category": "熱血"}, {"id": 9, "title": "現實闖關", "url": "https://www.baozimh.com/comic/xianshichuangguan-joowoonleetaicheng", "category": "冒險"}, {"id": 10, "title": "公爵家的重生暗殺者", "url": "https://www.baozimh.com/comic/gongjuejiadezhongshenganshazhe-coffeelimeswingbatswingbat", "category": "重生"}, {"id": 11, "title": "魔道轉生記", "url": "https://www.baozimh.com/comic/modaozhuanshengji-codezeroforcestudio_63oym3", "category": "玄幻"}, {"id": 12, "title": "至活今天的輪迴騎士", "url": "https://www.baozimh.com/comic/zhihuojintiandelunhuiqishi-leehyunminiankanara", "category": "冒險"}, {"id": 13, "title": "絕對回歸", "url": "https://www.baozimh.com/comic/jueduihuigui-yhjangjppozhenhuan", "category": "重生"}, {"id": 14, "title": "輪迴天魔", "url": "https://www.baozimh.com/comic/lunhuitianmo-jpbookyoumyhjang", "category": "玄幻"}, {"id": 15, "title": "天才策士", "url": "https://www.baozimh.com/comic/tiancaicexieshi-zhenglongjinzhenshi", "category": "武俠"}, {"id": 16, "title": "重生傭兵王的復仇", "url": "https://www.baozimh.com/comic/zhongshengyongbingwangdefuchou-goldhaengjjjsss", "category": "重生"}, {"id": 17, "title": "殘命天才生存法", "url": "https://www.baozimh.com/comic/canmingtiancaishengcunfa-jpblueseesawyoonc", "category": "冒險"}, {"id": 18, "title": "裝備我最強", "url": "https://www.baozimh.com/comic/zhuangbeiwozuiqiang-teamargomonohumbugredicestudiosaenalredicestudio_vqirjn", "category": "熱血"}, {"id": 19, "title": "劍尊歸來", "url": "https://www.baozimh.com/comic/jianzunguilai-bigalico_yq6j54", "category": "武俠"}];
const KEY="mangaBookshelfV21Stable";
let state=loadState(), filter="all";

function loadState(){
  try{
    const x=JSON.parse(localStorage.getItem(KEY)||"null");
    if(x) return {
      favs:x.favs||{},
      recent:x.recent||{},
      covers:x.covers||{},
      theme:x.theme||"light"
    };
  }catch(e){}
  return {favs:{},recent:{},covers:{},theme:"light"};
}
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function $(s){return document.querySelector(s)}
function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function book(id){return BOOKS.find(b=>String(b.id)===String(id))}
function isFav(id){return !!state.favs[id]}
function cover(id){return state.covers[id]||""}
function markRead(id){state.recent[id]=Date.now();save()}
function renderRecent(){
  const arr=Object.entries(state.recent).filter(([id,t])=>book(id)&&t).sort((a,b)=>b[1]-a[1]).slice(0,3);
  $("#recentTotal").textContent=Object.keys(state.recent).filter(id=>book(id)).length;
  $("#recentList").innerHTML=arr.length?arr.map(([id,t])=>{
    const b=book(id), c=cover(id);
    return `<div class="recentCard"><div class="miniCover">${c?`<img src="${esc(c)}" onerror="this.style.display='none';this.parentElement.insertAdjacentHTML('beforeend','📖')">`:"📖"}</div><div class="recentInfo"><h3>${esc(b.title)}</h3><p>${new Date(t).toLocaleDateString("zh-TW")} 最近閱讀</p><a href="${esc(b.url)}" target="_blank" data-read="${id}">繼續閱讀 ↗</a></div></div>`
  }).join(""):'<div class="recentCard"><div class="miniCover">📖</div><div class="recentInfo"><h3>還沒有閱讀紀錄</h3><p>點擊「開始閱讀」後會出現在這裡。</p></div></div>';
  document.querySelectorAll("[data-read]").forEach(x=>x.onclick=()=>markRead(x.dataset.read));
}
function render(){
  const q=$("#search").value.trim().toLowerCase(),cat=$("#category").value;
  const list=BOOKS.filter(b=>(!q||b.title.toLowerCase().includes(q))&&(cat==="all"||b.category===cat)&&(filter==="all"||(filter==="fav"&&isFav(b.id))));
  $("#total").textContent=BOOKS.length;
  $("#favTotal").textContent=Object.values(state.favs).filter(Boolean).length;
  $("#resultCount").textContent=list.length+" 部";
  $("#grid").innerHTML=list.map(b=>{
    const c=cover(b.id);
    return `<article class="card"><div class="cover">${c?`<img src="${esc(c)}" alt="${esc(b.title)}封面" onerror="this.style.display='none';this.parentElement.insertAdjacentHTML('beforeend','📖')">`:"📖"}</div><div class="body"><h3>${esc(b.title)}</h3><div class="meta">${b.url.includes("twmanga")?"TWMANGA":"Baozimh"}</div><span class="tag">${esc(b.category)}</span><div class="actions"><a class="read" href="${esc(b.url)}" target="_blank" data-read="${b.id}">開始閱讀 ↗</a><button class="star ${isFav(b.id)?"on":""}" data-fav="${b.id}">${isFav(b.id)?"★":"☆"}</button></div></div></article>`
  }).join("");
  $("#empty").classList.toggle("hidden",list.length!==0);
  document.querySelectorAll("[data-fav]").forEach(x=>x.onclick=()=>{
    state.favs[x.dataset.fav]=!isFav(x.dataset.fav);save();render();
  });
  document.querySelectorAll("[data-read]").forEach(x=>x.onclick=()=>markRead(x.dataset.read));
  renderRecent();
}
document.querySelectorAll(".filter").forEach(btn=>btn.onclick=()=>{
  document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active");filter=btn.dataset.filter;render();
});
$("#search").oninput=render;$("#category").onchange=render;
$("#clearRecent").onclick=()=>{state.recent={};save();render()};
$("#themeBtn").onclick=()=>{
  state.theme=document.documentElement.classList.toggle("dark")?"dark":"light";save();
};
if(state.theme==="dark")document.documentElement.classList.add("dark");
render();
