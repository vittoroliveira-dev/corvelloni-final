import"./consent-Baoe4G0u.js";window.addEventListener("DOMContentLoaded",()=>{document.querySelector("[data-calc-details] .calc-details");const o=document.getElementById("analysis-modal");if(!btn||!o||!(o instanceof HTMLDialogElement))return;const a=o.querySelector(".modal__body"),t=()=>o.close();btn.addEventListener("click",()=>{const i=document.querySelector(".corvelloni-details .calc-details");if(!i)return;const e=i.cloneNode(!0);e.querySelectorAll("[id]").forEach(n=>n.removeAttribute("id")),a.innerHTML="",a.appendChild(e),o.showModal()}),o.querySelector("[data-close]")?.addEventListener("click",t),o.addEventListener("click",i=>{i.target===o&&t()}),document.addEventListener("keydown",i=>{i.key==="Escape"&&o.open&&t()})});const U={CLT:{nome:"CLT Padrão",divisorDia:30,divisorHora:220},CLT_BANCARIO:{nome:"CLT Bancário",divisorDia:30,divisorHora:180},CLT_JORNALISTA:{nome:"CLT Jornalista",divisorDia:30,divisorHora:150}},A={inss:{faixas:[{limite:1518,aliquota:.075,nome:"Faixa 1"},{limite:2793.88,aliquota:.09,nome:"Faixa 2"},{limite:4190.83,aliquota:.12,nome:"Faixa 3"},{limite:8157.41,aliquota:.14,nome:"Faixa 4"}],teto:8157.41},irrf:[{vigencia:{inicio:"2025-01-01",fim:"2025-04-30"},dependente:189.59,descontoSimplificado:564.8,tabela:[{max:2259.2,aliquota:0,deducao:0,nome:"Isento"},{max:2826.65,aliquota:.075,deducao:169.44,nome:"7,5%"},{max:3751.05,aliquota:.15,deducao:381.44,nome:"15%"},{max:4664.68,aliquota:.225,deducao:662.77,nome:"22,5%"},{max:null,aliquota:.275,deducao:896,nome:"27,5%"}]},{vigencia:{inicio:"2025-05-01",fim:null},dependente:189.59,descontoSimplificado:607.2,tabela:[{max:2428.8,aliquota:0,deducao:0,nome:"Isento"},{max:2826.65,aliquota:.075,deducao:182.16,nome:"7,5%"},{max:3751.05,aliquota:.15,deducao:394.16,nome:"15%"},{max:4664.68,aliquota:.225,deducao:675.49,nome:"22,5%"},{max:null,aliquota:.275,deducao:908.73,nome:"27,5%"}]}],salarioFamilia:{limiteRenda:1906.04,valorPorDependente:65},fgts:{aliquota:.08,aliquotaAprendiz:.02}},u=o=>Number(String(o??"").replace(/\./g,"").replace(",",".").trim())||0,T=o=>Math.max(0,o||0),y=o=>Math.max(0,Math.floor(Number(o||0))),d=o=>Math.round((o+Number.EPSILON)*100)/100,r=o=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(o),C=o=>new Intl.NumberFormat("pt-BR",{style:"percent",minimumFractionDigits:2}).format(o/100);function z(o){const a=[],t=u(o.bruto),i=u(o.vtPercent),e=y(o.faltasDias),n=u(o.atrasosHoras),c=y(o.diasUteis)||26;return t<0&&a.push("Salário bruto não pode ser negativo"),t<1320&&t>0&&a.push("Salário abaixo do mínimo nacional (R$ 1.320,00)"),i>6&&a.push("Vale transporte limitado a 6% (valor será ajustado)"),e>30&&a.push("Dias de falta não pode exceder 30"),n>220&&a.push("Horas de atraso excedem jornada mensal padrão"),c>30&&a.push("Dias úteis não pode exceder 30"),a}const K=(o,a)=>{const t=a?new Date(`${a}-01T00:00:00`):new Date;return o.find(i=>{const e=new Date(i.vigencia.inicio+"T00:00:00"),n=i.vigencia.fim?new Date(i.vigencia.fim+"T23:59:59"):new Date(864e13);return t>=e&&t<=n})||o[o.length-1]},B=(o,a)=>{const t=a[a.length-1].limite,i=Math.min(o,t);let e=0,n=0,c=null;for(const m of a){const f=Math.min(i,m.limite);f>n&&(e+=(f-n)*m.aliquota,c=m),n=f}return{valor:d(e),faixa:c,percentualEfetivo:o>0?d(e/o*100):0,atingiuTeto:o>=t}},j=(o,a)=>a.find(t=>o<=(t.max??1/0))||a[a.length-1],Q=({baseAposINSS:o,dependentes:a=0,cfg:t,pensao:i=0,pgbl:e=0,modo:n="auto"})=>{const c=(a||0)*t.dependente,m=Math.max(0,o-c-i-e),f=Math.max(0,o-t.descontoSimplificado),p=j(m,t.tabela),S=Math.max(0,m*p.aliquota-p.deducao),v=j(f,t.tabela),g=Math.max(0,f*v.aliquota-v.deducao),h=n==="sim"?!0:n==="nao"?!1:g<S,R=h?f:m,b=h?v:p,s=h?g:S;return{valor:d(s),usarSimpl:h,baseCalculo:d(R),faixa:b,percentualEfetivo:o>0?d(s/o*100):0,deducoes:{dependentes:d(c),pensao:d(i),pgbl:d(e),simplificado:h?d(t.descontoSimplificado):0}}},W=(o,a,t)=>a&&o<=a.limiteRenda?d(t*a.valorPorDependente):0;function X(o,a=0,t=0,i=0){const e=d(o*a*1.5),n=d(o*t*2),c=d(o*i*2),m=d(e+n+c);return{horas50:{quantidade:a,valor:e},horas100:{quantidade:t,valor:n},horasDomingo:{quantidade:i,valor:c},total:m}}function P(o,a=A){const t=z(o),i=T(u(o.bruto)),e=y(o.dependentes),n=T(u(o.outrosDescontos)),c=T(u(o.pensaoAlimenticia)),m=T(u(o.pgbl)),f=y(o.filhosSF),p=Math.min(6,T(u(o.vtPercent))),S=o.competencia||new Date().toISOString().slice(0,7),v=T(u(o.proventosVariaveis)),g=y(o.faltasDias),h=T(u(o.atrasosHoras)),R=y(o.diasUteis)||26,b=y(o.diasDescanso)||4,s=U[o.regime]||U.CLT,l=s.divisorDia,D=s.divisorHora,E=i/D,L=X(E,u(o.horas50),u(o.horas100),u(o.horasDomingo)),F=d(i/l*g),w=d(i/D*h),M=d(F*(b/R)),x=d(Math.max(0,i+v+L.total-F-w-M)),$=B(x,a.inss.faixas),G=K(a.irrf,S),H=d(Math.max(0,x-$.valor)),q=Q({baseAposINSS:H,dependentes:e,cfg:G,pensao:c,pgbl:m}),N=d(i*(p/100)),k=W(x,a.salarioFamilia,f),J=d(x*a.fgts.aliquota),I=d($.valor+q.valor+N+n+F+w+M+c),O=d(x+k),V=d(O-I);return{resumo:{bruto:x,totalProventos:O,totalDescontos:I,liquido:V,percentualDesconto:x>0?d(I/x*100):0},bases:{baseSal:x,baseIR:H,baseIRUsada:q.baseCalculo},inss:{valor:$.valor,faixa:$.faixa,percentualEfetivo:$.percentualEfetivo,atingiuTeto:$.atingiuTeto},irrf:{valor:q.valor,faixa:q.faixa,usouSimplificado:q.usarSimpl,percentualEfetivo:q.percentualEfetivo,deducoes:q.deducoes},descontos:{inss:$.valor,irrf:q.valor,vt:N,outros:d(n),descFaltas:F,descAtrasos:w,descDSR:M,pensao:c},proventos:{salarioBase:i,proventosVariaveis:v,salarioFamilia:k,horasExtras:L.total},informativos:{fgts:J,dependentes:e,competencia:S,regime:s.nome,diasTrabalhados:R,horasExtras:L,validationErrors:t},liquido:V}}function Y(o,a=12,t=30){const i=u(o),e=Math.min(12,Math.max(0,a)),n=Math.min(30,Math.max(0,t)),c=d(i/12*e),m=d(c/2),f=d(c-m),p=d(i/30*n),S=d(p/3),v=d(p+S),g=B(c,A.inss.faixas),h=B(v,A.inss.faixas);return{decimoTerceiro:{valor:c,primeiraParcela:m,segundaParcela:f,inss:g.valor,liquido:d(c-g.valor),proporcional:e<12},ferias:{base:p,terco:S,total:v,inss:h.valor,liquido:d(v-h.valor),diasCalculados:n},anual:{salarioAnual:d(i*12),totalBrutoAnual:d(i*12+c+v),totalINSSAnual:d(i*12*.11+g.valor+h.valor)}}}function Z(o,a){let t;return function(...e){const n=()=>{clearTimeout(t),o(...e)};clearTimeout(t),t=setTimeout(n,a)}}function oo(o){const{resumo:a,inss:t,irrf:i,informativos:e,descontos:n,proventos:c}=o;return`
    <div class="calc-details">
      <div class="calc-summary">
        <h3>📊 Resumo</h3>
        <dl>
          <dt>Salário Bruto:</dt>
          <dd><strong>${r(a.bruto)}</strong></dd>

          <dt>Total Descontos:</dt>
          <dd class="negative">${r(a.totalDescontos)} (${C(a.percentualDesconto)})</dd>

          <dt>Salário Líquido:</dt>
          <dd class="highlight"><strong>${r(a.liquido)}</strong></dd>
        </dl>
      </div>

      <div class="calc-taxes">
        <h3>💰 Impostos</h3>
        <dl>
          <dt>INSS:</dt>
          <dd>
            ${r(t.valor)}
            <span class="badge">${t.faixa?.nome||"N/A"}</span>
            <span class="info">(${C(t.percentualEfetivo)} efetivo)</span>
            ${t.atingiuTeto?'<span class="badge warning">Teto atingido</span>':""}
          </dd>

          <dt>IRRF:</dt>
          <dd>
            ${r(i.valor)}
            <span class="badge">${i.faixa?.nome||"Isento"}</span>
            <span class="info">(${C(i.percentualEfetivo)} efetivo)</span>
            ${i.usouSimplificado?'<span class="badge info">Desconto simplificado</span>':""}
          </dd>

          <dt>FGTS (não descontado):</dt>
          <dd class="info">${r(e.fgts)}</dd>
        </dl>
      </div>

      ${e.horasExtras?.total>0?`
        <div class="calc-extras">
          <h3>⏰ Horas Extras</h3>
          <dl>
            ${e.horasExtras.horas50.quantidade>0?`
              <dt>50% (${e.horasExtras.horas50.quantidade}h):</dt>
              <dd>${r(e.horasExtras.horas50.valor)}</dd>
            `:""}
            ${e.horasExtras.horas100.quantidade>0?`
              <dt>100% (${e.horasExtras.horas100.quantidade}h):</dt>
              <dd>${r(e.horasExtras.horas100.valor)}</dd>
            `:""}
            <dt>Total Extras:</dt>
            <dd class="positive">${r(e.horasExtras.total)}</dd>
          </dl>
        </div>
      `:""}

      ${n.descFaltas>0||n.descAtrasos>0?`
        <div class="calc-deductions">
          <h3>⚠️ Descontos por Ausências</h3>
          <dl>
            ${n.descFaltas>0?`
              <dt>Faltas:</dt>
              <dd class="negative">${r(n.descFaltas)}</dd>
            `:""}
            ${n.descAtrasos>0?`
              <dt>Atrasos:</dt>
              <dd class="negative">${r(n.descAtrasos)}</dd>
            `:""}
            ${n.descDSR>0?`
              <dt>DSR sobre faltas:</dt>
              <dd class="negative">${r(n.descDSR)}</dd>
            `:""}
          </dl>
        </div>
      `:""}

      ${e.validationErrors?.length>0?`
        <div class="calc-errors">
          <h3>⚠️ Avisos</h3>
          <ul>
            ${e.validationErrors.map(m=>`<li class="error">${m}</li>`).join("")}
          </ul>
        </div>
      `:""}

      <div class="calc-info">
        <p class="small">
          <strong>Competência:</strong> ${e.competencia}<br>
          <strong>Regime:</strong> ${e.regime}<br>
          <strong>Dependentes IRRF:</strong> ${e.dependentes}
        </p>
      </div>
    </div>
  `}function ao(o,a){const t=document.querySelector('[data-modal="comparison"]');if(!t)return;const i=`
  <div class="corvelloni-modal-content">
    <div class="corvelloni-modal-header">
      <h2>📊 Análise Completa CLT</h2>
      <button class="corvelloni-modal-close" data-close>&times;</button>
    </div>
    <div class="corvelloni-modal-body">
      <div class="comparison-grid">
        <div class="comparison-card">
          <h3>💵 Mensal</h3>
          <dl>
            <dt>Bruto:</dt><dd>${r(o.resumo.bruto)}</dd>
            <dt>Líquido:</dt><dd class="highlight">${r(o.liquido)}</dd>
            <dt>FGTS:</dt><dd>${r(o.informativos.fgts)}</dd>
          </dl>
        </div>

        <div class="comparison-card">
          <h3>🎄 13º Salário</h3>
          <dl>
            <dt>Valor Bruto:</dt><dd>${r(a.decimoTerceiro.valor)}</dd>
            <dt>Líquido:</dt><dd class="highlight">${r(a.decimoTerceiro.liquido)}</dd>
            <dt>1ª Parcela:</dt><dd>${r(a.decimoTerceiro.primeiraParcela)}</dd>
            <dt>2ª Parcela:</dt><dd>${r(a.decimoTerceiro.segundaParcela)}</dd>
          </dl>
        </div>

        <div class="comparison-card">
          <h3>🏖️ Férias</h3>
          <dl>
            <dt>Base:</dt><dd>${r(a.ferias.base)}</dd>
            <dt>1/3 Férias:</dt><dd>${r(a.ferias.terco)}</dd>
            <dt>Total Bruto:</dt><dd>${r(a.ferias.total)}</dd>
            <dt>Líquido:</dt><dd class="highlight">${r(a.ferias.liquido)}</dd>
          </dl>
        </div>

        <div class="comparison-card total">
          <h3>📅 Anual</h3>
          <dl>
            <dt>Salários (12x):</dt><dd>${r(o.resumo.bruto*12)}</dd>
            <dt>13º:</dt><dd>${r(a.decimoTerceiro.valor)}</dd>
            <dt>Férias:</dt><dd>${r(a.ferias.total)}</dd>
            <dt>Total Bruto Anual:</dt><dd class="highlight">${r(a.anual.totalBrutoAnual)}</dd>
            <dt>FGTS Anual:</dt><dd>${r(o.informativos.fgts*12)}</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>`;t.innerHTML=i,t.classList.add("show"),document.documentElement.style.overflow="hidden";const e=()=>{t.classList.remove("show"),t.innerHTML="",document.documentElement.style.overflow=""};t.querySelector("[data-close]").addEventListener("click",e),t.addEventListener("click",n=>{n.target===t&&e()}),document.addEventListener("keydown",n=>{n.key==="Escape"&&t.classList.contains("show")&&e()},{once:!0})}function to(o){const t=[["Descrição","Valor"],["Salário Contratual",o.proventos.salarioBase],["Remuneração do mês",o.resumo.bruto],["Total de Proventos",o.resumo.totalProventos],["Proventos Variáveis",o.proventos.proventosVariaveis],["Horas Extras",o.proventos.horasExtras],["INSS",o.descontos.inss],["IRRF",o.descontos.irrf],["Vale Transporte",o.descontos.vt],["Pensão Alimentícia",o.descontos.pensao],["Outros Descontos",o.descontos.outros],["Desconto por Faltas",o.descontos.descFaltas],["Desconto por Atrasos",o.descontos.descAtrasos],["DSR sobre Faltas",o.descontos.descDSR],["Total Descontos",o.resumo.totalDescontos],["Salário Família",o.proventos.salarioFamilia],["Salário Líquido",o.liquido],["FGTS (mês)",o.informativos.fgts],["Competência",o.informativos.competencia]].map(c=>c.join(";")).join(`
`),i=new Blob([t],{type:"text/csv;charset=utf-8;"}),e=document.createElement("a"),n=URL.createObjectURL(i);e.setAttribute("href",n),e.setAttribute("download",`calculo_salario_${o.informativos.competencia}.csv`),e.style.display="none",document.body.appendChild(e),e.click(),document.body.removeChild(e)}function eo({trib:o=A}={}){const a=document.querySelector('[data-calc="salario"]');if(!a){console.error("Formulário não encontrado");return}const t=document.querySelector("[data-result-value]"),i=document.querySelector("[data-calc-details]"),e=document.querySelector("[data-calc-errors]");if(!t){console.error("Elemento de resultado não encontrado");return}t.setAttribute("aria-live","polite"),t.setAttribute("aria-label","Valor do salário líquido");const n=s=>({bruto:s.bruto?.value,dependentes:s.dependentes?.value,outrosDescontos:s.outrosDescontos?.value,pensaoAlimenticia:s.pensaoAlimenticia?.value,pgbl:s.pgbl?.value,filhosSF:s.filhosSF?.value,vtPercent:s.vtPercent?.value,competencia:s.competencia?.value,proventosVariaveis:s.proventosVariaveis?.value,faltasDias:s.faltasDias?.value,atrasosHoras:s.atrasosHoras?.value,diasUteis:s.diasUteis?.value,diasDescanso:s.diasDescanso?.value,regime:s.regime?.value,horas50:s.horas50?.value,horas100:s.horas100?.value,horasDomingo:s.horasDomingo?.value}),c=s=>{t.textContent=r(s.liquido),t.classList.add("fade-in"),i&&(i.innerHTML=oo(s),i.classList.add("show")),e&&s.informativos.validationErrors?.length>0?(e.innerHTML=`
                <div class="validation-errors">
                  ${s.informativos.validationErrors.map(l=>`<div class="error-item">⚠️ ${l}</div>`).join("")}
                </div>
            `,e.classList.add("show")):e&&(e.innerHTML="",e.classList.remove("show"))},m=()=>{t&&(t.classList.add("loading"),t.textContent="Calculando...")},f=()=>{t&&t.classList.remove("loading")},p=Z(()=>{try{m();const s=n(a),l=P(s,o);c(l),localStorage.setItem("lastCalculation",JSON.stringify({input:s,result:l,timestamp:new Date().toISOString()}))}catch(s){console.error("Erro no cálculo:",s),e&&(e.innerHTML=`<div class="error-item">❌ Erro ao calcular: ${s.message}</div>`)}finally{f()}},300);a.querySelectorAll("input, select").forEach(s=>{s.addEventListener("input",p),s.dataset.money==="true"&&s.addEventListener("blur",function(){const l=u(this.value);l>0&&(this.value=l.toLocaleString("pt-BR",{minimumFractionDigits:2}))})});const S=a.querySelector('[data-action="comparar"]');S&&S.addEventListener("click",s=>{s.preventDefault();const l=n(a),D=P(l,o),E=Y(D.resumo.bruto);ao(D,E)});const v=a.querySelector('[data-action="exportar"]');v&&v.addEventListener("click",s=>{s.preventDefault();const l=n(a),D=P(l,o);to(D)});const g=document.querySelectorAll(".corvelloni-tab"),h=document.querySelectorAll(".corvelloni-panel");g.length>0&&g.forEach(s=>{s.addEventListener("click",l=>{l.preventDefault();const D=s.dataset.tab;g.forEach(L=>L.classList.remove("active")),h.forEach(L=>L.classList.remove("active")),s.classList.add("active");const E=document.querySelector(`[data-panel="${D}"]`);E&&E.classList.add("active")})});const R=()=>{try{const s=localStorage.getItem("lastCalculation");if(s){const{input:l,result:D}=JSON.parse(s);Object.keys(l).forEach(E=>{a[E]&&l[E]&&(a[E].value=l[E])}),c(D)}}catch{console.log("Nenhum cálculo anterior encontrado")}},b=document.querySelector('[data-modal="comparison"]');b&&b.addEventListener("click",s=>{s.target===b&&b.classList.remove("show")}),R(),p(),console.log("Calculadora de salário inicializada com sucesso!")}const _=()=>eo();document.readyState==="loading"?document.addEventListener("DOMContentLoaded",_,{once:!0}):_();
