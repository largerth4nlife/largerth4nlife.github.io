const App = (() => {
  const money = n => `₱${Number(n).toLocaleString('en-PH')}`;
  const escape = value => String(value ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const cardArt = (style='dark', compact=false) => `<div class="mini-card ${escape(style)}"><small>NFC DIGITAL CARD</small><strong>TapCard</strong><span>)))</span></div>`;
  const renderProducts = (target, products) => {
    const el = document.getElementById(target); if (!el) return;
    el.innerHTML = products.map(p => `<article class="product-card"><a href="product.html?id=${encodeURIComponent(p.id)}"><div class="product-art">${cardArt(p.style)}</div></a><div class="product-info"><h3>${escape(p.name)}</h3><p>${escape(p.description)}</p><div class="product-meta"><span class="price">${money(p.price)}</span><a class="small-button" href="product.html?id=${encodeURIComponent(p.id)}">View / Buy</a></div></div></article>`).join('') || '<div class="empty">No products found.</div>';
  };
  const updateCartCount = () => { try { const items=JSON.parse(localStorage.getItem('tapcard-cart')||'[]'); document.querySelectorAll('.cart-count').forEach(el=>el.textContent=items.reduce((n,i)=>n+Number(i.qty||0),0)); } catch {} };
  document.addEventListener('DOMContentLoaded', updateCartCount);
  return {money,escape,cardArt,renderProducts,updateCartCount};
})();
