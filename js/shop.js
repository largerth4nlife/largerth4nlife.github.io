document.addEventListener('DOMContentLoaded',()=>{
  const filters=document.getElementById('filters'), search=document.getElementById('search');
  const categories=['All',...new Set(PRODUCTS.map(p=>p.category))]; let selected='All';
  filters.innerHTML=categories.map(c=>`<button class="filter ${c==='All'?'active':''}" data-category="${c}">${c}</button>`).join('');
  const draw=()=>{const q=search.value.trim().toLowerCase(); App.renderProducts('products',PRODUCTS.filter(p=>(selected==='All'||p.category===selected)&&(!q||`${p.name} ${p.description} ${p.category}`.toLowerCase().includes(q))))};
  filters.addEventListener('click',e=>{const b=e.target.closest('.filter');if(!b)return;selected=b.dataset.category;filters.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));draw()}); search.addEventListener('input',draw); draw();
});
