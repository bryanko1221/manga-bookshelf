const DEFAULT_BOOKS=[{"id": 1, "title": "某天成為魔神", "url": "https://www.baozimh.com/comic/moutianchengweimoshen-xuankunjueduiwudijingangbupi_58hyd3", "category": "玄幻", "cover": ""}, {"id": 2, "title": "我獨自滿級新手", "url": "https://www.baozimh.com/comic/woduzimanjixinshou-maslowwanzswingbat_89a7te", "category": "熱血", "cover": ""}, {"id": 3, "title": "無限升級印武林", "url": "https://www.baozimh.com/comic/wuxianshengjiinwulin-gonboongkimjinwoo", "category": "武俠", "cover": ""}, {"id": 4, "title": "我獨自升級", "url": "https://www.baozimh.com/comic/woduzishengji-duburedicestudio_yfelsj", "category": "熱血", "cover": ""}, {"id": 5, "title": "與神一同升級", "url": "https://www.baozimh.com/comic/yushenyitongshengji-ohyeonbain_fm7oue", "category": "玄幻", "cover": ""}, {"id": 6, "title": "絕對劍士", "url": "https://www.baozimh.com/comic/jueduijiangan-xianyueyekdrmti_9p8ljs", "category": "武俠", "cover": ""}, {"id": 7, "title": "殺手巴德洛", "url": "https://www.baozimh.com/comic/shashoubadeluo-jinzhengxianlimlina", "category": "熱血", "cover": ""}, {"id": 8, "title": "拳王歸來", "url": "https://www.baozimh.com/comic/quanwangguilai-liuchenxings2donax", "category": "熱血", "cover": ""}, {"id": 9, "title": "現實闖關", "url": "https://www.baozimh.com/comic/xianshichuangguan-joowoonleetaicheng", "category": "冒險", "cover": ""}, {"id": 10, "title": "公爵家的重生暗殺者", "url": "https://www.baozimh.com/comic/gongjuejiadezhongshenganshazhe-coffeelimeswingbatswingbat", "category": "重生", "cover": ""}, {"id": 11, "title": "魔道轉生記", "url": "https://www.baozimh.com/comic/modaozhuanshengji-codezeroforcestudio_63oym3", "category": "玄幻", "cover": ""}, {"id": 12, "title": "至活今天的輪迴騎士", "url": "https://www.baozimh.com/comic/zhihuojintiandelunhuiqishi-leehyunminiankanara", "category": "冒險", "cover": ""}, {"id": 13, "title": "絕對回歸", "url": "https://www.baozimh.com/comic/jueduihuigui-yhjangjppozhenhuan", "category": "重生", "cover": ""}, {"id": 14, "title": "輪迴天魔", "url": "https://www.baozimh.com/comic/lunhuitianmo-jpbookyoumyhjang", "category": "玄幻", "cover": ""}, {"id": 15, "title": "天才策士", "url": "https://www.baozimh.com/comic/tiancaicexieshi-zhenglongjinzhenshi", "category": "武俠", "cover": ""}, {"id": 16, "title": "重生傭兵王的復仇", "url": "https://www.baozimh.com/comic/zhongshengyongbingwangdefuchou-goldhaengjjjsss", "category": "重生", "cover": ""}, {"id": 17, "title": "殘命天才生存法", "url": "https://www.baozimh.com/comic/canmingtiancaishengcunfa-jpblueseesawyoonc", "category": "冒險", "cover": ""}, {"id": 18, "title": "裝備我最強", "url": "https://www.baozimh.com/comic/zhuangbeiwozuiqiang-teamargomonohumbugredicestudiosaenalredicestudio_vqirjn", "category": "熱血", "cover": ""}, {"id": 19, "title": "劍尊歸來", "url": "https://www.baozimh.com/comic/jianzunguilai-bigalico_yq6j54", "category": "武俠", "cover": ""}];
const DB_KEY="mangaBookshelfV221";
let db={books:[],favs:{},history:{},theme:"light"};
let activeFilter="all",editingId=null;

const $=id=>document.getElementById(id);
function saveDB(){try{localStorage.setItem(DB_KEY,JSON.stringify(db))}catch(e){}}
function loadDB(){
  try{
    const raw=localStorage.getItem(DB_KEY);
    if(raw){
      const x=JSON.parse(raw);
      if(x&&Array.isArray(x.books)&&x.books.length){
        db={books:x.books,favs:x.favs||{},history:x.history||{},theme:x.theme==="dark"?"dark":"light"};
        return;
      }
    }
  }catch(e){}
  db={books:DEFAULT_BOOKS.map(x=>({...x})),favs:{},history:{},theme:"light"};
  saveDB();
}
function escapeHTML(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function getBook(id){return db.books.find(b=>String(b.id)===String(id))}
function isFav(id){return db.favs[String(id)]===true}

function renderCategories(){
  const select=$("categoryFilter");
  if(!select)return;
  const current=select.value||"all";
  const cats=[...new Set([...db.books.map(b=>b.category).filter(Boolean),"熱血","玄幻","武俠","重生","無敵","冒險","其他"])].sort();
  select.innerHTML='<option value="all">全部分類</option>'+cats.map(c=>`<option value="${escapeHTML(c)}">${escapeHTML(c)}</option>`).join("");
  select.value=cats.includes(current)?current:"all";
}

function renderHistory(){
  const box=$("continueList");
  if(!box)return;
  const arr=Object.entries(db.history).filter(([id,t])=>getBook(id)&&Number(t)>0).sort((a,b)=>Number(b[1])-Number(a[1])).slice(0,3);
  if(!arr.length){
    box.innerHTML='<div class="continue-empty">尚無閱讀紀錄</div>';
    return;
  }
  box.innerHTML=arr.map(([id,t])=>{
    const b=getBook(id);
    const cover=b.cover?`<img src="${escapeHTML(b.cover)}" alt="" onerror="this.style.display='none'">`:"📖";
    return `<article class="continue-card"><div class="continue-cover">${cover}</div><div><h3>${escapeHTML(b.title)}</h3><p>${new Date(Number(t)).toLocaleDateString("zh-TW")} 最近閱讀</p><a href="${escapeHTML(b.url)}" target="_blank" rel="noopener" data-history-read="${b.id}">繼續閱讀 ↗</a></div></article>`;
  }).join("");
  box.querySelectorAll("[data-history-read]").forEach(a=>a.addEventListener("click",()=>{
    db.history[String(a.dataset.historyRead)]=Date.now();saveDB();
  }));
}

function render(){
  renderCategories();
  const q=($("search")?.value||"").trim().toLowerCase();
  const cat=$("categoryFilter")?.value||"all";
  const list=db.books.filter(b=>
    (!q||String(b.title).toLowerCase().includes(q)) &&
    (cat==="all"||b.category===cat) &&
    (activeFilter==="all"||isFav(b.id))
  );
  if($("allCount"))$("allCount").textContent=db.books.length;
  if($("favCount"))$("favCount").textContent=Object.values(db.favs).filter(Boolean).length;
  if($("result"))$("result").textContent=list.length+" 部";
  const grid=$("grid");
  if(!grid)return;
  grid.innerHTML=list.map(b=>{
    const cover=b.cover
      ? `<img src="${escapeHTML(b.cover)}" alt="${escapeHTML(b.title)}封面" onerror="this.style.display='none';this.parentElement.insertAdjacentText('beforeend','📖')">`
      : "📖";
    return `<article class="card"><div class="cover">${cover}</div><div class="card-body"><h3>${escapeHTML(b.title)}</h3><p class="source">${b.url.includes("twmanga")?"TWMANGA":"Baozimh"}</p><span class="tag">${escapeHTML(b.category||"其他")}</span><div class="actions"><a class="read" href="${escapeHTML(b.url)}" target="_blank" rel="noopener" data-read="${b.id}">開始閱讀 ↗</a><button class="star ${isFav(b.id)?"on":""}" data-fav="${b.id}">${isFav(b.id)?"★":"☆"}</button><button class="edit" data-edit="${b.id}">✎</button><button class="delete" data-delete="${b.id}">×</button></div></div></article>`;
  }).join("");
  $("empty")?.classList.toggle("hidden",list.length!==0);
  grid.querySelectorAll("[data-fav]").forEach(btn=>btn.addEventListener("click",()=>{
    const id=String(btn.dataset.fav);db.favs[id]=!isFav(id);saveDB();render();
  }));
  grid.querySelectorAll("[data-read]").forEach(a=>a.addEventListener("click",()=>{
    db.history[String(a.dataset.read)]=Date.now();saveDB();renderHistory();
  }));
  grid.querySelectorAll("[data-edit]").forEach(btn=>btn.addEventListener("click",()=>openModal(btn.dataset.edit)));
  grid.querySelectorAll("[data-delete]").forEach(btn=>btn.addEventListener("click",()=>deleteBook(btn.dataset.delete)));
  renderHistory();
}

window.openModal=function(id=null){
  editingId=id?String(id):null;
  $("modalTitle").textContent=id?"編輯漫畫":"新增漫畫";
  $("modalError").textContent="";
  if(id){
    const b=getBook(id);
    $("titleInput").value=b?.title||"";
    $("urlInput").value=b?.url||"";
    $("coverInput").value=b?.cover||"";
    $("catInput").value=b?.category||"其他";
  }else{
    $("titleInput").value="";
    $("urlInput").value="";
    $("coverInput").value="";
    $("catInput").value="其他";
  }
  $("modal").classList.remove("hidden");
  setTimeout(()=>$("titleInput")?.focus(),50);
}
window.closeModal=function(){$("modal").classList.add("hidden");editingId=null}
function deleteBook(id){
  const b=getBook(id);
  if(!b)return;
  if(!confirm(`確定要刪除「${b.title}」嗎？`))return;
  db.books=db.books.filter(x=>String(x.id)!==String(id));
  delete db.favs[String(id)];delete db.history[String(id)];
  saveDB();render();
}

window.saveModal=function(){
  const title=$("titleInput").value.trim();
  const url=$("urlInput").value.trim();
  const cover=$("coverInput").value.trim();
  const category=$("catInput").value||"其他";
  if(!title){$("modalError").textContent="請輸入漫畫名稱。";return}
  const cleanUrl=url.replace(/[\u200B-\u200D\uFEFF]/g,""); let parsedUrl; try{parsedUrl=new URL(cleanUrl)}catch(e){parsedUrl=null} if(!parsedUrl||!/^https?:$/.test(parsedUrl.protocol)){$("modalError").textContent="漫畫網址必須以 http:// 或 https:// 開頭。";return}
  const cleanCover=cover.replace(/[\u200B-\u200D\uFEFF]/g,""); if(cleanCover){try{const cu=new URL(cleanCover); if(!/^https?:$/.test(cu.protocol))throw new Error()}catch(e){$("modalError").textContent="封面網址格式不正確。";return}}
  if(editingId){
    const b=getBook(editingId);
    if(b)Object.assign(b,{title,url:cleanUrl,cover:cleanCover,category});
  }else{
    const next=db.books.reduce((m,b)=>Math.max(m,Number(b.id)||0),0)+1;
    db.books.push({id:next,title,url:cleanUrl,cover:cleanCover,category});
  }
  saveDB();closeModal();render();
}

function init(){
  loadDB();
  if(db.theme==="dark")document.documentElement.classList.add("dark");

  $("addBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  });

  // 點擊右上角叉叉或取消按鈕關閉 Modal
  $("closeModal")?.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
  });

  $("cancelBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    closeModal();
  });

  $("saveBtn")?.addEventListener("click", saveModal);

  // 點擊 Modal 外部黑影背景時關閉
  $("modal")?.addEventListener("click", (e) => {
    if (e.target.id === "modal") {
      closeModal();
    }
  });
  $("search")?.addEventListener("input",render);
  $("categoryFilter")?.addEventListener("change",render);
  $("clearHistory")?.addEventListener("click",()=>{db.history={};saveDB();renderHistory()});
  $("theme")?.addEventListener("click",()=>{
    const dark=document.documentElement.classList.toggle("dark");
    db.theme=dark?"dark":"light";saveDB();
  });
  document.querySelectorAll(".tab").forEach(btn=>btn.addEventListener("click",()=>{
    document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active");activeFilter=btn.dataset.filter||"all";render();
  }));
  $("modal")?.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
  render();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
